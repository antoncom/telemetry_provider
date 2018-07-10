import Vue from 'vue'
import * as types from './mutation-types'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import credentials from 'src/components/Dashboard/Views/TeamtimeBpm/credentials/credentials.js'
import credentials from 'src/api/credentials.js'
import store from 'src/store/index.js'
// import routes from 'src/routes/routes'
import {router} from 'src/main'


Vue.use(VueAxios, axios)

export const login = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
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
        router.push(payload.from)
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
  })
}

export const logout = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
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

export const getHouseholder = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.get(credentials.appix_api + '/householders/' + payload.id).then(response => {
    if (response.data.id > 0) {
      commit({
        type: types.GET_HOUSEHOLDER,
        payload: response.data
      })
      // populate the form fields
      payload.name = response.data.name
      payload.tin = response.data.tin
      payload.email = response.data.email
      payload.username = response.data.username
      payload.address = response.data.address
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
  })
}

export const addHouseholder = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  let data = new FormData()
  data.append('org_id', store.getters.getUserId)
  data.append('name', payload.name)
  data.append('email', payload.email)
  data.append('tin', payload.tin)
  data.append('address', payload.address)
  data.append('username', payload.username)
  data.append('password', payload.password)
  data.append('generate_password', payload.generate_password)

  axios.post(credentials.appix_api + '/householders', data).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.ADD_HOUSEHOLDER,
        payload: response.data
      })
      if (response.data.status === 'ok') {
        router.push('/householders/list')
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
  })
}

export const editHouseholder = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  let data = new FormData()
  data.append('id', payload.id)
  data.append('name', payload.name)
  data.append('email', payload.email)
  data.append('tin', payload.tin)
  data.append('address', payload.address)
  data.append('username', payload.username)
  data.append('password', payload.password)
  data.append('generate_password', payload.generate_password)

  axios.put(credentials.appix_api + '/householders/' + payload.id, data).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.EDIT_HOUSEHOLDER,
        payload: response.data
      })
      if (response.data.status === 'ok') {
        router.push('/householders/list')
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
  })
}

export const addHouse = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  let data = new FormData()
  data.append('org_id', store.getters.getUserId)
  data.append('address', payload.address)

  axios.post(credentials.appix_api + '/houses', data).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.ADD_HOUSE,
        payload: response.data
      })
      if (response.data.status === 'ok') {
        router.push('/houses/list')
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
  })
}

export const loadWorkflow = ({commit}, payload) => {
  axios.defaults.timeout = 15000
  return new Promise((resolve, reject) => {
    let id = payload
    let apiDiagram = 'http://teamlog.teamtime.info/administrator/index.php?option=com_teamtimebpm&controller=process&task=loadDiagram&id=' + id + '&username=' + credentials.username + '&passwd=' + credentials.passwd
    axios.get(apiDiagram).then((responseDiagram) => {
      commit({
        type: types.LOAD_WORKFLOW,
        payload: responseDiagram.data
      })
      resolve(responseDiagram)
    }).catch((error) => {
      reject(error)
    })
  })
}

export const loadStatus = ({commit}) => {
  // let postData = payload
  let apiStatus = 'http://teamlog.teamtime.info/administrator/index.php?option=com_teamtimebpm&controller=process&task=loadInfo&username=' + credentials.username + '&passwd=' + credentials.passwd
  let figuresToPost = []
  let figuresInStore = store.state.figures
  // get figures from store
  figuresInStore.forEach(function (figure) {
    if ('paramsData' in figure) {
      if ('_id' in figure.paramsData) {
        figuresToPost.push({'id': figure.id, '_id': figure.paramsData._id})
      } else if ('linkedId' in figure.paramsData) {
        figuresToPost.push({'id': figure.id, 'linkedId': figure.paramsData.linkedId})
      }
    }
  })
  // make params for future POST request
  figuresToPost = figuresToPost.map(function (el) {
    return JSON.stringify(el)
  })
  let postData = new FormData()
  postData.set(
    'figures', '[' + figuresToPost.toString() + ']'
  )
  postData.set(
    'info', 'status'
  )
  // get statuses of the figures
  axios.post(apiStatus, postData).then((responsStatus) => {
    commit({
      type: types.LOAD_FIGURE_STATUS,
      payload: responsStatus.data
    })
  })
}
