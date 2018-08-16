<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Дома</h4>
      <div v-drag style="position: absolute; border: 1px solid red; display: block; padding: 50px; background-color: #00a6b2; left:400px; top: 20px;">TEST</div>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Список домов, зарегистрированных в системе</div>
      </div>
      <div class="card-content row">
        <div class="col-lg-1">
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
        <div v-can:see="['provider']" class="col-lg-3">
          <el-select
                  clearable
                  class="select-default"
                  v-model="model_operator.org_id"
                  v-on:change="getHouseholdersByOperator"
                  placeholder="Выберите оператора">
            <el-option
                    class="select-default"
                    label="- Все операторы -"
                    value="">
            </el-option>
            <el-option
                    class="select-default"
                    v-for="item in operators"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div v-can:see="['provider', 'operator']" class="col-lg-3">
          <el-select
                  clearable
                  class="select-default"
                  v-model="householder"
                  v-on:change="handleFilter"
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
        <div class="col-sm-5">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search records" v-model="searchQuery" aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <el-table class="table-striped"
                    :data="queriedData"
                    ref="mmmsss"
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
              <template slot-scope="scope">
                <span v-if="column.prop === 'address'">
                    <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="gotoHouseCard(scope.row.id)">{{ scope.row.address }}</a>
                </span>
                <span v-else-if="column.prop === 'binding'">
                  <span v-if="scope.row[column.prop]">
                    Есть <span class="ti-check"></span> <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="handleViewBinding(scope.row, scope.column, scope.$index)">Просмотр</a>
                  </span>
                  <span v-else>
                    –
                  </span>
                </span>
                <span v-else>
                  {{ scope.row[column.prop] }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
                    :min-width="120"
                    fixed="right"
                    label="Actions">
              <template slot-scope="props">
                <a v-can:see="['provider', 'operator']" class="btn btn-simple btn-xs btn-warning btn-icon edit" @click="handleEdit(props.$index, props.row)"><i class="ti-pencil-alt"></i></a>
                <a v-can:see="['provider', 'operator']" class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a>
              </template>
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
        <div v-can:see="['provider', 'operator']" class="col-sm-12 text-center">
          <button type="button" @click="gotoAdd" class="btn btn-fill btn-info btn-wd">Добавить дом</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
  import drag from 'src/components/Dashboard/Views/TeamtimeBpm/mixins/draggable.js'
  import credentials from 'src/api/credentials.js'
  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, Loading} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import * as types from 'src/store/mutation-types.js'
  import { router } from 'src/main'
  import { mapState } from 'vuex'

  // Axios
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import swal from 'sweetalert2'
  import userCanSee from 'src/plugins/userCanSee.js'

  Vue.use(userCanSee)
  Vue.use(VueAxios, axios)
  axios.defaults.timeout = 5000
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  axios.defaults.withCredentials = false
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Loading)

  export default{
    directives: {
      drag
    },
    components: {
      PPagination
    },
    computed: {
      ...mapState('base', ['householders', 'operators']),
      ...mapState('common', ['userType', 'userToken', 'userId']),
      tableColumns () {
        var result = [
          {
            prop: 'id',
            label: 'ID',
            minWidth: 70
          },
          {
            prop: 'address',
            label: 'Адрес дома',
            minWidth: 400
          }
        ]
        var role = this.userType
        switch (role) {
          case ('provider'): {
            let columns = [
              {
                prop: 'binding',
                label: 'Оборудование',
                minWidth: 250
              },
              {
                prop: 'householder',
                label: 'Домовладелец',
                minWidth: 300
              },
              {
                prop: 'operator',
                label: 'Оператор',
                minWidth: 300
              }
            ]
            result = result.concat(columns)
            break
          }
          case ('operator'): {
            let columns = [
              {
                prop: 'binding',
                label: 'Оборудование',
                minWidth: 250
              },
              {
                prop: 'householder',
                label: 'Домовладелец',
                minWidth: 300
              }
            ]
            result = result.concat(columns)
            break
          }
          case ('householder'): {
            let columns = []
            result = result.concat(columns)
            break
          }
          default: { }
        }
        return result
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
      this.model.org_id = this.userId
      this.api = credentials.appix_api + '/houses?org_id=' + this.householder // store.getters.getUserId
      axios.defaults.headers.common['X-AUTH-TOKEN'] = this.userToken
      axios.get(this.api)
              .then(response => {
                this.loading2 = false
                // JSON responses are automatically parsed.
                this.tableData = response.data
              })
              .catch(e => {
                this.errors.push(e)
              })
      this.$store.dispatch('base/listHouseholders', this.$data.model)
      this.$store.dispatch('base/listOperators', this.$data.model)
    },
    data () {
      return {
        householder: '',
        operator: '',
        model: {
          error: '',
          org_id: ''
        },
        model_operator: {
          error: '',
          org_id: ''
        },
        api: '',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: ['address'],
        tableData: [],
        loading2: true
      }
    },
    methods: {
      handleFilter () {
        this.api = credentials.appix_api + '/houses?org_id=' + this.householder // store.getters.getUserId
        axios.defaults.headers.common['X-AUTH-TOKEN'] = this.userToken
        axios.get(this.api)
                .then(response => {
                  this.loading2 = false
                  // JSON responses are automatically parsed.
                  this.tableData = response.data
                })
                .catch(e => {
                  this.errors.push(e)
                })
      },
      handleViewBinding (row, col, index) {
        this.$store.commit('base/' + types.KEEP_HOUSEID, row.id)
        router.push('/equipment')
      },
      getHouseholdersByOperator () {
        this.$store.dispatch('base/listHouseholders', this.$data.model_operator)
      },
      handleEdit (index, row) {
        router.push('/houses/edit/' + row.id)
      },
      gotoAdd () {
        router.push('/houses/add')
      },
      gotoHouseCard (houseId) {
        router.push('/houses/info/' + houseId)
      },
      handleDelete (index, row) {
        swal({
          title: 'Вы уверены?',
          html: '<pre><strong>' + row.address + '</strong></pre>',
          type: 'warning',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-full-width',
          showCancelButton: true,
          confirmButtonText: 'Удалить дом!'
        }).then((result) => {
          if (result) {
            this.$store.dispatch('base/deleteHouse', { row: row, table: this.tableData })
          }
        }).catch(swal.noop)
      }
    }
  }
</script>
<style>
</style>