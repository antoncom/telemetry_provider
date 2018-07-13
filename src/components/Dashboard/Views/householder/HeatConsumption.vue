<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Потребление тепла</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Теплопотребление дома {{ model.house_address }}</div>
      </div>
      <div class="card-content row">
        <div v-if="userCanSee()" class="col-sm-2">
          <el-select
                  clearable
                  class="select-default"
                  v-model="model.org_id"
                  v-on:change="handleFilter('householder')"
                  placeholder="Выберите домовладельца">
            <el-option
                    class="select-default"
                    label="- Все домовладельцы -"
                    value="">
            </el-option>
            <el-option
                    class="select-default"
                    v-for="item in householders"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div v-if="userCanSee()" class="col-sm-4">
          <el-select
                  clearable
                  class="select-default"
                  v-model="model.house_id"
                  v-on:change="handleFilter('house')"
                  placeholder="Выберите адрес дома">
            <el-option
                    class="select-default"
                    label="- Все дома -"
                    value="">
            </el-option>
            <el-option
                    class="select-default"
                    v-for="item in houses"
                    :key="item.id"
                    :label="item.address"
                    :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="col-sm-4 pull-right">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search records" v-model="searchQuery" aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <!--<el-table class="table-striped"-->
                  <!--:data="pagedData"-->
                  <!--border-->
                  <!--v-loading="loading2"-->
                  <!--element-loading-text="Ждите..."-->
                  <!--element-loading-spinner="el-icon-loading"-->
                  <!--element-loading-background="rgba(0, 0, 0, 0.8)"-->
                  <!--style="width: 100%">-->
            <!--<el-table-column v-for="column in tableColumns"-->
                             <!--sortable-->
                             <!--:key="column.label"-->
                             <!--:min-width="column.minWidth"-->
                             <!--:prop="column.prop"-->
                             <!--colspan="{{ (column.prop === 'name') ? 12 : 1}}"-->
                             <!--:label="column.label">-->
            <!--</el-table-column>-->
          <!--</el-table>-->
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
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import credentials from 'src/api/credentials.js'
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, Loading} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'

  import store from 'src/store/index.js'

  // Axios
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios)
  axios.defaults.timeout = 5000
  // axios.defaults.baseURL = 'https://my.api.mockaroo.com'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.withCredentials = false

  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Loading)

  export default{
    components: {
      PPagination
    },
    computed: {
      pagedData (prop) {
        var result = []
//        if (prop === 'name') {
//          result = [
//            { name: }
//          ]
//        }
        return this.tableData.slice(this.from, this.to)
      },
      householders () {
        return store.getters.getHouseholders
      },
      houses () {
        return store.getters.getHouses
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
      this.$store.dispatch('listHouseholders', this.$data.model)
      this.$store.dispatch('listHouses', this.$data.model)
      this.model.org_id = store.getters.selectedHouseholder
      this.model.house_id = store.getters.selectedHouse
      this.handleFilter()
    },
    data () {
      return {
        householder: '',
        model: {
          error: '',
          org_id: '',
          house_id: '',
          house_address: '',
          from: '',
          to: ''
        },
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: [],
        tableExpandableRows: [
          {
            prop: 'name',
            label: 'Линия учёта'
          }
        ],
        tableExpandableRowsData: [],

        tableColumns: [
          {
            prop: 'name',
            label: 'Линия учёта',
            minWidth: 500
          },
          {
            prop: 'timestamp',
            label: 'Дата/время',
            minWidth: 100
          },
          {
            prop: 't1',
            label: 't1',
            minWidth: 50
          },
          {
            prop: 't2',
            label: 't2',
            minWidth: 50
          },
          {
            prop: 'line1_name',
            label: 'Название линии 1',
            minWidth: 200
          },
          {
            prop: 'dT',
            label: 'dT',
            minWidth: 50
          },
          {
            prop: 'v1',
            label: 'v1',
            minWidth: 50
          },
          {
            prop: 'v2',
            label: 'v2',
            minWidth: 50
          },
          {
            prop: 'dV',
            label: 'dV',
            minWidth: 50
          },
          {
            prop: 'pV',
            label: 'pV',
            minWidth: 50
          },
          {
            prop: 'p1',
            label: 'p1',
            minWidth: 50
          },
          {
            prop: 'p2',
            label: 'p2',
            minWidth: 50
          },
          {
            prop: 'dP',
            label: 'dP',
            minWidth: 50
          },
          {
            prop: 'q',
            label: 'q',
            minWidth: 50
          }
        ],
        tableData: [],
        loading2: false
      }
    },
    methods: {
      handleFilter (filterType) {
        if (filterType === 'householder') {
          this.model.house_id = ''
          this.house = ''
          store.commit('KEEP_HOUSEHOLDERID', this.model.org_id)
          this.$store.dispatch('listHouses', this.$data.model)
        } else if (filterType === 'house') {
          store.commit('KEEP_HOUSEID', this.model.house_id)
        }
        if (this.model.house_id > 0) {
          this.loading2 = true
          let fromTo = '&from=' + this.model.from + '&to=' + this.model.to
          this.api = credentials.appix_api + '/cons-ht?house_id=' + this.model.house_id + fromTo
          axios.defaults.headers.common['X-AUTH-TOKEN'] = store.getters.getToken
          axios.get(this.api)
                  .then(response => {
                    this.loading2 = false
                    // JSON responses are automatically parsed.
                    this.tableData = response.data
                  })
                  .catch(e => {
                    this.errors.push(e)
                  })
        } else {
          this.model.error = 'Не указан ID дома!'
          this.loading2 = false
          // обнуляем таблицу
          this.tableData = []
        }
      },
      userCanSee () {
        return (store.state.userType === 'provider' || store.state.userType === 'operator')
      }
    }
  }
</script>
<style>
  .swal2-icon.swal2-warning {
    font-size: 21px;
  }
</style>
