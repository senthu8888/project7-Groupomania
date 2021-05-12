import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
