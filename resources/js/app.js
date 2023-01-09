import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import './bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import '../sass/app.scss'

const app = createApp(App)

app.use(Vuex)
app.use(router)
app.use(store)


app.mixin({
  beforeRouteEnter(to, from, next) {
    if (to.meta.layout === MainLayout) {
      next(vm => vm.$emit('set-layout', to.meta.layout))
    } else {
      next()
    }
  }
})

app.mount('#app')
