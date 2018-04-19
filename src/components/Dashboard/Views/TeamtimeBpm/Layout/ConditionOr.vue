<template>
<div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
  <div class="bpmn_condition_or">
    <div class="bpmn_icon"></div>
    <div class="bpmn_event_content">{{data.text}}</div>
  </div>
</div>
</template>

<script type="text/babel">
export default {
  props: {
    data: Object // data for the start block
  },
  data () {
    return {
      style: {
        height: '40px',
        width: '40px',
        left: '0px',
        top: '0px'
      },
      showStatus: {
        display: 'none'
      }
    }
  },
  created: function () {
    // position of the block
    this.style.left = this.data.x + 'px'
    this.style.top = this.data.y + 'px'
  }
}
</script>

<style>

</style>