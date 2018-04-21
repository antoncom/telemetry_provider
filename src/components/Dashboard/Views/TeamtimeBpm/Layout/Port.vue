<template>
  <div class="port" v-bind:class="position" v-bind:style="portStyle"></div>
</template>

<script type="text/babel">
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
    created: function () {
      // Place port accordingly type of figure and type of the port
      if (this.$parent.data.type === 'bpmn.Activity') {
        if (this.position === 'input') {
          this.portStyle.left = '-9px'
          this.portStyle.top = (this.$parent.h / 2 - 9) + 'px'
        } else if (this.position === 'input1') {
          this.portStyle.left = '11px'
          this.portStyle.top = '-9px'
        } else if (this.position === 'input2') {
          this.portStyle.left = '9px'
          this.portStyle.top = (this.$parent.h - 9) + 'px'
        } else if (this.position === 'output') {
          this.portStyle.left = (this.$parent.w - 9) + 'px'
          this.portStyle.top = (this.$parent.h / 2 - 9) + 'px'
        } else if (this.position === 'output1') {
          this.portStyle.left = (this.$parent.w - 29) + 'px'
          this.portStyle.top = '-9px'
        } else if (this.position === 'output2') {
          this.portStyle.left = (this.$parent.w - 29) + 'px'
          this.portStyle.top = (this.$parent.h - 9) + 'px'
        }
      } else if (this.$parent.data.type === 'bpmn.Message' ||
              this.$parent.data.type === 'bpmn.Start' ||
              this.$parent.data.type === 'bpmn.Timer' ||
              this.$parent.data.type === 'bpmn.ConditionXOR' ||
              this.$parent.data.type === 'bpmn.ConditionOR' ||
              this.$parent.data.type === 'bpmn.ConditionAND') {
        if (this.position === 'input') {
          this.portStyle.left = '-9px'
          this.portStyle.top = (this.$parent.h / 2 - 9) + 'px'
        } else if (this.position === 'input1') {
          this.portStyle.left = (this.$parent.w / 2 - 9) + 'px'
          this.portStyle.top = '-9px'
        } else if (this.position === 'output') {
          this.portStyle.left = (this.$parent.w - 9) + 'px'
          this.portStyle.top = (this.$parent.h / 2 - 9) + 'px'
        } else if (this.position === 'output2') {
          this.portStyle.left = (this.$parent.w / 2 - 9) + 'px'
          this.portStyle.top = (this.$parent.h - 9) + 'px'
        }
      } else if (this.$parent.data.type === 'bpmn.End') {
        if (this.position === 'input') {
          this.portStyle.left = '-9px'
          this.portStyle.top = (this.$parent.h / 2 - 9) + 'px'
        } else if (this.position === 'input1') {
          this.portStyle.left = (this.$parent.w / 2 - 9) + 'px'
          this.portStyle.top = '-9px'
        } else if (this.position === 'input2') {
          this.portStyle.left = (this.$parent.w / 2 - 9) + 'px'
          this.portStyle.top = (this.$parent.h - 9) + 'px'
        }
      }
    }
  }
</script>

<style>

</style>