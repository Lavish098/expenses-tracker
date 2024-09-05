<template>
  <div class="searchBar">
    <div class="inputIcon">
      <input
        type="text"
        v-model="search"
        placeholder="Search for your transactions here"
        @input="searchTransaction"
      />
    </div>
    <div class="searchQuery" v-if="search">
      <h2 v-for="search in searchQuery" :key="search.id">
        {{ search.title }}
      </h2>
      <div class="item-error" v-if="searchQuery.length === 0">
        <p>No result found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, watch } from "vue";

const props = defineProps({
    transactions:{
        type: Object,
        required: true
    }
})
const search = ref()

const emit = defineEmits(['search'])


  
   const searchQuery = computed(() => {
  if (search.value) {
    // Create an empty array to hold the filtered results
    let filteredResults = [];

    // Iterate over each date group in the transactions object
    Object.values(props.transactions).forEach((transactionArray) => {
      // Filter transactions within each date group
      const filteredArray = transactionArray.filter((item) => {
        return search.value
          .toLowerCase()
          .split(" ")
          .every((v) => item.text.toLowerCase().includes(v));
      });

      // Add filtered transactions to the results
      filteredResults = [...filteredResults, ...filteredArray];
    });

    return filteredResults;
  } else {
    // If no search query, flatten all transaction arrays into one array
    return Object.values(props.transactions).flat();
  }
});

const searchTransaction = () => {
emit('search', searchQuery)
}

    watch(search, searchTransaction);

</script>

<style>
.searchBar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
}
.searchBar input {
  border: none;
  font-size: 19px;
  padding: 15px;
  font-weight: 600;
  width: 100%;
  box-shadow: 0px 5px 7px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.searchBar input:focus {
  outline: none;
}
.searchBar h2 {
  cursor: pointer;
}
/* .searchQuery {
  background: #cce5ff;
  position: absolute;
  left: 1px;
  width: 102%;
  color: #007eff;
  font-size: 15px;
  z-index: 999;
}
.searchQuery h2 {
  padding: 20px;
} */

.searchIcon {
  cursor: pointer;
  color: #007eff;
  padding: 5px 15px;
  font-size: 20px;
  font-weight: lighter;
}
.inputIcon {
  display: flex;
  padding: 5px;
  border-radius: 5px;
  width: 100%;
}
.inputIcon h2 {
  color: rgb(255, 208, 53);
  font-size: 20px;
  font-weight: 600;
  padding: 0 15px;
}
</style>
