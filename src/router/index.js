import { createWebHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import AddTransaction from "../components/AddTransaction.vue";


const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/addTransaction', component: AddTransaction, name: 'AddTransaction' },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router