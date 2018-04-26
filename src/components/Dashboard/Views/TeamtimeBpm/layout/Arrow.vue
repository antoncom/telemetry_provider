<template>
  <div class="arrow" v-bind:class="orientation" v-bind:style="position"></div>
</template>

<script type="text/babel">
  export default {
    props: {
      position: {
        type: Object,
        default: {
          left: '0px',
          top: '0px'
        }
      },
      orientation: {
        type: String,
        default: 'input'
      }
    },
    data () {
      return {}
    }
  }
</script>

<style>

</style>