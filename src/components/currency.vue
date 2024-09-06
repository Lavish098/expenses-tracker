<template>
    <div>
        <select v-model="selectedCountry" @change="handleCountryChange">
      <option value="USA">USA</option>
      <option value="UK">UK</option>
      <option value="EU">EU</option>
      <option value="Japan">Japan</option>
      <option value="India">India</option>
            <option value="Ngn">Nigera</option>

    </select>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { transactionStore } from "../store/index";


const store = transactionStore();

const selectedCountry = ref(store.selectedCountry);

const handleCountryChange = () => {
  store.changeCountry(selectedCountry.value);
};



</script>