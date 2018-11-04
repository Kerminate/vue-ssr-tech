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
      './state/index.js',
      './getters/index.js',
      './mutations/index.js',
      './actions/index.js'
    ], () => {
      // 获取更新后的模块
      // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
      const newState = require('./state/index.js').default
      const newGetters = require('./getters/index.js').default
      const newMutations = require('./mutations/index.js').default
      const newActions = require('./actions/index.js').default
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
