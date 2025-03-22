import { Prisma, PrismaClient } from "@prisma/client";

export function prismaWithTx<T>(
    transactionFunction: (tx: Prisma.TransactionClient) => Promise<T>
) {
    const P = new PrismaClient();
    return P.$transaction(async (tx: Prisma.TransactionClient) => {
        return await transactionFunction(tx)
    })
}