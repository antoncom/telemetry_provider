<template>
<div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
  <div v-drag class="bpmn_condition_or">
    <div class="bpmn_icon"></div>
    <div class="bpmn_event_content">{{data.text}}</div>
  </div>
  <portal to="globalports" name="ports" :disabled="bubbledPorts.atRest">
    <port v-for="pType in portTypes" v-if="isPortsEnabled" :position="pType" :key="data.id + pType"></port>
  </portal>
</div>
</template>

<script type="text/babel">
  import Port from './Port.vue'
  import { drag, dragndropFigure } from '../mixins/dragndrop.js'

  export default {
    mixins: [dragndropFigure],
    directives: {
      drag
    },
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