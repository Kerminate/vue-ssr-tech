const Router = require('koa-router')

const apiRouter = new Router({ prefix: '/api' })

const successResponse = (data) => {
  return {
    success: true,
    data
  }
}

apiRouter.get('/todos', async (ctx) => {
  console.log(123)
  const todos = await ctx.db.getAllTodos()
  ctx.body = successResponse(todos)
})

module.exports = apiRouter
