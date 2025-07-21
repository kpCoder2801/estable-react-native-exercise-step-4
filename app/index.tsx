import { useGetTransactions } from "@/api";
import { Header } from "@/components/header";
import { ScreenLayout } from "@/components/screen-layout";
import { TransactionGroup } from "@/components/transaction-group";
import { Transaction as ITransaction } from "@/types";
import { formatDateGroup } from "@/utils";
import React from "react";

type TransactionsByDate = {
  [dateKey: string]: ITransaction[];
};

const groupTransactionsByDate = (
  transactions: ITransaction[]
): TransactionsByDate => {
  return transactions.reduce((groups, transaction) => {
    const dateKey = formatDateGroup(transaction.date);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {} as TransactionsByDate);
};

const Screen: React.FC = () => {
  const { data } = useGetTransactions({ page: 1, pageSize: 10 });
  const groupedTransactions = groupTransactionsByDate(data?.data.items || []);

  const sortedDateKeys = Object.keys(groupedTransactions).sort((a, b) => {
    const dateA = new Date(groupedTransactions[a][0].date);
    const dateB = new Date(groupedTransactions[b][0].date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <ScreenLayout className="flex-col gap-4">
      <Header />
      {sortedDateKeys.map((dateKey) => (
        <TransactionGroup
          key={dateKey}
          date={dateKey}
          transactions={groupedTransactions[dateKey]}
        />
      ))}
    </ScreenLayout>
  );
};

export default Screen;
