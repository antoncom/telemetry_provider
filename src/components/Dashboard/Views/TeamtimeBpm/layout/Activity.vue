<template>
  <div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
    <div class="bpmn_activity" :style="style" v-bind:class="acType">
      <div class="bpmn_linked_process_icon" v-bind:class="{linked: data.viewState === 'linked'}"></div>
      <div class="bpmn_content_hidden" :style="{'width': data.width-6 + 'px', 'height': data.height-6 + 'px'}">
        <a href="javascript:;" v-on:click="enablePorts">
          <div class="bpmn_activity_container">
            <span class="bpmn_activity_content">{{data.text}}</span>
            <span class="bpmn_activity_iefix">&nbsp;</span>
          </div>
        </a>
      </div>
      <div class="bpmn_collapse_icon" v-bind:class="data.viewState"></div>
      <div class="bpmn_activity_backlight" style="display:none;"></div>
      <div v-bind:class="acState.state" class="bpmn_activity_aditional_info" :style="showStatus">{{acState.part}}</div>
    </div>
    <port v-for="pType in portTypes" v-if="showPorts" :position="pType" :key="pType"></port>
  </div>
</template>

<script type="text/babel">
  import * as types from 'src/store/mutation-types.js'
  import store from 'src/store/index.js'
  import Port from './Port.vue'
  export default {
    components: {
      Port
    },
    props: {
      data: Object, // data for the activity
      acState: Object // {state: 'part-done', part: '73%'} or {state: 'done', part: '}
    },
    data () {
      return {
        x: 0,
        y: 0,
        w: 140,
        h: 60,
        style: {
          height: '60px',
          width: '140px',
          left: '0px',
          top: '0px'
        },
        showStatus: {
          display: 'none'
        },
        acType: 'simple_activity', // by default
        portTypes: ['input', 'input1', 'input2', 'output', 'output1', 'output2']
      }
    },
    computed: {
      showPorts: function () {
        return store.state.isPortsEnabled
      }
    },
    created: function () {
      // position & size of activity
      this.x = this.data.x
      this.y = this.data.y
      this.w = this.data.width
      this.h = this.data.height
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
    },
    methods: {
      enablePorts: function () {
        store.commit({
          type: types.SHOW_PORTS,
          payload: !store.state.isPortsEnabled
        })
      }
    }
  }
</script>

<style>

</style>