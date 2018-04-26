<template>
  <div class="container-fluid">
    <div class="row">
      <ttbpm-sidebar :titles="titles"></ttbpm-sidebar>
      <ttbpm-swimlane :credentials="credentials"></ttbpm-swimlane>
    </div>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue'
  import TtbpmSwimlane from './Swimlane.vue'
  import TtbpmSidebar from './Sidebar.vue'
  import credentials from 'src/components/Dashboard/Views/TeamtimeBpm/credentials/credentials.js'
  import ProcessDiagram from './ProcessDiagram.vue'

//  import PreviewWindow from './PreviewWindow.vue'
//  import store from './store/store'

  export default {
    data () {
      return {
        titles: {
          'process_name': 'Постановка дома на обследование',
          'total_plan_hours': '10',
          'total_fact_hours': '8'
        },
        credentials: {
          'username': credentials.username,
          'passwd': credentials.passwd
        },
        processDiagram: new Vue({render: h => h(ProcessDiagram)})
      }
    },
    mounted () {
      console.log('Main Mounted')
      this.$nextTick(function () {
        console.log('Main nextTick')
        // code that assumes this.$el is in-document

        window.frames['previewframe'].window.onload = () => {
          // main.$mount('#app')
          console.log('Iframe Window OnLoad')
          // preview.$mount(document.getElementById('previewframe').contentWindow.document.getElementById('preview'))
          this.processDiagram.$mount(window.frames['previewframe'].window.document.getElementById('processdiagram_contentpane'))
        }
      })
    },
    components: {
      TtbpmSidebar,
      TtbpmSwimlane,
      ProcessDiagram
    }
  }
</script>
<style scoped>

</style>