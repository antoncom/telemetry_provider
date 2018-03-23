<template>
  <div>
    <div class="row">
      <div class="col-lg-6 col-md-12">

        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Карточка дома</h4>
            <p class="category">Основные сведения, фото, документы</p>
          </div>
          <div class="card-content">
            <div class="typo-line">
              <h5><p class="category">Адрес</p>г. Волжск, ул.Набережная, д.25.<br />Телефон ответственного: 8 (8363) 7-22-40.</h5>
            </div>
            <div class="typo-line">
              <h5><p class="category">Фото</p>
                <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :file-list="fileList2"
                        list-type="picture-card">
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip">jpg/png файлы не более 500kb</div>
                  <el-dialog :visible.sync="dialogVisible"
                             append-to-body>
                    <img width="100%" :src="dialogImageUrl" alt>
                  </el-dialog>
                </el-upload>
              </h5>
            </div>
            <div class="typo-line">
              <!--<h5><p class="category">Документы</p>-->
                <!--<el-table class="table-striped" :data="tableData">
                  <el-table-column
                          label="Город"
                          width="180">
                    <template slot-scope="scope">
                      <span style="text-align: left; margin-left: 10px">{{ scope.row.city }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="Адрес" property="address"></el-table-column>
                  <el-table-column label="Телефон" property="phone"></el-table-column>
                </el-table>-->
              </h5>
            </div>
          </div>
        </div>

      </div>
      <div class="col-lg-6 col-md-12">
        <div class="card card-plain">
          <div class="card-header">
            <h4 class="card-title">Энергоснабжение дома</h4>
            <p class="category">Учётные данные, данные ОДПУ, настроечные данные</p>
          </div>
          <div class="card-content">
            <button v-on:click="showTabs=1" v-bind:class="{ 'btn-fill': showTabs == 1 }" class="btn btn-primary">Тепло</button>
            <button v-on:click="showTabs=2" v-bind:class="{ 'btn-fill': showTabs == 2 }" class="btn btn-primary">ГВС</button>
            <button v-on:click="showTabs=3" v-bind:class="{ 'btn-fill': showTabs == 3 }" class="btn btn-primary">ХВС</button>
            <button v-on:click="showTabs=4" v-bind:class="{ 'btn-fill': showTabs == 4 }" class="btn btn-primary">Энергосервис</button>

            <vue-tabs class="card-content" v-show="showTabs == 1">
              <v-tab title="Начисление" icon="ti-bar-chart">
                <h5>Теплоснабжение - начисление</h5>
              </v-tab>
              <v-tab title="Потребление" icon="ti-user"><h5>Теплоснабжение - потребление</h5></v-tab>
              <v-tab title="Документы" icon="ti-files"><h5>Теплоснабжение - документы ОДПУ</h5></v-tab>
            </vue-tabs>
            <vue-tabs class="card-content" v-show="showTabs == 2">
              <v-tab title="Начисление" icon="ti-bar-chart">
                <h5>Горячее водоснабжение - начисление</h5>
              </v-tab>
              <v-tab title="Потребление" icon="ti-user"><h5>Горячее водоснабжение - потребление</h5></v-tab>
              <v-tab title="Документы" icon="ti-files"><h5>Горячее водоснабжение - документы ОДПУ</h5></v-tab>
            </vue-tabs>
            <vue-tabs class="card-content" v-show="showTabs == 3">
              <v-tab title="Начисление" icon="ti-bar-chart">
                <h5>Холодное водоснабжение - начисление</h5>
              </v-tab>
              <v-tab title="Потребление" icon="ti-user"><h5>Холодное водоснабжение - потребление</h5></v-tab>
              <v-tab title="Документы" icon="ti-files"><h5>Холодное водоснабжение - документы ОДПУ</h5></v-tab>
            </vue-tabs>
            <vue-tabs class="card-content" v-show="showTabs == 4">
              <v-tab title="Базовое" icon="ti-bar-chart">
                <div class="col-sm-12">
                  <h5>Энергосервис - базовое энергопотребление</h5>
                  <el-table class="table-striped"
                            :data="queriedData"
                            border
                            v-loading="loading2"
                            element-loading-text="Ждите..."
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.8)"
                            style="width: 100%">
                    <el-table-column v-for="column in tableColumns"
                                     sortable
                                     :key="column.label"
                                     :min-width="column.minWidth"
                                     :prop="column.prop"
                                     :label="column.label">
                    </el-table-column>
                  </el-table>
                </div>
                <div class="col-sm-6 pagination-info">
                  <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
                </div>
                <div class="col-sm-6">
                  <p-pagination class="pull-right"
                                v-model="pagination.currentPage"
                                :per-page="pagination.perPage"
                                :total="pagination.total">
                  </p-pagination>
                </div>
              </v-tab>
              <v-tab title="Коэффициенты" icon="ti-user"><h5>Энергосервис - коэффициенты</h5></v-tab>
            </vue-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import {Upload, Dialog, Table, TableColumn, Select, Option, Loading} from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import VueTabs from 'vue-nav-tabs'
  import PPagination from 'src/components/UIComponents/Pagination.vue'

  // Axios
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios)
  axios.defaults.timeout = 5000
  // axios.defaults.baseURL = 'http://5ab289c362a6ae001408c272.mockapi.io/api/v1'
  axios.defaults.baseURL = 'https://my.api.mockaroo.com'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.withCredentials = false

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Loading)

  Vue.use(VueTabs)
  Vue.use(Upload)
  Vue.use(Dialog)

  export default {
    components: {
      PPagination
    },
    data () {
      return {
        api_base_consumption: '/base_consumption?key=ddde2fd0',
        showTabs: 4,
        tabPosition: 'top',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList2: [{
          name: 'house.jpeg',
          url: 'http://yamskoyepole.rossia.news/upload/resize_cache/iblock/cde/300_0_1/cde396f106c15b3838b06b95f768ab54.JPG'
        }, {
          name: 'house2.jpeg', url: 'http://static.house2you.ru/i/realty/2017/11/22/c8/c8d093371c570bdc155c8b33cb84b952.jpg'
        }],
        activeName: 'first',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: ['company', 'inn', 'operator', 'location'],
        tableColumns: [
          {
            prop: 'reg_date',
            label: 'Дата',
            minWidth: 120
          },
          {
            prop: 'temperature',
            label: 't среды',
            minWidth: 100
          },
          {
            prop: 'consumption',
            label: 'Энергопотребление',
            minWidth: 200
          }
        ],
        tableData: [],
        loading2: true
      }
    },
    methods: {
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    },
    computed: {
      pagedData () {
        return this.tableData.slice(this.from, this.to)
      },
      /***
       * Searches through table data and returns a paginated array.
       * Note that this should not be used for table with a lot of data as it might be slow!
       * Do the search and the pagination on the server and display the data retrieved from server instead.
       * @returns {computed.pagedData}
       */
      queriedData () {
        if (!this.searchQuery) {
          this.pagination.total = this.tableData.length
          return this.pagedData
        }
        let result = this.tableData.filter((row) => {
          let isIncluded = false
          for (let key of this.propsToSearch) {
            let rowValue = row[key].toString()
            if (rowValue.includes && rowValue.includes(this.searchQuery)) {
              isIncluded = true
            }
          }
          return isIncluded
        })
        this.pagination.total = result.length
        return result.slice(this.from, this.to)
      },
      to () {
        let highBound = this.from + this.pagination.perPage
        if (this.total < highBound) {
          highBound = this.total
        }
        return highBound
      },
      from () {
        return this.pagination.perPage * (this.pagination.currentPage - 1)
      },
      total () {
        this.pagination.total = this.tableData.length
        return this.tableData.length
      }
    },
    created () {
      axios.get(this.api_base_consumption)
              .then(response => {
                this.loading2 = false
                // JSON responses are automatically parsed.
                this.tableData = response.data
              })
              .catch(e => {
                this.errors.push(e)
              })
    }
  }
</script>
<style>
  input[type='file'] {
    display: none;
  }
</style>