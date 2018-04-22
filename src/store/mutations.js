import * as types from './mutation-types'

export default {
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
  [types.LOGIN]: (state, response) => {

  },

  [types.VALIDATE_ERROR]: (state, errors) => {

  },

  [types.LOGOUT]: (state) => {

  },

  [types.INFO]: (state, response) => {

  }
}
