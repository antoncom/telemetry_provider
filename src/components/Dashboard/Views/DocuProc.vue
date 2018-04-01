<template>
  <div class="row">
    <div class="card col-md-12">
      <div class="col-md-6">
        <div class="card-header">
          <h3 class="title">Визуализация бизнес-процессов</h3>
        </div>
        <div class="card-content row">
          <div class="col-md-12">
            <p>Сложные процессы легко понять при помощи картинок. Если мы сделаем в нашей системе визуализацию бизнес-процессов, наш продукт получит уникальное конкурентное преимущество, не говоря уже о том, что это сделает систему максимально понятной для всех участников.</p>
            <h5>Основные принципы</h5>
            <ol>
              <li>Провайдер рисует бизнес-процессы, сохраняет их в виде шаблонов.</li>
              <li>Шаблоны процессов служат для быстрого развёртывания при подключении новых операторов/домовладельцев</li>
              <li>Операторы и домовладельцы видят бизнес-процессы в которых они участвуют.</li>
              <li>Бизнес-процессы выполняет система, а люди и оборудование являются участниками этих процессов.</li>
              <li>Основное применение данного подхода:</li>
              <ul>
                <li>Документооборот</li>
                <li>Постановка дома на обследование (пример бизнес-процесса см. в меню)</li>
                <li>Процедуры согласования, в которых имеет место взаимодействие участников договора</li>
              </ul>

            </ol>
            <p>
              Подобное решение используется у нас в издательстве "Медиа Паблиш" для нужд документооборота, учёта заданий и обучения персонала. Делали сами для себя.<br />
              Здесь <a href="http://teamtime.info/images/TeamTime_bpm.pdf" target="_blank">презентация в формате PDF.</a>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card-content row">
          <div class="col-md-12">
            <img src="/static/xara_proto/opera.png" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h3 class="title">Пример бизнес-процесса</h3>
        </div>
        <div class="card-content row">
          <iframe src="/static/xara_proto/dooborot.htm" width="1360" height="830" align="left" scrolling="no" frameBorder="0">
            Ваш браузер не поддерживает плавающие фреймы!
          </iframe>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Примечания</h4>
        </div>
        <div class="card-content">
          <img src="/static/pics/how-it-works.png" />
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title">Пример шаблона и сгенерированного документа</h4>
          <p class="category">Шаблон есть HTML документ с вкраплением тегов для подстановки данных</p>
        </div>
        <div class="card-content">
          <froala :tag="'textarea'" :config="config" v-model="model"></froala>
        </div>
      </div>
    </div>

  </div>
</template>
<script type="text/babel">
  import $ from 'jquery'
  // Import and use Vue Froala lib.
  import Vue from 'vue'
  import VueFroala from 'vue-froala-wysiwyg'
  Vue.use(VueFroala)

  export default{
    data () {
      return {
        config: {
          events: {
            'froalaEditor.initialized': function () {
              console.log('initialized')
            }
          },
          /* toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'insertImage', 'insertTable', '|', 'print', 'html', '|'], */
          toolbarButtons: ['fullscreen', 'bold', 'italic'],
          heightMax: 300,
          widthMax: 500,
          htmlUntouched: true
        },
        model: '<h3>Шаблон сметы:</h3><p><img src="/static/pics/smeta.png"></p><h3>Сгенерированный документ:</h3><p><img src="/static/pics/smeta_generated.png"></p>'
      }
    },
    created () {
      window.$ = window.jQuery = $

      // Require Froala Editor js file.
      require('froala-editor/js/froala_editor.pkgd.min')

      // Require Froala Editor css files.
      require('froala-editor/css/froala_editor.pkgd.min.css')
      require('font-awesome/css/font-awesome.css')
      require('froala-editor/css/froala_style.min.css')
    }
  }
</script>
<style>
</style>
