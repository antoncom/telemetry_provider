<template>
  <div id="SwimlanePanel-blocksmenu" class="bpmn_insert_menu">
    <table>
      <tbody>
      <tr>
        <td id="SwimlanePanel-blocksmenu-insert_block"
            class="bpmn_insert_menu_header" colspan="5">Insert</td>
      </tr>
      <tr>
        <td class="bpmn_insert_menu_item cmdInsertActivity">
          <img src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/block.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdInsertConditionXOR">
          <img style="height: 28px;" src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/gateway_xor.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdInsertSubprocess">
          <img style="height: 18px;" src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/subprocess.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdInsertMessage">
          <img src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/message.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdMoreBlocks">
          <div></div>
        </td>
      </tr>

      <!-- hidden blocks -->

      <tr class="bpmn_insert_menu_hidden">
        <td class="bpmn_insert_divider" colspan="5"></td>
      </tr>
      <tr class="bpmn_insert_menu_hidden">
        <td class="bpmn_insert_menu_item cmdInsertConditionAND">
          <img style="height: 28px;" src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/gateway_and.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdInsertConditionOR">
          <img style="height: 28px;" src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/gateway_or.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdInsertLinkedSubprocess">
          <img style="height: 18px;" src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/linked-subprocess.png"/>
        </td>
      </tr>
      <tr class="bpmn_insert_menu_hidden">
        <td class="bpmn_insert_menu_item cmdInsertTimer">
          <img src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/timer.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdInsertException">
          <img src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/exception.png"/>
        </td>
        <td class="bpmn_insert_menu_item cmdInsertEnd">
          <img src="http://teamlog.teamtime.info/media/com_teamtimebpm/assets/images/icons/start-end.png"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/babel">
  export default {
    data () {
      return {}
    }
  }
</script>

<style></style>