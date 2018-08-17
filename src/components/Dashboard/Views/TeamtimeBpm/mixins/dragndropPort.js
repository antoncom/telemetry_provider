import Vue from 'vue'
// import * as types from 'src/store/mutation-types.js'
import { mapState } from 'vuex'

// //////////////////////////////////////
// mixin code (directive code see below)
// //////////////////////////////////////
export const dragPortMixin = {
  data () {
    return {
      down: false,
      draggerOffsetLeft: 0,
      draggerOffsetTop: 0,
      overlay: null
    }
  },
  computed: {
    ...mapState('bpm', ['isPortsEnabled', 'isGridShown', 'snapGridSize'])
  }
}

// //////////////////////////////////////
// directive code (mixin code see above)
// //////////////////////////////////////
export function createOverlay (e, el, _port) {
  const overlay = document.createElement('div')
  overlay.setAttribute('style', `
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10005;
  background-color: blue;
  opacity: 0.8;
  `)
  overlay.addEventListener('mouseup', (e) => mouseup(e, el, _port))
  overlay.addEventListener('mousemove', (e) => mousemove(e, el, _port))

  document.getElementById('previewframe').contentWindow.document.getElementById('SwimlanePanel-scrollarea').appendChild(overlay)
  return overlay
}

export function createDirectLine (_port) {
  const directLine = document.createElement('div')
  directLine.setAttribute('style', `
    height: 2px;
    width: 2px;
    z-index: 10001;
    background-color: black;
    position: absolute;
    top: ` + _port.context.y + `
    left: ` + _port.context.x + `
    transform-origin: '0% 0%';
    -moz-transform-origin: 0% 0%;
    -webkit-transform-origin: 0% 0%;
    -o-transform-origin: 0% 0%;
  `)
  document.getElementById('previewframe').contentWindow.document.getElementById('SwimlanePanel-scrollarea').appendChild(directLine)
  return directLine
}
/*

export function createPortsPlaceholders () {
  const directLine = document.createElement('div')
  directLine.setAttribute('style', `
    height: 2px;
    width: 2px;
    z-index: 10010;
    background-color: black;
    position: absolute;
    top: ` + _port.context.y + `
    left: ` + _port.context.x + `
  `)
  document.getElementById('previewframe').contentWindow.document.getElementById('SwimlanePanel-scrollarea').appendChild(directLine)
  return directLine
}
*/

export function mousedown (e, el, _port) {
  setDraggerOffset(e, _port)
  e.preventDefault()
  if (_port.context.overlay) {
    _port.context.overlay.remove()
  }
  _port.context.down = true
  const overlay = createOverlay(e, el, _port)
  _port.context.overlay = overlay
  const directLine = createDirectLine(_port)
  _port.context.directLine = directLine
  _port.context.portStyle.zIndex = 20000
  _port.context.portStyle.position = 'absolute'
}

export function mouseup (e, el, _port) {
  _port.context.down = false
  if (!_port.context.overlay) {
    return
  }

  _port.context.overlay.removeEventListener('mouseup', mouseup)
  _port.context.overlay.removeEventListener('mousemove', mousemove)
  _port.context.overlay.remove()
  _port.context.directLine.remove()
}

export function mousemove (e, el, _port) {
  if (_port.context.down) {
    let figureId = (_port.context.$parent.data === undefined) ? _port.context.parentId : _port.context.$parent.data.id
    let portType = _port.context.$options.propsData.position
    let bX = _port.context.getPortGlobalXY(figureId, portType).x
    let bY = _port.context.getPortGlobalXY(figureId, portType).y
    let aX = e.clientX - 35
    let aY = e.clientY - 35

    drawDirectLine(aX, aY, bX, bY, _port)
  }
}

export function drawDirectLine (x1, y1, x2, y2, _port) {
  var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
  var transform = 'rotate(' + angle + 'deg)'

  _port.context.directLine.style.left = x1 + 'px'
  _port.context.directLine.style.top = y1 + 'px'
  _port.context.directLine.style.width = length + 'px'
  _port.context.directLine.style.transform = transform
  _port.context.directLine.style['-ms-transform'] = transform
  _port.context.directLine.style['-moz-transform'] = transform
  _port.context.directLine.style['-webkit-transform'] = transform
  _port.context.directLine.style['-o-transform'] = transform
}

export function setDraggerOffset (e, _port) {
//  _port.context.draggerOffsetLeft = e.clientX - _port.context.x
//  _port.context.draggerOffsetTop = e.clientY - _port.context.y
}

export const dragPortDirective = Vue.directive('drag-port', {
  inserted: function (el, binding, vnode) {
    var _port = vnode
    el.addEventListener('mousedown', (e) => {
      // _port.context.$parent.arePortsLocal = false
      _port.context.$parent.sendToPortalTarget()
      mousedown(e, el, _port)
    })
    el.addEventListener('mouseup', (e) => {
      console.log('UPPP THE PORT', _port)
      _port.context.clearPortalTarget()
      // mousedown(e, el, _port)
    })
  }
})
