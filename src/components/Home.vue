<template>
  <div class="container">
        <Header />
    <Balance :transactions="transactions" />
    <TransactionList
      :transactions="transactions"
    />
  </div>
</template>
<script setup>
import Header from "../components/Header.vue";
import Balance from "../components/Balance.vue";
import TransactionList from "../components/TransactionList.vue";

import { ref, computed, onMounted } from "vue";
import { transactionStore } from "../store/index";
import { useToast } from "vue-toastification";

const toast = useToast();
const store = transactionStore();


const transactions = computed(() => {
  return store.allTransactions;
});

// //Delete transaction
// const handleTransactionDeleted = (id) => {
//   transactions.value = transactions.value.filter(
//     (transaction) => transaction.id !== id
//   );

//   saveTransaction();
//   toast.success("Transaction deleted");
// };

// //save to localstorage
// const saveTransaction = () => {
//   localStorage.setItem("transactions", JSON.stringify(transactions.value));
// };
</script>
