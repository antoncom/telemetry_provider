<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          Введите данные дома:
        </h4>
      </div>
      <div class="card-content">
        <fieldset>
          <div class="form-group">
            <label class="col-sm-2 control-label">Выберите домовладельца</label>
            <div class="col-sm-6">
              <el-select
                      clearable
                      class="select-default"
                      v-model="model.householder"
                      placeholder="Выберите домовладельца">
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
              <code></code>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div class="form-group">
          <label class="col-sm-2 control-label">Адрес дома</label>
          <div class="col-sm-6">
            <input type="url"
               name="url"
               v-validate="modelValidations.address"
               v-model="model.address"
               class="form-control">
            <small class="text-danger" v-show="address.invalid">
              {{ getError('address') }}
            </small>
          </div>
          <div class="col-sm-4">
            <code></code>
          </div>
          </div>
        </fieldset>
        <div class="alert alert-danger" v-show="model.error">
          <button type="button" class="close" v-on:click="model.error=''">×</button>
          <span>{{ model.error }}</span>
        </div>
      </div>
      <div class="card-footer text-center">
        <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info btn-wd">Сохранить дом</button>
      </div>
    </form>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import VeeValidate, { mapFields, Validator } from 'vee-validate'
  import ru from 'vee-validate/dist/locale/ru'

  import { mapState } from 'vuex'

  // Localize takes the locale object as the second argument (optional) and merges it.
  Validator.localize('ru', ru)
  // Install the Plugin.
  Vue.use(VeeValidate)

  export default {
    computed: {
      ...mapFields(['address']),
      ...mapState('base', ['householders'])
    },
    created () {
      this.$store.dispatch('base/listHouseholders', this.$data.model)
    },
    data () {
      return {
        model: {
          address: '424032, г. Йошкар-Ола, ул. Мира, д.8',
          error: '',
          status: '',
          org_id: '',
          householder: ''
        },
        modelValidations: {
          address: {
            required: true
          },
          householder: {
            required: true
          }
        }
      }
    },
    methods: {
      getError (fieldName) {
        return this.errors.first(fieldName)
      },
      validate () {
        this.$validator.validateAll().then(isValid => {
          this.addHouse()
        })
      },
      addHouse () {
        console.log('MODEL', this.$data.model)
        this.$store.dispatch('base/addHouse', this.$data.model)
      }
    }
  }
</script>
<style>
</style>
