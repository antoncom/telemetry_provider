import store from 'src/store/index.js'

function install (Vue) {
  Vue.directive('can', {
    inserted: (el, binding, vnode) => {
      if (binding.arg === 'see') {
        if (binding.value && binding.value.length > 0) {
          let whoCanSee = binding.value
          let userRole = store.getters.userType
          if (whoCanSee.indexOf(userRole) === -1) {
            el.parentNode.removeChild(el)
          }
        }
      }
    }
  })
}
export default install
