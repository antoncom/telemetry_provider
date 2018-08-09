import Vue from 'vue'
import * as types from '../mutation-types'
import axios from 'axios'
import credentials from 'src/api/credentials.js'

import { router } from 'src/main'
import swal from 'sweetalert2'
import copyToClipboard from 'src/plugins/copyToClipboard.js'

Vue.use(copyToClipboard)

const state = {
  houses: [],
  householders: [],
  operators: [],
  selectedHouse: '',
  selectedHouseholder: '',
  consumption_data: [],
  consumption_type: '',
  weather_data: {}
}


const getters = {
/*  weather_data: (state) => {
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
  }
  */
}

const actions = {
  listOperators ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  getOperator ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  addOperator ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
    axios.defaults.withCredentials = false

    let data = new FormData()
    data.append('org_id', this.state.common.userId)
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
          swal({
            title: 'Данные авторизации',
            html: '<pre>Логин: ' + payload.username + ' Пароль: ' + response.data.password + '</pre>',
            type: 'success',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            confirmButtonText: 'Копировать в буфер',
            customClass: 'swal-password',
            preConfirm: () => {
              return new Promise((resolve, reject) => {
                if (Vue.copyToClipboard(payload.name + ' - Логин: ' + payload.username + ' Пароль: ' + response.data.password)) {
                  resolve()
                } else {
                  reject(new Error('Ваш браузер не поддерживает copyToClipboard(). \n Скопируйте данные вручную!'))
                }
              })
            }
          }).then((result) => {
            if (result) {
              swal({
                title: 'Скопировано!',
                html:
                '<pre><code>' +
                payload.name + ' - Логин: ' + payload.username + ' Пароль: ' + response.data.password +
                '</code></pre>',
                confirmButtonText: 'Ok',
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success btn-fill'
              }).then((result) => {
                if (result) {
                  router.push('/operators/list')
                }
              })
            }
          })
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
  },
  editOperator ({commit}, payload) {
    axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  deleteOperator ({commit}, payload) {
    axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
    axios.defaults.withCredentials = false

    axios.delete(credentials.appix_api + '/operators/' + payload.row.id).then(response => {
      if (response.data.status === 'ok') {
        swal({
          title: 'Удалено!',
          html: '<pre>Оператор удалён из системы: \n<strong>' + payload.row.name + '</strong></pre>',
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
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
  },
  listHouseholders ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  getHouseholder ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  addHouseholder ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
    axios.defaults.withCredentials = false

    let data = new FormData()
    data.append('org_id', payload.operator)
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
          swal({
            title: 'Данные авторизации',
            html: '<pre>Логин: ' + payload.username + ' Пароль: ' + response.data.password + '</pre>',
            type: 'success',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            confirmButtonText: 'Копировать в буфер',
            customClass: 'swal-password',
            preConfirm: () => {
              return new Promise((resolve, reject) => {
                if (Vue.copyToClipboard(payload.name + ' - Логин: ' + payload.username + ' Пароль: ' + response.data.password)) {
                  resolve()
                } else {
                  reject(new Error('Ваш браузер не поддерживает copyToClipboard(). \n Скопируйте данные вручную!'))
                }
              })
            }
          }).then((result) => {
            swal({
              title: 'Скопировано!',
              html:
              '<pre><code>' +
              payload.name + ' - Логин: ' + payload.username + ' Пароль: ' + response.data.password +
              '</code></pre>',
              confirmButtonText: 'Ok',
              buttonsStyling: false,
              confirmButtonClass: 'btn btn-success btn-fill'
            }).then((result) => {
              if (result) {
                router.push('/householders/list')
              }
            })
          })
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
  },
  editHouseholder ({commit}, payload) {
    axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  deleteHouseholder ({commit}, payload) {
    axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
    axios.defaults.withCredentials = false

    axios.delete(credentials.appix_api + '/householders/' + payload.row.id).then(response => {
      if (response.data.status === 'ok') {
        swal({
          title: 'Удалено!',
          html: '<pre>Домовладелец удалён из системы: \n<strong>' + payload.row.name + '</strong></pre>',
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
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
  },
  addHouse ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  editHouse ({commit}, payload) {
    axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
    axios.defaults.withCredentials = false

    var qs = require('qs')
    axios.put(credentials.appix_api + '/houses/' + payload.house_id, qs.stringify(payload)).then(response => {
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
  },
  getHouse ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  deleteHouse ({commit}, payload) {
    axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
    axios.defaults.withCredentials = false
    axios.delete(credentials.appix_api + '/houses/' + payload.row.id).then(response => {
      if (response.data.status === 'ok') {
        swal({
          title: 'Удалено!',
          html: '<pre>Дом удалён из системы: \n<strong>' + payload.row.address + '</strong></pre>',
          type: 'success',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
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
  },
  listHouses ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  addEquipment ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  editEquipment ({commit}, payload) {
    axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  getEquipment ({commit}, payload) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
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
  },
  getConsumption ({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit(types.CLEAR_CONSUMPTION)

      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
      axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
      axios.defaults.withCredentials = false

      let params = '?house_id=' + payload.house_id + '&from=' + payload.from + '&to=' + payload.to
      axios.get(credentials.appix_api + '/' + payload.consumption_type + params).then(response => {
        if (response.data.length >= 0) {
          // make consumption lines array for handling by checkboxes / radios
          var consLines = []
          for (let i = 0; i < response.data.length; i++) {
            // make line names checkbnoxes and radios model data
            response.data[i].data.reverse()
            let obj = {
              name: response.data[i].name,
              selected: false,
              noData: (response.data[i].data.length === 0)
            }
            consLines.push(obj)

            // make table columns & table data
            // if
          }
          // update checkboxes / radios only when change consumption type of if checkboxes list is empty
          if ((this.state.base.consumption_type !== payload.consumption_type) || (payload.consumption_lines.length === 0)) { // do it only if another consumption data type is loaded
            payload.consumption_lines = consLines
            payload.selected_param = ''
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
  },
  unbindEquipment ({commit}, payload) {
    axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
    axios.defaults.headers.common['X-AUTH-TOKEN'] = this.state.common.userToken
    axios.defaults.withCredentials = false

    let params = '?' + payload.line + '=true'

    axios.delete(credentials.appix_api + '/equipment/' + payload.id + params).then(response => {
      if (response.data.status === 'ok') {
        let messageHtml = '<pre><code>Линия <strong>' + payload.name + ' [' + payload.line + ']</strong>'
        messageHtml += ' прибора [' + payload.equipment_address + ']'
        messageHtml += ' отвязана от дома <i>' + payload.house_address + '</i>!</code></pre>'
        swal({
          title: 'Отвязано!',
          html: messageHtml,
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
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
}

const mutations = {
  [types.ADD_OPERATOR]: (state, commit) => {
    state.setOperatorPassword = commit.payload.password
  },
  [types.EDIT_OPERATOR]: (state, commit) => {
    state.setOperatorPassword = commit.payload.password
  },
  [types.GET_OPERATOR]: (state, commit) => {
    state.operator = commit.payload
  },
  [types.DELETE_OPERATOR]: (state, commit) => {
  },
  [types.LIST_OPERATORS]: (state, commit) => {
    state.operators = commit.payload
  },

  [types.ADD_HOUSEHOLDER]: (state, commit) => {
    state.setHouseholderPassword = commit.payload.password
  },
  [types.EDIT_HOUSEHOLDER]: (state, commit) => {
    state.setHouseholderPassword = commit.payload.password
  },
  [types.GET_HOUSEHOLDER]: (state, commit) => {
    state.hoseholder = commit.payload
  },
  [types.DELETE_HOUSEHOLDER]: (state, commit) => {
  },
  [types.LIST_HOUSEHOLDERS]: (state, commit) => {
    state.householders = commit.payload
  },
  [types.KEEP_HOUSEHOLDERID]: (state, commit) => {
    state.selectedHouseholder = commit
  },

  [types.ADD_HOUSE]: (state, commit) => {
  },
  [types.EDIT_HOUSE]: (state, commit) => {
  },
  [types.GET_HOUSE]: (state, commit) => {
  },
  [types.DELETE_HOUSE]: (state, commit) => {
  },
  [types.LIST_HOUSES]: (state, commit) => {
    state.houses = commit.payload
  },
  [types.KEEP_HOUSEID]: (state, commit) => {
    state.selectedHouse = commit
  },

  [types.ADD_EQUIPMENT]: (state, commit) => {
  },
  [types.EDIT_EQUIPMENT]: (state, commit) => {
  },
  [types.GET_EQUIPMENT]: (state, commit) => {
  },
  [types.UNBIND_EQUIPMENT]: (state, commit) => {
  },

  [types.GET_CONSUMPTION]: (state, commit) => {
    state.consumption_data = commit.payload.data
    state.consumption_type = commit.payload.type
  },

  [types.CLEAR_CONSUMPTION]: (state) => {
    state.consumption_data = []
    state.consumption_type = ''
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
