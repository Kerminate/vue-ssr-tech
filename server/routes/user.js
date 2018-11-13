const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async (ctx) => {
  const user = ctx.request.body
  if (user.username === 'kerminate' && user.password === '123456') {
    ctx.session.user = {
      username: 'kerminate'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'kerminate'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error!'
    }
  }
})

module.exports = userRouter
