<template>
  <div class="transaction">
    <h3>Transaction History</h3>

    <div class="search-bar">
      <Search @search="handleSearch" />
    </div>
    <!-- all Transactions -->
        <div v-if="hasFilteredTransactions">
    <div
      class="transaction-container"
      v-for="(transactions, date) in filteredTransactions"
      :key="date"
    >
      <ul id="list" class="list" v-if="filteredTransactions"
>
        <h3>{{ date }}</h3>
        <li
          class="plus"
          v-for="transaction in transactions"
          :key="transaction.timestamp"

        >
          <div id="list-container">
            <img
              :src="transaction.imageSrc"
              alt=""
              v-if="transaction.imageSrc"
            />
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
          <span
            :class="transaction.incomeExpense == 'expense' ? 'minus' : 'plus'"
            >
            {{ formatCurrency(transaction.amount, currencySymbol)}}
          </span>
        </li>
      </ul>
    </div>
        </div>
    <div class="no-transaction" v-else>
      <h2>No transactions found!!</h2>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import { transactionStore } from "../store/index";
import Search from "./Search.vue";

const store = transactionStore();

const transactions = computed(() => {
  return store.groupedTransactions;
});
console.log(transactions.value);
const noTransactions = ref("")
console.log(noTransactions.value);


const filteredTransactions = ref({...transactions.value });
console.log(filteredTransactions.value);

// Computed property to check if filtered transactions are empty
const hasFilteredTransactions = computed(() => {
  // Check if the filtered transactions object is empty
  return Object.keys(filteredTransactions.value).length > 0;
});


const handleSearch = (search) => {
  // If no search input, return the full transactions object
  if (!search) {
    filteredTransactions.value = { ...transactions.value };
  } else {
    // Initialize an empty object for filtered transactions
    const filteredResults = {};

    // Convert the search query to lowercase for case-insensitive comparison
    const searchQuery = search.toLowerCase();

    // Loop through each date key in the transactions object
    Object.keys(transactions.value).forEach((date) => {
      const transactionsForDate = transactions.value[date];

      // Filter the transactions array for that specific date
      const filteredForDate = transactionsForDate.filter((transaction) => {
        // Check if the search query is included in the transaction text or category name
        const matchesText = transaction.text.toLowerCase().includes(searchQuery);
        const matchesCategory = transaction.category?.name.toLowerCase().includes(searchQuery);

        return matchesText || matchesCategory; // Return true if either matches
      });

      // Only add the date to filteredResults if there are filtered transactions
      if (filteredForDate.length > 0) {
        filteredResults[date] = filteredForDate;
      }
    });
    // Set the filtered results to the ref
    filteredTransactions.value = filteredResults;
  }
  console.log("Filtered Transactions:", filteredTransactions.value);
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
.transaction {
  padding-bottom: 40px;
}
.transaction-container {
  margin: 40px 20px;
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
#list-container span p {
  color: rgba(180, 178, 178, 0.7);
  font-size: 17px;
  font-weight: 700;
  margin-top: 5px;
}
#list-container span {
  margin-left: 10px;
}
.list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;
}

.list li {
  box-shadow: 0 5px 50px 0 rgb(0 0 0 / 0.05);
  color: #333;
  height: 80px;
  display: flex;
  justify-content: space-between;
  position: relative;
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
.list li > span > p {
  color: rgba(180, 178, 178, 0.7);
  font-size: 13px;
  font-weight: 700;
}
.list li > span.plus {
  color: #2ecc71;
  font-weight: 700;
  letter-spacing: 1px;
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

.no-transaction{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
}
.no-transaction h2{
    font-style: italic;
  font-family: "Lato", sans-serif;
}
</style>
