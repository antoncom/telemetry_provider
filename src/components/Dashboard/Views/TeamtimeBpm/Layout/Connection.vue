<template>
  <div v-bind:id="makeId()">
    <line v-for="line in lines" properties="line.props" v-bind:key="line.id"></line>
    <!--<arrow data="arrowData"></arrow>-->
  </div>
</template>

<script type="text/babel">
  import Line from './Line.vue'
  // import Arrow from './Arrow.vue'
  export default {
    components: {
      Line
    },
    props: {
      data: {
        type: Object,
        default: null
      }
    },
    data () {
      return {}
    },
    created: function () {
      // populate lines array
    },
    mounted: function () {
    },
    computed: {
      lines: function () {
        // generate lines

      }
    },
    methods: {
      makeId: function () {
        return this.data.source.figureId + '_' + this.data.target.figureId
      }
    }
  }
</script>

<style>

</style>