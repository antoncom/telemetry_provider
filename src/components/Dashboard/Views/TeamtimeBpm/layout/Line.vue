<template>
  <div class="line" v-bind:style="properties"></div>
</template>

<script type="text/babel">
  export default {
    props: {
      properties: {
        type: Object,
        default: {
          left: '0px',
          top: '0px',
          width: '2px',
          height: '2px',
          clip: 'rect(0,2px,2px,0)'
        }
      }
    },
    data () {
      return {}
    }
  }
</script>

<style>

</style>