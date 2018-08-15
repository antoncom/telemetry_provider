<template>
<div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
  <div class="bpmn_condition_xor" v-on:mousedown="mousedown">
    <div class="bpmn_icon"></div>
    <div class="bpmn_event_content">{{data.text}}</div>
  </div>
  <port v-for="pType in portTypes" v-if="isPortsEnabled" :position="pType" :key="pType"></port>
</div>
</template>

<script type="text/babel">
  import Port from './Port.vue'
  import { dragndropFigure } from '../mixins/dragndrop.js'

  export default {
    mixins: [dragndropFigure],
    components: {
      Port
    },
    props: {
      data: Object // data for the start block
    },
    data () {
      return {
        x: 0,
        y: 0,
        w: 40,
        h: 40,
        style: {
          height: '40px',
          width: '40px',
          left: '0px',
          top: '0px',
          zIndex: '',
          opacity: 1
        },
        showStatus: {
          display: 'none'
        },
        portTypes: ['input', 'input1', 'output', 'output2']
      }
    }
  }
</script>

<style>

</style>