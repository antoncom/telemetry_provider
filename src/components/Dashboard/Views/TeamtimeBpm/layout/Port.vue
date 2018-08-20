<template>
  <div v-drag-port class="port" v-bind:class="position" v-bind:style="portStyle"></div>
</template>

<script type="text/babel">
  import { mapGetters, mapState } from 'vuex'
  import * as types from 'src/store/mutation-types.js'
  import { dragPortDirective, dragPortMixin } from '../mixins/dragndropPort.js'

  export default {
    mixins: [dragPortMixin],
    directives: {
      dragPortDirective
    },
    props: {
      type: {
        type: String,
        default: 'input' // 'input' or 'output'
      },
      position: {
        type: String,
        default: 'input1' // 'input', 'input1', 'input2'
      }
    },
    data () {
      return {
        portStyle: {
          left: '0px',
          top: '0px',
          zIndex: undefined,
          position: 'absolute'
        },
        figureId: '' // keep parent figure id. It's required when use portal (bubbling ports to diagram component)
      }
    },
    computed: {
      ...mapGetters('bpm', ['getPortLocalXY', 'getPortGlobalXY']),
      ...mapState('bpm', ['connections', 'bubbledPorts'])
    },
    methods: {
      /* mousedown: function () {
        this.down = true
        // make connection hidden if exists
        var figureId = this.$parent.$options.propsData.data.id
        var connRef = ''
        for (var i = 0; i < this.connections.length; i++) {
          if (this.position === this.connections[i].source.name) {
            if (this.connections[i].source.figureId.indexOf(figureId) >= 0) {
              connRef = this.connections[i].source.figureId + '_' + this.connections[i].target.figureId
              break
            }
          } else if (this.position === this.connections[i].target.name) {
            if (this.connections[i].target.figureId.indexOf(figureId) >= 0) {
              connRef = this.connections[i].source.figureId + '_' + this.connections[i].target.figureId
              break
            }
          }
        }
        this.$parent.$parent.$refs[connRef][0].points = [] // remove connection
        this.$store.commit({
          type: 'bpm/' + types.CHANGE_CONNECTION,
          payload: {
            connRef: connRef
          }
        })
      } */
    },
    created: function () {
      var shiftX = 0
      var shiftY = 0
      var figureId = ''
      var portType = this.position

      if (portType === 'input') {
        shiftX = -9
        shiftY = -9
      }
      if (portType === 'input1') {
        shiftX = -9
        shiftY = -9
      }
      if (portType === 'input2') {
        shiftX = -9
        shiftY = -9
      }
      if (portType === 'output') {
        shiftX = -9
        shiftY = -9
      }
      if (portType === 'output1') {
        shiftX = -9
        shiftY = -9
      }
      if (portType === 'output2') {
        shiftX = -9
        shiftY = -9
      }

      if (this.bubbledPorts.atRest) {
        // console.log('PORT AT FIGURE KEY', this.$vnode)
        // console.log('REF FIGURE', this)
        // Place port inside figure accordingly type of figure and type of the port
        // let figureId = this.$parent.data.id
        figureId = this.$parent.data.id

        if (this.$vnode.key !== '') {
          this.$store.commit({
            type: 'bpm/' + types.BUBBLED_PORT,
            payload: {
              atRest: true,
              figureId: figureId,
              portType: portType,
              portKey: this.$vnode.key
            }
          })
        }

        // set port position inside the figure
        var local = this.getPortLocalXY(figureId, portType)
        if (local !== undefined) {
          this.portStyle.left = local.x + shiftX + 'px'
          this.portStyle.top = local.y + shiftY + 'px'
        }
      } else {
        figureId = this.bubbledPorts.ports[this.$vnode.key].figureId
        portType = this.bubbledPorts.ports[this.$vnode.key].portType
        var global = this.getPortGlobalXY(figureId, portType)
        if (global !== undefined) {
          this.portStyle.left = global.x + shiftX + 'px'
          this.portStyle.top = global.y + shiftY + 'px'
        }
      }
    }
  }
</script>

<style>

</style>