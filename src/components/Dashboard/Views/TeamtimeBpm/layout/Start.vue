<template>
<div :id="data.id" tabindex="0" class="with-context-menu" :style="style">
  <div class="bpmn_start">
    <div class="bpmn_start_content">Start</div>
    <port v-for="pType in portTypes" v-if="showPorts" :position="pType" :key="pType"></port>
  </div>
</div>
</template>

<script type="text/babel">
  import store from 'src/store/index.js'
  import Port from './Port.vue'
  export default {
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
          top: '0px'
        },
        showStatus: {
          display: 'none'
        },
        portTypes: ['output']
      }
    },
    computed: {
      showPorts: function () {
        return store.state.isPortsEnabled
      }
    },
    created: function () {
      // position of the block
      this.x = this.data.x
      this.y = this.data.y
      this.style.left = this.data.x + 'px'
      this.style.top = this.data.y + 'px'
    }
  }
</script>

<style>

</style>