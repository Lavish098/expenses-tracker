export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

export function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function monthKey(date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short" });
}

export function normalizeLegacyTransactions(items) {
  return items.map((item) => ({
    id: item.id || uid("legacy"),
    type: item.incomeExpense || "expense",
    title: item.text || "Transaction",
    amount: Number(item.amount) || 0,
    category: item.category?.name || (item.incomeExpense === "income" ? "Other" : "Food"),
    note: item.description || "",
    date: new Date(item.transactionTime || item.timestamp || Date.now()).toISOString().slice(0, 10),
    account: "Bank",
  }));
}

export function pageTitle(pathname) {
  if (pathname === "/") return "Dashboard";
  return {
    "/add": "Add transaction",
    "/transactions": "Transactions",
    "/budgets": "Budgets",
    "/reports": "Reports",
    "/goals": "Savings goals",
    "/recurring": "Recurring money",
  }[pathname] || "Expendi";
}
