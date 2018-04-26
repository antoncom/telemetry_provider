<template>
  <div id="processDiagram" style="height: 631px;">
    <!--<iframe id="processDiagramWindow" src="static/mock/processdiagram.html" width="100%" height="100%" scrolling="yes" frameborder="no"></iframe>-->
    <iframe name="previewframe" id="previewframe" src="/static/TeamtimeBpm/iframe.html" width="100%" height="100%" scrolling="yes" frameborder="yes"></iframe>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      credentials: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        myvar: {a: 1}
      }
    },
    mounted () {
//      console.log('CREDENTIALS')
//      console.log(this.credentials.username)
      window.document.username = this.credentials.username
      window.document.passwd = this.credentials.passwd
    }
  }
</script>

<style scoped>

</style>