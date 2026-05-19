"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Eye, EyeOff, Flag, Home, LineChart, Moon, Plus, Receipt, Repeat2, Settings, Sparkles, Target, Wallet } from "lucide-react";
import { currencyOptions } from "@/lib/finance-data";
import { pageTitle } from "@/lib/finance-utils";
import { useFinance } from "@/components/finance-provider";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/add", label: "Add", icon: Plus },
  { href: "/transactions", label: "Transactions", icon: Receipt },
  { href: "/budgets", label: "Budgets", icon: Flag },
  { href: "/reports", label: "Reports", icon: LineChart },
  { href: "/goals", label: "Goals", icon: Target },
  { href: "/recurring", label: "Recurring", icon: Repeat2 },
];

export function AppShell({ children }) {
  const pathname = usePathname();
  const { smartInsight, currencyCountry, setCurrencyCountry, isDark, setIsDark, isPrivate, setIsPrivate, fileInputRef, importData } = useFinance();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_34rem),linear-gradient(135deg,#f8fafc_0%,#eef6f5_42%,#f6f2ff_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.20),transparent_34rem),linear-gradient(135deg,#07111f_0%,#0c1727_55%,#111827_100%)] dark:text-slate-50 lg:grid lg:grid-cols-[292px_minmax(0,1fr)]">
      <aside className="sticky top-0 hidden h-screen border-r border-slate-200/80 p-6 dark:border-white/10 lg:block">
        <Link href="/" className="mb-9 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-teal-700 to-blue-600 text-white shadow-lift">
            <Wallet size={22} />
          </span>
          <span>
            <strong className="block text-xl">Expendi</strong>
            <span className="text-sm text-slate-500 dark:text-slate-400">Money cockpit</span>
          </span>
        </Link>
        <nav className="grid gap-2">
          {navItems.map((item) => <NavLink key={item.href} item={item} active={pathname === item.href} />)}
        </nav>
        <div className="mt-7 rounded-lg border border-slate-200/80 bg-white/75 p-4 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
          <Sparkles size={18} className="text-teal-600" />
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{smartInsight}</p>
        </div>
      </aside>

      <section className="min-w-0 px-4 pb-28 pt-5 sm:px-6 lg:px-9 lg:py-7">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Personal finance</p>
            <h1 className="mt-1 text-3xl font-black tracking-normal sm:text-5xl">{pageTitle(pathname)}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-200/80 bg-white/75 px-3 dark:border-white/10 dark:bg-slate-900/70">
              <select className="appearance-none bg-transparent text-sm font-bold outline-none" value={currencyCountry} onChange={(event) => setCurrencyCountry(event.target.value)}>
                {Object.keys(currencyOptions).map((country) => <option key={country}>{country}</option>)}
              </select>
              <ChevronDown size={16} />
            </label>
            <button className="icon-button" title="Privacy" onClick={() => setIsPrivate((value) => !value)}>{isPrivate ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            <button className="icon-button" title="Theme" onClick={() => setIsDark((value) => !value)}>{isDark ? <Moon size={18} /> : <Settings size={18} />}</button>
            <button className="icon-button" title="Alerts"><Bell size={18} /></button>
          </div>
        </header>
        {children}
      </section>

      <nav className="fixed bottom-3 left-3 right-3 z-20 grid grid-cols-4 gap-1 rounded-lg border border-slate-200/80 bg-white/85 p-2 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-900/85 lg:hidden">
        {navItems.slice(0, 4).map((item) => <NavLink key={item.href} item={item} active={pathname === item.href} mobile />)}
      </nav>
      <input ref={fileInputRef} className="hidden" type="file" accept="application/json" onChange={importData} />
    </main>
  );
}

function NavLink({ item, active, mobile }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} className={`flex items-center gap-3 rounded-lg px-3 text-sm font-bold transition ${mobile ? "min-h-14 flex-col justify-center gap-1 px-1 text-xs" : "min-h-11"} ${active ? "bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white" : "text-slate-500 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-white/5"}`}>
      <Icon size={mobile ? 18 : 19} />
      <span>{mobile && item.label === "Transactions" ? "History" : item.label}</span>
    </Link>
  );
}
