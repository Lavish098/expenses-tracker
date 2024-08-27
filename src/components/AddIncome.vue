<template>
  <div class="addTransaction">
    <div class="form-container">
      <h3>Add Income</h3>
      <form id="form" @submit.prevent="handleTransactionSubmitted">
        <div class="form-control">
          <label for="amount">How much did you recieve?</label>
          <input
            v-model="amount"
            type="text"
            id="amount"
            placeholder="Enter amount..."
          />
        </div>
        <div class="form-control">
          <label for="amount">Description:</label>
          <input
            v-model="description"
            type="text"
            id="amount"
            placeholder="Enter amount..."
          />
        </div>

        <button class="btn">Add</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { transactionStore } from "../store/index";
import { useRouter } from "vue-router";
import imageName from '@/assets/reshot-icon-income-FS9HTJX8GM.svg';

const text = ref("Income");
const description = ref("");
const amount = ref("");
const incomeExpense = ref("income");

const toast = useToast();
const router = useRouter();
const store = transactionStore();

const handleTransactionSubmitted = () => {
  if (!text.value || !amount.value) {
    toast.error("Both fields must be filled");
    return;
  }
  store.handleTransactionSubmitted({
    text: text.value,
    description: description.value,
    amount: parseFloat(amount.value),
    incomeExpense: incomeExpense.value,
    imageSrc: imageName,
  });

  toast.success("Transaction added");
  router.push("/");
};
</script>

<style scoped>
.addTransaction {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media screen and (min-width: 425px) {
  .addTransaction {
    margin-left: -110px;
  }
}
.form-container {
  width: 90%;
  border-radius: 20px;
  padding: 5px 20px;
}
h3 {
  font-size: 18px;
}
input[type="text"],
input[type="number"] {
  border: 1px solid #dedede;
  border-radius: 6px;
  display: block;
  font-size: 16px;
  padding: 15px;
  width: 100%;
  outline: none;
}
label {
  display: inline-block;
  margin: 10px 0;
}

#incomeExpense {
  border: 1px solid #dedede;
  border-radius: 10px;
  display: block;
  font-size: 16px;
  padding: 14px;
  width: 70%;
  outline: none;
}
.btn {
  cursor: pointer;
  background-color: #183856;
  box-shadow: var(--box-shadow);
  color: #e4e0e0;
  border: 0;
  display: block;
  font-size: 13px;
  margin: 20px 0 30px;
  font-family: "Lato", sans-serif;
  letter-spacing: 1px;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
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
  h3 {
    font-size: 25px;
  }
}
</style>
