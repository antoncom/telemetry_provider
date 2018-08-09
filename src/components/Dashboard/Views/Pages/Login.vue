<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#navigation-example-2"
                  @click="toggleNavbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">Telemetry</router-link>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <router-link to="/register" tag="li">
              <a>Регистрация</a>
            </router-link>
            <router-link to="/provider/home" tag="li">
              <a>Главная</a>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page login-page" data-color="blue"
           data-image="/static/img/background/background-2.jpg">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                <form @submit.prevent="login({ username, password })">
                  <div class="card" data-background="color" data-color="blue">
                    <div class="card-header">
                      <h3 class="card-title">Вход в систему</h3>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label>Логин</label>
                        <input type="text" v-model="username" v-on:focus="error=''" placeholder="Введите логин" class="form-control input-no-border">
                      </div>
                      <div class="form-group">
                        <label>Пароль</label>
                        <input type="password" v-model="password" v-on:focus="error=''" placeholder="Введите пароль" class="form-control input-no-border">
                      </div>
                    </div>
                    <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd ">Войти</button>
                      <div class="forgot">
                        <router-link to="/register">
                          Забыли пароль?
                        </router-link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="alert alert-danger" v-show="error">
              <button type="button" class="close" v-on:click="error=''">×</button>
              <span>{{ error }}</span>
            </div>
          </div>
        </div>

        <footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright">
              &copy; Инструмент-Н, 2018
            </div>
          </div>
        </footer>
        <div class="full-page-background" style="background-image: url(static/img/background/background-2.jpg) "></div>
      </div>
    </div>
    <div class="collapse navbar-collapse off-canvas-sidebar">
      <ul class="nav nav-mobile-menu">
        <router-link to="/register" tag="li">
          <a>Зарегистрироваться</a>
        </router-link>
        <router-link to="/provider/home" tag="li">
          <a>Главная</a>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        error: '',
        status: '',
        username: 'admin',
        password: 'adminadmin',
        from: '/' // redirect after login to requested page
      }
    },
    methods: {
      login () {
        if (this.$router.history.pending !== null) this.from = this.$router.history.pending.path
        this.$store.dispatch('common/login', this.$data)
      },
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
