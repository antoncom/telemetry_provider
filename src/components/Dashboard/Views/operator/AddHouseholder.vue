<template>
  <div class="card">
    <form class="form-horizontal">
      <div class="card-header">
        <h4 class="card-title">
          Заполните данные домовладельца:
        </h4>
      </div>
      <div class="card-content">
        <fieldset v-if="this.$store.getters.userType === 'provider'">
          <div class="form-group">
            <label class="col-sm-2 control-label">Выберите оператора</label>
            <div class="col-sm-6">
              <el-select
                      clearable
                      class="select-default"
                      v-model="model.operator"
                      placeholder="Выберите оператора">
                <el-option
                        class="select-default"
                        v-for="item in operators"
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
          <label class="col-sm-2 control-label">Название домовладельца</label>
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
          <label class="col-sm-2 control-label">Адрес домовладельца</label>
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
        <button type="submit" @click.prevent="validate" class="btn btn-fill btn-info btn-wd">Сохранить домовладельца</button>
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
    created () {
      if (this.$store.getters.userType === 'provider') {
        this.$store.dispatch('listOperators', this.$data.model)
      }
    },
    computed: {
      ...mapFields(['operator', 'name', 'email', 'tin', 'address', 'username', 'password', 'confirmedPassword', 'generate_password']),
      operators () {
        return this.$store.getters.operators
      },
      'model.operator' () {
        // if authorized as operator then org_id=userid
        // otherwise org_id got from dropdown in the add householder form
        var result = ''
        if (this.$store.getters.userType === 'operator') {
          result = this.$store.getters.getUserId
        }
        return result
      }
    },
    data () {
      return {
        model: {
          operator: '',
          name: 'Домовладелец №100',
          email: 'd100@mail.ru',
          tin: '121503842042',
          address: '424032, г. Йошкар-Ола, ул. Мира, д.8',
          username: 'hh101',
          password: '',
          confirmedPassword: '',
          generate_password: true,
          error: '',
          status: ''
        },
        modelValidations: {
          operator: {
            required: true
          },
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
          console.log('== VALIDATED ==')
          // this.$emit('on-submit', this.registerForm, isValid)
          this.addHouseholder()
        })
      },
      addHouseholder () {
        this.$store.dispatch('addHouseholder', this.$data.model)
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
