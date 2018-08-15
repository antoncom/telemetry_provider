import * as types from 'src/store/mutation-types.js'
import { mapState } from 'vuex'

export const dragndropFigure = {
  data () {
    return {
      down: false,
      initialX: 0,
      initialY: 0,
      initialZIndex: ''
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
    ...mapState('bpm', ['isPortsEnabled'])
  },
  created: function () {
    // position & size of activity
    this.x = this.data.x
    this.y = this.data.y
    this.w = this.data.width
    this.h = this.data.height
    this.style.left = this.data.x + 'px'
    this.style.top = this.data.y + 'px'
    this.style.height = this.data.height + 'px'
    this.style.width = this.data.width + 'px'
  },
  methods: {
    mousedown: function (e, el) {
      this.down = true
      this.initialX = this.x
      this.initialY = this.y
      this.draggerOffsetLeft = e.clientX - this.x
      this.draggerOffsetTop = e.clientY - this.y
      this.style.zIndex = 10001
      this.style.opacity = 0.7

      this.$store.commit({
        type: 'bpm/' + types.CHANGE_FIGURE_XY,
        payload: {
          figureId: this.data.id,
          x: this.x,
          y: this.y
        }
      })
    }
  }
}
