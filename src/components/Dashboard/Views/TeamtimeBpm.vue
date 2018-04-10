<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">TeamTime Bpm</div>
      </div>
      <div class="card-content row">
        <ttbpm></ttbpm>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Ttbpm from 'src/components/Dashboard/Views/TeamtimeBpm/App.vue'
  export default{
    components: {
      Ttbpm
    },
    data () {
      return {

      }
    }
  }
</script>
<style>
</style>