<template>
  <div v-for="arrLine in arrLines" class="arrow" v-bind:class="data.type" v-bind:style="data.position"></div>
</template>

<script type="text/babel">
  export default {
    props: {
      data: {
        type: Object,
        default: {
          type: {
            type: String,
            default: 'up-ward' // left-ward, top-ward, down-ward
          },
          position: {
            type: Object,
            default: {
              left: '0px',
              top: '0px'
            }
          }
        }
      }
    },
    data () {
      return {
        arrLines: new Map()
      }
    },
    created: function () {

    }
  }
</script>

<style>

</style>