import Vuex from 'vuex'
import defaultState from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const isDev = process.env.NODE_ENV === 'development'

export default () => {
  const store = new Vuex.Store({
    strict: isDev,
    state: defaultState,
    getters,
    mutations,
    actions
  })

  if (module.hot) {
    // 使 action 和 mutation 成为可热重载模块
    module.hot.accept([
      './state',
      './getters',
      './mutations',
      './actions'
    ], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newState = require('./state').default
      const newGetters = require('./getters').default
      const newMutations = require('./mutations').default
      const newActions = require('./actions').default
      // 加载新模块
      store.hotUpdate({
        state: newState,
        getters: newGetters,
        mutations: newMutations,
        actions: newActions
      })
    })
  }
  return store
}
