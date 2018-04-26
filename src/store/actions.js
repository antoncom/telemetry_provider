import * as types from './mutation-types'
import axios from 'axios'
import credentials from 'src/components/Dashboard/Views/TeamtimeBpm/credentials/credentials.js'
import store from 'src/store/index.js'


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
