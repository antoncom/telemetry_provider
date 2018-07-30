<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Операторы системы</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Список операторов, зарегистрированных в системе</div>
      </div>
      <div class="card-content row">
        <div class="col-sm-6">
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
        <div class="col-sm-6">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search records" v-model="searchQuery" aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
          <el-table class="table-striped"
                    ref="householders"
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
            <el-table-column
                    :min-width="120"
                    fixed="right"
                    label="Actions">
              <template slot-scope="props">
                <a class="btn btn-simple btn-xs btn-warning btn-icon edit" @click="handleEdit(props.$index, props.row)"><i class="ti-pencil-alt"></i></a>
                <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a>
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
        <div class="col-sm-12 text-center">
          <button type="button" @click="gotoAdd" class="btn btn-fill btn-info btn-wd">Добавить оператора</button>
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

  // import routes from 'src/routes/routes'
  import {router} from 'src/main'

  import swal from 'sweetalert2'

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
      this.api = credentials.appix_api + '/operators'
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
    },
    data () {
      return {
        api: '',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: ['address', 'tin', 'name', 'email'],
        tableColumns: [
          {
            prop: 'id',
            label: 'ID',
            minWidth: 70
          },
          {
            prop: 'name',
            label: 'Название оператора',
            minWidth: 200
          },
          {
            prop: 'tin',
            label: 'ИНН',
            minWidth: 200
          },
          {
            prop: 'address',
            label: 'Адрес оператора',
            minWidth: 300
          },
          {
            prop: 'email',
            label: 'Email',
            minWidth: 120
          }
        ],
        tableData: [],
        loading2: true
      }
    },
    methods: {
      handleEdit (index, row) {
        router.push('/operators/edit/' + row.id)
      },
      gotoAdd () {
        router.push('/operators/add')
      },
      handleDelete (index, row) {
        swal({
          title: 'Вы уверены?',
          html: '<pre><strong>' + row.name + '\n</strong>' + row.address + '</pre>',
          type: 'warning',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-full-width',
          showCancelButton: true,
          confirmButtonText: 'Удалить оператора!'
        }).then((result) => {
          if (result) {
            this.$store.dispatch('deleteOperator', { row: row, table: this.tableData })
          }
        }).catch(swal.noop)
      }
    }
  }
</script>
<style>
</style>
