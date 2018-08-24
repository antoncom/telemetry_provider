import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'

import bpm from './modules/bpm'
import base from './modules/base'
import common from './modules/common'

import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = false // process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  mutations,
  actions,
  modules: {
    common,
    base,
    bpm
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  getters: {
  }
})
