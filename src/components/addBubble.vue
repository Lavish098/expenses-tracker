<template>
  <div class="chat">
    <div class="mine messages">
      <div class="message last">
        <router-link
          class="income"
          :to="{ name: 'AddIncome' }"
          @click="showBubble"
        >
          <i class="fas fa-arrow-up"></i>
          <h4>Add Income</h4>
        </router-link>
        <router-link
          class="expense"
          :to="{ name: 'AddExpense' }"
          @click="showBubble"
        >
          <i class="fas fa-arrow-down"></i>
          <h4>Add Expense</h4>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(["showBubble"]);

const showBubble = () => {
  emit("showBubble");
};
</script>
<style scoped>
.chat {
  width: 100%;
  right: 19%;
  position: fixed;
  bottom: 11.5%;
  z-index: 9999;
}
.messages {
  margin-top: 30px;
  display: flex;
}

.message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  width: 70%;
  padding: 8px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
}
.mine {
  align-items: center;
}
h4 {
  font-size: 12px;
}
.income {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 40%;
  text-decoration: none;
  color: white;
  cursor: pointer;
  margin-bottom: -5px;
}
.expense {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 40%;
  text-decoration: none;
  color: white;
  cursor: pointer;
    margin-bottom: -5px;
}
.mine .message {
  color: white;
  margin-left: 25%;
  background: #88a6b8;
  background-attachment: fixed;
  position: relative;
}

.mine .message.last:before {
  content: "";
  position: absolute;
  z-index: 0;
  bottom: -10px;
  right: 50%;
  height: 20px;
  width: 30px;
  background: #88a6b8;
  background-attachment: fixed;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
</style>
