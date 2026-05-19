"use client";

import { Repeat2, X } from "lucide-react";
import { useFinance } from "@/components/finance-provider";
import { SectionHeading, SmallIcon, Surface } from "@/components/ui";
import { formatCurrency } from "@/lib/finance-utils";

export default function RecurringPage() {
  const { recurring, setRecurring, currency } = useFinance();

  return (
    <Surface>
      <SectionHeading eyebrow="Automation" title="Recurring transactions" />
      <div className="grid gap-3">
        {recurring.map((item) => (
          <article className="grid gap-3 rounded-lg border border-slate-200/80 bg-white p-3 dark:border-white/10 dark:bg-slate-950/40 sm:flex sm:items-center" key={item.id}>
            <div className={`grid h-11 w-11 place-items-center rounded-lg ${item.type === "income" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}><Repeat2 size={19} /></div>
            <div className="min-w-0 flex-1">
              <strong>{item.title}</strong>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.cadence} • next on {new Date(item.nextDate).toLocaleDateString()}</p>
            </div>
            <b>{formatCurrency(item.amount, currency)}</b>
            <SmallIcon label="Remove" onClick={() => setRecurring((items) => items.filter((entry) => entry.id !== item.id))}><X size={17} /></SmallIcon>
          </article>
        ))}
      </div>
    </Surface>
  );
}
