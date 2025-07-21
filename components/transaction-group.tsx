import { Transaction as ITransaction } from "@/types";
import React from "react";
import { Transaction } from "./transaction";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

type Props = {
  date: string;
  transactions: ITransaction[];
};

const TransactionGroup: React.FC<Props> = ({ date, transactions }) => {
  return (
    <VStack key={date}>
      <Text className="pb-2 mb-2 text-lg font-medium text-white border-b border-gray-600">
        {date}
      </Text>

      <VStack>
        {transactions.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </VStack>
    </VStack>
  );
};

export { TransactionGroup };
