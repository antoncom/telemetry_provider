<template>
  <div v-bind:id="makeId()">{{data.source.name}}
    <!--<line v-for="line in lines" properties="line.props" v-bind:key="line.id">OO</line>-->
    <!--<arrow data="arrowData"></arrow>-->
  </div>
</template>

<script type="text/babel">
  import Line from './Line.vue'
  import store from 'src/store/index.js'
  // import Arrow from './Arrow.vue'
  export default {
    components: {
      Line
    },
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        points: [] // Array of points of Manhatten rout
      }
    },
    created: function () {
      // populate lines array
      // console.log('GLOB XY', store.getters.getPortXY('diagram', this.data.source.figureId, 'input'))
      // let global = store.getters.getPortXY('diagram', this.data.source.figureId, 'input')
      var UP = 0
      var RIGHT = 1
      var DOWN = 2
      var LEFT = 3

      let sourceFigureId = this.data.source.figureId
      let targetFigureId = this.data.target.figureId
      let sourcePortType = this.data.source.name
      let targetPortType = this.data.target.name
      let fromPt = store.getters.getPortGlobalXY(sourceFigureId, sourcePortType)
      let toPt = store.getters.getPortGlobalXY(targetFigureId, targetPortType)

      var fromDir = 0
      var toDir = 0
      // fromPt is an x,y to start from.
      // fromDir is an angle that the first link must
      if (sourcePortType === 'output') fromDir = RIGHT
      if (sourcePortType === 'output1') fromDir = UP
      if (sourcePortType === 'output2') fromDir = DOWN
      if (targetPortType === 'input') toDir = LEFT
      if (targetPortType === 'input1') toDir = UP
      if (targetPortType === 'input2') toDir = DOWN

      this.makePoints(fromPt, fromDir, toPt, toDir)
      console.log('POINTS', this.points)
    },
    mounted: function () {
    },
    computed: {
      lines: function () {
        // generate lines

      }
    },
    methods: {
      makeId: function () {
        return this.data.source.figureId + '_' + this.data.target.figureId
      },
      addPoint: function (x, y) {
        this.points.push({x: x, y: y})
      },
      makePoints: function (fromPt, fromDir, toPt, toDir) {
        var TOL = 0.1
        var TOLxTOL = 0.01
        var UP = 0
        var RIGHT = 1
        var DOWN = 2
        var LEFT = 3
        var MINDIST = 20

        var xDiff = fromPt.x - toPt.x
        var yDiff = fromPt.y - toPt.y
        var point = {x: 0, y: 0}
        var dir = 0
        if (((xDiff * xDiff) < (TOLxTOL)) && ((yDiff * yDiff) < (TOLxTOL))) {
          this.addPoint(toPt.x, toPt.y)
          return
        }
        if (fromDir === LEFT) {
          if ((xDiff > 0) && ((yDiff * yDiff) < TOL) && (toDir === RIGHT)) {
            point = toPt
            dir = toDir
          } else {
            if (xDiff < 0) {
              point = {x: fromPt.x - MINDIST, y: fromPt.y}
            } else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP))) {
              point = {x: toPt.x, y: fromPt.y}
            } else if (fromDir === toDir) {
              var pos = Math.min(fromPt.x, toPt.x) - MINDIST
              point = {x: pos, y: fromPt.y}
            } else {
              point = {x: fromPt.x - (xDiff / 2), y: fromPt.y}
            }
            if (yDiff > 0) {
              dir = UP
            } else {
              dir = DOWN
            }
          }
        } else if (fromDir === RIGHT) {
          if ((xDiff < 0) && ((yDiff * yDiff) < TOL) && (toDir === LEFT)) {
            point = toPt
            dir = toDir
          } else {
            if (xDiff > 0) {
              point = {x: fromPt.x + MINDIST, y: fromPt.y}
            } else if (((yDiff > 0) && (toDir === DOWN)) || ((yDiff < 0) && (toDir === UP))) {
              point = {x: toPt.x, y: fromPt.y}
            } else if (fromDir === toDir) {
              pos = Math.max(fromPt.x, toPt.x) + MINDIST
              point = {x: pos, y: fromPt.y}
            } else {
              point = {x: fromPt.x - (xDiff / 2), y: fromPt.y}
            }
            if (yDiff > 0) {
              dir = UP
            } else {
              dir = DOWN
            }
          }
        } else if (fromDir === DOWN) {
          if (((xDiff * xDiff) < TOL) && (yDiff < 0) && (toDir === UP)) {
            point = toPt
            dir = toDir
          } else {
            if (yDiff > 0) {
              point = {x: fromPt.x, y: fromPt.y + MINDIST}
            } else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
              point = {x: fromPt.x, y: toPt.y}
            } else if (fromDir === toDir) {
              pos = Math.max(fromPt.y, toPt.y) + MINDIST
              point = {x: fromPt.x, y: pos}
            } else {
              point = {x: fromPt.x, y: fromPt.y - (yDiff / 2)}
            }
            if (xDiff > 0) {
              dir = LEFT
            } else {
              dir = RIGHT
            }
          }
        } else if (fromDir === UP) {
          if (((xDiff * xDiff) < TOL) && (yDiff > 0) && (toDir === DOWN)) {
            point = toPt
            dir = toDir
          } else {
            if (yDiff < 0) {
              point = {x: fromPt.x, y: fromPt.y - MINDIST}
            } else if (((xDiff > 0) && (toDir === RIGHT)) || ((xDiff < 0) && (toDir === LEFT))) {
              point = {x: fromPt.x, y: toPt.y}
            } else if (fromDir === toDir) {
              pos = Math.min(fromPt.y, toPt.y) - MINDIST
              point = {x: fromPt.x, y: pos}
            } else {
              point = {x: fromPt.x, y: fromPt.y - (yDiff / 2)}
            }
            if (xDiff > 0) {
              dir = LEFT
            } else {
              dir = RIGHT
            }
          }
        }
        this.makePoints(point, dir, toPt, toDir)
        this.addPoint(fromPt)
      }
    }
  }
</script>

<style>

</style>