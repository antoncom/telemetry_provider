<template>
  <div>
    <nav class="navbar navbar-transparent navbar-absolute">
      <div class="container">
        <div class="navbar-header">
          <button type="button"
                  class="navbar-toggle navbar-toggle-black"
                  @click="toggleNavbar"
                  data-toggle="collapse"
                  data-target="#navigation-example-2">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar "></span>
            <span class="icon-bar "></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/login" class="btn">
                Уже есть логин?
              </router-link>
            </li>
            <li>
              <router-link to="/provider/home" class="btn">
                Главная
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="wrapper wrapper-full-page">
      <div class="register-page">
        <!--   you can change the color of the filter page using: data-color="blue | azure | green | orange | red | purple" -->
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div class="header-text">
                  <h2><b>Telemetry</b><br />учёт и оптимизация энергоресурсов.</h2>
                  <h4>Зарегистрируйтесь и получите доступ к системе телеметрии.</h4>
                  <hr>
                </div>
              </div>
              <div class="col-md-4 col-md-offset-2">
                <div class="media">
                  <div class="media-left">
                    <div class="icon icon-danger">
                      <i class="ti ti-user"></i>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5>Я провайдер</h5>
                    Я предоставляю систему телеметрии - весь программно-аппаратный комплекс.
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <div class="icon icon-warning">
                      <i class="ti-bar-chart-alt"></i>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5>Я оператор системы</h5>
                    Я устанавливаю систему регулирования теплоэнергии, выполняю настройку и сопровождение.
                  </div>
                </div>
                <div class="media">
                  <div class="media-left">
                    <div class="icon icon-info">
                      <i class="ti-headphone"></i>
                    </div>
                  </div>
                  <div class="media-body">
                    <h5>Я управляющая компания, ТСЖ, ЖЭУ</h5>
                    Я обеспечиваю оптимальный климат-контроль для потребителей теплоэнергии.
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <form method="#" action="#">
                  <div class="card card-plain">
                    <div class="content">
                      <div class="form-group">
                        <input type="email" placeholder="Ваше имя" class="form-control">
                      </div>
                      <div class="form-group">
                        <input type="email" placeholder="Ваша фамилия" class="form-control">
                      </div>
                      <div class="form-group">
                        <input type="email" placeholder="Компания" class="form-control">
                      </div>
                      <div class="form-group">
                        <input type="email" placeholder="Email" class="form-control">
                      </div>
                      <div class="form-group">
                        <input type="password" placeholder="Пароль" class="form-control">
                      </div>
                      <div class="form-group">
                        <input type="password" placeholder="Подтверждение пароля" class="form-control">
                      </div>
                    </div>
                    <div class="footer text-center">
                      <button type="button" class="btn btn-fill btn-danger btn-wd">Зарегистрироваться</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <footer class="footer footer-transparent">
          <div class="container">
            <div class="copyright text-center">
              &copy; Инструмент-Н, 2018.
            </div>
          </div>
        </footer>
      </div>
    </div>
    <div class="collapse navbar-collapse off-canvas-sidebar">
      <ul class="nav nav-mobile-menu">
        <li>
          <router-link to="/login">
            Уже есть логин?
          </router-link>
        </li>
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
