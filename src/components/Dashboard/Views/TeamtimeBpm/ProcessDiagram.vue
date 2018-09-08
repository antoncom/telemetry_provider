<template>
  <div id="processdiagram_contentpane">
    <div id="SwimlanePanel-cols-container" v-bind:style="swimlaneStyle">
      <template>
        <ul id="SwimlanePanel-cols">
          <li v-for="column in columns" class="ui-state-default parent_column ui-resizable" v-bind:id="column.id" v-bind:style="{width: column.size + 'px'}">
            <span class="ui-icon ui-icon-arrowthick-2-e-w"></span>
            <div class="title">{{column.title}}</div>
            <div class="ui-resizable-handle ui-resizable-e"></div>
            <div class="vertical_line right_line" v-bind:style="{'left': column.size-1 + 'px', 'top': 10 + 'px', 'height': height + 40 + 'px'}"></div>
            <div class="vertical_line left_line" style="left: -1px; top: 30px;"></div>
          </li>
        </ul>
      </template>
    </div>

    <div id="SwimlanePanel-rows-container">
      <template>
        <ul id="SwimlanePanel-rows" class="ui-sortable" style="">
          <li v-for="row in rows" class="ui-state-default parent_row ui-resizable" v-bind:id="row.id" v-bind:style="{height: row.size + 'px'}">
            <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>
            <div class="title vertical_text" v-bind:style="{height: row.size + 'px'}">
              <div>
                {{row.title}}
              </div>
            </div>
            <div class="ui-resizable-handle ui-resizable-s"></div>
            <div class="horizontal_line bottom_line" v-bind:style="{'top': row.size + 'px', 'left': 30 + 'px', 'width': width + 'px'}"></div>
          </li>
        </ul>
      </template>
    </div>
    <div id="SwimlanePanel-scrollarea" v-bind:style="swimlaneStyle">
      <div v-on:click.prevent="clickBlankSpace" id="SwimlanePanel-paintarea" v-bind:class="{'show-grid': isGridShown}" v-bind:style="swimlaneStyle">
        <!--Портируем сюда порты когда драг-н-дроп порта-->
        <div style="position: absolute; z-index: 20000; border: 1px solid red;">
          <portal-target name="globalports" multiple />
        </div>
        <!--///-->
        <start v-for="activity in figures" v-if="activity.type === 'bpmn.Start'" v-bind:data="activity" :key="activity.id" :ref="activity.id"></start>
        <activity v-for="activity in figures" v-if="activity.type === 'bpmn.Activity'" :acState="activityStatus(activity)" v-bind:data="activity" :key="activity.id" :ref="activity.id"></activity>
        <end v-for="activity in figures" v-if="activity.type === 'bpmn.End'" v-bind:data="activity" :key="activity.id" :ref="activity.id"></end>
        <condition-xor v-for="activity in figures" v-if="activity.type === 'bpmn.ConditionXOR'" v-bind:data="activity" :key="activity.id" :ref="activity.id"></condition-xor>
        <condition-or v-for="activity in figures" v-if="activity.type === 'bpmn.ConditionOR'" v-bind:data="activity" :key="activity.id" :ref="activity.id"></condition-or>
        <condition-and v-for="activity in figures" v-if="activity.type === 'bpmn.ConditionAND'" v-bind:data="activity" :key="activity.id" :ref="activity.id"></condition-and>
        <message v-for="activity in figures" v-if="activity.type === 'bpmn.Message'" v-bind:data="activity" :key="activity.id" :ref="activity.id"></message>
        <timer v-for="activity in figures" v-if="activity.type === 'bpmn.Timer'" v-bind:data="activity" :key="activity.id" :ref="activity.id"></timer>
        <connection
                v-for="connection in connections"
                v-bind:data="connection"
                v-bind:key="connection.source.figureId + '_' + connection.target.figureId"
                :ref="connection.source.figureId + '_' + connection.target.figureId">
        </connection>
      </div>
    </div>
    <blocks-menu></blocks-menu>
  </div>
</template>

<script type="text/babel">
  import * as types from 'src/store/mutation-types.js'
  import store from 'src/store/index.js'

  // Diagram layout components
  import BlocksMenu from './BlocksMenu.vue'
  import Start from './layout/Start.vue'
  import Activity from './layout/Activity.vue'
  import End from './layout/End.vue'
  import ConditionXor from './layout/ConditionXor.vue'
  import ConditionOr from './layout/ConditionOr.vue'
  import ConditionAnd from './layout/ConditionAnd.vue'
  import Message from './layout/Message.vue'
  import Timer from './layout/Timer.vue'
  import Connection from './layout/Connection.vue'
  import { mapState } from 'vuex'
  import { Portal, PortalTarget } from 'portal-vue'
  // import { whormHoleMixin } from 'src/components/Dashboard/Views/TeamtimeBpm/mixins/wharmhole.js'

  export default {
//    mixins: [whormHoleMixin],
    data () {
      return {
        name: '', // id prefix for panel
        changedFigures: null, // array of changed figures
        workflow: null, // drawing area
        minRowHeight: 120,
        minColumnWidth: 120
      }
    },
    store: store,
    components: {
      BlocksMenu,
      Activity,
      Start,
      End,
      ConditionXor,
      ConditionOr,
      ConditionAnd,
      Message,
      Timer,
      Connection,
      PortalTarget,
      Portal
    },
    mounted () {
      this.$nextTick(function () {
        this.$store.dispatch('bpm/loadWorkflow', 327).then(() => {
          this.$store.dispatch('bpm/loadStatus')
        })
      })
    },
    watch: {
      figureMoved: { // redraw connection while a figure is moving with drag-n-drop
        handler: function (figMoved) {
          if (figMoved.id !== '' && figMoved.x && figMoved.y) {
            for (var conn in this.$refs) {
              if (conn.indexOf(figMoved.id) >= 0 && this.$refs[conn][0].drawConnection) {
                this.$refs[conn][0].drawConnection()
              }
            }
          }
        },
        deep: true
      }
    },
    computed: {
      ...mapState('bpm', ['columns', 'rows', 'figures', 'connections', 'figureStatus', 'isGridShown', 'figureMoved', 'snapGridSize', 'connectionMoved']),
      width: function () {
        var w = 0
        for (let col of this.columns) {
          w += col.size
        }
        return w
      },
      height: function () {
        var h = 0
        for (let row of this.rows) {
          h += row.size
        }
        return h
      },
      swimlaneStyle: function () {
        let result = {
          width: this.width + 'px',
          height: this.height + 'px'
        }
        return result
      }
    },
    created () {
    },
    methods: {
      clickBlankSpace: function () {
        this.$store.commit({
          type: 'bpm/' + types.SELECT_CONNECTION,
          payload: {
            source: {
              figureId: '',
              portPosition: ''
            },
            target: {
              figureId: '',
              portPosition: ''
            },
            connRef: ''
          }
        })
      },
//      sendToPortalTarget () {
//        console.log('sendToPortalTarget', this.$refs)
//        var ports = []
//        for (var ref in this.$refs) {
//          if (this.$refs[ref][0].portTypes !== undefined) {
//            var children = this.$refs[ref][0].$children
//            for (var i = 0; i < children.length; i++) {
//              var child = children[i]
//              if (child.portStyle !== undefined) {
//                ports.push(child.$vnode)
//              }
//            }
//          }
//        }
//        console.log('PORTS', ports)
//        var pass = [this.$createElement('p', 'aaaaaaaaaaa')]
//        Wormhole.open({
//          to: 'globalports55',
//          from: 'localports55',
//          pass
//        })
//      },
//      clearPortalTarget () {
//        console.log('CLOSE HOLE')
//        Wormhole.close({
//          to: 'globalports'
//        }, true)
//      },
      activityStatus: function (act) {
        var out = {}
        this.figureStatus.forEach(function (status) {
          if (status.id === act.id) {
            out = {
              state: 'bpmn_activity_' + status.params.state,
              part: status.params.part
            }
          }
        })
        return out
      },
      updateConnection: (id) => {
        this.$refs[id].drawConnection()
      }
    /* mousemove: function (e) {
        if (this.figureMoved.id !== '') {
          var figure = this.$refs[this.figureMoved.id][0]
          if (figure.down) {
            var newX = e.clientX - figure.draggerOffsetLeft
            var newY = e.clientY - figure.draggerOffsetTop
            if (this.isGridShown) {
              figure.x = Math.round(newX / this.snapGridSize) * this.snapGridSize
              figure.y = Math.round(newY / this.snapGridSize) * this.snapGridSize
            } else {
              figure.x = newX
              figure.y = newY
            }
            this.$store.commit({
              type: 'bpm/' + types.CHANGE_FIGURE_XY,
              payload: {
                figureId: this.figureMoved.id,
                x: figure.x,
                y: figure.y
              }
            })
          }
        } else if (this.portMouseDown !== '') {
          // move line nib together with mouse pointer
          // --------------------------------------------
          // get global x/y of mouse pointer
          var lineNib = {}
          if (this.isGridShown) {
            lineNib.x = Math.round(e.clientX / this.snapGridSize) * this.snapGridSize
            lineNib.y = Math.round(e.clientY / this.snapGridSize) * this.snapGridSize
          } else {
            lineNib.x = e.clientX
            lineNib.y = e.clientY
          }
          // get connection ref
          // drawConnection() diring mousemove
        }
      },
      mouseup: function (e) {
        if (this.figureMoved.id !== '') {
          var figure = this.$refs[this.figureMoved.id][0]
          figure.down = false
          figure.style.zIndex = figure.initialZIndex
          figure.style.opacity = 1
        } else if (this.connectionMoved !== '') {
          this.$refs[this.connectionMoved][0].drawConnection()
          this.$store.commit({
            type: 'bpm/' + types.CHANGE_CONNECTION,
            payload: {
              connRef: ''
            }
          })
        }
      } */
    }
  }
</script>

<style>

</style>