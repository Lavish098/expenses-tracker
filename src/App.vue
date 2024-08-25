<template>
  <div>
    <Nav />
  <RouterView />    
  </div>
</template>

<script setup>
import '../fontawesome-free-5.15.1-web/css/all.css'
import Nav from './components/Nav.vue'
import { transactionStore } from "./store/index";
import { onMounted } from 'vue'


const store = transactionStore();


onMounted(() => {
  store.loadTransactions();
});


</script>
