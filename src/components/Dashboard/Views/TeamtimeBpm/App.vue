<template>
  <div class="container">
    <ttbpm-sidebar :titles="titles"></ttbpm-sidebar>
    <ttbpm-swimlane></ttbpm-swimlane>
  </div>
</template>

<script type="text/babel">
  import TtbpmSwimlane from './Swimlane.vue'
  import TtbpmSidebar from './Sidebar.vue'

  export default {
    data () {
      return {
        titles: {
          'process_name': 'Диаграмма бизнес-процессов',
          'total_plan_hours': '10',
          'total_fact_hours': '8'
        }
      }
    },
    components: {
      TtbpmSidebar: TtbpmSidebar,
      TtbpmSwimlane: TtbpmSwimlane
    }
  }
</script>
<!--<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/default.css"></style>
<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/fullscreen.css"></style>
&lt;!&ndash;<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/general.css"></style>&ndash;&gt;
&lt;!&ndash;<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/icon.css"></style>&ndash;&gt;
<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/jquery.contextMenu.css"></style>
<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/processes.css"></style>
&lt;!&ndash;<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/rounded.css"></style>&ndash;&gt;
<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/spaces.css"></style>
<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/system.css"></style>
<style src="src/components/Dashboard/Views/TeamtimeBpm/assets/css/diagrampage.css"></style>-->
<style>
</style>