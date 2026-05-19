"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { currencyOptions, expenseCategories, seedBudgets, seedGoals, seedRecurring, seedTransactions } from "@/lib/finance-data";
import { monthKey, normalizeLegacyTransactions } from "@/lib/finance-utils";

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState(seedBudgets);
  const [goals, setGoals] = useState(seedGoals);
  const [recurring, setRecurring] = useState(seedRecurring);
  const [currencyCountry, setCurrencyCountry] = useState("Nigeria");
  const [isDark, setIsDark] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("expendi.transactions") || "null");
    const legacyTransactions = JSON.parse(localStorage.getItem("transactions") || "null");
    const savedBudgets = JSON.parse(localStorage.getItem("expendi.budgets") || "null");
    const savedGoals = JSON.parse(localStorage.getItem("expendi.goals") || "null");
    const savedRecurring = JSON.parse(localStorage.getItem("expendi.recurring") || "null");
    const savedCurrency = JSON.parse(localStorage.getItem("currency") || "null");

    setTransactions(savedTransactions || (legacyTransactions ? normalizeLegacyTransactions(legacyTransactions) : seedTransactions));
    if (savedBudgets) setBudgets(savedBudgets);
    if (savedGoals) setGoals(savedGoals);
    if (savedRecurring) setRecurring(savedRecurring);
    if (savedCurrency) setCurrencyCountry(savedCurrency);
    if (localStorage.getItem("expendi.theme") === "dark") setIsDark(true);
  }, []);

  useEffect(() => localStorage.setItem("expendi.transactions", JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem("expendi.budgets", JSON.stringify(budgets)), [budgets]);
  useEffect(() => localStorage.setItem("expendi.goals", JSON.stringify(goals)), [goals]);
  useEffect(() => localStorage.setItem("expendi.recurring", JSON.stringify(recurring)), [recurring]);
  useEffect(() => localStorage.setItem("currency", JSON.stringify(currencyCountry)), [currencyCountry]);
  useEffect(() => localStorage.setItem("expendi.theme", isDark ? "dark" : "light"), [isDark]);

  const currency = currencyOptions[currencyCountry] || "USD";

  const stats = useMemo(() => {
    const income = transactions.filter((item) => item.type === "income").reduce((sum, item) => sum + Number(item.amount), 0);
    const expense = transactions.filter((item) => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);
    const monthSpend = transactions
      .filter((item) => item.type === "expense" && new Date(item.date).getMonth() === new Date().getMonth())
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return {
      income,
      expense,
      balance: income - expense,
      savingsRate: income ? Math.round(((income - expense) / income) * 100) : 0,
      monthSpend,
    };
  }, [transactions]);

  const categorySpend = useMemo(() => {
    const map = new Map();
    transactions.filter((item) => item.type === "expense").forEach((item) => {
      map.set(item.category, (map.get(item.category) || 0) + Number(item.amount));
    });

    return [...map.entries()]
      .map(([name, value]) => ({ name, value, color: expenseCategories.find((item) => item.name === name)?.color || "#64748b" }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const trendData = useMemo(() => {
    const map = new Map();
    transactions.forEach((item) => {
      const key = monthKey(item.date);
      const current = map.get(key) || { month: key, income: 0, expense: 0 };
      current[item.type] += Number(item.amount);
      map.set(key, current);
    });
    return [...map.values()];
  }, [transactions]);

  const smartInsight = useMemo(() => {
    const top = categorySpend[0];
    if (!transactions.length) return "Add your first transaction to unlock money insights.";
    if (stats.savingsRate >= 35) return `Strong month: you are keeping ${stats.savingsRate}% of income after expenses.`;
    if (top) return `${top.name} is your biggest spend area.`;
    return "Your income and expenses are balanced so far.";
  }, [categorySpend, stats.savingsRate, transactions.length]);

  const exportData = () => {
    const data = JSON.stringify({ transactions, budgets, goals, recurring, currencyCountry }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "expendi-backup.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const parsed = JSON.parse(await file.text());
    if (parsed.transactions) setTransactions(parsed.transactions);
    if (parsed.budgets) setBudgets(parsed.budgets);
    if (parsed.goals) setGoals(parsed.goals);
    if (parsed.recurring) setRecurring(parsed.recurring);
    if (parsed.currencyCountry) setCurrencyCountry(parsed.currencyCountry);
  };

  const value = {
    transactions,
    setTransactions,
    budgets,
    setBudgets,
    goals,
    setGoals,
    recurring,
    setRecurring,
    currencyCountry,
    setCurrencyCountry,
    currency,
    isDark,
    setIsDark,
    isPrivate,
    setIsPrivate,
    fileInputRef,
    stats,
    categorySpend,
    trendData,
    smartInsight,
    exportData,
    importData,
  };

  return (
    <FinanceContext.Provider value={value}>
      <div className={isDark ? "dark" : ""}>{children}</div>
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) throw new Error("useFinance must be used inside FinanceProvider");
  return context;
}
