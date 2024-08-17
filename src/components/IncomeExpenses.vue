<template>
  <div class="inc-exp-container">
    <div class="income-container">
      <div class="income">
      <i class="fas fa-arrow-down"></i>
        <h4>Income</h4>
      </div>
      <div>
        <p id="money-plus" class="money plus">
          ${{ income.toLocaleString() }}
        </p>
      </div>
    </div>
    <div class="expense-container">
      <div class="expense">
      <i class="fas fa-arrow-up"></i>
        <h4>Expense</h4>
      </div>
      <div>
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
  padding: 5px;
  display: flex;
  margin: 30px 0;
    justify-content: space-between;

}
.inc-exp-container p {
  font-size: 15px;
}
.income-container {
  display: block;
  width: 50%;
}
h4{
  font-size: 15px;
  margin-left: 5px;
  color: rgb(190, 188, 188);
}
.income-container i {
  background-color: #88a6b8;
  padding: 5px;
  border-radius: 70px;
  height: 30px;
  color: #ffffff;
  font-size: 20px;
}
.income-container p{
  font-size: 20px;
}
.income{
  display: flex;
}
.expense-container {
 display: block;
  width: 50%;
}
.expense-container i {
  background-color: #88a6b8;
  padding: 5px;
  border-radius: 70px;
  height: 30px;
  color: #ffffff;
  font-size: 20px;
}
.expense{
  display: flex;
}
</style>
