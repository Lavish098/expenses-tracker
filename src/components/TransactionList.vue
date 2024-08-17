<template>
<div class="transaction-container">
  <h3>Latest transaction</h3>
  <ul id="list" class="list">
    <li
      class="plus"
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="transaction.incomeExpense == 'expense' ? 'minus' : 'plus'"
    >
      {{ transaction.text }} <span>${{ transaction.amount.toLocaleString() }}</span
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
  margin: 10px;
}
h3{
  padding: 0 0 25px 20px;
  letter-spacing: 1px;
    border-bottom: 2px solid #e4e1e1;
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
  background-color: #fff;
  box-shadow: var(--box-shadow);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 10px;
  margin: 20px 0;
  border-radius: 20px;
}

.list li.plus {
  border-right: 10px solid #2ecc71;
}

.list li.minus {
  border-right: 10px solid #c0392b;
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