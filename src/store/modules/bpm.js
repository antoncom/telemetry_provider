import * as types from '../mutation-types'
import axios from 'axios'
import credentials from 'src/api/credentials.js'

const state = {
  rows: [],
  columns: [],
  figures: new Map(),
  figureMoved: {
    id: '',
    x: 0,
    y: 0
  },
  connectionMoved: {
    connRef: ''
  },
  connections: [],
  figureStatus: [],
  isPortsEnabled: true,
  isGridShown: false,
  snapGridSize: 10
}

const getters = {
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

const actions = {
  loadWorkflow ({commit}, payload) {
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
  },
  loadStatus ({commit}) {
    // let postData = payload
    let apiStatus = 'http://teamlog.teamtime.info/administrator/index.php?option=com_teamtimebpm&controller=process&task=loadInfo&username=' + credentials.username + '&passwd=' + credentials.passwd
    let figuresToPost = []
    let figuresInStore = state.figures
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
}

const mutations = {
  [types.LOAD_WORKFLOW]: (state, commit) => {
    state.rows = commit.payload.rows
    state.columns = commit.payload.columns
    state.figures = commit.payload.figures
    state.connections = commit.payload.connections
  },
  [types.LOAD_FIGURE_STATUS]: (state, commit) => {
    state.figureStatus = commit.payload
  },
  [types.SHOW_PORTS]: (state, commit) => {
    state.isPortsEnabled = commit.payload
  },
  [types.SHOW_GRID]: (state, commit) => {
    state.isGridShown = commit
  },
  [types.CHANGE_FIGURE_XY]: (state, commit) => {
    // get figure from the store
    var figure = null
    for (let fig of state.figures) {
      if (fig.id === commit.payload.figureId) {
        figure = fig
        break
      }
    }
    if (figure === null) {
      console.log(types.CHANGE_FIGURE_XY + ': Figure with ID "' + commit.payload.figureId + '" is not found!')
      return
    }
    figure.x = commit.payload.x
    figure.y = commit.payload.y
    state.figureMoved.id = commit.payload.figureId
    state.figureMoved.x = commit.payload.x
    state.figureMoved.y = commit.payload.y
  },
  [types.CHANGE_CONNECTION]: (state, commit) => {
    state.connectionMoved = commit.payload.connRef
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
