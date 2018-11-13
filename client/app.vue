<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <transition name='fade'>
      <router-view />
    </transition>
    <button @click="notify">click me</button>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue' // Todo 使用动态路由加载

export default {
  metaInfo: {
    title: 'Kerminate\'s Todo App'
  },
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
    notify () {
      this.$notify({
        content: 'test $notify',
        btn: 'close'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover {
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #fff
  opacity .5
  z-index -1
}
</style>
