import { defineStore } from "pinia";

export const transactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [],
    selectedCountry: 'USA', // Default country
    currencySymbols: {
      "USA": "$",
      "UK": "£",
      "EU": "€",
      "Japan": "¥",
      "India": "₹",
      "Ngn": "N"
    },
  }),
  getters: {
    currencySymbol(state) {
      return state.currencySymbols[state.selectedCountry] || "$"; // Default to dollar if not found
    },
    allTransactions: (state) => {      
      return state.transactions.sort((a, b) => b.timestamp - a.timestamp);
    },
    groupedTransactions: (state) => {
      const grouped = {}
       
      // Get today's date string for comparison
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = (today.getMonth() + 1).toString().padStart(2, '0');
  const todayDay = today.getDate().toString().padStart(2, '0');
  const todayString = `${todayYear}/${todayMonth}/${todayDay}`;

  state.transactions.forEach((transaction) => {
    const date = new Date(transaction.timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero

    // Create date string
    let dateString = `${year}/${month}/${day}`;

    // Check if the transaction date is today
    if (dateString === todayString) {
      dateString = "Today";
    }

    // Initialize date group if it doesn't exist
    if (!grouped[dateString]) {
      grouped[dateString] = [];
    }

    // Add transaction to the date group
    grouped[dateString].push(transaction);
  });

  // Sort each group by time (timestamp)
  for (const date in grouped) {
    grouped[date].sort((a, b) => b.timestamp - a.timestamp);
  }

  console.log("Grouped Transactions:", grouped);

  return grouped;
    }
  },
  actions: {
    changeCountry(country) {
      this.selectedCountry = country;
      this.saveCurrency();

    },
    handleTransactionSubmitted(transactionData) {
      // Add the transaction to the state
      this.transactions.push({
        id: this.generateUniqueId(),
        ...transactionData,
      });

      // Save transactions to local storage
      this.saveTransaction();

    },
    /**
     * Save the current state of transactions to local storage
     */
    saveTransaction() {
      localStorage.setItem("transactions", JSON.stringify(this.transactions));
    },
    saveCurrency() {
      localStorage.setItem("currency", JSON.stringify(this.selectedCountry));
    },

    /**
     * Load transactions from local storage when the store is initialized
     */
    loadTransactions() {
      const savedTransactions = JSON.parse(
        localStorage.getItem("transactions")
      );
      if (savedTransactions) {
        this.transactions = savedTransactions.map((transaction) => ({
          ...transaction,
          timestamp: new Date(transaction.timestamp).getTime()
        }))
      }

      console.log(savedTransactions);
      
    },
    loadCurrency() {
      const savedCurrency = JSON.parse(
        localStorage.getItem("currency")
      );
      if (savedCurrency) {
        this.selectedCountry = savedCurrency
      }

      console.log(savedCurrency);
      
    },
    generateUniqueId() {
      return "_" + Math.random().toString(36).substr(2, 9);
    },
  },
});
