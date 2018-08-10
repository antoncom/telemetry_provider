import Vue from 'vue'
// import store from 'src/store/index.js'
/*
Vue.mixin({
  created: function () {
    // некоторая логика ...
  },
  data () {
    return {
      _data: {
        draggableElementId: null, // if this is present, only a specific area of the draggable will respond to dragging (eg header bar).
        down: false,
        initialX: 0,
        initialY: 0,
        draggerOffsetLeft: 0,
        draggerOffsetTop: 0,
        overlay: null,
        draggableEl: null,
        initialZIndex: undefined
      }
    }
  }
})
*/

var _data = {
  draggableElementId: null, // if this is present, only a specific area of the draggable will respond to dragging (eg header bar).
  down: false,
  initialX: 0,
  initialY: 0,
  draggerOffsetLeft: 0,
  draggerOffsetTop: 0,
  overlay: null,
  draggableEl: null,
  initialZIndex: undefined
}

export function createOverlay (e, el, _data) {
  const overlay = document.createElement('div')
  overlay.setAttribute('style', `
    width: 100vw; 
    height: 100vh; 
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10000;
    border: 1px solid red;
  `)
  overlay.addEventListener('mouseup', (e) => mouseup(e, el, _data))
  overlay.addEventListener('mousedown', (e) => mousedown(e, el, _data))
  overlay.addEventListener('mousemove', (e) => mousemove(e, el, _data))
  document.body.appendChild(overlay)

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

export function mousedown (e, el, _data) {
  // if the user set a argument to v-drag,
  // it means they only want a specific area to be draggable
  // eg: `v-drag:drag-header` means only the element with
  // id="drag-header" should be draggable.
  // If the user clicked another area, do nothing.
  if (_data.draggableElementId && !checkIfIdInPath(_data.draggableElementId, e.path)) {
    return
  }

  if (_data.overlay) {
    _data.overlay.remove()
  }
  _data.down = true
  _data.initialX = e.clientX
  _data.initialY = e.clientY
  const overlay = createOverlay(e, el, _data)
  _data.overlay = overlay
  adjustElementZIndex(el, 10001)
}

export function mouseup (e, el, _data) {
  _data.down = false
  if (!_data.overlay) {
    return
  }

  _data.overlay.removeEventListener('mouseup', mouseup)
  _data.overlay.removeEventListener('mousedown', mousedown)
  _data.overlay.removeEventListener('mousemove', mousemove)
  _data.overlay.remove()
  adjustElementZIndex(el, _data.initialZIndex)

  setDraggerOffset(el, _data)
}

export function mousemove (e, el, _data) {
  if (_data.down) {
    el.style.left = _data.draggerOffsetLeft + (e.clientX - _data.initialX) + 'px'
    el.style.top = _data.draggerOffsetTop + (e.clientY - _data.initialY) + 'px'
  }
}

export function setDraggerOffset (el, _data) {
  console.log('el.offsetLeft = ', el.offsetLeft)
  _data.draggerOffsetLeft = el.offsetLeft
  _data.draggerOffsetTop = el.offsetTop
}

export default Vue.directive('drag', {
  inserted: function (el, binding, vnode) {
    _data.draggableElementId = binding.arg || null
    el.addEventListener('mouseup', (e) => mouseup(e, el, _data))
    el.addEventListener('mousedown', (e) => mousedown(e, el, _data))
    el.addEventListener('mousemove', (e) => mousemove(e, el, _data))
    setDraggerOffset(el, _data)
    _data.initialZIndex = el.style.zIndex
  }
})
