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
      <div id="SwimlanePanel-paintarea" v-bind:class="isGridShown" v-bind:style="swimlaneStyle">
        <start v-for="activity in figures" v-if="activity.type === 'bpmn.Start'" v-bind:data="activity" :key="activity.id"></start>
        <activity v-for="activity in figures" v-if="activity.type === 'bpmn.Activity'" :acState="activityStatus(activity)" v-bind:data="activity" :key="activity.id"></activity>
        <end v-for="activity in figures" v-if="activity.type === 'bpmn.End'" v-bind:data="activity" :key="activity.id"></end>
        <condition-xor v-for="activity in figures" v-if="activity.type === 'bpmn.ConditionXOR'" v-bind:data="activity" :key="activity.id"></condition-xor>
        <condition-or v-for="activity in figures" v-if="activity.type === 'bpmn.ConditionOR'" v-bind:data="activity" :key="activity.id"></condition-or>
        <condition-and v-for="activity in figures" v-if="activity.type === 'bpmn.ConditionAND'" v-bind:data="activity" :key="activity.id"></condition-and>
        <message v-for="activity in figures" v-if="activity.type === 'bpmn.Message'" v-bind:data="activity" :key="activity.id"></message>
        <timer v-for="activity in figures" v-if="activity.type === 'bpmn.Timer'" v-bind:data="activity" :key="activity.id"></timer>
        <connection v-for="connection in connections" v-bind:data="connection" v-bind:key="connection.source.figureId + '_' + connection.target.figureId"></connection>
      </div>
    </div>
    <blocks-menu></blocks-menu>
  </div>
</template>

<script type="text/babel">
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

  export default {
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
      Connection
    },
    mounted () {
      console.log('ProcessDiagram MOUNTED')
      this.$nextTick(function () {
        store.dispatch('bpm/loadWorkflow', 327).then(() => {
          store.dispatch('bpm/loadStatus')
        })
      })
    },
    computed: {
      ...mapState('bpm', ['columns', 'rows', 'figures', 'connections', 'figureStatus']),
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
      },
      isGridShown: function () {
        var gridClass = ''
        console.log('IS GRID SHOWN')
        if (store.state.isGridShown === true) {
          gridClass = 'hide-grid'
        } else {
          gridClass = 'show-grid'
        }
        return gridClass
      }
    },
    created () {
      console.log('ProcessDiagram CREATED')
    },
    methods: {
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
      }
    }
  }
</script>

<style>

</style>