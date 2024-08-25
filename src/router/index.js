import { createWebHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import AddTransaction from "../components/AddTransaction.vue";
import AllTransactions from "../components/AllTransactions.vue";


const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/addTransaction', component: AddTransaction, name: 'AddTransaction' },
  { path: '/allTransactions', component: AllTransactions, name: 'AllTransactions' },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router