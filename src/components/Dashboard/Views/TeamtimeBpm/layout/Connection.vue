<template>
  <div v-bind:id="makeId()">
    <connection-line v-for="(line, index) in lines" v-bind:properties="line" :key="makeId() + index"></connection-line>
    <arrow :position="arrow.position" :orientation="arrow.orientation"></arrow>
  </div>
</template>

<script type="text/babel">
  import ConnectionLine from './ConnectionLine.vue'
//  import store from 'src/store/index.js'
  import { mapState, mapGetters } from 'vuex'
  import Arrow from './Arrow.vue'
  export default {
    components: {
      ConnectionLine,
      Arrow
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
      console.log('LINE created')
    },
    mounted: function () {
      // populate lines array
      var UP = 0
      var RIGHT = 1
      var DOWN = 2
      var LEFT = 3

      let sourceFigureId = this.data.source.figureId
      let targetFigureId = this.data.target.figureId
      let sourcePortType = this.data.source.name
      let targetPortType = this.data.target.name
//      let fromPt = store.getters.getPortGlobalXY(sourceFigureId, sourcePortType)
//      let toPt = store.getters.getPortGlobalXY(targetFigureId, targetPortType)
      let fromPt = this.getPortGlobalXY(sourceFigureId, sourcePortType)
      let toPt = this.getPortGlobalXY(targetFigureId, targetPortType)

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
    computed: {
      ...mapState('bpm', ['isPortsEnabled']),
      ...mapGetters('bpm', ['getPortGlobalXY']),
      lines: function () {
        // generate lines
        var w = 2
        var h = 2
        var x = 0
        var y = 0
        var result = []
        var vector = {length: 0, dir: 0}
        var loops = this.points.length - 1
        for (let i = 0; i < loops; i++) {
          if (this.points[i].x === this.points[i + 1].x) {
            vector = this.getVector(this.points[i].y, this.points[i + 1].y)
            h = vector.length
            w = 2
            x = this.points[i].x
            y = this.points[i + vector.dir].y
          } else {
            vector = this.getVector(this.points[i].x, this.points[i + 1].x)
            w = vector.length
            h = 2
            x = this.points[i + vector.dir].x
            y = this.points[i].y
          }
          result.push({
            left: x + 'px',
            top: y + 'px',
            width: w + 'px',
            height: h + 'px',
            clip: 'rect(0, ' + w + 'px, ' + h + 'px, 0)'}
          )
        }
        return result
      },
      arrow: function () {
        let targetFigureId = this.data.target.figureId
        let targetPortType = this.data.target.name
//        let toPt = store.getters.getPortGlobalXY(targetFigureId, targetPortType)
        let toPt = this.getPortGlobalXY(targetFigureId, targetPortType)
        let shiftLeft = 0
        let shiftTop = 0
//        let isPortsEnabled = store.state.isPortsEnabled
        let isPortsEnabled = this.isPortsEnabled

        if (targetPortType === 'input') {
          [shiftLeft, shiftTop] = [-9, -4]
          if (isPortsEnabled) shiftLeft -= 3
        }
        if (targetPortType === 'input1') {
          [shiftLeft, shiftTop] = [-4, -9]
          if (isPortsEnabled) shiftTop -= 3
        }
        if (targetPortType === 'input2') {
          [shiftLeft, shiftTop] = [9, -4]
          if (isPortsEnabled) shiftTop = 3
        }
        var result = {
          position: {
            left: toPt.x + shiftLeft + 'px',
            top: toPt.y + shiftTop + 'px'
          },
          orientation: targetPortType
        }
        return result
      }
    },
    methods: {
      makeId: function () {
        return this.data.source.figureId + '_' + this.data.target.figureId
      },
      addPoint: function (point) {
        this.points.push(point)
      },
      getVector: function (a, b) {
        var result = {length: 0, dir: 0}
        if (a > b) {
          result = {
            length: a - b + 2,
            dir: 1
          }
        } else if (b > a) {
          result = {
            length: b - a,
            dir: 0
          }
        } else if (a === b) {
          result = {
            length: 2,
            dir: 1
          }
        }
        return result
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
          this.addPoint(toPt)
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