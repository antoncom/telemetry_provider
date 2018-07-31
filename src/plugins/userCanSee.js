import store from 'src/store/index.js'

function install (Vue) {
  Vue.directive('can', {
    bind (el, binding, vnode, oldVnode) {
      if (binding.arg === 'see') {
        if (binding.value && binding.value.length > 0) {
          let whoCanSee = binding.value
          let userRole = store.getters.userType
          if (whoCanSee.indexOf(userRole) >= 0) {
            el.style.visibility = 'visible'
          } else {
            el.style.visibility = 'hidden'
          }
        }
      }
    }
  })
}
export default install
