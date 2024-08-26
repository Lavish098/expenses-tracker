<template>
<div class="transaction-container">
  <h3>Latest Transactions</h3>
  <ul id="list" class="list">
    <li
      class="plus"
      v-for="transaction in transactions"
      :key="transaction.id"
      
    >
      <h2>{{ transaction.text }}</h2> <span :class="transaction.incomeExpense == 'expense' ? 'minus' : 'plus'">${{ transaction.amount.toLocaleString() }}
        <p>{{ transaction.timestamp }}</p></span
      >
      <!-- <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button> -->
    </li>
  </ul>
</div>
</template>

<script setup>
import { defineProps } from "vue";

const emit = defineEmits(['transactionDeleted'])

const props = defineProps({
    transactions:{
        type: Array,
        required: true
    }
})

const deleteTransaction = (id) => {
emit('transactionDeleted', id)
}


</script>
<style scoped>
.transaction-container{
  margin: 40px 20px;
  padding-bottom: 30px;
}
h3{
  padding: 0 0 0px 20px;
  letter-spacing: 1px;
  color: #183856;
}
h2{
  font-size: 20px;
  margin: 0;
}
.btn {
  cursor: pointer;
  background-color: #9c88ff;
  box-shadow: var(--box-shadow);
  color: #fff;
  border: 0;
  display: block;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
  width: 100%;
}

.btn:focus,
.delete-btn:focus {
  outline: 0;
}

.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
}

.list li {
    border: 1px solid rgba(180, 178, 178, 0.4);
  color: #333;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 15px 10px;
  margin: 10px 0;
  border-radius: 10px;
}

.list li>span {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 30%;
  color: #2ecc71;
  font-weight: 700;
  letter-spacing: 1px;
}
.list li>span>p {
  color: rgba(180, 178, 178, 0.7);
  font-size: 13px;
  font-weight: 700;
}

.list li>span.minus {
  color: #fd1900;
    font-weight: 700;
  letter-spacing: 1px;
}

.delete-btn {
  cursor: pointer;
  background-color: #e74c3c;
  border: 0;
  color: #fff;
  font-size: 20px;
  line-height: 20px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.list li:hover .delete-btn {
  opacity: 1;
}
</style>