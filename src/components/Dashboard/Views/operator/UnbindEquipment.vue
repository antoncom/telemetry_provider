<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          Выберите линии для отвязки прибора [{{model.address}}]:
        </h4>
      </div>
      <div class="card-content">
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
              {{model.line1_name}}
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
              {{model.line2_name}}
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
      houses () {
        return store.state.houses
      }
    },
    mounted () {
      this.$data.model.id = this.$route.params.id
      this.$store.dispatch('getEquipment', this.$data.model)
    },
    data () {
      return {
        model: {
          id: null,
          address: '',
          error: '',
          status: '',
          line1: false,
          line2: false,
          line1_name: '',
          line2_name: ''
        },
        modelValidations: {
          line1: {
            required: false
          },
          line2: {
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
          this.unbindEquipment()
        })
      },
      unbindEquipment () {
        this.$store.dispatch('unbindEquipment', this.$data.model)
      }
    }
  }
</script>
<style>
</style>
