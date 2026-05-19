"use client";

import { Target } from "lucide-react";
import { useState } from "react";
import { useFinance } from "@/components/finance-provider";
import { GhostButton, PrimaryButton, ProgressRow, SectionHeading, Surface } from "@/components/ui";
import { formatCurrency, uid } from "@/lib/finance-utils";

export default function GoalsPage() {
  const { goals, setGoals, currency } = useFinance();
  const [draft, setDraft] = useState({ name: "", target: "", saved: "", deadline: "" });

  const addGoal = (event) => {
    event.preventDefault();
    if (!draft.name || !draft.target) return;
    setGoals((items) => [...items, { id: uid("goal"), ...draft, target: Number(draft.target), saved: Number(draft.saved || 0) }]);
    setDraft({ name: "", target: "", saved: "", deadline: "" });
  };

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
      <Surface>
        <SectionHeading title="Savings goals" />
        <div className="grid gap-4 sm:grid-cols-2">
          {goals.map((goal) => (
            <article className="grid gap-3 rounded-lg border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-slate-950/40" key={goal.id}>
              <Target size={22} className="text-teal-600" />
              <strong>{goal.name}</strong>
              <p className="text-sm text-slate-500 dark:text-slate-400">{formatCurrency(goal.saved, currency)} saved of {formatCurrency(goal.target, currency)}</p>
              <ProgressRow title={goal.deadline || "No deadline"} value={`${Math.round((goal.saved / goal.target) * 100)}%`} progress={(goal.saved / goal.target) * 100} />
              <GhostButton onClick={() => setGoals((items) => items.map((item) => item.id === goal.id ? { ...item, saved: Math.min(item.saved + item.target * 0.05, item.target) } : item))}>Add 5%</GhostButton>
            </article>
          ))}
        </div>
      </Surface>
      <Surface>
        <form className="grid gap-4" onSubmit={addGoal}>
          <SectionHeading title="Create goal" />
          <label className="form-label">Name<input className="form-input" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Emergency fund" /></label>
          <label className="form-label">Target<input className="form-input" type="number" value={draft.target} onChange={(event) => setDraft({ ...draft, target: event.target.value })} /></label>
          <label className="form-label">Saved<input className="form-input" type="number" value={draft.saved} onChange={(event) => setDraft({ ...draft, saved: event.target.value })} /></label>
          <label className="form-label">Deadline<input className="form-input" type="date" value={draft.deadline} onChange={(event) => setDraft({ ...draft, deadline: event.target.value })} /></label>
          <PrimaryButton><Target size={18} />Save goal</PrimaryButton>
        </form>
      </Surface>
    </section>
  );
}
