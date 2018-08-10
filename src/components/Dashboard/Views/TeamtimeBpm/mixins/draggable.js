export const draggable = {
  data () {
    return {
      draggableElementId: null, // if this is present, only a specific area of the draggable will respond to dragging (eg header bar).
      down: false,
      initialX: 0,
      initialY: 0,
      draggerOffsetLeft: 0,
      draggerOffsetTop: 0,
      overlay: null,
      draggableEl: null,
      initialZIndex: ''
    }
  },
  methods: {
    mousedown: function (e, el) {
      if (this.overlay) {
        this.overlay.remove()
      }
      this.down = true
      this.initialX = e.clientX
      this.initialY = e.clientY
      const overlay = this.createOverlay(e, el)
      this.overlay = overlay
      this.adjustElementZIndex(el, 10001)
    },
    mouseup: function (e, el) {
      this.down = false
      if (!this.overlay) {
        return
      }
      this.overlay.removeEventListener('mouseup', this.mouseup)
      this.overlay.removeEventListener('mousedown', this.mousedown)
      this.overlay.removeEventListener('mousemove', this.mousemove)
      this.overlay.remove()
      this.adjustElementZIndex(el)

      this.setDraggerOffset(el)
    },
    mousemove: function (e, el) {
      console.log('HERERERERER')
      if (this.down) {
        el.style.left = this.draggerOffsetLeft + (e.clientX - this.initialX) + 'px'
        el.style.top = this.draggerOffsetTop + (e.clientY - this.initialY) + 'px'
      }
    },
    createOverlay: function (e, el) {
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
      overlay.addEventListener('mouseup', (e) => this.mouseup(e, el))
      overlay.addEventListener('mousedown', (e) => this.mousedown(e, el))
      overlay.addEventListener('mousemove', (e) => this.mousemove(e, el))
      document.body.appendChild(overlay)

      return overlay
    },
    adjustElementZIndex: function (el) {
      el.style.zIndex = this.initialZIndex
    },
    setDraggerOffset: function (el) {
      console.log('el.offsetLeft = ', el.offsetLeft)
      this.draggerOffsetLeft = el.offsetLeft
      this.draggerOffsetTop = el.offsetTop
    }
  }
}
