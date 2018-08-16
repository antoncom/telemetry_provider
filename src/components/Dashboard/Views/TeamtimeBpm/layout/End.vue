<template>
<div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
  <div class="bpmn_end">
    <div v-drag class="bpmn_end_content">End</div>
  </div>
  <port v-for="pType in portTypes" v-if="isPortsEnabled" :position="pType" :key="pType"></port>
</div>
</template>

<script type="text/babel">
  import { drag, dragndropFigure } from '../mixins/dragndrop.js'
  import Port from './Port.vue'

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
        portTypes: ['input', 'input1', 'input2']
      }
    }
  }
</script>

<style>

</style>