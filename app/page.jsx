"use client";

import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, CalendarClock, PiggyBank, Plus } from "lucide-react";
import { FlowArea, SpendingPie } from "@/components/charts";
import { useFinance } from "@/components/finance-provider";
import { Metric, Money, ProgressRow, SectionHeading, Surface, TransactionList } from "@/components/ui";
import { formatCurrency } from "@/lib/finance-utils";

export default function DashboardPage() {
  const { stats, currency, isPrivate, categorySpend, trendData, transactions, budgets, smartInsight } = useFinance();
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  return (
    <div className="grid gap-5">
      <section className="flex min-h-72 flex-col justify-end gap-6 rounded-lg border border-white/20 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.28),transparent_18rem),linear-gradient(135deg,rgba(15,118,110,0.94),rgba(37,99,235,0.88))] p-7 text-white shadow-soft sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-white/75">Current balance</p>
          <h2 className="mt-2 text-5xl font-black tracking-normal sm:text-7xl"><Money amount={stats.balance} currency={currency} privateMode={isPrivate} /></h2>
          <p className="mt-3 max-w-xl text-white/80">{smartInsight}</p>
        </div>
        <Link href="/add" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-white px-5 font-black text-slate-950 shadow-lift">
          <Plus size={18} />Add money record
        </Link>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={ArrowUpRight} label="Income" value={<Money amount={stats.income} currency={currency} privateMode={isPrivate} />} tone="green" />
        <Metric icon={ArrowDownLeft} label="Expenses" value={<Money amount={stats.expense} currency={currency} privateMode={isPrivate} />} tone="red" />
        <Metric icon={PiggyBank} label="Savings rate" value={`${stats.savingsRate}%`} tone="blue" />
        <Metric icon={CalendarClock} label="This month" value={<Money amount={stats.monthSpend} currency={currency} privateMode={isPrivate} />} tone="amber" />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <Surface>
          <SectionHeading title="Spending mix" />
          <SpendingPie data={categorySpend} currency={currency} />
        </Surface>
        <Surface>
          <SectionHeading title="Monthly flow" />
          <FlowArea data={trendData} currency={currency} />
        </Surface>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <TransactionList transactions={recent} currency={currency} compact />
        <Surface>
          <SectionHeading title="Budget guardrails" />
          <div className="grid gap-4">
            {budgets.slice(0, 4).map((budget) => {
              const spent = categorySpend.find((item) => item.name === budget.category)?.value || 0;
              return <ProgressRow key={budget.id} title={budget.category} value={`${formatCurrency(spent, currency)} / ${formatCurrency(budget.limit, currency)}`} progress={(spent / budget.limit) * 100} />;
            })}
          </div>
        </Surface>
      </section>
    </div>
  );
}
