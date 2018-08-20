import Vue from 'vue'
import * as types from 'src/store/mutation-types.js'
import { mapState } from 'vuex'
import { Portal, PortalTarget } from 'portal-vue'

// //////////////////////////////////////
// mixin code (directive code see below)
// //////////////////////////////////////
export const dragndropFigure = {
  components: {
    Portal,
    PortalTarget
  },
  data () {
    return {
      down: false,
      // initialX: 0,
      // initialY: 0,
      initialZIndex: '',
      draggableElementId: null, // if this is present, only a specific area of the draggable will respond to dragging (eg header bar).
      draggerOffsetLeft: 0,
      draggerOffsetTop: 0,
      overlay: null,
      draggableEl: null
    }
  },
  watch: {
    x: function () {
      this.style.left = this.x + 'px'
    },
    y: function () {
      this.style.top = this.y + 'px'
    }
  },
  computed: {
    ...mapState('bpm', ['isPortsEnabled', 'isGridShown', 'snapGridSize', 'bubbledPorts'])
  },
  created: function () {
    // position & size of figure
    this.x = this.data.x
    this.y = this.data.y
    this.w = this.data.width
    this.h = this.data.height
    this.style.left = this.data.x + 'px'
    this.style.top = this.data.y + 'px'
    this.style.height = this.data.height + 'px'
    this.style.width = this.data.width + 'px'
  }
}

// //////////////////////////////////////
// directive code (mixin code see above)
// //////////////////////////////////////
export function createOverlay (e, el, _figure) {
  const overlay = document.createElement('div')
  overlay.setAttribute('style', `
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10001;
    background-color: blue;
    opacity: 0.1;
  `)
  overlay.addEventListener('mouseup', (e) => mouseup(e, el, _figure))
  overlay.addEventListener('mousemove', (e) => mousemove(e, el, _figure))

  document.getElementById('previewframe').contentWindow.document.getElementById('SwimlanePanel-scrollarea').appendChild(overlay)
  return overlay
}

function checkIfIdInPath (id, path) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].id === id) {
      return true
    }
  }
  return false
}

export function adjustElementZIndex (el, index) {
  el.style.zIndex = index
}

export function mousedown (e, el, _figure) {
  setDraggerOffset(e, _figure)
  _figure.context.initialZIndex = el.style.zIndex
  _figure.context.style.opacity = 0.7
  e.preventDefault()
  if (_figure.context.draggableElementId && !checkIfIdInPath(_figure.context.draggableElementId, e.path)) {
    return
  }
  if (_figure.context.overlay) {
    _figure.context.overlay.remove()
  }
  _figure.context.down = true
  const overlay = createOverlay(e, el, _figure)
  _figure.context.overlay = overlay
  adjustElementZIndex(el, 10001)
}

export function mouseup (e, el, _figure) {
  _figure.context.down = false
  if (!_figure.context.overlay) {
    return
  }

  _figure.context.overlay.removeEventListener('mouseup', mouseup)
  _figure.context.overlay.removeEventListener('mousemove', mousemove)
  _figure.context.overlay.remove()
  adjustElementZIndex(el, _figure.context.initialZIndex)
  _figure.context.style.opacity = 1
}

export function mousemove (e, el, _figure) {
  if (_figure.context.down) {
    var newX = e.clientX - _figure.context.draggerOffsetLeft
    var newY = e.clientY - _figure.context.draggerOffsetTop
    if (_figure.context.isGridShown) {
      _figure.context.x = Math.round(newX / _figure.context.snapGridSize) * _figure.context.snapGridSize
      _figure.context.y = Math.round(newY / _figure.context.snapGridSize) * _figure.context.snapGridSize
    } else {
      _figure.context.x = newX
      _figure.context.y = newY
    }
    _figure.context.$store.commit({
      type: 'bpm/' + types.CHANGE_FIGURE_XY,
      payload: {
        figureId: _figure.context.data.id,
        x: _figure.context.x,
        y: _figure.context.y
      }
    })
  }
}

// export function setDraggerOffset (el, _figure) {
export function setDraggerOffset (e, _figure) {
  _figure.context.draggerOffsetLeft = e.clientX - _figure.context.x
  _figure.context.draggerOffsetTop = e.clientY - _figure.context.y
}

export const drag = Vue.directive('drag', {
  inserted: function (el, binding, vnode) {
    var _figure = vnode
    _figure.context.draggableElementId = binding.arg || null
    el.addEventListener('mousedown', (e) => mousedown(e, el, _figure))
  }
})
