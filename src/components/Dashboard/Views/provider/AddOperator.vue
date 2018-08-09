<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          Заполните данные оператора:
        </h4>
      </div>
      <div class="card-content">
        <fieldset>
          <div class="form-group">
          <label class="col-sm-2 control-label">Название оператора</label>
          <div class="col-sm-6">
            <input type="text"
               name="name"
               v-validate="modelValidations.name"
               v-model="model.name"
               class="form-control">
            <small class="text-danger" v-show="name.invalid">
              {{ getError('name') }}
            </small>
          </div>
          <div class="col-sm-4">
            <code>Обязательно</code>
          </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="form-group">
          <label class="col-sm-2 control-label">Email</label>
          <div class="col-sm-6">
            <input type="email"
               name="email"
               v-validate="modelValidations.email"
               v-model="model.email"
               class="form-control"
               data-vv-delay="1000">
            <small class="text-danger" v-show="email.invalid">
              {{ getError('email') }}
            </small>
          </div>
          <div class="col-sm-4">
            <code>Валидный Email</code>
          </div>
          </div>
        </fieldset>

        <fieldset>
          <div class="form-group">
          <label class="col-sm-2 control-label">ИНН</label>
          <div class="col-sm-6">
            <input type="number"
               name="number"
               v-validate="modelValidations.tin"
               v-model="model.tin"
               class="form-control">
            <small class="text-danger" v-show="tin.invalid">
              {{ getError('number') }}
            </small>
          </div>
          <div class="col-sm-4">
            <code></code>
          </div>
          </div>
        </fieldset>
        <fieldset>
          <div class="form-group">
          <label class="col-sm-2 control-label">Адрес оператора</label>
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
        <fieldset>
          <div class="form-group">
            <label class="col-sm-2 control-label">Имя пользователя</label>
            <div class="col-sm-6">
              <input type="text"
                     name="username"
                     v-validate="modelValidations.username"
                     v-model="model.username"
                     class="form-control">
              <small class="text-danger" v-show="username.invalid">
                {{ getError('username') }}
              </small>
            </div>
            <div class="col-sm-4">
              <code>Обязательно</code>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div class="form-group column-sizing">
            <label class="col-sm-2 control-label">Пароль</label>
            <div class="col-sm-3"  v-if="!this.model.generate_password">
              <!-- <input :type="type" class="form-control" :placeholder="placeholder" :value="password"> -->
              <input class="form-control"
                 name="password"
                 placeholder="Придумайте пароль"
                 v-validate ="{ rules: { required: !this.model.generate_password } }"
                 v-model="model.password"
                 type="text">
              <small class="text-danger" v-show="password.invalid">
                {{ getError('password') }}
              </small>
            </div>
            <div class="col-sm-3" v-if="!this.model.generate_password">
              <input class="form-control"
                 name="confirmedPassword"
                 placeholder="Подтвердите пароль"
                 v-validate ="modelValidations.confirmedPassword"
                 v-model="model.confirmedPassword"
                 type="text">
              <small class="text-danger" v-show="confirmedPassword.invalid">
                {{ getError('confirmedPassword') }}
              </small>
            </div>
            <template v-if="!this.model.generate_password">
              <div class="col-sm-4 col-sm-offset-2">
                <p-checkbox v-model="model.generate_password">Генерировать пароль автоматически</p-checkbox>
              </div>
            </template>
            <template v-else>
              <div class="col-sm-4 col-sm-offset-0">
                <p-checkbox v-model="model.generate_password">Генерировать пароль автоматически</p-checkbox>
              </div>
            </template>
          </div>
        </fieldset>
        <div class="alert alert-danger" v-show="model.error">
          <button type="button" class="close" v-on:click="model.error=''">×</button>
          <span>{{ model.error }}</span>
        </div>
      </div>
      <div class="card-footer text-center">
        <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info btn-wd">Сохранить оператора</button>
      </div>
    </form>
  </div>
</template>
<script type="text/babel">
  import Vue from 'vue'
  import VeeValidate, { mapFields, Validator } from 'vee-validate'
  import ru from 'vee-validate/dist/locale/ru'

  // import SweetAlert from 'vue-sweetalert2-component'

//  import MyComponent from 'src/components/Dashboard/Views/provider/MyComponent.vue'

  // Localize takes the locale object as the second argument (optional) and merges it.
  Validator.localize('ru', ru)
  // Install the Plugin.
  Vue.use(VeeValidate)

  export default {
    computed: {
      ...mapFields(['name', 'email', 'tin', 'address', 'username', 'password', 'confirmedPassword', 'generate_password'])
    },
    data () {
      return {
        model: {
          name: 'Оператор №1',
          email: 'op1@mail.ru',
          tin: '121603842042',
          address: '424000, г. Йошкар-Ола, ул. Петрова, д.8',
          username: 'op1',
          password: '',
          confirmedPassword: '',
          generate_password: true,
          error: '',
          status: ''
        },
        modelValidations: {
          name: {
            required: true,
            max: 64
          },
          email: {
            required: true,
            email: true
          },
          tin: {
            required: false,
            decimal: true,
            min: 8,
            max: 14
          },
          address: {
            required: false
          },
          username: {
            required: true
          },
          password: {
            required: true,
            min: 6,
            max: 36
          },
          confirmedPassword: {
            required: true,
            confirmed: 'password'
          },
          generate_password: {
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
          this.addOperator()
        })
      },
      addOperator () {
        this.$store.dispatch('base/addOperator', this.$data.model)
      }
    }
  }
</script>
<style>
  .swal-password {
    min-width: 400px;
  }
  .table.password tr td {
    text-align: left;
    font-size: 18px;
  }
  .table.password tr td:last-child {
    font-weight: bolder;
  }
</style>
