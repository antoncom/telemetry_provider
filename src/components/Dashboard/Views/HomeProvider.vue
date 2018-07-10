<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Добро пожаловать!</h4>
      <p class="category">На данном сайте представлен прототип интерфейсов портала учёта энергоресурсов.<br /></p>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h3 class="title">Структура сайта</h3>
          <p>Предварительная структура разделов сайта:</p>
          <ul>
            <li v-for="(link, index) in links">
              <a v-bind:href="'/#'+link.path">{{link.name}}</a>
            </li>
          </ul>
          <br />
          <h6>Служебные страницы:</h6>
          <ul>
            <li><a href="/#/login">Login</a></li>
            <li><a href="/#/register">Регистрация</a></li>
            <li><a href="/#/provider/user">Мой профайл</a></li>
            <li><a href="/#/lock">Блокировка экрана</a></li>
          </ul>
        </div>
        <div class="card-content row"></div>
      </div>
    </div>
    <div class="col-md-6 card">
        <div class="card-header">
          <h3 class="title">Заметки</h3>
          <div class="category">Заметки по обновлениям прототипа.</div>
        </div>
        <div class="card-content row">
          <div class="col-md-12">
            <p>Сейчас в работе:</p>
            <ul>
              <li>
                <a href="/#/provider/house">Карточка дома</a>
              </li>
              <li>
                {{ userAuthorized }}
              </li>
              <!--<li>
                <a href="/#/provider/techproc">Визуализация бизнес-процессов</a>
              </li>-->
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import sidebarLinks from 'src/sidebarLinks.js'

  export default{
    data () {
      return {
        links: []
      }
    },
    mounted: function () {
      this.links = sidebarLinks
    },
    computed: {
      userAuthorized () {
        return this.$store.state.userAuthorized
      }
    }
  }
</script>
<style>
</style>
