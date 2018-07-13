<template>
  <div class="row">
    <div class="col-md-12">
      <h4 class="title">Дома</h4>
    </div>
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Список домов, зарегистрированных в системе</div>
      </div>
      <div class="card-content row">
        <div class="col-sm-2">
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
        <div v-if="userCanSee()" class="col-sm-6">
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
        <div class="col-sm-4">
          <div class="pull-right">
            <label>
              <input type="search" class="form-control input-sm" placeholder="Search records" v-model="searchQuery" aria-controls="datatables">
            </label>
          </div>
        </div>
        <div class="col-sm-12">
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
              <template slot-scope="scope">
                <span v-if="column.prop === 'address'">
                    <a class="btn btn-simple btn-xs btn-danger btn-icon remove"  @click="gotoHouseCard(scope.row.id)">{{ scope.row.address }}</a>
                </span>
                <span v-else>
                  {{ scope.row[column.prop] }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
                    v-if="userCanSee()"
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
        <div v-if="userCanSee()" class="col-sm-12 text-center">
          <button type="button" @click="gotoAdd" class="btn btn-fill btn-info btn-wd">Добавить дом</button>
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
  import {router} from 'src/main'

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
      householders () {
        return store.state.householders
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
//      org_id () {
//        return this.houseHolderId
//      }
    },
    created () {
      this.model.org_id = store.getters.getUserId
      this.api = credentials.appix_api + '/houses?org_id=' + this.householder // store.getters.getUserId
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
      this.$store.dispatch('listHouseholders', this.$data.model)
    },
    data () {
      return {
        householder: '',
//        houseHolderId: '',
        model: {
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
        tableColumns: [
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
        ],
        tableData: [],
        loading2: true
      }
    },
    methods: {
      handleFilter () {
        this.api = credentials.appix_api + '/houses?org_id=' + this.householder // store.getters.getUserId
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
      handleEdit (index, row) {
        router.push('/houses/edit/' + row.id)
      },
      userCanSee () {
        console.log('userCanSee', (store.state.userType === 'provider' || store.state.userType === 'operator'))
        return (store.state.userType === 'provider' || store.state.userType === 'operator')
      },
      gotoAdd () {
        router.push('/houses/add')
      },
      gotoHouseCard (houseId) {
        router.push('/houses/info/' + houseId)
      },
      handleDelete (index, row) {
        Vue.swal({
          title: 'Вы уверены?',
          html: 'После удаления данные дома будут потеряны: <strong>' + row.address + '</strong>',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Да, удалить!'
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch('deleteHouse', { row: row, table: this.tableData })
          }
        })
      }
    }
  }
</script>
<style>
  .swal2-icon.swal2-warning {
    font-size: 21px;
  }
</style>
