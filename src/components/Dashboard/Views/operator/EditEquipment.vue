<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          Введите данные прибора с системным адресом {{model.address}}:
        </h4>
      </div>
      <div class="card-content">
        <fieldset>
          <div class="form-group">
            <label class="col-sm-2 control-label">Линия 1</label>
            <div class="col-sm-6">
              <input type="text"
                     name="line1_name"
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
            <div class="col-sm-4">
              <input type="text"
                     name="line2_name"
                     v-validate="modelValidations.line1_name"
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

  // Localize takes the locale object as the second argument (optional) and merges it.
  Validator.localize('ru', ru)
  // Install the Plugin.
  Vue.use(VeeValidate)

  export default {
    computed: {
      ...mapFields(['address', 'line1_name', 'line2_name'])
    },
    mounted () {
      this.$data.model.id = this.$route.params.id
      this.$store.dispatch('base/getEquipment', this.$data.model)
    },
    data () {
      return {
        model: {
          id: '',
          line1_name: '',
          line2_name: '',
          error: '',
          status: ''
        },
        modelValidations: {
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
          this.editEquipment()
        })
      },
      editEquipment () {
        this.$store.dispatch('base/editEquipment', this.$data.model)
      }
    }
  }
</script>
<style>
</style>
