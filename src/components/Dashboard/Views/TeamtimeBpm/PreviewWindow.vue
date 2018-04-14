<template>
  <div id="preview">
    <div>
      <div>Global: {{global.content}}</div>
      <textarea v-model="global.content"></textarea>
    </div>

    <div>
      <div>Local: {{local.content}}</div>
      <textarea v-model="local.content"></textarea>
    </div>
</div>
</template>

<script type="text/babel">
  import 'vue'
  import store from './store/store'

  export default {
    data () {
      return {
        store: {},
        global: {},
        local: {}
      }
    },
    created () {
      console.log('IFrame Created')
    },
    mounted () {
      console.log('======== Iframe Mounted')
      this.local = {
        content: 'Preview'
      }
      this.global = store.state
      this.store = store
      this.$nextTick(function () {
        console.log('Iframe NextTick')
        // onload = load;
        // code that assumes this.$el is in-document
      })
    }
  }
</script>

<style></style>