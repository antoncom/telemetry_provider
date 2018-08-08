<template>
  <div class="port" v-bind:class="position" v-bind:style="portStyle"></div>
</template>

<script type="text/babel">
  import { mapGetters } from 'vuex'
  export default {
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
          top: '0px'
        }
      }
    },
    computed: {
      ...mapGetters('bpm', ['getPortLocalXY'])
    },
    created: function () {
      // Place port accordingly type of figure and type of the port
      let figureId = this.$parent.data.id
      let portType = this.position

      // set port position inside the figure
      let local = this.getPortLocalXY(figureId, portType)
      if (local !== undefined) {
        let shiftX = 0
        let shiftY = 0
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
        this.portStyle.left = local.x + shiftX + 'px'
        this.portStyle.top = local.y + shiftY + 'px'
      }
    }
  }
</script>

<style>

</style>