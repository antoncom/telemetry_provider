<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button"
                  class="navbar-toggle"
                  @click="toggleNavbar"
                  data-toggle="collapse"
                  data-target="#navigation-example-2">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/provider/home">Главная</router-link>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">

          </ul>
        </div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page lock-page" data-color="red" data-image="static/img/background/background-2.png"
           style="background-image: url('static/img/background/background-5.png')">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <form method="#" action="#">
            <div class="card card-lock">
              <div class="author">
                <img class="avatar" src="static/img/faces/face-2.jpg" alt="...">
              </div>
              <h4>Chet Faker</h4>
              <div class="form-group">
                <input type="password" placeholder="Введите пароль" class="form-control">
              </div>
              <button type="button" class="btn btn-wd">Разблокировать</button>
            </div>
          </form>
        </div>
        <footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright">
              &copy; Инструмент-Н, 2018.
            </div>
          </div>
        </footer>
        <div class="full-page-background" style="background-image: url(static/img/background/background-2.jpg) "></div>
      </div>
    </div>
    <div class="collapse navbar-collapse off-canvas-sidebar">
      <ul class="nav nav-mobile-menu">
        <li>
          <router-link to="/provider/home">
            Главная
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      toggleNavbar () {
        document.body.classList.toggle('nav-open')
      },
      closeMenu () {
        document.body.classList.remove('nav-open')
        document.body.classList.remove('off-canvas-sidebar')
      }
    },
    beforeDestroy () {
      this.closeMenu()
    }
  }
</script>
<style>
</style>
