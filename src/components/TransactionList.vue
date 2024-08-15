<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      class="plus"
      v-for="transaction in transactions"
      :key="transaction.id"
      :class="transaction.incomeExpense == 'expense' ? 'minus' : 'plus'"
    >
      {{ transaction.text }} <span>${{ transaction.amount.toLocaleString() }}</span
      ><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
  </ul>
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
