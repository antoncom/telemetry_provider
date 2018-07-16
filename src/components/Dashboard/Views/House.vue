<template>
  <div>
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">{{ model.address }}</h4>
            <p class="category">Учётные данные, данные ОДПУ, настроечные данные</p>
          </div>
          <div class="card-content">
            <!--<template v-for="cons in consumption_types">-->
              <!--<button v-on:click="model.consumption_type=cons.type" v-bind:class="{ 'btn-fill': model.consumption_type == cons.type }" class="btn btn-primary">{{ cons.label }}</button>-->
            <!--</template>-->
            <button v-on:click="model.consumption_type='cons-ht'" v-bind:class="{ 'btn-fill': model.consumption_type == 'cons-ht' }" class="btn btn-primary">Тепло</button>
            <button v-on:click="model.consumption_type='cons-hw'" v-bind:class="{ 'btn-fill': model.consumption_type == 'cons-hw' }" class="btn btn-primary">ГВС</button>
            <button v-on:click="model.consumption_type='cons-cw'" v-bind:class="{ 'btn-fill': model.consumption_type == 'cons-cw' }" class="btn btn-primary">ХВС</button>
            <vue-tabs class="card-content" v-show="model.consumption_type == 'cons-ht'">
              <v-tab title="Потребление" icon="ti-bar-chart">

                <!--#######Graphic & data tabs###########-->
                <div class="row">
                  <div class="col-lg-3 pull-left" style="text-align: left; margin-top: 5px;">
                    <div class="btn-group">
                      <button v-on:click="dataViewType='graphic'" v-bind:class="{ 'btn-fill': dataViewType=='graphic' }" type="button" class="btn btn-sm btn-default">График</button>
                      <button v-on:click="dataViewType='table'" v-bind:class="{ 'btn-fill': dataViewType=='table' }" type="button" class="btn btn-sm btn-default">Данные</button>
                    </div>
                  </div>
                  <div class="form-group col-lg-9" style="text-align: left;">
                    <el-date-picker v-model="model.from" type="date" placeholder="Начальная дата"
                                    :picker-options="pickerOptions1"
                                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-date-picker v-model="model.to" type="date" placeholder="Конечная дата"
                                    :picker-options="pickerOptions1"
                                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </div>
                </div>
                <vue-tabs class="card-content viewresult" v-show="dataViewType == 'graphic'">
                  <v-tab>
                    <div class="row">
                      <div class="col-lg-3" style="padding-left: 0px;">
                        <div style="text-align: left;">
                          <template v-for="line in model.consumption_lines">
                            <p-checkbox v-model="line.selected" v-bind:value="line.name" :disabled="line.noData" style="padding-left: 30px;">{{ line.name }}</p-checkbox>
                          </template>
                          <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                            <span>Нет привязанных линий"</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-9">
                        <div class="card">
                          <div class="card-header">
                            <div class="col-lg-3">
                              <el-select class="select-danger"
                                         size="large"
                                         placeholder="Выбрать параметр"
                                         v-model="model.selected_param">
                                <el-option v-for="option in consumption_params"
                                           class="select-danger"
                                           :value="option"
                                           :label="option"
                                           :key="option">
                                </el-option>
                              </el-select>
                            </div>
                            <div class="col-lg-9" style="text-align: left;">
                              <h4 class="card-title">Потребление: Тепло</h4>
                              <p class="category">{{ model.from | date }} - {{ model.to | date }}</p>
                            </div>
                          </div>
                          <div class="card-content">
                            <div id="chartConsumption_cons-ht" class="ct-chart"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-tab>
                </vue-tabs>
                <vue-tabs class="card-content viewresult" v-show="dataViewType == 'table'">
                  <v-tab>
                    <div class="row">
                      <div class="col-lg-3">
                        <div style="text-align: left;">
                          <template v-for="line in model.consumption_lines">
                            <p-radio v-model="model.line_chosen" :label="line.name" :disabled="line.noData">{{ line.name }}</p-radio>
                          </template>
                          <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                            <span>Нет привязанных линий"</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-9">
                        Будет готово позже
                      </div>
                    </div>
                  </v-tab>
                </vue-tabs>
                <!--######### End of graphic & data tabs ###########-->

              </v-tab>
              <v-tab title="Энергосервис" icon="ti-files">
                <h5>Тепло - энергосервис</h5>
              </v-tab>
            </vue-tabs>
            <vue-tabs class="card-content" v-show="model.consumption_type == 'cons-hw'">
              <v-tab title="Потребление" icon="ti-user">
                <div class="card">
                  <!--#######Graphic & data tabs###########-->
                  <div class="row">
                    <div class="col-lg-3 pull-left" style="text-align: left; margin-top: 5px;">
                      <div class="btn-group">
                        <button v-on:click="dataViewType='graphic'" v-bind:class="{ 'btn-fill': dataViewType=='graphic' }" type="button" class="btn btn-sm btn-default">График</button>
                        <button v-on:click="dataViewType='table'" v-bind:class="{ 'btn-fill': dataViewType=='table' }" type="button" class="btn btn-sm btn-default">Данные</button>
                      </div>
                    </div>
                    <div class="form-group col-lg-9" style="text-align: left;">
                      <el-date-picker v-model="model.from" type="date" placeholder="Начальная дата"
                                      :picker-options="pickerOptions1"
                                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                      <el-date-picker v-model="model.to" type="date" placeholder="Конечная дата"
                                      :picker-options="pickerOptions1"
                                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </div>
                  </div>
                  <vue-tabs class="card-content viewresult" v-show="dataViewType == 'graphic'">
                    <v-tab>
                      <div class="row">
                        <div class="col-lg-3" style="padding-left: 0px;">
                          <div style="text-align: left;">
                            <template v-for="line in model.consumption_lines">
                              <p-checkbox v-model="line.selected" v-bind:value="line.name" :disabled="line.noData" style="padding-left: 30px;">{{ line.name }}</p-checkbox>
                            </template>
                            <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                              <span>Нет привязанных линий"</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-9">
                          <div class="card">
                            <div class="card-header">
                              <div class="col-lg-3">
                                <el-select class="select-danger"
                                           size="large"
                                           placeholder="Выбрать параметр"
                                           v-model="model.selected_param">
                                  <el-option v-for="option in consumption_params"
                                             class="select-danger"
                                             :value="option"
                                             :label="option"
                                             :key="option">
                                  </el-option>
                                </el-select>
                              </div>
                              <div class="col-lg-9" style="text-align: left;">
                                <h4 class="card-title">Потребление: ГВС</h4>
                                <p class="category">{{ model.from | date }} - {{ model.to | date }}</p>
                              </div>
                            </div>
                            <div class="card-content">
                              <div id="chartConsumption_cons-hw" class="ct-chart"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-tab>
                  </vue-tabs>
                  <vue-tabs class="card-content viewresult" v-show="dataViewType == 'table'">
                    <v-tab>
                      <div class="row">
                        <div class="col-lg-3">
                          <div style="text-align: left;">
                            <template v-for="line in model.consumption_lines">
                              <p-radio v-model="model.line_chosen" :label="line.name" :disabled="line.noData">{{ line.name }}</p-radio>
                            </template>
                            <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                              <span>Нет привязанных линий"</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-9">
                          Будет готово позже
                        </div>
                      </div>
                    </v-tab>
                  </vue-tabs>
                  <!--######### End of graphic & data tabs ###########-->
                </div>
              </v-tab>
              <v-tab title="Энергосервис" icon="ti-files">
                <h5>ГВС - энергосервис</h5>
              </v-tab>
            </vue-tabs>
            <vue-tabs class="card-content" v-show="model.consumption_type == 'cons-cw'">
              <v-tab title="Потребление" icon="ti-user">
                <div class="card">
                  <!--#######Graphic & data tabs###########-->
                  <div class="row">
                    <div class="col-lg-3 pull-left" style="text-align: left; margin-top: 5px;">
                      <div class="btn-group">
                        <button v-on:click="dataViewType='graphic'" v-bind:class="{ 'btn-fill': dataViewType=='graphic' }" type="button" class="btn btn-sm btn-default">График</button>
                        <button v-on:click="dataViewType='table'" v-bind:class="{ 'btn-fill': dataViewType=='table' }" type="button" class="btn btn-sm btn-default">Данные</button>
                      </div>
                    </div>
                    <div class="form-group col-lg-9" style="text-align: left;">
                      <el-date-picker v-model="model.from" type="date" placeholder="Начальная дата"
                                      :picker-options="pickerOptions1"
                                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                      <el-date-picker v-model="model.to" type="date" placeholder="Конечная дата"
                                      :picker-options="pickerOptions1"
                                      value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </div>
                  </div>
                  <vue-tabs class="card-content viewresult" v-show="dataViewType == 'graphic'">
                    <v-tab>
                      <div class="row">
                        <div class="col-lg-3" style="padding-left: 0px;">
                          <div style="text-align: left;">
                            <template v-for="line in model.consumption_lines">
                              <p-checkbox v-model="line.selected" v-bind:value="line.name" :disabled="line.noData" style="padding-left: 30px;">{{ line.name }}</p-checkbox>
                            </template>
                            <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                              <span>Нет привязанных линий"</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-9">
                          <div class="card">
                            <div class="card-header">
                              <div class="col-lg-3">
                                <el-select class="select-danger"
                                           size="large"
                                           placeholder="Выбрать параметр"
                                           v-model="model.selected_param">
                                  <el-option v-for="option in consumption_params"
                                             class="select-danger"
                                             :value="option"
                                             :label="option"
                                             :key="option">
                                  </el-option>
                                </el-select>
                              </div>
                              <div class="col-lg-9" style="text-align: left;">
                                <h4 class="card-title">Потребление: ХВС</h4>
                                <p class="category">{{ model.from | date }} - {{ model.to | date }}</p>
                              </div>
                            </div>
                            <div class="card-content">
                              <div id="chartConsumption_cons-cw" class="ct-chart"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-tab>
                  </vue-tabs>
                  <vue-tabs class="card-content viewresult" v-show="dataViewType == 'table'">
                    <v-tab>
                      <div class="row">
                        <div class="col-lg-3">
                          <div style="text-align: left;">
                            <template v-for="line in model.consumption_lines">
                              <p-radio v-model="model.line_chosen" :label="line.name" :disabled="line.noData">{{ line.name }}</p-radio>
                            </template>
                            <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                              <span>Нет привязанных линий"</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-9">
                          Будет готово позже
                        </div>
                      </div>
                    </v-tab>
                  </vue-tabs>
                  <!--######### End of graphic & data tabs ###########-->
                </div>
              </v-tab>
              <v-tab title="Энергосервис" icon="ti-files">
                <h5>ХВС - энергосервис</h5>
              </v-tab>
            </vue-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  // import {DatePicker, Table, TableColumn, Select, Option, Loading, Collapse, CollapseItem} from 'element-ui'
  import {DatePicker, Table, TableColumn, Loading, Select, Option} from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import VueTabs from 'vue-nav-tabs'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  // import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Loading)
  Vue.use(VueTabs)

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      PPagination,
      [Option.name]: Option,
      [Select.name]: Select
    },
    data () {
      return {
        model: {
          house_id: '',
          address: '',
          consumption_type: '',
          from: '2018-06-07',
          to: '2018-06-26',
          selected_param: '',
          consumption_lines: [], // for checkboxes in graphic mode
          line_chosen: '', // for radio buttons in table mode
          max_param_value: 0 // for correct scaling of Y axis
        },
        consumption_types: [
          {
            label: 'Тепло',
            type: 'cons-ht'
          },
          {
            label: 'ГВС',
            type: 'cons-hw'
          },
          {
            label: 'ХВС',
            type: 'cons-cw'
          }
        ],
        dataViewType: 'graphic',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: [],
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
        loading2: true,
        pickerOptions1: {
          shortcuts: [{
            text: 'Сегодня',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Вчера',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'Неделю назад',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        enabledRadio: '',
        $Chartist: null
      }
    },
    watch: {
      'model.selected_param': function () {
        this.initCharts()
      },
      'model.from': function () {
        this.$store.dispatch('getConsumption', this.$data.model).then(() => {
          this.initCharts()
        })
      },
      'model.to': function () {
        this.$store.dispatch('getConsumption', this.$data.model).then(() => {
          this.initCharts()
        })
      },
      'model.consumption_lines': {
        handler (val) {
          this.initCharts()
        },
        deep: true
      },
      'model.consumption_type': function () {
        this.$store.dispatch('getConsumption', this.$data.model).then(() => {
          this.initCharts()
        })
      }
    },
    methods: {
      initConsumptionChart () {
        var lines = this.model.consumption_lines
        var param = this.model.selected_param

        var timePoints = ['18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00']
        // var timePoints = []
        // timePoints.push(this.model.from)
        // timePoints.push(this.model.to)
        var series = []
        if (lines && lines.length) {
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].selected) {
              let lineData = this.consumption_graphData(lines[i].name, param, timePoints)
              series.push(lineData)
            }
          }
        }
        var dataConsumption = {
          // labels: timePoints,
          series: series
        }

        const optionsConsumption = {
          showPoint: true,
          lineSmooth: true,
          axisX: {
            showGrid: true,
            showLabel: false,
            offset: 0
          },
          axisY: {
            offset: 60

          },
          low: 0,
          high: this.model.max_param_value + this.model.max_param_value * 0.5,
          height: '250px'
        }
        if (this.model.consumption_type === 'cons-ht') {
          this.$Chartist.Line('#chartConsumption_cons-ht', dataConsumption, optionsConsumption)
        }
        if (this.model.consumption_type === 'cons-hw') {
          this.$Chartist.Line('#chartConsumption_cons-hw', dataConsumption, optionsConsumption)
        }
        if (this.model.consumption_type === 'cons-cw') {
          this.$Chartist.Line('#chartConsumption_cons-cw', dataConsumption, optionsConsumption)
        }
      },
      initCharts () {
        this.initConsumptionChart()
      },
      // line = 'Линия 1 (например, 1-й подъезд)'
      // param = 'p1'
      // timePoints = ['6:00', '9:00', '11:00', '14:00'],
      // returns [
      //   {
      //     timestamp: 23:00,
      //     t2: 62.5
      //   },
      //   {
      //     timestamp: 00:00,
      //     t2: 50.1
      //   },

      // ]
      consumption_graphData (line, param, timePoints) {
        var result = []
        if (this.$store.getters.consumption_data.length && this.$store.getters.consumption_data.length > 0) {
          var dataArray = this.$store.getters.consumption_data
          // iterate lines
          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].name === line) {
              // line found
              // iterate records of the line
              for (var record of dataArray[i].data) {
                var timepoint = record.timestamp

// 12 hours only a day
//                var timepoint = record.timestamp.substring(11, 16)
//                if (timePoints.indexOf(timepoint) > -1) {
//                  // get record only if time in timePoints array
//                  let obj = {}
//                  obj['timestamp'] = timepoint
//                  obj[param] = record[param]
//
//                  result.push(record[param])
//                }
                let obj = {}
                obj['timestamp'] = timepoint
                obj[param] = record[param]
                result.push(record[param])

                // define max value
                if (this.model.max_param_value < record[param]) {
                  this.model.max_param_value = record[param]
                }
              }
              // break iterations if the line found
              break
            }
          }
          return result
        }
      }
    },
    async mounted () {
      const Chartist = await import('chartist')
      this.$Chartist = Chartist

      this.$data.model.house_id = this.$route.params.id
      this.$store.dispatch('getHouse', this.$data.model)
      if (this.model.consumption_type !== '') {
        this.$store.dispatch('getConsumption', this.$data.model).then(() => {
          this.initCharts()
        })
      }
    },
    computed: {
      consumption_type () {
        return this.$store.getters.consumption_type
      },
      consumption_data () {
        return this.$store.getters.consumption_data
      },
//      consumption_lines () {
//        var result = []
//        if (this.$store.getters.consumption_data) {
//          var dataArray = this.$store.getters.consumption_data
//          for (let i = 0; i < dataArray.length; i++) {
//            result.push(dataArray[i].name)
//            let obj = {
//              line_name: dataArray[i].name,
//              selected: false
//            }
//            this.model.consumption_lines.push(obj)
//          }
//        }
//        return result
//        return this.$store.getters.consumption_lines
//      },
      consumption_params () {
        var result = []
        if (this.$store.getters.consumption_data.length && this.$store.getters.consumption_data.length > 0) {
          var dataArray = this.$store.getters.consumption_data
          // iterate datas
          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].data && dataArray[i].data.length > 0) {
              // data found
              result = Object.keys(dataArray[i].data[0])
              result.shift() // remove 'timestamp' as it's not a param
              // break iterations if the line found
              break
            }
          }
          return result
        }

//        //////
//        if (this.$store.getters.consumption_data && this.$store.getters.consumption_data.length > 0) {
//          var dataArray = this.$store.getters.consumption_data
//          // for (let i = 0; i < dataArray.d)
//          console.log('dataArray', dataArray[1])
//          if (dataArray.data && dataArray.data.length >= 0) {
//            result = Object.keys(dataArray.data[0])
//            delete result['timestamp']
//          }
//        }
//        return result
      },
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
    }
//    mounted () {
//      this.$data.model.id = this.$route.params.id
//      this.$store.dispatch('getHouse', this.$data.model)
//    }
  }
</script>
<style>
  input[type='file'] {
    display: none;
  }
  .viewresult .nav-tabs-navigation {
    display: none;
  }
</style>