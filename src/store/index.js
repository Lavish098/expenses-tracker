import { defineStore } from "pinia";

export const transactionStore = defineStore("transactions", {
  state: () => ({
    transactions: [],
  }),
  getters: {
    allTransactions: (state) => {      
      return state.transactions;
    },
  },
  actions: {
    handleTransactionSubmitted(transactionData) {
      const timestamp = new Date();
const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

const formattedDate = timestamp.toLocaleDateString('en-US', dateOptions)

      // Add the transaction to the state
      this.transactions.push({
        id: this.generateUniqueId(),
        ...transactionData,
        timestamp: formattedDate,
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

    /**
     * Load transactions from local storage when the store is initialized
     */
    loadTransactions() {
      const savedTransactions = JSON.parse(
        localStorage.getItem("transactions")
      );
      if (savedTransactions) {
        this.transactions = savedTransactions;
      }

      console.log(savedTransactions);
      
    },
    generateUniqueId() {
      return "_" + Math.random().toString(36).substr(2, 9);
    },
  },
});
