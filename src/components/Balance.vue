<template>
<div class="balance">
    <div class="balance-container">
    <h4>Your Balance</h4>
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
    background-color: #183856;
    box-shadow: 0 5px 50px 0 rgb(0 0 0 / 0.05);
    margin: 10px 30px;
    padding: 10px;
    height: 28vh;
    border-radius: 30px;
    color: white;
      font-family: "Lato", sans-serif;

}
.balance-container{
    margin: 10px;
}
.balance h4{
    font-size: 12px;
    letter-spacing: 2px;
    color: rgb(255, 254, 254);
}
.balance h1{
    margin: 7px 10px;
    font-size: 30px;
}

</style>