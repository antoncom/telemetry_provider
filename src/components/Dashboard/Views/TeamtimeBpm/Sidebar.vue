<template>
  <div>
    <div id="toolbar-box">
      <div class="t">
        <div class="t">
          <div class="t"></div>
        </div>
      </div>
      <div class="m">
        <div class="toolbar" id="toolbar1">
          <table class="toolbar"><tbody><tr>
            <td class="button" id="toolbar-playprocess">
              <a href="#" class="toolbar">
<span class="icon-32-playprocess" title="Playback">
</span>
                Playback
              </a>
            </td>

            <td class="button" id="toolbar-saveprocess">
              <a href="#" class="toolbar">
<span class="icon-32-saveprocess" title="Сохранить">
</span>
                Сохранить
              </a>
            </td>

            <td class="button" id="toolbar-exitprocess">
              <a href="#" onclick="javascript:if(document.adminForm.boxchecked.value==0){alert('Выберите из списка для');}else{  submitbutton('exitprocess')}" class="toolbar">
<span class="icon-32-exitprocess" title="End Edit">
</span>
                End Edit
              </a>
            </td>

          </tr></tbody></table>
        </div>
        <div class="header icon-48-teamtimebpm">
          {{titles.process_name}}
        </div>

        <div class="clr"></div>
      </div>
      <div class="b">
        <div class="b">
          <div class="b"></div>
        </div>
      </div>
    </div>
    <div id="element-box">
      <div class="t">
        <div class="t">
          <div class="t"></div>
        </div>
      </div>
      <div class="m">

        <!-- swimlane panel toolbar -->

        <div id="SwimlanePanel-toolbar">
          <div class="header_bottom">
            <table>
              <tbody>
              <tr>
                <td class="title-diagramm">{{titles.process_name}}</td>
                <td>
                  Показать:&nbsp;&nbsp;
                  <select name="filter_show" id="filter_show" class="inputbox"><option value="status" selected="selected">Статус выполнения</option><option value="plan">План часов</option><option value="time">Время (Факт/План)</option><option value="price">Цена работ</option><option value="performer">Исполнитель</option><option value="date">Дата выполнения</option><option value="">Ничего</option></select>					</td><td>
              </td><td>
                <input id="SwimlanePanel-toolbar-SnapGrid10" class="cmdSnapGrid10 ui-helper-hidden-accessible" type="checkbox">
                <label for="SwimlanePanel-toolbar-SnapGrid10" aria-pressed="true" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only ui-state-active" role="button" aria-disabled="false"><span class="ui-button-text">
                          <span class="show_grid" title="Grid">Grid</span>
                      </span></label>
              </td>

                <td><div id="FullscreenSwitch" title="На весь экран">На весь экран</div></td>

              </tr>
              </tbody>
            </table>
            <div class="toolbar" id="toolbar">
              <table class="toolbar"><tbody><tr>
                <td class="button" id="toolbar-playprocess2">
                  <a href="#" onclick="javascript:if(document.adminForm.boxchecked.value==0){alert('Выберите из списка для');}else{  submitbutton('playprocess')}" class="toolbar">
                              <span class="icon-32-playprocess" title="Playback">
                              </span>
                  </a>
                </td>

                <td class="button" id="toolbar-saveprocess2">
                  <a href="#" onclick="javascript:if(document.adminForm.boxchecked.value==0){alert('Выберите из списка для');}else{  submitbutton('saveprocess')}" class="toolbar">
                              <span class="icon-32-saveprocess" title="Сохранить">
                              </span>
                  </a>
                </td>

                <td class="button" id="toolbar-exitprocess2">
                  <a href="#" class="toolbar">
                              <span class="icon-32-exitprocess" title="End Edit">
                              </span>
                  </a>
                </td>

              </tr></tbody></table>
            </div>

            <div class="time">
              <div>
                План часов: <span id="totalPlannedHours">{{titles.total_plan_hours}}</span> ч.
              </div>
              <div>
                Факт часов: <span id="totalFactHours">{{titles.total_fact_hours}}</span> ч.
              </div>
            </div>
          </div>

        </div>

        <form id="adminForm" name="adminForm">

          <input type="hidden" id="isProcessStarted" value="0">

          <input type="hidden" name="option" value="com_teamtimebpm">
          <input type="hidden" name="controller" value="process">
          <input type="hidden" name="task" value="">
          <input type="hidden" name="boxchecked" value="1">
          <input type="hidden" name="filter_order" id="filter_order" value="">
          <input type="hidden" name="filter_order_Dir" value="">
          <input type="hidden" name="0e41449cf1607d957ecb4b653075316c" value="1"></form>

        <div class="clr"></div>
      </div>
      <div class="b">
        <div class="b">
          <div class="b"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      titles: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
      }
    }
  }
</script>
<style>

</style>