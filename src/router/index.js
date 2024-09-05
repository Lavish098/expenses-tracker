import { createWebHistory, createRouter } from 'vue-router'

import Home from '../components/Home.vue'
import AddIncome from "../components/AddIncome.vue";
import AddExpense from "../components/AddExpense.vue";
import AllTransactions from "../components/AllTransactions.vue";
import Overview from "../components/Overview.vue";

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/addIncome', component: AddIncome, name: 'AddIncome' },
  { path: '/addExpense', component: AddExpense, name: 'AddExpense' },
  { path: '/allTransactions', component: AllTransactions, name: 'AllTransactions' },
  { path: '/Overview', component: Overview, name: 'Overview' },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router