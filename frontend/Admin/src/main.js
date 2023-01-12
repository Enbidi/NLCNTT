import { createApp } from 'vue'
import App from './App.vue'
import SmartTable from 'vuejs-smart-table'
// import './assets/main.css'
console.log(SmartTable)
var app = createApp(App);
app.use(SmartTable)
app.mount("#app")