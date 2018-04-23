import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const state = {
  rows: [],
  columns: [],
  figures: new Map(),
  connections: [],
  figureStatus: []
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  getters: {
    getPortXY: (state) => (context = 'figure', type = 'input') => {
      var out = {x: 0, y: 0}
      // TODO
      // Make X, Y of port according to context and type of port
      if (context === 'figure') {
        out.x = 1
        out.y = 1
      } else if (context === 'diagram') {
        out.x = 2
        out.y = 2
      }
      return out
    }
  }
})
