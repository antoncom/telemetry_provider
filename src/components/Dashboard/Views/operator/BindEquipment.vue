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
            <label class="col-sm-2 control-label">Адрес дома</label>
            <div class="col-sm-6" style="padding-top: 12px;">
              {{ house_address }}
            </div>
            <div class="col-sm-4">
              <code></code>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div class="form-group">
          <label class="col-sm-2 control-label">Адрес прибора</label>
          <div class="col-sm-6" style="padding-top: 12px;">
            {{ $route.query.eq_address }}
          </div>
          <div class="col-sm-4">
            <code></code>
          </div>
          </div>
        </fieldset>
        <fieldset v-if="$route.query.line === 'line1'">
          <div class="form-group">
            <label class="col-sm-2 control-label">Линия 1</label>
            <div class="col-sm-6">
              <input type="text"
                     name="url"
                     v-validate="modelValidations.line1_name"
                     v-model="model.line1_name"
                     class="form-control"
                     placeholder="напр. Подъезд №1 тепловычислитель">
              <small class="text-danger" v-show="line1_name.invalid">
                {{ getError('line1_name') }}
              </small>
            </div>
            <div class="col-sm-4">
              <code></code>
            </div>
          </div>
        </fieldset>
        <fieldset v-if="$route.query.line === 'line2'">
          <div class="form-group">
            <label class="col-sm-2 control-label">Линия 2</label>
            <div class="col-sm-6">
              <input type="text"
                     name="url"
                     v-validate="modelValidations.line2_name"
                     v-model="model.line2_name"
                     class="form-control"
                     placeholder="напр. Подъезд №2 тепловычислитель">
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
        <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info btn-wd">Привязать прибор</button>
      </div>
    </form>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import VeeValidate, { mapFields, Validator } from 'vee-validate'
  import ru from 'vee-validate/dist/locale/ru'
  import PSwitch from 'src/components/UIComponents/Switch.vue'

  import store from 'src/store/index.js'

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
      house_address () {
        var address = ''
        var houses = store.getters.getHouses
        for (var h of houses) {
          if (h.id === store.getters.selectedHouse) {
            address = h.address
            break
          }
        }
        return address
      }
    },
    created () {
      this.$store.dispatch('listHouses', this.$data.model)
      this.model[this.$route.query.line] = true // e.g. model.line1=true
      this.model.house_id = store.getters.selectedHouse
      this.model.address = this.$route.query.eq_address
    },
    data () {
      return {
        model: {
          address: '',
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
        this.$store.dispatch('addEquipment', this.$data.model)
      }
    }
  }
</script>
<style>
</style>
