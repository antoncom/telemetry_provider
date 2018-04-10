<template>
  <div class="container">
    <ttbpm-sidebar :titles="titles"></ttbpm-sidebar>
    <ttbpm-swimlane :credentials="credentials"></ttbpm-swimlane>
  </div>
</template>

<script type="text/babel">
//  import Vue from 'vue'
  import TtbpmSwimlane from './Swimlane.vue'
  import TtbpmSidebar from './Sidebar.vue'
  import credentials from 'src/components/Dashboard/Views/TeamtimeBpm/credentials/credentials.js'
//  import PreviewWindow from './PreviewWindow.vue'
//  import store from './store/store'

  export default {
    data () {
      return {
        titles: {
          'process_name': 'Диаграмма бизнес-процессов',
          'total_plan_hours': '10',
          'total_fact_hours': '8'
        },
        credentials: {
          'username': credentials.username,
          'passwd': credentials.passwd
        }
//        store: store,
//        global: store.state,
//        local: {
//          content: 'Main'
//        },
//        preview: new Vue({render: h => h(PreviewWindow)})
      }
    },
//    mounted () {
//      console.log('Main Mounted')
//      this.$nextTick(function () {
//        console.log('Main nextTick')
//        // code that assumes this.$el is in-document
//
//        window.frames['previewframe'].window.onload = () => {
//          // main.$mount('#app')
//          console.log('Iframe Window OnLoad')
//          // preview.$mount(document.getElementById('previewframe').contentWindow.document.getElementById('preview'))
//          this.preview.$mount(window.frames['previewframe'].window.document.getElementById('preview'))
//        }
//      })
//    },
    components: {
      TtbpmSidebar: TtbpmSidebar,
      TtbpmSwimlane: TtbpmSwimlane
//      PreviewWindow: PreviewWindow
    }
  }
</script>
<style>
  body {
    font-family: sans-serif;
  }
  .my-frame {
    border: 1px solid #CCC;
    box-shadow: 0 0 3px 2x rgba(0,0,0,.3);
    margin: 20px auto;
    height: 200px;
    width: 95%;
  }
</style>