<template>
  <div>
    <button @click="filterType = 'income'">Show Income</button>
    <button @click="filterType = 'expense'">Show Expenses</button>
    <canvas ref="incomeExpenseChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import {
  Chart,
  CategoryScale,
  PieController,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
} from "chart.js";
import { transactionStore } from "../store/index";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

const store = transactionStore();

const transactions = computed(() => store.groupedTransactions);
const incomeExpenseChart = ref(null);
const incomeExpenseChartInstance = ref(null);
const filterType = ref("income"); // Default filter type

// Prepare chart data based on filterType
const prepareChartData = (transactions, filterType) => {
  const categoryMap = new Map();

  Object.values(transactions)
    .flat()
    .forEach((transaction) => {
      const categoryName = transaction.category.name;

      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, { income: 0, expense: 0 });
      }

      const categoryData = categoryMap.get(categoryName);

      if (transaction.incomeExpense === "income") {
        categoryData.income += transaction.amount;
      } else if (transaction.incomeExpense === "expense") {
        categoryData.expense += transaction.amount;
      }
    });

  const filteredData = Array.from(categoryMap.entries()).reduce(
    (acc, [category, data]) => {
      if (filterType === "income" && data.income > 0) {
        acc.labels.push(category);
        acc.incomeData.push(data.income);
        acc.expenseData.push(0);
      } else if (filterType === "expense" && data.expense > 0) {
        acc.labels.push(category);
        acc.incomeData.push(0);
        acc.expenseData.push(data.expense);
      }
      return acc;
    },
    { labels: [], incomeData: [], expenseData: [] }
  );
  // Define an array of colors (or generate them dynamically)
  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `hsl(${(i * 360) / numColors}, 70%, 50%)`; // Generate unique hues
      colors.push(color);
    }
    return colors;
  };

  const incomeColors = generateColors(filteredData.incomeData.length); // Dynamic colors based on number of data points
  const expenseColors = generateColors(filteredData.expenseData.length);

  return {
    labels: filteredData.labels,
    datasets: [
      {
        label: "Income",
        backgroundColor: incomeColors, // Assign dynamic colors
        borderColor: incomeColors.map((color) => color.replace("20%", "20%")), // Darker border color for each
        data: filteredData.incomeData,
        hidden: filterType === "expense",
      },
      {
        label: "Expense",
        backgroundColor: expenseColors, // Assign dynamic colors
        borderColor: expenseColors.map((color) => color.replace("70%", "50%")), // Darker border color for each
        data: filteredData.expenseData,
        hidden: filterType === "income",
      },
    ],
  };
};

// Initialize the chart
const initializeChart = () => {
  const ctx = incomeExpenseChart.value.getContext("2d");
  const chartData = prepareChartData(transactions.value, filterType.value);

  incomeExpenseChartInstance.value = new Chart(ctx, {
    type: "pie",
    data: chartData,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Category",
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount",
          },
          beginAtZero: true,
        },
      },
    },
  });
};

// Update the chart based on transactions and filterType
const updateChart = () => {
  if (incomeExpenseChartInstance.value) {
    incomeExpenseChartInstance.value.destroy();
  }
  const ctx = incomeExpenseChart.value.getContext("2d");
  const chartData = prepareChartData(transactions.value, filterType.value);

  incomeExpenseChartInstance.value = new Chart(ctx, {
    type: "pie",
    data: chartData,
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: "Category",
          },
        },
        y: {
          title: {
            display: true,
            text: "Amount",
          },
          beginAtZero: true,
        },
      },
    },
  });
};

// Watch for changes in transactions and filterType
watch([() => transactions.value, () => filterType.value], () => {
  updateChart();
});

// Initialize the chart on mount
onMounted(() => {
  initializeChart();
});
</script>
