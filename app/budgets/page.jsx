"use client";

import { Flag } from "lucide-react";
import { useState } from "react";
import { expenseCategories } from "@/lib/finance-data";
import { formatCurrency, uid } from "@/lib/finance-utils";
import { useFinance } from "@/components/finance-provider";
import { PrimaryButton, ProgressRow, SectionHeading, Surface } from "@/components/ui";

export default function BudgetsPage() {
  const { budgets, setBudgets, categorySpend, currency } = useFinance();
  const [draft, setDraft] = useState({ category: "Food", limit: "" });

  const addBudget = (event) => {
    event.preventDefault();
    if (!draft.limit) return;
    const next = { id: uid("budget"), category: draft.category, limit: Number(draft.limit) };
    setBudgets((items) => (items.some((item) => item.category === next.category) ? items.map((item) => (item.category === next.category ? next : item)) : [...items, next]));
    setDraft({ category: "Food", limit: "" });
  };

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
      <Surface>
        <SectionHeading title="Category budgets" />
        <div className="grid gap-5">
          {budgets.map((budget) => {
            const spent = categorySpend.find((item) => item.name === budget.category)?.value || 0;
            return <ProgressRow key={budget.id} title={budget.category} value={`${formatCurrency(spent, currency)} spent of ${formatCurrency(budget.limit, currency)}`} progress={(spent / budget.limit) * 100} />;
          })}
        </div>
      </Surface>
      <Surface>
        <form className="grid gap-4" onSubmit={addBudget}>
          <SectionHeading title="Add or update budget" />
          <label className="form-label">Category<select className="form-input" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>{expenseCategories.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
          <label className="form-label">Monthly limit<input className="form-input" type="number" value={draft.limit} onChange={(event) => setDraft({ ...draft, limit: event.target.value })} placeholder="0.00" /></label>
          <PrimaryButton><Flag size={18} />Save budget</PrimaryButton>
        </form>
      </Surface>
    </section>
  );
}
