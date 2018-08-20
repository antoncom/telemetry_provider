import { Wormhole } from 'portal-vue'

// //////////////////////////////////////
// mixin code
// //////////////////////////////////////
export const whormHoleMixin = {
  data () {
    return {
    }
  },
  methods: {
    sendToPortalTarget () {
      var ports = []
      for (var ref in this.$refs) {
        if (this.$refs[ref][0].portTypes !== undefined) {
          var children = this.$refs[ref][0].$children
          for (var i = 0; i < children.length; i++) {
            var child = children[i]
            if (child.portStyle !== undefined) {
              ports.push(child.$vnode)
            }
          }
        }
      }
      // var pass = [this.$createElement('p', 'aaaaaaaaaaa')]
      Wormhole.open({
        to: 'globalports',
        from: 'localports',
        passengers: ports
      })
    },
    clearPortalTarget () {
      console.log('------------ CLOSE HOLE')
      Wormhole.close({
        to: 'globalports'
      }, true)
    }
  }
}
