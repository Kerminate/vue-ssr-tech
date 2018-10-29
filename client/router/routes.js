// import Todo from '../views/todo/todo.vue' // 使用动态路由加载
// import Login from '../views/login/login.vue' // 使用动态路由加载

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app',
    props: true,
    // component: Todo,
    component: () => import('../views/todo/todo.vue'),
    name: 'app',
    meta: {
      title: 'app',
      desciption: 'this is app'
    },
    beforeEnter (to, from, next) {
      console.log('app route before enter')
      next()
    }
  },
  {
    path: '/login',
    // component: Login
    component: () => import('../views/login/login.vue')
  }
]
