<template>
  <div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
    <!--<div v-on:mousedown="mousedown" class="bpmn_activity" :style="style" v-bind:class="acType">-->
    <div v-drag class="bpmn_activity" :style="style" v-bind:class="acType">
      <div class="bpmn_linked_process_icon" v-bind:class="{linked: data.viewState === 'linked'}"></div>
      <div class="bpmn_content_hidden" :style="{'width': data.width-6 + 'px', 'height': data.height-6 + 'px'}">
        <a href="javascript:;" v-on:click="togglePorts">
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
    <portal to="globalports" :name="data.id" :disabled="bubbledPorts.atRest">
        <port v-for="pType in portTypes" v-if="isPortsEnabled" :position="pType" :key="data.id + pType"></port>
    </portal>
  </div>
</template>

<script type="text/babel">
  // import drag from 'src/components/Dashboard/Views/TeamtimeBpm/mixins/draggable.js'
  import * as types from 'src/store/mutation-types.js'
  import Port from './Port.vue'
  import { drag, dragndropFigure } from '../mixins/dragndrop.js' // directive v-drag + mixin for any dragndrop figure

  export default {
    directives: {
      drag
    },
    mixins: [dragndropFigure],
    components: {
      Port
    },
    props: {
      data: Object, // data for the activity
      acState: Object // {state: 'part-done', part: '73%'} or {state: 'done', part: '}
    },
    data () {
      return {
//        arePortsLocal: true,
        x: 0,
        y: 0,
        w: 140,
        h: 60,
        style: {
          height: '60px',
          width: '140px',
          left: '0px',
          top: '0px',
          zIndex: '',
          opacity: 1
        },
        showStatus: {
          display: 'none'
        },
        acType: 'simple_activity', // by default
        portTypes: ['input', 'input1', 'input2', 'output', 'output1', 'output2']
      }
    },
    methods: {
      /* sendToPortalTarget () {
        var passengers = []
        for (let i = 0; i < this.$children.length; i++) {
          passengers.push(this.$children[i].$vnode)
        }

        const passengers1 = [this.$createElement('p', 'This will be displayed in the Target!')]
        Wormhole.open({
          to: 'globalports',
          from: 'localports',
          passengers
        })
        console.log(passengers)
      }, */
      togglePorts: function () {
        this.$store.commit({
          type: 'bpm/' + types.SHOW_PORTS,
          payload: !this.isPortsEnabled
        })
      }
    },
    created: function () {
      // show state of activity
      if (this.acState.state !== '') this.showStatus.display = 'block'

      // simple or linked or collapsed/expanded activity
      if (this.data.viewState === 'linked') this.acType = 'simple_activity linked_process'
      else if (this.data.viewState === 'collapsed') this.acType = 'subprocess_collapsed_activity'
      else if (this.data.viewState === 'expanded') this.acType = 'subprocess_expanded_activity'
      else this.acType = 'simple_activity'
    },
    mounted: function () {
//      console.log('mounted-------')
//      var pass = [this.$createElement('p', 'This will be displayed in the Target!')]
//      Wormhole.open({
//        to: 'globalports',
//        from: 'localports',
//        pass
//      })
    }
  }
</script>

<style>

</style>