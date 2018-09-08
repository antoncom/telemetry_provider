<template>
  <div v-on:click.prevent="select('', $event)" class="line" v-bind:style="properties"></div>
</template>

<script type="text/babel">
  import * as types from 'src/store/mutation-types.js'
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
    },
    methods: {
      select: function (msg, e) {
        e.stopPropagation()
        this.$store.commit({
          type: 'bpm/' + types.SELECT_CONNECTION,
          payload: {
            source: {
              figureId: this.$parent.data.source.figureId,
              portPosition: this.$parent.data.source.name
            },
            target: {
              figureId: this.$parent.data.target.figureId,
              portPosition: this.$parent.data.target.name
            },
            connRef: this.$parent.makeId()
          }
        })
      }
    }
  }
</script>

<style>

</style>