<template>
  <div class="port" v-bind:class="position" v-bind:style="portStyle"></div>
</template>

<script type="text/babel">
  import store from 'src/store/index.js'
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
//      xy: function () {
//        var out = {x: 0, y: 0}
//        if (this.$parent.data.type === 'bpmn.Activity') {
//          if (this.position === 'input') {
//            out.x = -9
//            out.y = (this.$parent.h / 2 - 9)
//          } else if (this.position === 'input1') {
//            out.x = 11
//            out.y = -9
//          } else if (this.position === 'input2') {
//            out.x = 9
//            out.y = (this.$parent.h - 9)
//          } else if (this.position === 'output') {
//            out.x = (this.$parent.w - 9)
//            out.y = (this.$parent.h / 2 - 9)
//          } else if (this.position === 'output1') {
//            out.x = (this.$parent.w - 29)
//            out.y = -9
//          } else if (this.position === 'output2') {
//            out.x = (this.$parent.w - 29)
//            out.y = (this.$parent.h - 9)
//          }
//        } else if (this.$parent.data.type === 'bpmn.Message' ||
//                this.$parent.data.type === 'bpmn.Start' ||
//                this.$parent.data.type === 'bpmn.Timer' ||
//                this.$parent.data.type === 'bpmn.ConditionXOR' ||
//                this.$parent.data.type === 'bpmn.ConditionOR' ||
//                this.$parent.data.type === 'bpmn.ConditionAND') {
//          if (this.position === 'input') {
//            out.x = -9
//            out.y = (this.$parent.h / 2 - 9)
//          } else if (this.position === 'input1') {
//            out.x = (this.$parent.w / 2 - 9)
//            out.y = -9
//          } else if (this.position === 'output') {
//            out.x = (this.$parent.w - 9)
//            out.y = (this.$parent.h / 2 - 9)
//          } else if (this.position === 'output2') {
//            out.x = (this.$parent.w / 2 - 9)
//            out.y = (this.$parent.h - 9)
//          }
//        } else if (this.$parent.data.type === 'bpmn.End') {
//          if (this.position === 'input') {
//            out.x = -9
//            out.y = (this.$parent.h / 2 - 9)
//          } else if (this.position === 'input1') {
//            out.x = (this.$parent.w / 2 - 9)
//            out.y = -9
//          } else if (this.position === 'input2') {
//            out.x = (this.$parent.w / 2 - 9)
//            out.y = (this.$parent.h - 9)
//          }
//        }
//        return out
//      }
    },
    created: function () {
      // Place port accordingly type of figure and type of the port
      let figureId = this.$parent.data.id
      let portType = this.position

      // set port position inside the figure
      let local = store.getters.getPortLocalXY(figureId, portType)
      if (local !== undefined) {
        this.portStyle.left = local.x + 'px'
        this.portStyle.top = local.y + 'px'
      }
    }
  }
</script>

<style>

</style>