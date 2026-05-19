"use client";

import { Bell, Filter, Receipt, Wallet } from "lucide-react";
import { FlowBars } from "@/components/charts";
import { useFinance } from "@/components/finance-provider";
import { Metric, ProgressRow, SectionHeading, Surface } from "@/components/ui";
import { formatCurrency } from "@/lib/finance-utils";

export default function ReportsPage() {
  const { stats, currency, categorySpend, trendData, transactions } = useFinance();
  const expenseCount = transactions.filter((item) => item.type === "expense").length;
  const averageExpense = expenseCount ? stats.expense / expenseCount : 0;

  return (
    <section className="grid gap-5">
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Wallet} label="Net balance" value={formatCurrency(stats.balance, currency)} tone="blue" />
        <Metric icon={Receipt} label="Avg expense" value={formatCurrency(averageExpense, currency)} tone="amber" />
        <Metric icon={Filter} label="Categories used" value={categorySpend.length} tone="green" />
        <Metric icon={Bell} label="Savings rate" value={`${stats.savingsRate}%`} tone="red" />
      </section>
      <section className="grid gap-5 xl:grid-cols-2">
        <Surface>
          <SectionHeading title="Income vs expense" />
          <FlowBars data={trendData} currency={currency} />
        </Surface>
        <Surface>
          <SectionHeading title="Top spend categories" />
          <div className="grid gap-5">
            {categorySpend.map((item) => <ProgressRow key={item.name} title={item.name} value={formatCurrency(item.value, currency)} progress={(item.value / (categorySpend[0]?.value || 1)) * 100} />)}
          </div>
        </Surface>
      </section>
    </section>
  );
}
