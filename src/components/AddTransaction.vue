<template>
  <div class="addTransaction">
    <div class="form-container">
      <div class="close-btn"><button @click="close">X</button></div>
      <h3>Add new transaction</h3>
      <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
          <label for="text">Item</label>
          <input
            v-model="text"
            type="text"
            id="text"
            placeholder="Enter item..."
          />
        </div>
        <div class="form-control">
          <label for="text">Income/Expense</label>
          <select
            v-model="incomeExpense"
            name="incomeExpense"
            id="incomeExpense"
          >
            <option value="income" selected>Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div class="form-control">
          <label for="amount">Amount</label>
          <input
            v-model="amount"
            type="text"
            id="amount"
            placeholder="Enter amount..."
          />
        </div>
        <button class="btn">Add transaction</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";

const text = ref("");
const amount = ref("");
const incomeExpense = ref("");

const emit = defineEmits([["transactionSubmitted"], ["close"]]);

const toast = useToast();

const close = () => {
  emit("close");
}
const onSubmit = () => {
  if (!text.value || !amount.value) {
    toast.error("Both fields must be filled");
    return;
  }
  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
    incomeExpense: incomeExpense.value,
  };
  emit("transactionSubmitted", transactionData);
  text.value = "";
  amount.value = "";
  incomeExpense.value = "";
};
</script>

<style scoped>
.addTransaction {
  top: 0;
  margin-left: -52px;
  position: fixed;
  z-index: 101;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}
.form-container {
  width: 90%;
  border-radius: 20px;
  padding: 5px 20px;
  background-color: whitesmoke;
}
h3{
  font-size: 18px;
}
.close-btn{
  position: absolute;
  right: 50px;
  margin-top: 15px;
  font-size: 20px;
}
.close-btn button {
  background-color: whitesmoke;
  cursor: pointer;
  color: #9c88ff;
  border: 0;
  display: block;
  font-size: 20px;
  padding: 10px;
}
@media screen and (min-width: 600px) {
  .addTransaction {
  top: 0;
  margin-left: -40px;
  position: fixed;
  z-index: 101;
  min-height: 100vh;
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
}
.form-container {
  width: 90%;
  border-radius: 20px;
  padding: 5px 50px;
  background-color: whitesmoke;
}
h3{
  font-size: 25px;
}
}
</style>
