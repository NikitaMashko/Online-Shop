import Vue from 'vue'
import App from './App.vue'
import store from "@/vuex/store"
import router from './router/router'
import { library } from "@fortawesome/fontawesome-svg-core"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

library.add(faTrashCan, faCartPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')

