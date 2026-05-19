import "./globals.css";
import { AppShell } from "@/components/app-shell";
import { FinanceProvider } from "@/components/finance-provider";

export const metadata = {
  title: "Expendi",
  description: "A modern personal finance dashboard for tracking spending, budgets, and goals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FinanceProvider>
          <AppShell>{children}</AppShell>
        </FinanceProvider>
      </body>
    </html>
  );
}
