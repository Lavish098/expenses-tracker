<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Item</label>
      <input v-model="text" type="text" id="text" placeholder="Enter item..." />
    </div>
    <div class="form-control">
            <label for="text">Income/Expense</label>
      <select v-model="incomeExpense" name="incomeExpense" id="incomeExpense">
        <option value="income" selected>Income</option>
        <option value="expense">Expense</option>
      </select>
    </div>
    <div class="form-control">
      <label for="amount"
        >Amount</label
      >
      <input
        v-model="amount"
        type="text"
        id="amount"
        placeholder="Enter amount..."
      />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const text = ref("");
const amount = ref("");
  const incomeExpense = ref("");


const emit = defineEmits([["transactionSubmitted"]]);

const toast = useToast();
const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error("Both fields must be filled");
    return;
  }
  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
    incomeExpense: incomeExpense.value
  };
  emit("transactionSubmitted", transactionData);
  
  text.value = "";
  amount.value = "";
  incomeExpense.value = "";
};
</script>
