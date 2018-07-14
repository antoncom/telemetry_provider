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
            <button v-on:click="model.consumption_type='cons-ht'" v-bind:class="{ 'btn-fill': model.consumption_type == 'cons-ht' }" class="btn btn-primary">Тепло</button>
            <button v-on:click="model.consumption_type='cons-hw'" v-bind:class="{ 'btn-fill': model.consumption_type == 'cons-hw' }" class="btn btn-primary">ГВС</button>
            <button v-on:click="model.consumption_type='cons-cw'" v-bind:class="{ 'btn-fill': model.consumption_type == 'chater' }" class="btn btn-primary">ХВС</button>

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
                                    :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-date-picker v-model="model.to" type="date" placeholder="Конечная дата"
                                    :picker-options="pickerOptions1">
                    </el-date-picker>
                  </div>
                </div>
                <vue-tabs class="card-content viewresult" v-show="dataViewType == 'graphic'">
                  <v-tab>
                    <div class="row">
                      <div class="col-lg-3">
                        <div style="text-align: left;">
                          <template v-for="line in consumption_lines">
                            <p-checkbox v-model="model.consumption_lines" v-bind:value="line">{{ line }}</p-checkbox>
                          </template>
                          <!--<template v-for="line in consumption_lines">-->
                            <!--<input type="checkbox" v-bind:value="line" v-model="model.consumption_lines">-->
                            <!--<label>{{line}}</label><br>-->
                          <!--</template>-->
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
                      </div>
                      <div class="col-lg-9">
                        <div class="card">
                          <div class="card-header">
                            <h4 class="card-title">Потребление тепла</h4>
                            <p class="category">{{ model.from | date }} - {{ model.to | date }}</p>
                          </div>
                          <div class="card-content">
                            <div id="chartConsumption" class="ct-chart"></div>
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
                          <p-radio v-model="enabledRadio" label="1">Линия 1 (например, 5-й подъезд)</p-radio>
                          <p-radio v-model="enabledRadio" label="2">Линия 2 (например, чердак)</p-radio>
                        </div>
                      </div>
                      <div class="col-lg-9">
                        Data
                      </div>
                    </div>
                  </v-tab>
                </vue-tabs>
                <!--######### End of graphic & data tabs ###########-->
              </v-tab>
              <v-tab title="Энергосервис" icon="ti-files">
                <h5>Теплоснабжение - энергосервис</h5>
              </v-tab>
            </vue-tabs>
            <vue-tabs class="card-content" v-show="model.consumption_type == 'cons-hw'">
              <v-tab title="Потребление" icon="ti-user">
                <div class="card">
                  <form class="form-horizontal">
                    <div class="card-header">
                      <h4 class="card-title">Индентификаторы приборов учёта</h4>
                    </div>
                    <div class="card-content">
                      <div class="form-group">
                        <label class="col-md-3 control-label">Дата/время:</label><div class="col-md-9"><input type="text" placeholder="Дата/время" class="form-control" value="Time_stamp"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-3 control-label">Температура теплоносителя T1</label>
                        <div class="col-md-9"><input type="text" placeholder="T1" class="form-control" value="t_input_ch12"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-3 control-label">Температура теплоносителя T2</label>
                        <div class="col-md-9"><input type="text" placeholder="T1" class="form-control" value="t_input_ch22"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-3 control-label">Объём теплоносителя V1</label>
                        <div class="col-md-9"><input type="text" placeholder="V1" class="form-control" value="f_flow_ch21"></div>
                      </div>
                      <div class="form-group">
                        <label class="col-md-3 control-label">Объём теплоносителя V2</label>
                        <div class="col-md-9"><input type="text" placeholder="V2" class="form-control" value="f_flow_ch22"></div>
                      </div>
                    </div>
                    <div class="card-footer">
                      <div class="form-group">
                        <label class="col-md-3"></label>
                        <div class="col-md-9">
                          <button type="submit" class="btn btn-fill btn-info">Сохранить идентификаторы</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </v-tab>
              <v-tab title="Энергосервис" icon="ti-files">
                <h5>ГВС - энергосервис</h5>
              </v-tab>
            </vue-tabs>
            <vue-tabs class="card-content" v-show="model.consumption_type == 'cons-cw'">
              <v-tab title="Потребление" icon="ti-user"><h5>Холодное водоснабжение - потребление</h5></v-tab>
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
          consumption_type: 'cons-ht',
          from: '2018-06-01',
          to: '',
          selected_param: '',
          consumption_lines: []
        },
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
        console.log('==WATCHING==')
        this.initCharts()
      }
    },
    methods: {
      initConsumptionChart () {
        var lines = this.model.consumption_lines
        var param = this.model.selected_param
        // var self = this

        console.log('INIT lines', lines)
        console.log('INIT param', param)

        var timePoints = ['18:00', '20:00', '22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00']
        var series = []
        if (lines && lines.length) {
          for (let i = 0; i < lines.length; i++) {
            let lineData = this.consumption_graphData(lines[i], param, timePoints)
            series.push(lineData)
          }
        }
        var dataConsumption = {
          labels: timePoints,
          series: series
        }

        console.log('INIT dataConsumption', dataConsumption)

        const optionsConsumption = {
          showPoint: false,
          lineSmooth: true,
          axisX: {
            showGrid: false,
            showLabel: true
          },
          axisY: {
            offset: 40

          },
          low: 0,
          high: 16,
          height: '250px'
        }

        this.$Chartist.Line('#chartConsumption', dataConsumption, optionsConsumption)
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
                var timepoint = record.timestamp.substring(11, 16)
                if (timePoints.indexOf(timepoint) > -1) {
                  // get record only if time in timePoints array
                  let obj = {}
                  obj['timestamp'] = timepoint
                  obj[param] = record[param]

                  result.push(obj)
                }
              }
              // break iterations if the line found
              break
            }
          }
          console.log('-------------', result)
          return result
        }
      }
    },
    async mounted () {
      const Chartist = await import('chartist')
      this.$Chartist = Chartist

      this.$data.model.house_id = this.$route.params.id
      this.$store.dispatch('getHouse', this.$data.model)
      this.$store.dispatch('getConsumption', this.$data.model).then(() => {
        this.initCharts()
      })
    },
    computed: {
      consumption_type () {
        return this.$store.getters.consumption_type
      },
      consumption_data () {
        return this.$store.getters.consumption_data
      },
      consumption_lines () {
        var result = []
        if (this.$store.getters.consumption_data) {
          var dataArray = this.$store.getters.consumption_data
          for (let i = 0; i < dataArray.length; i++) {
            result.push(dataArray[i].name)
          }
        }
        return result
      },
      consumption_params () {
        var result = []
        if (this.$store.getters.consumption_data.length && this.$store.getters.consumption_data.length > 0) {
          var dataArray = this.$store.getters.consumption_data
          // iterate datas
          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].data && dataArray[i].data.length > 0) {
              // data found
              result = Object.keys(dataArray[i].data[0])
              delete result['timestamp']
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