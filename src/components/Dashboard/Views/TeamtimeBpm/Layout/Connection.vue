<template>
  <div v-bind:id="connectionId">OOO</div>
</template>

<script type="text/babel">
  // import Drawlib from '../../../../../../static/TeamtimeBpm/assets/js/wz_jsgraphics.js'
  export default {
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        lines: []
      }
    },
    created: function () {
      // populate lines array
    },
    mounted: function () {
      // var jg = new Drawlib(this.$el)
      this.getSourceXY()
    },
    computed: {
      connectionId: function () {
        return this.makeId()
      },
      source_x: function () {
        return 0
      },
      source_y: function () {
        return 0
      },
      target_x: function () {
        return 0
      },
      target_y: function () {
        return 0
      },
      computed: {
        ports: function () {
          // get ports of source and destination figures
        }
      }
    },
    methods: {
      makeId: function () {
        return this.data.source.figureId + '_' + this.data.target.figureId
      },
      paint: function () {
        // draw connection
      },
      getSourceXY: function () {
        var xy = {x: 0, y: 0}
        var sourceId = this.data.source.figureId
        var sourcePort = this.data.source.name
        var diagram = this.$parent
        xy.x = diagram.ports.get(sourceId).get(sourcePort).x
        xy.y = diagram.ports.get(sourceId).get(sourcePort).y
        console.log('XY', xy)
        return xy
      }
    }
  }
</script>

<style>

</style>