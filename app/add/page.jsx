import { Suspense } from "react";
import { TransactionForm } from "@/components/transaction-form";

export default function AddPage() {
  return (
    <Suspense>
      <TransactionForm />
    </Suspense>
  );
}
