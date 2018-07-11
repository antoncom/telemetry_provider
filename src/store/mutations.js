import * as types from './mutation-types'

export default {
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
  },

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

  [types.ADD_HOUSE]: (state, commit) => {
  },
  [types.EDIT_HOUSE]: (state, commit) => {
  },
  [types.GET_HOUSE]: (state, commit) => {
  },
  [types.DELETE_HOUSE]: (state, commit) => {
  },

  [types.LOAD_WORKFLOW]: (state, commit) => {
    console.log('DIAG', commit.payload)
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
  [types.INFO]: (state, response) => {

  }
}
