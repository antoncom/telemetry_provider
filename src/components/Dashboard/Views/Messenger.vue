<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <div class="category">Предварительный макет мессенджера (цвета будут поправлены, как и прочее)</div>
      </div>
      <div class="card-content row">
        <app></app>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">

  import Vue from 'vue'
  import {Table, TableColumn, Select, Option, Loading} from 'element-ui'
  import PPagination from 'src/components/UIComponents/Pagination.vue'
  import App from 'src/components/Dashboard/Views/Messenger/App.vue'

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

  export default{
    components: {
      PPagination,
      App
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
      axios.get(this.api_operators)
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
        api_operators: '/operators?key=ddde2fd0',
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
          total: 0
        },
        searchQuery: '',
        propsToSearch: ['company', 'inn', 'location'],
        tableColumns: [
          {
            prop: 'reg_date',
            label: 'Регистрация',
            minWidth: 70
          },
          {
            prop: 'inn',
            label: 'ИНН',
            minWidth: 60
          },
          {
            prop: 'company',
            label: 'Компания',
            minWidth: 100
          },
          {
            prop: 'location',
            label: 'География',
            minWidth: 100
          },
          {
            prop: 'contracted',
            label: 'Статус контракта',
            minWidth: 80
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
      handleLike (index, row) {
        alert(`Your want to like ${row.inn}`)
      },
      handleEdit (index, row) {
        alert(`Your want to edit ${row.inn}`)
      },
      handleDelete (index, row) {
        let indexToDelete = this.tableData.findIndex((tableRow) => tableRow.id === row.id)
        if (indexToDelete >= 0) {
          this.tableData.splice(indexToDelete, 1)
        }
      }
    }
  }
</script>
<style>
</style>
