"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertTransactionParams {
  id?: string; // Receives if the transaction is being updated
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params); // Validate the input
  const { userId } = await auth(); // Protect the route
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: { id: params.id ?? "" },
  });
  revalidatePath("/transactions");
};
