import * as types from '../mutation-types'
import axios from 'axios'
import credentials from 'src/api/credentials.js'

import { router } from 'src/main'

const state = {
  userId: '',
  userToken: '',
  userType: '',
  userAuthorized: false
}

const getters = {
/*  userType: (state) => {
    return state.userType
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
  */
}
const actions = {
  login ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = state.userToken
    axios.defaults.withCredentials = false

    let data = new FormData()
    data.append('user', payload.username)
    data.append('password', payload.password)
    axios.post(credentials.appix_api + '/login', data).then(response => {
      if (response.data.status === 'ok') {
        commit({
          type: types.LOGIN,
          payload: response.data
        })
        if (response.data.status === 'ok') {
          // Переходим на запрашиваемую до логина страницу (или на / )
          console.log('TO---', payload.from)
          router.push(payload.from)
        }
      } else if (response.data.status === 'error') {
        payload.error = response.data.message
      }
    }).catch(e => {
      payload.error = e.message
    })
  },
  logout ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = state.userToken
    axios.defaults.withCredentials = false
    axios.delete(credentials.appix_api + '/login').then(response => {
      if (response.data.status === 'ok') {
        commit({
          type: types.LOGOUT,
          payload: response.data
        })
      } else if (response.data.status === 'error') {
        payload.error = response.data.message
        payload.status = 'error'
      }
    }).catch(e => {
      payload.error = e.message
    })
  }
}

const mutations = {
  [types.LOGIN]: (state, commit) => {
    let roles = ['', 'provider', 'operator', 'householder']
    state.userAuthorized = true
    state.userType = roles[commit.payload.type]
    if (state.userType === 'operator') {
      state.userId = 2
    }
    state.userToken = commit.payload.token
  },

  [types.VALIDATE_ERROR]: (state, errors) => {
  },

  [types.LOGOUT]: (state) => {
    state.userAuthorized = false
    state.userToken = ''
    state.userType = ''
  },

  [types.LOGIN_SUCCESS]: (state) => {
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
