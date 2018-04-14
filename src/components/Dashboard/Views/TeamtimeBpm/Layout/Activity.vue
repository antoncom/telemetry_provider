<template>
  <div :id="id" tabindex="0" class="with-context-menu" :style="style">
    <div class="bpmn_activity simple_activity">
      <div class="bpmn_linked_process_icon" src="linked_process_icon.gif"></div>
      <div class="bpmn_content_hidden">
        <div class="bpmn_activity_container">
          <span class="bpmn_activity_content">{{name}}</span>
          <span class="bpmn_activity_iefix">&nbsp;</span>
        </div>
      </div>
      <div class="bpmn_collapse_icon"></div>
      <div class="bpmn_activity_backlight" style="display:none;"></div>
      <div class="bpmn_activity_aditional_info" style="display:none;"></div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      id: '',
      type: 'bpmn.Activity',
      viewState: 'simple',
      name: '',
      x: '',
      y: ''
    },
    data () {
      return {
        style: {
          position: 'absolute',
          left: '0px',
          top: '0px',
          height: '60px',
          width: '140px',
          margin: 0,
          padding: 0,
          outline: 'none',
          'z-index': 100,
          cursor: 'move',
          border: '0px solid rgb(128, 128, 255)'
        }
      }
    },
    created: function () {
      this.style.left = this.x + 'px'
      this.style.top = this.y + 'px'
    },
    mounted: function () {
      console.log('Activity MONTED')
    }
  }
</script>

<style>

</style>