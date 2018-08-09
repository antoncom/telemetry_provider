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
              <!--<a v-bind:href="'/#'+link.path">{{link.name}}</a>-->
              <router-link v-bind:to="link.path">{{link.name}}</router-link>
            </li>
          </ul>
          <br />
          <h6>Служебные страницы:</h6>
          <ul>
            <li><router-link to="/login">Login</router-link></li>
            <li><router-link to="/register">Регистрация</router-link></li>
            <li><router-link to="/profile">Мой профайл</router-link></li>
            <li><router-link to="/lock">Блокировка экрана</router-link></li>
          </ul>
        </div>
        <div class="card-content row"></div>
      </div>
    </div>
    <div class="col-md-6 card">
        <div class="card-header">
          <h3 class="title">Заметки</h3>
          <div class="category">Кросс-броузерная поддержка</div>
        </div>
        <div class="card-content row">
          <div class="col-md-12">
            <div class="card-content table-responsive table-full-width">
              <el-table :data="browsers_compability">
                <el-table-column label="N" property="id" width="60"></el-table-column>
                <el-table-column label="Браузер" property="browser" width="200"></el-table-column>
                <el-table-column label="OS" property="os" width="180"></el-table-column>
                <el-table-column label="Статус" property="status">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === 'Ok'" class="ti-check" style="color: darkgreen;"></span>
                    <span v-else style="color: darkred;">{{ scope.row.status }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import sidebarLinks from 'src/sidebarLinks.js'
  import { mapState } from 'vuex'

  export default{
    data () {
      return {
        links: [],
        browsers_compability: [
          {
            id: 1,
            browser: 'IE 11.0.9600.1980',
            os: 'Windows 7',
            status: 'Ok'
          },
          {
            id: 2,
            browser: 'Chrome 68.0.3440.84',
            os: 'Windows 7',
            status: 'Ok'
          },
          {
            id: 3,
            browser: 'Firefox 61.0.1',
            os: 'Windows 7',
            status: 'Ok'
          },
          {
            id: 4,
            browser: 'Opera 54.0.2952.64',
            os: 'Windows 7',
            status: 'Ok'
          },
          {
            id: 5,
            browser: 'Яндекс 18.6.1.770',
            os: 'Windows 7',
            status: 'Ok'
          },
          {
            id: 6,
            browser: 'Safari 5.1.7',
            os: 'Windows 7',
            status: 'Нет поддержки'
          },
          {
            id: 7,
            browser: 'Chrome 65.0.3325.162',
            os: 'Linux / Ubuntu 14.10',
            status: 'Ok'
          },
          {
            id: 8,
            browser: 'Firefox 39.0',
            os: 'Linux / Ubuntu 14.10',
            status: 'Ok'
          },
          {
            id: 9,
            browser: 'Chrome 67.0.3396.87',
            os: 'Android 7.1.1',
            status: 'Ok'
          },
          {
            id: 10,
            browser: 'Яндекс 18.6 от 08.07.2018',
            os: 'Android 7.1.1',
            status: 'Ok'
          },
          {
            id: 11,
            browser: 'Яндекс 18.3 от 22.05.2018',
            os: 'Android 5.0',
            status: 'Ok'
          }
        ]
      }
    },
    mounted: function () {
      this.links = sidebarLinks
    },
    computed: {
      ...mapState('common', ['userAuthorized'])
    }
  }
</script>
<style>
</style>
