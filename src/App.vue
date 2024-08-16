<template>
  <div>
    <Header />
    <div class="container">
      <Balance :total="+total" />
      <IncomeExpenses :income="+income" :expense="+expense" />
      <TransactionList
        :transactions="transactions"
        @transactionDeleted="handleTransactionDeleted"
      />
      <AddTransaction @transactionSubmitted="handleTransactionSubmitted" @close="close" v-if="showBtn"/>
      <AddTransactionsBtn @click="showTransactionForm"/>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import AddTransactionsBtn from "./components/AddTransactionsBtn.vue"

import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

onMounted(() => {
  const savedTransaction = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransaction) {
    transactions.value = savedTransaction;
  }
});

const transactions = ref([]);

const showBtn = ref(true)

const showTransactionForm = () => {
  showBtn.value = !showBtn.value
}


//get total
const total = computed(() => {
  const income = transactions.value
    .filter((transaction) => transaction.incomeExpense == 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions.value
    .filter((transaction) => transaction.incomeExpense == 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (income - expense).toFixed(2);
});


//Get income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.incomeExpense == 'income')
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});
//Get expense
const expense = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.incomeExpense == 'expense')
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

//add transaction
const close = () => {
      showBtn.value = !showBtn.value

}
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount,
    incomeExpense: transactionData.incomeExpense
  });
    showBtn.value = !showBtn.value
  
  saveTransaction();

  toast.success("Transaction added");
};

//Generate unique Id
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

//Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  saveTransaction();
  toast.success("Transaction deleted");
};

//save to localstorage
const saveTransaction = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
