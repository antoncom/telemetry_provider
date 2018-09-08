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
          position: 'absolute',
          'background-position': '0px 3px'
        },
        figureId: '', // keep parent figure id. It's required when use portal (bubbling ports to diagram component)
        connectionRef: '' // ref of connection which was linked to the port
      }
    },
    watch: {
      connectionMoved: { // redraw connection while a figure is moving with drag-n-drop
        handler: function () {
          if (this.figureId !== '' && this.figureId === this.connectionMoved.source.figureId && this.position === this.connectionMoved.source.portPosition ||
                  this.figureId !== '' && this.figureId === this.connectionMoved.target.figureId && this.position === this.connectionMoved.target.portPosition) {
            this.portStyle['background-position'] = '0px -32px'
          } else {
            this.portStyle['background-position'] = '0px 3px'
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapGetters('bpm', ['getPortLocalXY', 'getPortGlobalXY']),
      ...mapState('bpm', ['connections', 'connectionMoved', 'bubbledPorts', 'directLine'])
/*      updateStyle: function () {
        let result = this.portStyle
        if (this.figureId !== '' && this.figureId === this.connectionMoved.source.figureId && this.position === this.connectionMoved.source.portPosition ||
                this.figureId !== '' && this.figureId === this.connectionMoved.target.figureId && this.position === this.connectionMoved.target.portPosition) {
          result['background-position'] = '0px -32px'
        }
        return result
      } */
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
      this.figureId = this.$parent.data.id
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
        // Place port inside figure accordingly type of figure and type of the port
        figureId = this.$parent.data.id

        // set port position inside the figure
        var local = this.getPortLocalXY(figureId, portType)
        if (local !== undefined) {
          this.portStyle.left = local.x + shiftX + 'px'
          this.portStyle.top = local.y + shiftY + 'px'
        }
        // Register port in Vuex only first time
        if (this.bubbledPorts.ports[this.$vnode.key] === undefined) {
          this.$store.commit({
            type: 'bpm/' + types.REGISTER_PORT_FOR_BUBBLING,
            payload: {
              atRest: true,
              figureId: figureId,
              portType: portType,
              portKey: this.$vnode.key
            }
          })
        }
      } else {
        console.log('BUBBLED PORT PARENT', this)
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