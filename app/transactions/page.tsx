import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { db } from "../_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const transactions = await db.transaction.findMany({ where: { userId } });
  const canAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />

      <div className="space-y-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between p-6">
          <h2 className="text-2xl font-bold">Transações</h2>
          <AddTransactionButton userCanAddTransaction={canAddTransaction} />
        </div>
        <ScrollArea>
          <DataTable columns={transactionColumns} data={transactions} />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
