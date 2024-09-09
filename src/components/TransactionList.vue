<template>
  <div class="transaction-container">
    <h3>Latest Transactions</h3>
    <ul class="list">
      <li
        class="plus"
        v-for="transaction in todayTransactions.slice(0, 5)"
        :key="transaction.id"
      >
        <div id="list-container">
          <img :src="transaction.imageSrc" alt="" v-if="transaction.imageSrc" />
          <img
            :src="transaction.category.image"
            alt=""
            v-if="transaction.category"
          />

          <span>
            <h2>{{ transaction.text }}</h2>
            <p>{{ formatTimestamp(transaction.transactionTime) }}</p>
          </span>
        </div>
        <span :class="transaction.incomeExpense == 'expense' ? 'minus' : 'plus'"
          >{{ formatCurrency(transaction.amount, currencySymbol) }}
        </span>
      </li>
    </ul>
    <div class="no-transactions" v-if="noTransaction">
      <h2>No transaction added for today</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted, ref } from "vue";
import { transactionStore } from "../store/index";

const emit = defineEmits(["transactionDeleted"]);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

const store = transactionStore();
onMounted(() => {
  todayTransaction();
});

const todayTransactions = ref([]);
const noTransaction = ref(true);

const todayTransaction = () => {
  // Get today's date string for comparison
  const today = new Date();
  const todayDay = today.getDate().toString().padStart(2, "0");
  const todayString = `${todayDay}`;

  props.transactions.forEach((transaction) => {
    const date = new Date(transaction.timestamp);
    const day = date.getDate().toString().padStart(2, "0"); // Add leading zero

    // Create date string
    let dateString = `${day}`;

    // Check if the transaction date is today
    if (dateString === todayString) {
      todayTransactions.value.push(transaction);
      noTransaction.value = false;
    }
  });
};
const formatTimestamp = (transactionTime) => {
  const dateObject = new Date(transactionTime);
  return dateObject.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const currencySymbol = computed(() => store.currencySymbol);

const formatCurrency = (amount, currencyCode) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0, 
    maximumFractionDigits: 2  
  });

  const formattedAmount = formatter.format(amount);

  if (Math.floor(amount) === amount) {
    return formattedAmount.replace(/\.00$/, '');
  } else {
    return formattedAmount;
  }
};
</script>
<style scoped>
.transaction-container {
  margin: 40px 20px;
  padding-bottom: 30px;
}
h3 {
  padding: 0 0 0px 20px;
  letter-spacing: 1px;
  color: #183856;
}
h2 {
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
#list-container {
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

.list li > span {
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
#list-container span {
  margin-left: 10px;
}
.list li > span.minus {
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
.no-transactions h2 {
  padding: 0 0 0px 20px;
  letter-spacing: 1px;
  color: #183856;
  font-style: italic;
  font-size: 15px;
}
</style>
