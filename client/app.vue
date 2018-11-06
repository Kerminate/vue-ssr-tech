<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}} {{counter}}</p>
    <router-link to='/app'>app</router-link>
    <router-link to='/login'>login</router-link>
    <transition name='fade'>
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
  computed: {
    ...mapState({
      counter: (state) => state.count
    }),
    ...mapGetters(['fullName'])
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
