<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          Введите данные прибора:
        </h4>
      </div>
      <div class="card-content">
        <fieldset>
          <div class="form-group">
            <label class="col-sm-2 control-label">Выберите адрес дома</label>
            <div class="col-sm-6">
              <el-select
                      clearable
                      class="select-default"
                      v-model="model.house_id"
                      placeholder="Адрес дома">
                <el-option
                        class="select-default"
                        v-for="item in houses"
                        :key="item.id"
                        :label="item.address"
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
          <label class="col-sm-2 control-label">Адрес прибора</label>
          <div class="col-sm-6">
            <input type="text"
               name="address"
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
        <fieldset>
          <div class="form-group">
            <label class="col-sm-2 control-label">Линия 1</label>
            <div class="col-sm-2">
              <p-switch v-model="model.line1">
                <i class="fa fa-check" slot="on"></i>
                <i class="fa fa-times" slot="off"></i>
              </p-switch>
            </div>
            <div class="col-sm-4">
              <input type="text"
                     name="url"
                     v-validate="modelValidations.line1_name"
                     v-model="model.line1_name"
                     class="form-control">
              <small class="text-danger" v-show="line1_name.invalid">
                {{ getError('line1_name') }}
              </small>
            </div>
            <div class="col-sm-4">
              <code></code>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div class="form-group">
            <label class="col-sm-2 control-label">Линия 2</label>
            <div class="col-sm-2">
              <p-switch v-model="model.line2">
                <i class="fa fa-check" slot="on"></i>
                <i class="fa fa-times" slot="off"></i>
              </p-switch>
            </div>
            <div class="col-sm-4">
              <input type="text"
                     name="url"
                     v-validate="modelValidations.line2_name"
                     v-model="model.line2_name"
                     class="form-control">
              <small class="text-danger" v-show="line2_name.invalid">
                {{ getError('line2_name') }}
              </small>
            </div>
            <div class="col-sm-4">
              <code></code>
            </div>
          </div>
        </fieldset>
        <div class="col-md-4">
        </div>
        <div class="alert alert-danger" v-show="model.error">
          <button type="button" class="close" v-on:click="model.error=''">×</button>
          <span>{{ model.error }}</span>
        </div>
      </div>
      <div class="card-footer text-center">
        <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info btn-wd">Сохранить изменения</button>
      </div>
    </form>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import VeeValidate, { mapFields, Validator } from 'vee-validate'
  import ru from 'vee-validate/dist/locale/ru'
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  import { mapState } from 'vuex'

  // Localize takes the locale object as the second argument (optional) and merges it.
  Validator.localize('ru', ru)
  // Install the Plugin.
  Vue.use(VeeValidate)

  export default {
    components: {
      PSwitch
    },
    computed: {
      ...mapFields(['address', 'line1', 'line2', 'line1_name', 'line2_name']),
      ...mapState('base', ['houses'])
    },
    created () {
      this.$store.dispatch('base/listHouses', this.$data.model)
    },
    data () {
      return {
        model: {
          address: '123456',
          error: '',
          status: '',
          house_id: '',
          org_id: '',
          line1: false,
          line2: false,
          line1_name: '',
          line2_name: ''
        },
        modelValidations: {
          address: {
            required: true
          },
          house_id: {
            required: true
          },
          line1: {
            required: false
          },
          line2: {
            required: false
          },
          line1_name: {
            required: false
          },
          line2_name: {
            required: false
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
          this.addEquipment()
        })
      },
      addEquipment () {
        this.$store.dispatch('base/addEquipment', this.$data.model)
      }
    }
  }
</script>
<style>
</style>
