const Koa = require('koa')
const path = require('path')
const send = require('koa-send')
const koaBody = require('koa-body')
const koaSession = require('koa-session')

const staticRouter = require('./routes/static')
const apiRouter = require('./routes/api')
const userRouter = require('./routes/user')
const createDb = require('./db')
const config = require('../app.config')

const app = new Koa()
const db = createDb(config.db.appId, config.db.appKey)

app.keys = ['vue ssr tech']
app.use(koaSession({
  key: 'v-ssr-id',
  maxAge: 2 * 60 * 60 * 1000
}, app))

const isDev = process.env.NODE_ENV === 'development'

app.use(async (ctx, next) => {
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isDev) {
      ctx.body = err.message
    } else {
      ctx.body = 'please try again later'
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(koaBody)
app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

let pageRouter
if (isDev) {
  pageRouter = require('./routes/dev-ssr')
} else {
  pageRouter = require('./routes/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
