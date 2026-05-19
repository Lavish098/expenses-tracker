"use client";

import Link from "next/link";
import { Download, FileUp, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { expenseCategories, incomeCategories } from "@/lib/finance-data";
import { useFinance } from "@/components/finance-provider";
import { GhostButton, Surface, TransactionList } from "@/components/ui";

export default function TransactionsPage() {
  const { transactions, setTransactions, currency, exportData, fileInputRef } = useFinance();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const categoryOptions = [...new Set([...expenseCategories, ...incomeCategories].map((item) => item.name))];

  const filtered = useMemo(() => transactions
    .filter((item) => typeFilter === "all" || item.type === typeFilter)
    .filter((item) => categoryFilter === "all" || item.category === categoryFilter)
    .filter((item) => `${item.title} ${item.category} ${item.note} ${item.account}`.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date)), [categoryFilter, query, transactions, typeFilter]);

  return (
    <section className="grid gap-5">
      <Surface className="flex flex-wrap items-center gap-3">
        <label className="flex min-h-11 min-w-full flex-1 items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-3 dark:border-white/10 dark:bg-slate-950/40 sm:min-w-80">
          <Search size={18} />
          <input className="min-w-0 flex-1 bg-transparent outline-none" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, category, note..." />
        </label>
        <select className="form-input w-full sm:w-auto" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expense</option></select>
        <select className="form-input w-full sm:w-auto" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option value="all">All categories</option>{categoryOptions.map((item) => <option key={item}>{item}</option>)}</select>
        <GhostButton onClick={() => fileInputRef.current?.click()}><FileUp size={17} />Import</GhostButton>
        <GhostButton onClick={exportData}><Download size={17} />Export</GhostButton>
      </Surface>
      <TransactionList
        transactions={filtered}
        currency={currency}
        onEdit={(item) => location.assign(`/add?edit=${item.id}`)}
        onDuplicate={(item) => setTransactions((items) => [{ ...item, id: `txn-${Date.now()}`, date: new Date().toISOString().slice(0, 10) }, ...items])}
        onDelete={(id) => setTransactions((items) => items.filter((item) => item.id !== id))}
      />
      <Link className="sr-only" href="/add">Add transaction</Link>
    </section>
  );
}
