import Vue from 'vue'
import * as types from 'src/store/mutation-types.js'
import { mapState } from 'vuex'
// import { Wormhole } from 'portal-vue'

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
    ...mapState('bpm', ['isPortsEnabled', 'isGridShown', 'snapGridSize', 'bubbledPorts'])
  },
  methods: {
    /* sendToPortalTarget (_port) {
      var portToBubble = [this.$createElement('p', 'This will be displayed in the Target!')]
      console.log('portToBubble', portToBubble)
      Wormhole.open({
        to: 'globalports',
        from: 'localports',
        portToBubble
      })
    },
    clearPortalTarget () {
      console.log('CLOSE HOLE')
      Wormhole.close({
        to: 'globalports'
      }, true)
    } */
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
  _port.context.directLine = directLine

  // delete this
/*  _port.context.$store.commit({
    type: 'bpm/' + types.BUBBLED_PORT,
    payload: {
      directLine: directLine
    }
  }) */
  //

  if (_port.context.type === 'input') {
    var targetFigure = {
      id: _port.context.figureId,
      portPosition: _port.context.position
    }
  } else if (_port.context.type === 'output') {
    var sourceFigure = {
      id: _port.context.figureId,
      portPosition: _port.context.position
    }
  }
  _port.context.$store.commit({
    type: 'bpm/' + types.ADD_DIRECT_LINE,
    payload: {
      sourceFigure,
      targetFigure,
      existedConnection: '',
      domEl: directLine
    }
  })
  console.log('BEFORE', directLine)
  console.log('AFTER', _port.context.directLine)
  return directLine
}

export function mousedown (e, el, _port) {
  setDraggerOffset(e, _port)
  e.preventDefault()
  if (_port.context.overlay) {
    _port.context.overlay.remove()
  }
  _port.context.down = true
  const overlay = createOverlay(e, el, _port)
  _port.context.overlay = overlay

  createDirectLine(_port)

  // _port.context.$store.getters.directLineDomEl = directLine
  _port.context.portStyle.zIndex = 20000
  _port.context.portStyle.position = 'absolute'

  // Save startdrag port
  _port.context.$store.commit({
    type: 'bpm/' + types.BUBBLED_PORT,
    payload: {
      startDragPort: _port.context.overlay
    }
  })
}

export function mouseup (e, el, _port) {
  _port.context.down = false
  if (!_port.context.overlay) {
    return
  }

  // make connection

  // remove helpers

  _port.context.overlay.removeEventListener('mouseup', mouseup)
  _port.context.overlay.removeEventListener('mousemove', mousemove)
  _port.context.overlay.remove()
  // _port.context.$store.getters.directLineDomEl.remove()
  _port.context.$store.commit('bpm/' + types.REMOVE_DIRECT_LINE)

  _port.context.$store.commit({
    type: 'bpm/' + types.BUBBLED_PORT,
    payload: {
      atRest: true,
      startDragPort: null
    }
  })
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

    // console.log('DR--', _port.context.directLine)
  }
}

export function drawDirectLine (x1, y1, x2, y2, _port) {
  var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI
  var transform = 'rotate(' + angle + 'deg)'

  // console.log('GETTERS directLineDomEl ==', _port.context.$store.getters)
  /* _port.context.$store.getters.directLineDomEl.style.left = x1 + 'px'
  _port.context.$store.getters.directLineDomEl.style.top = y1 + 'px'
  _port.context.$store.getters.directLineDomEl.style.width = length + 'px'
  _port.context.$store.getters.directLineDomEl.style.transform = transform
  _port.context.$store.getters.directLineDomEl.style['-ms-transform'] = transform
  _port.context.$store.getters.directLineDomEl.style['-moz-transform'] = transform
  _port.context.$store.getters.directLineDomEl.style['-webkit-transform'] = transform
  _port.context.$store.getters.directLineDomEl.style['-o-transform'] = transform */
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
      console.log('Source Port', _port.context.$vnode.key)
      _port.context.$store.commit({
        type: 'bpm/' + types.BUBBLED_PORT,
        payload: {
          atRest: false
        }
      })
      mousedown(e, el, _port)
    })

    el.addEventListener('mouseup', (e) => {
      console.log('Target Port', _port.context.$vnode.key)
      _port.context.$store.commit({
        type: 'bpm/' + types.BUBBLED_PORT,
        payload: {
          atRest: true
        }
      })
      // remove helpers (overlay, etc)
      var overlay = _port.context.bubbledPorts.startDragPort
      overlay.removeEventListener('mouseup', mouseup)
      overlay.removeEventListener('mousemove', mousemove)
      overlay.remove()
      // _port.context.bubbledPorts.$store.getters.directLineDomEl.remove()
      _port.context.$store.commit('bpm/' + types.REMOVE_DIRECT_LINE)
    })
  }
})
