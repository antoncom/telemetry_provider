<template>
  <div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
    <div class="bpmn_activity" :style="style" v-bind:class="acType">
      <div class="bpmn_linked_process_icon" v-bind:class="{linked: data.viewState === 'linked'}"></div>
      <div class="bpmn_content_hidden" :style="{'width': data.width-6 + 'px', 'height': data.height-6 + 'px'}">
        <div class="bpmn_activity_container">
          <span class="bpmn_activity_content">{{data.text}}</span>
          <span class="bpmn_activity_iefix">&nbsp;</span>
        </div>
      </div>
      <div class="bpmn_collapse_icon" v-bind:class="data.viewState"></div>
      <div class="bpmn_activity_backlight" style="display:none;"></div>
      <div v-bind:class="acState.state" class="bpmn_activity_aditional_info" :style="showStatus">{{acState.part}}</div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      data: Object, // data for the activity
      acState: Object // {state: 'part-done', part: '73%'} or {state: 'done', part: '}
    },
    data () {
      return {
        style: {
          height: '60px',
          width: '140px',
          left: '0px',
          top: '0px'
        },
        showStatus: {
          display: 'none'
        },
        acType: 'simple_activity' // by default
      }
    },
    created: function () {
      // position & size of activity
      this.style.left = this.data.x + 'px'
      this.style.top = this.data.y + 'px'
      this.style.height = this.data.height + 'px'
      this.style.width = this.data.width + 'px'
      // show state of activity
      if (this.acState.state !== '') this.showStatus.display = 'block'

      // simple or linked or collapsed/expanded activity
      if (this.data.viewState === 'linked') this.acType = 'simple_activity linked_process'
      else if (this.data.viewState === 'collapsed') this.acType = 'subprocess_collapsed_activity'
      else if (this.data.viewState === 'expanded') this.acType = 'subprocess_expanded_activity'
      else this.acType = 'simple_activity'
    }
  }
</script>

<style>

</style>