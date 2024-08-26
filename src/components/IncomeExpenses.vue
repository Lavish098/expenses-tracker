<template>
  <div class="inc-exp-container">
    <div class="income-container">
      <div class="income">
        <i class="fas fa-arrow-down"></i>
      </div>
      <div class="income-section">
        <h4>Income</h4>
        <p id="money-plus" class="money plus">${{ income.toLocaleString() }}</p>
      </div>
    </div>
    <div class="expense-container">
      <div class="expense">
        <i class="fas fa-arrow-up"></i>
      </div>
      <div class="expense-section">
        <h4>Expense</h4>
        <p id="money-minus" class="money minus">
          ${{ expense.toLocaleString() }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  income: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
});
</script>
<style scoped>
.inc-exp-container {
  display: flex;
  margin: 20px 0 0 0;
  justify-content: space-between;
  width: 100%;
}
.inc-exp-container p {
  font-size: 15px;
}
.income-container {
  background-color: #fff;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 49%;
  border-radius: 10px;
  padding: 10px 0px 10px 10px;
}
.income-section{
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
  margin-left: 5px;
  width: 30%;
}
.income-section h4 {
  font-size: 15px;
  margin-left: 5px;
  color: rgba(75, 240, 130, 0.596);
    font-family: "Lato", sans-serif;

}
.income-container i {
  background-color: rgba(75, 240, 130, 0.596);
  padding: 20px 20px;
  border-radius: 16px;
  /* height: 30px; */
  color: #ffffff;
  font-size: 20px;
}
.expense-container {
  background-color: #fff;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  width: 49%;
  border-radius: 10px;
  padding: 10px 0px 10px 10px;
}
.expense-container i {
  background-color: rgba(235, 67, 67, 0.596);
  padding: 20px 20px;
  border-radius: 16px;
  /* height: 30px; */
  color: #ffffff;
  font-size: 20px;
}
.expense-section{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 5px;
  width: 50%;
}
.expense-section h4 {
  font-size: 15px;
  margin-left: 5px;
  color: rgba(235, 67, 67, 0.596);
}
.expense {
  display: flex;
  align-items: center;
}
.expense-container p {
  font-size: 20px;
}
.money.plus {
  color: black;
  font-size: 15px;
  font-weight: bold;
}

.money.minus {
  color: black;
  font-size: 15px;
    font-weight: bold;

}
</style>
