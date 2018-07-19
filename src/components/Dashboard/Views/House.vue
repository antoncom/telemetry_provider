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
                  <div class="col-lg-3" style="text-align: left; margin-top: 5px;">
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
                        <!--============= Table =============-->
                        <div class="col-sm-12">
                          <el-table class="table-striped"
                                    ref="consht"
                                    :data="queriedData"
                                    border
                                    v-loading="loading2"
                                    element-loading-text="Ждите..."
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.8)"
                                    style="width: 100%">
                            <el-table-column v-for="column in consumption_tableColumns"
                                             sortable
                                             :key="column.label"
                                             :min-width="column.minWidth"
                                             :prop="column.prop"
                                             :label="column.label">
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
                    <div class="col-lg-3" style="text-align: left; margin-top: 5px;">
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
                          <!--============= Table =============-->
                          <div class="col-sm-12">
                            <el-table class="table-striped"
                                      ref="consht"
                                      :data="queriedData"
                                      border
                                      v-loading="loading2"
                                      element-loading-text="Ждите..."
                                      element-loading-spinner="el-icon-loading"
                                      element-loading-background="rgba(0, 0, 0, 0.8)"
                                      style="width: 100%">
                              <el-table-column v-for="column in consumption_tableColumns"
                                               sortable
                                               :key="column.label"
                                               :min-width="column.minWidth"
                                               :prop="column.prop"
                                               :label="column.label">
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
                    <div class="col-lg-3" style="text-align: left; margin-top: 5px;">
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
                          <!--============= Table =============-->
                          <div class="col-sm-12">
                            <el-table class="table-striped"
                                      ref="consht"
                                      :data="queriedData"
                                      border
                                      v-loading="loading2"
                                      element-loading-text="Ждите..."
                                      element-loading-spinner="el-icon-loading"
                                      element-loading-background="rgba(0, 0, 0, 0.8)"
                                      style="width: 100%">
                              <el-table-column v-for="column in consumption_tableColumns"
                                               sortable
                                               :key="column.label"
                                               :min-width="column.minWidth"
                                               :prop="column.prop"
                                               :label="column.label">
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
  import LineChart from 'src/components/UIComponents/Chartsjs/LineChart.js'
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
        if (this.$store.getters.consumption_data.length && this.$store.getters.consumption_data.length > 0) {
          var dataArray = this.$store.getters.consumption_data
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
        if (this.$store.getters.consumption_data.length && this.$store.getters.consumption_data.length > 0) {
          var dataArray = this.$store.getters.consumption_data
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