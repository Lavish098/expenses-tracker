<template>
<div class="transaction-container">
  <h3>Latest Transactions</h3>
  <ul class="list">
    <li
      class="plus"
      v-for="transaction in transactions.slice(0, 5)"
      :key="transaction.id"
      
    >
    <div id="list-container">
    <img :src="transaction.imageSrc" alt="" v-if="transaction.imageSrc">
    <span>
      <h2>{{ transaction.text }}</h2> 
        <p>{{ formatTimestamp(transaction.timestamp) }}</p>
    </span>
    </div>
      <span :class="transaction.incomeExpense == 'expense' ? 'minus' : 'plus'">${{ transaction.amount.toLocaleString() }}
        </span>
      <!-- <button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button> -->
    </li>
  </ul>
</div>
</template>

<script setup>
import { computed, defineProps, onMounted } from "vue";



const emit = defineEmits(['transactionDeleted'])

const props = defineProps({
    transactions:{
        type: Array,
        required: true
    }
})

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0){
  return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0){
  return `${hours} hour${hours > 1 ? 's' : ''} ago`
  }if (minutes > 0){
  return `${minutes} minutes${minutes > 1 ? 's' : ''} ago`
  }if (seconds > 0){
  return `${seconds} second${seconds > 1 ? 's' : ''} ago`
  }  
  }

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
#list-container{
  display: flex;
  width: 50%;
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
  width: 35%;
  color: #2ecc71;
  font-weight: 700;
  letter-spacing: 1px;
}
#list-container span p {
  color: rgba(180, 178, 178, 0.7);
  font-size: 17px;
  font-weight: 700;
  margin-top: 5px;
}
#list-container span{
  margin-left: 10px;
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