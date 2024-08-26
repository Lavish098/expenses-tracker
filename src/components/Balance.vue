<template>
<div class="balance">
    <div class="balance-container">
    <h4>Total Balance</h4>
      <h1 id="balance">${{ total.toLocaleString() }}</h1>
    </div>
          <IncomeExpenses :income="+income" :expense="+expense" />
</div>
</template>

<script setup>
import {defineProps, computed} from 'vue'
import IncomeExpenses from "../components/IncomeExpenses.vue";


const props = defineProps({
    transactions: {
        type: Array,
        required: true
    }
    
})
//get total
const total = computed(() => {
  const income = props.transactions
    .filter((transaction) => transaction.incomeExpense == 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = props.transactions
    .filter((transaction) => transaction.incomeExpense == 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (income - expense);
});

console.log(total);

//Get income
const income = computed(() => {
  return props.transactions
    .filter((transaction) => transaction.incomeExpense == 'income')
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

//Get expense
const expense = computed(() => {
  return props.transactions
    .filter((transaction) => transaction.incomeExpense == 'expense')
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});
</script>
<style scoped>
.balance{
    margin: 0 5px;
    padding: 5px;
    color: white;
      font-family: "Lato", sans-serif;

}
.balance-container{
    margin: 10px;
}
.balance h4{
        font-family: "Lato", sans-serif;
    font-size: 15px;
    color: #d1d5d8;
}
.balance h1{
    margin: 7px 10px;
    font-size: 35px;
    color: rgb(100, 99, 99);
}

</style>