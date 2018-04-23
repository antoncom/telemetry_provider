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
    getPortLocalXY: (state) => (figureId, portType) => {
      var result = {x: 0, y: 0}

      // get figure from the store
      var figure = null
      for (let fig of state.figures) {
        if (fig.id === figureId) {
          figure = fig
          break
        }
      }
      if (figure === null) {
        console.log('Figure with ID "' + figureId + '" is not found!')
        return
      }
      // get relative coordinates of the port
      if (figure.type === 'bpmn.Activity') {
        if (portType === 'input') {
          result.x = -9
          result.y = (figure.height / 2 - 9)
        } else if (portType === 'input1') {
          result.x = 11
          result.y = -9
        } else if (portType === 'input2') {
          result.x = 9
          result.y = (figure.height - 9)
        } else if (portType === 'output') {
          result.x = (figure.width - 9)
          result.y = (figure.height / 2 - 9)
        } else if (portType === 'output1') {
          result.x = (figure.width - 29)
          result.y = -9
        } else if (portType === 'output2') {
          result.x = (figure.width - 29)
          result.y = (figure.height - 9)
        }
      } else if (figure.type === 'bpmn.Message' ||
          figure.type === 'bpmn.Start' ||
          figure.type === 'bpmn.Timer' ||
          figure.type === 'bpmn.ConditionXOR' ||
          figure.type === 'bpmn.ConditionOR' ||
          figure.type === 'bpmn.ConditionAND') {
        if (portType === 'input') {
          result.x = -9
          result.y = (figure.height / 2 - 9)
        } else if (portType === 'input1') {
          result.x = (figure.width / 2 - 9)
          result.y = -9
        } else if (portType === 'output') {
          result.x = (figure.width - 9)
          result.y = (figure.height / 2 - 9)
        } else if (portType === 'output2') {
          result.x = (figure.width / 2 - 9)
          result.y = (figure.height - 9)
        }
      } else if (figure.type === 'bpmn.End') {
        if (portType === 'input') {
          result.x = -9
          result.y = (figure.height / 2 - 9)
        } else if (portType === 'input1') {
          result.x = (figure.width / 2 - 9)
          result.y = -9
        } else if (portType === 'input2') {
          result.x = (figure.width / 2 - 9)
          result.y = (figure.height - 9)
        }
      }
      return result
    },
    getPortGlobalXY: (state, getters) => (figureId, portType) => {
      var result = {x: 0, y: 0}
      // get figure from the store
      var figure = null
      for (let fig of state.figures) {
        if (fig.id === figureId) {
          figure = fig
          break
        }
      }
      if (figure === null) {
        console.log('Figure with ID "' + figureId + '" is not found!')
        return
      }
      // Firstly, get local coordinates of the port
      // var local = {x: 5, y: 5}
      var local = getters.getPortLocalXY(figureId, portType)
      // Get global coordinates of the port
      result.x = figure.x + local.x
      result.y = figure.y + local.y

      return result
    }
  }
})
