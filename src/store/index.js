import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'

import bpm from './modules/bpm'

import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const state = {
  userId: '',
  userToken: '',
  userType: '',
  userAuthorized: false,
  houses: [],
  householders: [],
  operators: [],
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
  modules: {
    bpm
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  getters: {
    userType: (state) => {
      return state.userType
    },
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
    operators: (state) => {
      return state.operators
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
    }
  }
})
