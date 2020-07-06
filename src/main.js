import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import axios from 'axios'
import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
// import VueI18n from 'vue-i18n'
import Plugins from '@/plugins'
import VueProgressBar from 'vue-progressbar'

// import plugins
import './plugins/validation'
import i18n from './plugins/i18n'

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Viser)
Vue.use(Antd)
// Vue.use(VueI18n)
Vue.use(Plugins)
Vue.use(VueProgressBar, options)

// const i18n = new VueI18n({
//   locale: 'CN',
//   fallbackLocale: 'US',
//   silentFallbackWarn: true
// })

new Vue({
  router,
  store,
  i18n: i18n, // language
  render: h => h(App)
}).$mount('#app')
