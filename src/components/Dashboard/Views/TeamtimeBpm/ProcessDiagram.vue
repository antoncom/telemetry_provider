<template>
  <div id="processdiagram_contentpane">
    <div id="SwimlanePanel-cols-container">
      <template>
        <ul id="SwimlanePanel-cols">
          <li v-for="column in columns" class="ui-state-default parent_column ui-resizable" v-bind:id="column.id" v-bind:style="{width: column.size + 'px'}">
            <span class="ui-icon ui-icon-arrowthick-2-e-w"></span>
            <div class="title">{{column.title}}</div>
            <div class="ui-resizable-handle ui-resizable-e"></div>
            <div class="vertical_line right_line" v-bind:style="{'left': column.size-1 + 'px', 'top': 10 + 'px'}"></div>
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
            <div class="horizontal_line bottom_line" v-bind:style="{'top': row.size + 'px', 'left': 30 + 'px'}"></div>
          </li>
        </ul>
      </template>
    </div>
    <div id="SwimlanePanel-scrollarea">
      <div id="SwimlanePanel-paintarea">
        <activity v-for="activity in figures" :key="activity.id" :id="activity.id" :name="activity.name" :x="activity.x" :y="activity.y"></activity>
      </div>
    </div>
    <blocks-menu></blocks-menu>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import BlocksMenu from './BlocksMenu.vue'
  import TeamTime from '../../../../../static/mock/joomla_media/com_teamtime/assets/js/default.js'
  import credentials from 'src/components/Dashboard/Views/TeamtimeBpm/credentials/credentials.js'
  import draw2d from '../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/_init_.js'
  import $ from 'jquery'
  import Activity from './layout/Activity.vue'
  // import ContextMenuSwPanel from './Layout/ContextMenuSwPanel.vue'
  // require('https://github.com/swisnl/jQuery-contextMenu/blob/master/dist/jquery.contextMenu.min.css')

  Vue.use(VueAxios, axios)

  // require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/_init_.js')
  // import draw2d from '../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/_init_.js'
  // equire('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/_init_.js')

  // require('../../../../../static/mock/joomla_media/com_teamtime/assets/js/default.js')

  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Canvas.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Command.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandAdd.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandConnect.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandDelete.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandMove.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandMoveLine.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandMovePort.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandReconnect.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandResize.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandSetBackgroundColor.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Color.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandSetColor.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandSetText.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandStack.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CommandStackEventListener.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/CommandListener.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ConnectionAnchor.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ChopboxConnectionAnchor.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ConnectionDecorator.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Border.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ArrayList.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/LineBorder.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/UUID.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/SelectionChangeListener.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Button.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/ButtonShowBlocksMenu.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/events.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/dragdrop.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ArrowConnectionDecorator.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/ArrowConnectionDecorator.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ConnectionRouter.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/BezierConnectionRouter.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ManhattanConnectionRouter.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/NullConnectionRouter.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/FanConnectionRouter.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/AbstractPalettePart.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Point.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Figure.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Annotation.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Label.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Menu.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Node.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/CompartmentFigure.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/Activity.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ImageFigure.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/SVGFigure.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/VectorFigure.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Oval.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Circle.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/Figure.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/ConditionAND.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/ConditionOR.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/ConditionXOR.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/End.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/Exception.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/Message.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/Start.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/Timer.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Rectangle.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Port.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/InputPort.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/InputPort.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/OutputPort.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/OutputPort.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ResizeHandle.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/LineEndResizeHandle.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/LineStartResizeHandle.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/WindowFigure.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Dialog.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/AnnotationDialog.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ColorDialog.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/BackgroundColorDialog.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/LineColorDialog.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/InputDialog.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/PropertyDialog.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/PropertyWindow.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ToolPalette.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/FlowMenu.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Line.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Connection.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/Connection.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Locator.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ConnectionLocator.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/BezierMidpointLocator.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/ManhattanMidpointLocator.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/Dimension.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/SnapToHelper.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/SnapToGeometry.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/SnapToGrid.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/swimlane/SwimlanePanelBlocksMenu.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/swimlane/SwimlanePanelToolbar.js')
  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/swimlane/SwimlanePanel_lang_ru-RU.js')

  require('../../../../../static/mock/joomla_media/com_teamtimebpm/assets/js/draw2d/bpmn/JsonSerializer.js')

  require('../../../../../static/mock/joomla_media/Workflow.js')
  require('../../../../../static/mock/joomla_media/SwimlanePanel.js')
  require('../../../../../static/mock/joomla_media/GraphicalViewer.js')
  // require('../../../../../static/mock/joomla_media/app.js')

  export default {
    data () {
      return {
        credentials: credentials,
        draw2d: draw2d,
        name: '', // id prefix for panel
        changedFigures: null, // array of changed figures
        workflow: null, // drawing area
        rows: null, // partisipants
        columns: null, // milestones
        figures: null,
        minRowHeight: 120,
        minColumnWidth: 120
      }
    },
    components: {
      BlocksMenu,
      Activity
    },
    mounted () {
      console.log('ProcessDiagram MOUNTED')
      this.$nextTick(function () {
        console.log('ProcessDiagram nextTick')
        TeamTime.baseUrl = 'http://teamlog.teamtime.info/administrator/'
        TeamTime.option = 'com_teamtimebpm'
        TeamTime.controller = 'process'

        this.loadWorkflow(325)
      })
    },
    watch: {
      columns: function () {
        console.log('Columns', this.updatedColumns)
      },
      rows: function () {
        console.log('Rows', this.updatedRows)
      }
    },
    computed: {
      // геттер вычисляемого значения
      updatedColumns: function () {
        return this.columns
      },
      updatedRows: function () {
        return this.rows
      }
    },
    created () {
      console.log('ProcessDiagram CREATED')
    },
    methods: {
      getHeaderTitle: function (obj, parentType) {
        var result = ''
        if (parentType === 'row') {
          result = $(obj).children('span.rowTitle').text()
        } else {
          result = $(obj).text()
        }
        return result
      },
      loadWorkflow: function (id) {
        console.log(this.credentials.username)
        let api = 'http://teamlog.teamtime.info/administrator/index.php?option=com_teamtimebpm&controller=process&task=loadDiagram&id=' + id + '&username=' + this.credentials.username + '&passwd=' + this.credentials.passwd

        this.axios.get(api).then((response) => {
          console.log('Data', response.data)
          this.columns = response.data.columns
          this.rows = response.data.rows
          this.figures = response.data.figures
          console.log('Rows', this.rows)
        })
      }
    }
  }
</script>

<style>

</style>