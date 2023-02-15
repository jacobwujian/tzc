import store from '@/store'


/**
 * <a-button v-if="$auth('form.edit')">Button</a-button>
 * @param Vue
 */
function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return (permissions) => {
          const permissionCodes = store.getters.userInfo && store.getters.userInfo.permissionCodes
          return permissionCodes && permissionCodes.includes(permissions)
        }
      }
    }
  })
}

export default plugin
