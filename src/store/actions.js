import Vue from 'vue'
import * as types from './mutation-types'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import credentials from 'src/components/Dashboard/Views/TeamtimeBpm/credentials/credentials.js'
import credentials from 'src/api/credentials.js'
import store from 'src/store/index.js'
// import routes from 'src/routes/routes'
import {router} from 'src/main'

import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)
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

export const listOperators = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.get(credentials.appix_api + '/operators').then(response => {
    if (Object.prototype.toString.call(response.data) === '[object Array]') {
      commit({
        type: types.LIST_OPERATORS,
        payload: response.data
      })
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const getOperator = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.get(credentials.appix_api + '/operators/' + payload.id).then(response => {
    if (response.data.id > 0) {
      commit({
        type: types.GET_OPERATOR,
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
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const addOperator = ({commit}, payload) => {
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

  axios.post(credentials.appix_api + '/operators', data).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.ADD_OPERATOR,
        payload: response.data
      })
      if (response.data.status === 'ok') {
        router.push('/operators/list')
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const editOperator = ({commit}, payload) => {
  axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  var qs = require('qs')
  axios.put(credentials.appix_api + '/operators/' + payload.id, qs.stringify(payload)).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.EDIT_OPERATOR,
        payload: response.data
      })
      if (response.data.status === 'ok') {
        router.push('/operators/list')
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const deleteOperator = ({commit}, payload) => {
  axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.delete(credentials.appix_api + '/operators/' + payload.row.id).then(response => {
    if (response.data.status === 'ok') {
      Vue.swal({
        title: 'Удалено!',
        html: 'Оператор удалён из системы: <strong>' + payload.row.name + '</strong>',
        type: 'success',
        timer: 3000
      })
      let indexToDelete = payload.table.findIndex((tableRow) => tableRow.id === payload.row.id)
      if (indexToDelete >= 0) {
        payload.table.splice(indexToDelete, 1)
      }
      commit({
        type: types.DELETE_OPERATOR,
        payload: response.data
      })
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

// --------------------------------------

export const listHouseholders = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.get(credentials.appix_api + '/householders?org_id=' + payload.org_id).then(response => {
    if (Object.prototype.toString.call(response.data) === '[object Array]') {
      commit({
        type: types.LIST_HOUSEHOLDERS,
        payload: response.data
      })
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
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
    if (payload.code === 401) {
      router.push('/login')
    }
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
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const editHouseholder = ({commit}, payload) => {
  axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  var qs = require('qs')
  axios.put(credentials.appix_api + '/householders/' + payload.id, qs.stringify(payload)).then(response => {
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
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const deleteHouseholder = ({commit}, payload) => {
  axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.delete(credentials.appix_api + '/householders/' + payload.row.id).then(response => {
    if (response.data.status === 'ok') {
      Vue.swal({
        title: 'Удалено!',
        html: 'Домовладелец удалён из системы: <strong>' + payload.row.name + '</strong>',
        type: 'success',
        timer: 3000
      })
      let indexToDelete = payload.table.findIndex((tableRow) => tableRow.id === payload.row.id)
      if (indexToDelete >= 0) {
        payload.table.splice(indexToDelete, 1)
      }
      commit({
        type: types.DELETE_HOUSEHOLDER,
        payload: response.data
      })
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const addHouse = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  let data = new FormData()
  data.append('org_id', payload.householder)
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
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const editHouse = ({commit}, payload) => {
  axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  var qs = require('qs')
  axios.put(credentials.appix_api + '/houses/' + payload.id, qs.stringify(payload)).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.EDIT_HOUSE,
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
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const getHouse = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.get(credentials.appix_api + '/houses/' + payload.house_id).then(response => {
    if (response.data.id > 0) {
      commit({
        type: types.GET_HOUSE,
        payload: response.data
      })
      // populate the form fields
      payload.address = response.data.address
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const deleteHouse = ({commit}, payload) => {
  axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.delete(credentials.appix_api + '/houses/' + payload.row.id).then(response => {
    if (response.data.status === 'ok') {
      Vue.swal({
        title: 'Удалено!',
        html: 'Дом удалён из системы: <strong>' + payload.row.address + '</strong>',
        type: 'success',
        timer: 3000
      })
      let indexToDelete = payload.table.findIndex((tableRow) => tableRow.id === payload.row.id)
      if (indexToDelete >= 0) {
        payload.table.splice(indexToDelete, 1)
      }
      commit({
        type: types.DELETE_HOUSE,
        payload: response.data
      })
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const listHouses = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.get(credentials.appix_api + '/houses?org_id=' + payload.org_id).then(response => {
    if (Object.prototype.toString.call(response.data) === '[object Array]') {
      commit({
        type: types.LIST_HOUSES,
        payload: response.data
      })
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

// ---------------------- EQUIPMENT -------------------------------

export const addEquipment = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  let data = new FormData()
  data.append('house_id', payload.house_id)
  data.append('address', payload.address)
  data.append('line1', payload.line1)
  data.append('line2', payload.line2)
  data.append('line1_name', payload.line1_name)
  data.append('line2_name', payload.line2_name)


  axios.post(credentials.appix_api + '/equipment', data).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.ADD_EQUIPMENT,
        payload: response.data
      })
      if (response.data.status === 'ok') {
        router.push('/equipment/list')
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const editEquipment = ({commit}, payload) => {
  axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  var qs = require('qs')
  axios.put(credentials.appix_api + '/equipment/' + payload.id, qs.stringify(payload)).then(response => {
    if (response.data.status === 'ok') {
      commit({
        type: types.EDIT_EQUIPMENT,
        payload: response.data
      })
      if (response.data.status === 'ok') {
        router.push('/equipment/list')
      }
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const getEquipment = ({commit}, payload) => {
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  axios.get(credentials.appix_api + '/equipment/' + payload.id).then(response => {
    if (response.data.id > 0) {
      commit({
        type: types.GET_EQUIPMENT,
        payload: response.data
      })
      // populate the form fields
      payload.id = response.data.id
      payload.address = response.data.address
      payload.line1_name = response.data.line1_name
      payload.line2_name = response.data.line2_name
      payload.line1 = (response.data.line1 === 1)
      payload.line2 = (response.data.line2 === 1)
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
  })
}

export const getConsumption = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
    axios.defaults.withCredentials = false

    let params = '?house_id=' + payload.house_id + '&from=' + payload.from + '&to=' + payload.to
    axios.get(credentials.appix_api + '/' + payload.consumption_type + params).then(response => {
      if (response.data.length >= 0) {
        // make consumption lines array for handling by checkboxes / radios
        if ((store.getters.consumption_type !== payload.consumption_type) || (payload.consumption_lines.length === 0)) { // do it only if another consumption data type is loaded
          payload.consumption_lines = [] // clear it before populate
          payload.selected_param = ''
          var dataArray = response.data
          for (let i = 0; i < dataArray.length; i++) {
            dataArray[i].data.reverse()
            let obj = {
              name: dataArray[i].name,
              selected: false,
              noData: (dataArray[i].data.length === 0)
            }
            payload.consumption_lines.push(obj)
          }
        }

        commit({
          type: types.GET_CONSUMPTION,
          payload: {
            type: payload.consumption_type,
            data: response.data
          }
        })
        resolve()
      } else if (response.data.status === 'error') {
        payload.error = response.data.message
      }
    }).catch(e => {
      payload.error = e.message
      if (payload.code === 401) {
        router.push('/login')
      }
    })
  })
}

export const unbindEquipment = ({commit}, payload) => {
  axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.headers.common['X-AUTH-TOKEN'] = store.state.userToken
  axios.defaults.withCredentials = false

  let params = '?' + payload.line + '=true'

  axios.delete(credentials.appix_api + '/equipment/' + payload.id + params).then(response => {
    if (response.data.status === 'ok') {
      let messageHtml = 'Линия <strong>' + payload.name + ' [' + payload.line + ']</strong>'
      messageHtml += ' прибора [' + payload.equipment_address + ']'
      messageHtml += ' отвязана от дома <i>' + payload.house_address + '</i>!'
      Vue.swal({
        title: 'Отвязано!',
        html: messageHtml,
        type: 'success'
      })
      payload.refresh()
      commit({
        type: types.UNBIND_EQUIPMENT,
        payload: response.data
      })
    } else if (response.data.status === 'error') {
      payload.error = response.data.message
    }
  }).catch(e => {
    payload.error = e.message
    if (payload.code === 401) {
      router.push('/login')
    }
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
