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
            <button v-for="ctype in consumption_types" v-on:click="model.consumption_type=ctype.type" v-bind:class="{ 'btn-fill': model.consumption_type == ctype.type }" class="btn btn-primary" style="margin-right: 5px;">{{ ctype.label }}</button>
            <vue-tabs  v-for="ctype in consumption_types" :key="ctype.type" class="card-content" v-show="model.consumption_type == ctype.type">
              <v-tab title="Потребление" icon="ti-bar-chart">
                <div class="row">
                  <div class="col-lg-4" style="text-align: left; margin-top: 5px;">
                    <div class="btn-group" style="margin-bottom: 20px;">
                      <button v-on:click="dataViewType='graphic'" v-bind:class="{ 'btn-fill': dataViewType=='graphic' }" type="button" class="btn btn-sm btn-default">График</button>
                      <button v-on:click="dataViewType='table'" v-bind:class="{ 'btn-fill': dataViewType=='table' }" type="button" class="btn btn-sm btn-default">Данные</button>
                    </div>
                    <div v-show="dataViewType=='graphic'" style="text-align: left; margin-left:5px;">
                      <template v-for="line in model.consumption_lines">
                        <p-checkbox v-model="line.selected" v-bind:value="line.name" :disabled="line.noData" style="padding-left: 20px;">{{ line.name }}</p-checkbox>
                      </template>
                      <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                        <span>Нет привязанных линий"</span>
                      </div>
                    </div>
                    <div v-show="dataViewType=='table'" style="text-align: left; margin-left:5px;">
                      <template v-for="line in model.consumption_lines">
                        <p-radio v-model="model.line_chosen" :label="line.name" :disabled="line.noData">{{ line.name }}</p-radio>
                      </template>
                      <div v-if="model.consumption_lines.length == 0" class="alert alert-warning">
                        <span>Нет привязанных линий"</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="row">
                      <div class="col-lg-12" style="text-align: left;">
                        <h4 class="card-title">{{ ctype.label }}: {{ consumption_params_labels[model.selected_param] }}</h4>
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
                    <!--<div  v-show="dataViewType=='graphic'" class="row">-->
                    <div class="row">
                      <div class="form-group col-lg-6 pull-left" style="text-align: left; margin-top: 15px;">
                        <el-select class="select-danger"
                                   size="large"
                                   placeholder="Выбрать параметр"
                                   v-model="model.selected_param">
                          <el-option v-for="(value, key) in consumption_params_labels"
                                     class="select-danger"
                                     :value="key"
                                     :label="value"
                                     :key="key">
                          </el-option>
                        </el-select>
                      </div>
                      <div v-if="dataViewType === 'table'" class="form-group col-lg-6 pull-left" style="margin-top: 15px; text-align: left;">
                        <el-select class="select-success"
                                   size="small"
                                   :disabled="total === 0"
                                   placeholder="Выбрать формат файла"
                                   v-model="model.selected_filetype">
                          <el-option v-for="(value, key) in file_types"
                                     class="select-success"
                                     :value="key"
                                     :label="value"
                                     :key="key">
                          </el-option>
                        </el-select>
                        <el-button type="primary"
                                   icon="el-icon-download"
                                   :disabled="model.selected_filetype === '' || total === 0"
                                   v-on:click="download()">Скачать</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <vue-tabs class="card-content viewresult" v-show="dataViewType == 'graphic'">
                  <v-tab>
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="card">
                          <div class="card-content">
                            <template>
                              <div class="small">
                                <line-chart :chart-data="datacollection"
                                            :options="dataoptions"
                                            :width="600"
                                            :height="400">
                                </line-chart>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </v-tab>
                </vue-tabs>
                <vue-tabs class="card-content viewresult" v-show="dataViewType == 'table'">
                  <v-tab>
                    <div class="card-content row">
                      <!--============= Table =============-->
                      <div class="col-sm-12">
                        <el-table class="table-striped"
                                  :data="queriedData"
                                  border
                                  max-height="720"
                                  v-loading="loading2"
                                  element-loading-text="Ждите..."
                                  element-loading-spinner="el-icon-loading"
                                  element-loading-background="rgba(0, 0, 0, 0.8)"
                                  style="width: 100%"
                                  :ref="ctype.type">
                          <el-table-column v-for="column in consumption_tableColumns"
                                           sortable
                                           :fixed="column.prop === 'timestamp'"
                                           :resizable="false"
                                           :key="column.label"
                                           :min-width="consumption_params_size[column.prop]"
                                           :prop="column.prop"
                                           :label="column.label"
                                           class-name="">
                          </el-table-column>
                        </el-table>
                      </div>
                      <div class="col-sm-2" style="margin-top:15px;">
                        <el-select
                                class="select-default"
                                v-model="pagination.perPage"
                                placeholder="Per page">
                          <el-option
                                  class="select-default"
                                  v-for="item in pagination.perPageOptions"
                                  :key="item"
                                  :label="item"
                                  :value="item">
                          </el-option>
                        </el-select>
                      </div>
                      <div class="col-sm-4 pagination-info" style="margin-top:25px;">
                        <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
                      </div>
                      <div class="col-sm-6">
                        <p-pagination class="pull-right"
                                      v-model="pagination.currentPage"
                                      :per-page="pagination.perPage"
                                      :total="pagination.total">
                        </p-pagination>
                      </div>
                      <!--=========== End Table ===========-->
                    </div>
                  </v-tab>
                </vue-tabs>
              </v-tab>
              <v-tab title="Энергосервис" icon="ti-files">
                <h5>Тепло - энергосервис</h5>
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
  import {DatePicker, Table, TableColumn, Loading, Select, Option, Popover, Button} from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import VueTabs from 'vue-nav-tabs'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import LineChart from 'src/components/UIComponents/Chartsjs/LineChart.js'
  import credentials from 'src/api/credentials.js'
  import { mapState } from 'vuex'

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Loading)
  Vue.use(VueTabs)
  Vue.use(Popover)
  Vue.use(Button)

  export default {
    components: {
      [DatePicker.name]: DatePicker,
      PPagination,
      [Option.name]: Option,
      [Select.name]: Select,
      LineChart
    },
    data () {
      return {
        datacolors: ['#5F9EA0', '#D2691E', '#6495ED', '#008B8B', '#8B008B'],
        datacollection: {
          labels: [],
          dataset: []
        },
        dataoptions: {
          scales: {
            yAxes: [{
              id: 'A',
              type: 'linear',
              position: 'left',
              scaleLabel: {
                display: true,
                labelString: 'Данные от прибора'
              }
            }, {
              id: 'B',
              type: 'linear',
              position: 'right',
              scaleLabel: {
                display: true,
                labelString: 'Температура воздуха'
              },
              ticks: {
                max: 40,
                min: -10
              }
            }]
          }
        },
        model: {
          house_id: '',
          address: '',
          consumption_type: 'cons-ht',
          from: '2018-06-07',
          to: '2018-06-26',
          selected_param: '',
          consumption_lines: [], // for checkboxes in graphic mode
          line_chosen: '', // for radio buttons in table mode
          max_param_value: 0, // for correct scaling of Y axis
          selected_filetype: ''
        },
        file_types: {
          xlsx: 'Файл Excel (*.xlsx)',
          xls: 'Файл Excel 97-2003 (*.xls)',
          csv: 'CSV (разделители - запятые)'
        },
        consumption_types: [
          {
            label: 'Тепло',
            type: 'cons-ht',
            params: {
              timestamp: ['Дата и время', 140], // title of param and its width of value in pixels (for table)
              t1: ['Температура на подаче', 60],
              t2: ['Температура на обратке', 60],
              dT: ['разность температур', 60],
              v1: ['Объем на подаче', 60],
              v2: ['Объем на обратке', 60],
              dV: ['разность объемов', 60],
              pV: ['Процент от объема на подаче', 70],
              p1: ['Давление на подаче', 90],
              p2: ['Давление на обратке', 90],
              dP: ['ΔP (разность давлений)', 90],
              q: ['Расход тепла', 90]
            }
          },
          {
            label: 'ГВС',
            type: 'cons-hw',
            params: {
              timestamp: ['Дата и время', 140],
              t: ['Температура горячей воды', 140],
              v: ['Расход горячей воды', 140],
              p: ['Давление горячей воды', 140]
            }
          },
          {
            label: 'ХВС',
            type: 'cons-cw',
            params: {
              timestamp: ['Дата и время', 140],
              v: ['Расход холодной воды', 140],
              p: ['Давление холодной воды', 140]
            }
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
        tableColumns: [],
        tableData: [],
        loading2: false,
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
        enabledRadio: ''
      }
    },
    watch: {
      'model.selected_param': function () {
        this.initCharts()

        // make column of table highlighted according to selected parameter
        var columns = this.$refs[this.model.consumption_type][0].columns
        columns.forEach((item, i, columns) => {
          if (columns[i].property === this.model.selected_param) {
            columns[i].className = 'lighted_column'
          } else {
            columns[i].className = ''
          }
        })
      },
      'model.from': function () {
        this.$store.dispatch('base/getConsumption', this.$data.model).then(() => {
          this.initCharts()
        })
      },
      'model.to': function () {
        this.$store.dispatch('base/getConsumption', this.$data.model).then(() => {
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
        this.$store.dispatch('base/getConsumption', this.$data.model).then(() => {
          this.initCharts()
        })
      }
    },
    computed: {
      ...mapState('base', ['consumption_type', 'consumption_data']),
      ...mapState('common', ['userToken']),
      consumption_params_labels () {
        var result = []
        for (var i = 0; i < this.consumption_types.length; i++) {
          if (this.consumption_types[i].type === this.model.consumption_type) {
            result = Object.keys(this.consumption_types[i].params)
            result.shift() // remove 'timestamp' as it's not needed in selector
            result = result.reduce((previous, current) => {
              previous[current] = current + ' - ' + this.consumption_types[i].params[current][0]
              return previous
            }, {})
            break
          }
        }
        return result
      },
      consumption_params_popover () {
        var result = []
        var keys = []
        for (var i = 0; i < this.consumption_types.length; i++) {
          if (this.consumption_types[i].type === this.model.consumption_type) {
            keys = Object.keys(this.consumption_types[i].params)
            keys.shift() // remove 'timestamp' as it's not needed in selector
            var obj = {}
            result = keys.map((key) => {
              obj = {}
              obj['param'] = key
              obj['title'] = this.consumption_types[i].params[key][0]
              return obj
            })
            break
          }
        }
        return result
      },
      consumption_params () {
        var result = []
        for (var i = 0; i < this.consumption_types.length; i++) {
          if (this.consumption_types[i].type === this.model.consumption_type) {
            result = Object.keys(this.consumption_types[i].params)
            result.shift() // remove 'timestamp' as it's not a param
            break
          }
        }
        return result
      },
      consumption_params_size () {
        var result = {}
        for (var i = 0; i < this.consumption_types.length; i++) {
          if (this.consumption_types[i].type === this.model.consumption_type) {
            result = Object.keys(this.consumption_types[i].params).reduce((previous, current) => {
              previous[current] = this.consumption_types[i].params[current][1]
              return previous
            }, {})
            break
          }
        }
        return result
      },
      consumption_tableColumns () {
        var result = []
        if (this.consumption_params && this.consumption_params.length > 0) {
          var labels = ['timestamp'].concat(this.consumption_params)
          for (let i = 0; i < labels.length; i++) {
            let obj = {
              prop: labels[i],
              label: (labels[i] === 'timestamp') ? 'Дата' : labels[i],
              minWidth: (labels[i] === 'timestamp') ? 60 : 30
            }
            result.push(obj)
          }
        }
        return result
      },
      consumption_tableData () {
        var result = []
        var line = this.model.line_chosen
        if (line !== '') {
          result = this.consumption_lineData(line)
        }
        return result
      },
      pagedData () {
        return this.consumption_tableData.slice(this.from, this.to)
      },
      /***
       * Searches through table data and returns a paginated array.
       * Note that this should not be used for table with a lot of data as it might be slow!
       * Do the search and the pagination on the server and display the data retrieved from server instead.
       * @returns {computed.pagedData}
       */
      queriedData () {
        if (!this.searchQuery) {
          this.pagination.total = this.consumption_tableData.length
          return this.pagedData
        }
        let result = this.consumption_tableData.filter((row) => {
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
        this.pagination.total = this.consumption_tableData.length
        return this.consumption_tableData.length
      }
    },
    methods: {
      download () {
        let params = '?house_id=' + this.model.house_id + '&from=' + this.model.from + '&to=' + this.model.to +
                '&download=' + this.model.selected_filetype + '&token=' + this.userToken
        var url = credentials.appix_api + '/' + this.model.consumption_type + params
        window.open(url, '_blank')
      },
      hexToRGB (hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16)
        var g = parseInt(hex.slice(3, 5), 16)
        var b = parseInt(hex.slice(5, 7), 16)
        if (alpha) {
          return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')'
        } else {
          return 'rgb(' + r + ', ' + g + ', ' + b + ')'
        }
      },
      initConsumptionChart () {
        var lines = this.model.consumption_lines
        var param = this.model.selected_param
        var series = []
        var labels = []

        var weather = {
          yAxisID: 'B',
          label: 'Температура воздуха',
          data: [-5, -3, -2, 0, 5, 12, 15, 7, 2, 15, 28, 28, 28, 17, 10, 10, 5, 6, 6, 5, 7, 8, 5, 6, 4, 3, 5],
          backgroundColor: this.hexToRGB('#FF0000', 0.1)
        }

        if (lines && lines.length) {
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].selected) {
              let lineData = this.consumption_graphData(lines[i].name, param)
              labels = lineData.labels
              series.push(lineData)
            }
          }
        }
        series.push(weather)
        // show chart
        if ((series && series.length > 0) && (labels && labels.length > 0)) {
          this.datacollection = {
            labels: labels,
            datasets: series
          }
        } else {
          this.datacollection = {
            labels: [],
            datasets: []
          }
        }
      },
      initCharts () {
        this.initConsumptionChart()
      },
      consumption_graphData (line, param) {
        this.model.max_param_value = 0
        if (this.consumption_data.length && this.consumption_data.length > 0) {
          var dataArray = this.consumption_data
          // iterate lines
          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].name === line) {
              // line found
              // iterate records of the line
              var obj = {
                label: line, // chart name
                data: [], // yAxis data
                labels: [] // xAxis data timestamp)
              }
              for (var record of dataArray[i].data) {
                obj['data'].push(record[param])
                obj['labels'].push(record['timestamp'])
                if (this.model.max_param_value < record[param]) {
                  this.model.max_param_value = record[param]
                }
              }
              obj['backgroundColor'] = this.hexToRGB(this.datacolors[i], 0.4)
              obj['yAxisID'] = 'A'
              // break iterations if the line found
              break
            }
          }
          return obj
        }
      },
      consumption_lineData (line) {
        var result = []
        if (this.consumption_data.length && this.consumption_data.length > 0) {
          var dataArray = this.consumption_data
          // iterate lines
          for (let i = 0; i < dataArray.length; i++) {
            if (dataArray[i].name === line) {
              // line found
              result = dataArray[i].data
              // break iterations if the line found
              break
            }
          }
        }
        return result
      }
    },
    async mounted () {
      this.$data.model.house_id = this.$route.params.id
      this.$store.dispatch('base/getHouse', this.$data.model)
      if (this.model.consumption_type !== '') {
        this.$store.dispatch('base/getConsumption', this.$data.model).then(() => {
          this.initCharts()
        })
      }
    }
  }
</script>
<style>
  input[type='file'] {
    display: none;
  }
  .viewresult .nav-tabs-navigation {
    display: none;
  }
  .param-popover {
    background-color: #fad163;
    padding: 4px;
  }
  .lighted_column {
    background-color: #fad163;
  }

</style>