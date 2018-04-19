<template>
<div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
  <div class="bpmn_start">
    <div class="bpmn_start_content">Start</div>
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