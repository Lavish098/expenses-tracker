<template>
  <div class="addTransaction">
    <div class="form-container">
      <h3>Add Expenses</h3>
      <form id="form" @submit.prevent="handleTransactionSubmitted">
        <div class="form-control">
          <label for="text">What did you spend on?</label>
          <input
            v-model="text"
            type="text"
            id="text"
            placeholder="Enter item..."
          />
        </div>
        <div class="form-control">
          <label for="amount">Amount Spent</label>
          <input
            v-model="amount"
            type="text"
            id="amount"
            placeholder="Enter amount..."
          />
        </div>
        <div class="date">
          <VueDatepickerUi v-model="date" lang="en" />
        </div>
        <div class="category-list">
          <h3>Select Categories</h3>
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="category-item"
            :class="{ selected: selectedCategory === index }"
            @click="selectCategory(index)"
          >
            <img :src="category.icon" alt="category icon" />
            <span>{{ category.name }}</span>
          </div>
        </div>

        <button class="btn">Add</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import "vue-datepicker-ui/lib/vuedatepickerui.css";
import VueDatepickerUi from "vue-datepicker-ui";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { transactionStore } from "../store/index";
import { useRouter } from "vue-router";

import electricity from "@/assets/reshot-icon-television-5YBTMCDJR3.svg";
import health from "@/assets/reshot-icon-ambulance-ZF6E3TYN2A.svg";
import travel from "@/assets/reshot-icon-bus-CV3PK5SN9T.svg";
import family from "@/assets/reshot-icon-family-S8LZ92RTB5.svg";
import food from "@/assets/reshot-icon-hot-food-DUYKGBF2XM.svg";
import rent from "@/assets/reshot-icon-house-8CHZLM4BDK.svg";
import internet from "@/assets/reshot-icon-internet-C7DXQ53M64.svg";
import shopping from "@/assets/reshot-icon-online-shopping-ZSYWV5E7NQ.svg";

const date = ref();
const text = ref("");
const amount = ref("");
const incomeExpense = ref("expense");
const category = ref({ name: '', image: '' })

const selectedCategory = ref(null);

const categories = [
  { name: "Electricity", icon: electricity },
  { name: "Food", icon: food },
  { name: "Shopping", icon: shopping },
  { name: "Travel", icon: travel },
  { name: "Health", icon: health },
  { name: "Rent", icon: rent },
  { name: "Internet", icon: internet },
  { name: "Family", icon: family },
];

const toast = useToast();
const router = useRouter();
const store = transactionStore();

const selectCategory = (index) => {  
  selectedCategory.value = index;
category.value = {name: categories[index].name, image: categories[index].icon};
  
console.log(category.value);
};



const handleTransactionSubmitted = () => {
  if (!text.value || !amount.value) {
    toast.error("Both fields must be filled");
    return;
  }
  store.handleTransactionSubmitted({
    timestamp: date.value,
    text: text.value,
    amount: parseFloat(amount.value),
    incomeExpense: incomeExpense.value,
    category: category.value
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
  align-items: center;
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
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 400;
  color: #183856;;
}
input[type="text"],
input[type="number"],
input[type="date"] {
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
  color: #183856;;
}


.date{
  margin-top: 10px;
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

.date-picker {
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-top: 10px;
  width: 100%;
  outline: none;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.category-item.selected {
  background-color: #f0f0f0;
}

.category-item img {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}
</style>
