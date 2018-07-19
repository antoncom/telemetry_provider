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
  figureStatus: [],
  isPortsEnabled: false,
  isGridShown: false,
  userId: null,
  userToken: '',
  userType: '',
  userAuthorized: false,
  houses: [],
  householders: [],
  selectedHouse: '',
  selectedHouseholder: '',
  consumption_data: [],
  consumption_type: '',
  weather_data: {}
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  getters: {
    weather_data: (state) => {
      return state.weather_data
    },
    consumption_data: (state) => {
      return state.consumption_data
    },
    consumption_type: (state) => {
      return state.consumption_type
    },
    selectedHouse: (state) => {
      return state.selectedHouse
    },
    selectedHouseholder: (state) => {
      return state.selectedHouseholder
    },
    getHouseholders: (state) => {
      return state.householders
    },
    getHouses: (state) => {
      return state.houses
    },
    getUserId: (state) => {
      return state.userId
    },
    getToken: (state) => {
      return state.userToken
    },
    userAuthorized: state => {
      return state.userAuthorized
    },
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
          result.x = 0
          result.y = (figure.height / 2)
        } else if (portType === 'input1') {
          result.x = 20
          result.y = 0
        } else if (portType === 'input2') {
          result.x = 20
          result.y = (figure.height)
        } else if (portType === 'output') {
          result.x = (figure.width)
          result.y = (figure.height / 2)
        } else if (portType === 'output1') {
          result.x = (figure.width - 20)
          result.y = 0
        } else if (portType === 'output2') {
          result.x = (figure.width - 20)
          result.y = (figure.height)
        }
      } else if (figure.type === 'bpmn.Message' ||
          figure.type === 'bpmn.Start' ||
          figure.type === 'bpmn.Timer' ||
          figure.type === 'bpmn.ConditionXOR' ||
          figure.type === 'bpmn.ConditionOR' ||
          figure.type === 'bpmn.ConditionAND') {
        if (portType === 'input') {
          result.x = 0
          result.y = (figure.height / 2)
        } else if (portType === 'input1') {
          result.x = (figure.width / 2)
          result.y = 0
        } else if (portType === 'output') {
          result.x = (figure.width)
          result.y = (figure.height / 2)
        } else if (portType === 'output2') {
          result.x = (figure.width / 2)
          result.y = (figure.height)
        }
      } else if (figure.type === 'bpmn.End') {
        if (portType === 'input') {
          result.x = 0
          result.y = (figure.height / 2)
        } else if (portType === 'input1') {
          result.x = (figure.width / 2)
          result.y = 0
        } else if (portType === 'input2') {
          result.x = (figure.width / 2)
          result.y = (figure.height)
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
