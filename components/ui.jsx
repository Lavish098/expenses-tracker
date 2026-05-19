"use client";

import { Edit3, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/finance-utils";

export function Surface({ children, className = "" }) {
  return <section className={`rounded-lg border border-slate-200/80 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/75 ${className}`}>{children}</section>;
}

export function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{eyebrow}</p>}
        <h2 className="text-xl font-black tracking-normal">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function PrimaryButton({ children, className = "", ...props }) {
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-teal-700 to-blue-600 px-5 font-black text-white shadow-lift ${className}`} {...props}>{children}</button>;
}

export function GhostButton({ children, className = "", ...props }) {
  return <button className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200/80 bg-white/70 px-4 font-bold text-slate-900 dark:border-white/10 dark:bg-slate-900/70 dark:text-white ${className}`} {...props}>{children}</button>;
}

export function Metric({ icon: Icon, label, value, tone = "blue" }) {
  const tones = {
    green: "bg-green-500/10 text-green-600",
    red: "bg-red-500/10 text-red-600",
    blue: "bg-blue-500/10 text-blue-600",
    amber: "bg-amber-500/10 text-amber-600",
  };

  return (
    <Surface className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">{label}</p>
        <span className={`grid h-10 w-10 place-items-center rounded-lg ${tones[tone]}`}><Icon size={20} /></span>
      </div>
      <strong className="mt-4 block text-2xl font-black tracking-normal">{value}</strong>
    </Surface>
  );
}

export function ProgressRow({ title, value, progress }) {
  return (
    <div className="grid gap-2">
      <div className="flex justify-between gap-4 text-sm">
        <strong>{title}</strong>
        <span className="text-slate-500 dark:text-slate-400">{value}</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
        <span className="block h-full rounded-full bg-gradient-to-r from-teal-700 to-blue-600" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
    </div>
  );
}

export function Money({ amount, currency, privateMode }) {
  return <>{privateMode ? "••••••" : formatCurrency(amount, currency)}</>;
}

export function TransactionList({ transactions, currency, compact = false, onEdit, onDuplicate, onDelete }) {
  return (
    <Surface>
      <SectionHeading title={compact ? "Recent transactions" : "Transaction history"} />
      <div className="grid gap-3">
        {transactions.length === 0 && <div className="grid min-h-40 place-items-center rounded-lg border border-dashed border-slate-300 text-slate-500 dark:border-white/10">No transactions match this view.</div>}
        {transactions.map((item) => (
          <article className="grid gap-3 rounded-lg border border-slate-200/80 bg-white p-3 dark:border-white/10 dark:bg-slate-950/40 sm:flex sm:items-center" key={item.id}>
            <div className={`grid h-11 w-11 place-items-center rounded-lg font-black ${item.type === "income" ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"}`}>{item.category.slice(0, 1)}</div>
            <div className="min-w-0 flex-1">
              <strong className="block truncate">{item.title}</strong>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.category} • {new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
            </div>
            <b className={item.type === "income" ? "text-green-600" : "text-red-600"}>{item.type === "income" ? "+" : "-"}{formatCurrency(item.amount, currency)}</b>
            {!compact && (
              <div className="flex gap-2">
                <SmallIcon label="Edit" onClick={() => onEdit(item)}><Edit3 size={16} /></SmallIcon>
                <SmallIcon label="Duplicate" onClick={() => onDuplicate(item)}><Plus size={16} /></SmallIcon>
                <SmallIcon label="Delete" onClick={() => onDelete(item.id)}><Trash2 size={16} /></SmallIcon>
              </div>
            )}
          </article>
        ))}
      </div>
    </Surface>
  );
}

export function SmallIcon({ children, label, ...props }) {
  return <button className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200/80 bg-white/70 text-slate-700 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-200" aria-label={label} title={label} {...props}>{children}</button>;
}
