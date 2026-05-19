"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCurrency } from "@/lib/finance-utils";

export function SpendingPie({ data, currency }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} innerRadius={64} outerRadius={96} dataKey="value" paddingAngle={3}>
          {data.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value, currency)} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function FlowArea({ data, currency }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.38} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
          <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} /></linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis hide />
        <Tooltip formatter={(value) => formatCurrency(value, currency)} />
        <Area dataKey="income" stroke="#22c55e" fill="url(#income)" strokeWidth={3} />
        <Area dataKey="expense" stroke="#ef4444" fill="url(#expense)" strokeWidth={3} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function FlowBars({ data, currency }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" />
        <YAxis hide />
        <Tooltip formatter={(value) => formatCurrency(value, currency)} />
        <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
        <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
