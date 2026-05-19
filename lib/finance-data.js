export const currencyOptions = {
  USA: "USD",
  UK: "GBP",
  EU: "EUR",
  Japan: "JPY",
  India: "INR",
  Nigeria: "NGN",
};

export const expenseCategories = [
  { name: "Food", color: "#f97316" },
  { name: "Transport", color: "#0ea5e9" },
  { name: "Rent", color: "#8b5cf6" },
  { name: "Shopping", color: "#ec4899" },
  { name: "Health", color: "#10b981" },
  { name: "Internet", color: "#6366f1" },
  { name: "Family", color: "#f59e0b" },
  { name: "Electricity", color: "#14b8a6" },
  { name: "Savings", color: "#22c55e" },
];

export const incomeCategories = [
  { name: "Salary", color: "#22c55e" },
  { name: "Freelance", color: "#06b6d4" },
  { name: "Gift", color: "#a855f7" },
  { name: "Investment", color: "#84cc16" },
  { name: "Other", color: "#64748b" },
];

export const seedTransactions = [
  { id: "seed-1", type: "income", title: "Design retainer", amount: 420000, category: "Freelance", note: "May client payment", date: "2026-05-03", account: "Bank" },
  { id: "seed-2", type: "expense", title: "Apartment rent", amount: 180000, category: "Rent", note: "Monthly rent", date: "2026-05-04", account: "Bank" },
  { id: "seed-3", type: "expense", title: "Groceries", amount: 34500, category: "Food", note: "Weekly market run", date: "2026-05-08", account: "Card" },
  { id: "seed-4", type: "expense", title: "Internet subscription", amount: 18500, category: "Internet", note: "Fiber renewal", date: "2026-05-10", account: "Card" },
  { id: "seed-5", type: "expense", title: "Ride hailing", amount: 12800, category: "Transport", note: "Meetings", date: "2026-05-14", account: "Cash" },
  { id: "seed-6", type: "income", title: "Salary", amount: 650000, category: "Salary", note: "Main job", date: "2026-05-01", account: "Bank" },
];

export const seedBudgets = [
  { id: "budget-1", category: "Food", limit: 90000 },
  { id: "budget-2", category: "Transport", limit: 55000 },
  { id: "budget-3", category: "Internet", limit: 25000 },
  { id: "budget-4", category: "Shopping", limit: 80000 },
];

export const seedGoals = [
  { id: "goal-1", name: "Emergency fund", target: 1500000, saved: 520000, deadline: "2026-11-30" },
  { id: "goal-2", name: "New laptop", target: 950000, saved: 260000, deadline: "2026-08-15" },
];

export const seedRecurring = [
  { id: "rec-1", title: "Salary", type: "income", amount: 650000, category: "Salary", cadence: "Monthly", nextDate: "2026-06-01" },
  { id: "rec-2", title: "Rent", type: "expense", amount: 180000, category: "Rent", cadence: "Monthly", nextDate: "2026-06-04" },
  { id: "rec-3", title: "Internet", type: "expense", amount: 18500, category: "Internet", cadence: "Monthly", nextDate: "2026-06-10" },
];

export const blankTransaction = {
  id: "",
  type: "expense",
  title: "",
  amount: "",
  category: "Food",
  note: "",
  date: new Date().toISOString().slice(0, 10),
  account: "Bank",
};
