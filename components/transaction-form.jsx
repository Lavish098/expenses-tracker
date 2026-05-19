"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check, Receipt } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { blankTransaction, expenseCategories, incomeCategories } from "@/lib/finance-data";
import { formatCurrency, uid } from "@/lib/finance-utils";
import { useFinance } from "@/components/finance-provider";
import { PrimaryButton, Surface, SectionHeading } from "@/components/ui";

export function TransactionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { transactions, setTransactions, currency } = useFinance();
  const [draft, setDraft] = useState(blankTransaction);

  useEffect(() => {
    const existing = transactions.find((item) => item.id === editId);
    setDraft(existing ? { ...existing, amount: String(existing.amount) } : blankTransaction);
  }, [editId, transactions]);

  const categories = draft.type === "income" ? incomeCategories : expenseCategories;
  const isEditing = Boolean(editId);

  const saveTransaction = (event) => {
    event.preventDefault();
    if (!draft.title || !draft.amount || !draft.date) return;
    const payload = { ...draft, id: editId || uid("txn"), amount: Number(draft.amount) };
    setTransactions((items) => (editId ? items.map((item) => (item.id === editId ? payload : item)) : [payload, ...items]));
    router.push("/transactions");
  };

  const previewAmount = useMemo(() => formatCurrency(draft.amount || 0, currency), [currency, draft.amount]);

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
      <Surface>
        <form className="grid gap-4" onSubmit={saveTransaction}>
          <SectionHeading eyebrow={isEditing ? "Update" : "New record"} title={isEditing ? "Edit transaction" : "Quick add transaction"} />
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1.5 dark:bg-white/10">
            {["expense", "income"].map((type) => (
              <button key={type} type="button" className={`min-h-11 rounded-lg font-black capitalize ${draft.type === type ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white" : "text-slate-500"}`} onClick={() => setDraft({ ...draft, type, category: type === "income" ? "Salary" : "Food" })}>{type}</button>
            ))}
          </div>
          <label className="form-label">Title<input className="form-input" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="Groceries, Salary, Rent..." /></label>
          <label className="form-label">Amount<input className="form-input" type="number" value={draft.amount} onChange={(event) => setDraft({ ...draft, amount: event.target.value })} placeholder="0.00" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-label">Date<input className="form-input" type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} /></label>
            <label className="form-label">Account<select className="form-input" value={draft.account} onChange={(event) => setDraft({ ...draft, account: event.target.value })}><option>Bank</option><option>Card</option><option>Cash</option><option>Savings</option></select></label>
          </div>
          <label className="form-label">Note<input className="form-input" value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} placeholder="Optional context" /></label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button key={category.name} type="button" className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 font-bold ${draft.category === category.name ? "border-teal-700 shadow-[0_0_0_3px_rgba(15,118,110,0.12)]" : "border-slate-200/80 dark:border-white/10"}`} onClick={() => setDraft({ ...draft, category: category.name })}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: category.color }} />
                {category.name}
              </button>
            ))}
          </div>
          <PrimaryButton type="submit"><Check size={18} />{isEditing ? "Save changes" : "Add transaction"}</PrimaryButton>
        </form>
      </Surface>

      <Surface>
        <SectionHeading eyebrow="Preview" title="Today’s money pulse" />
        <div className="grid min-h-[420px] place-items-center rounded-lg border border-dashed border-slate-300 p-8 text-center dark:border-white/10">
          <div>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br from-teal-700 to-blue-600 text-white shadow-lift"><Receipt size={26} /></span>
            <strong className="mt-5 block text-lg">{draft.title || "Transaction title"}</strong>
            <span className="mt-2 block text-slate-500 dark:text-slate-400">{draft.category} • {draft.account}</span>
            <h3 className="my-5 text-4xl font-black tracking-normal">{previewAmount}</h3>
            <p className="text-slate-500 dark:text-slate-400">{draft.note || "Add a note to remember the context later."}</p>
          </div>
        </div>
      </Surface>
    </section>
  );
}
