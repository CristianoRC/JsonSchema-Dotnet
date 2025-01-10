import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { JsonForms } from '@jsonforms/vue'

const app = createApp(App)
app.component('json-forms', JsonForms)
app.mount('#app')
