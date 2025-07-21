import { COLOR_BRANDING } from "@/constants";
import { Transaction as ITransaction } from "@/types";
import { capitalizeFirstLetter } from "@/utils";
import { formatDateTime } from "@/utils/date-time";
import {
  ArrowDown,
  ArrowUp,
  LoaderCircle,
  LucideIcon,
} from "lucide-react-native";
import React from "react";
import { Box } from "./ui/box";
import { HStack } from "./ui/hstack";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

type Props = {
  transaction: ITransaction;
};

const getTransactionIcon = (
  transaction: ITransaction,
  isOutgoing: boolean
): LucideIcon => {
  switch (transaction.type) {
    case "convert":
      return LoaderCircle;
    case "deposit":
      return LoaderCircle;
    case "transfer":
      return isOutgoing ? ArrowUp : ArrowDown;
    default:
      return ArrowUp;
  }
};

const getTransactionLabel = (transaction: ITransaction): string => {
  switch (transaction.type) {
    case "convert":
      return `To your ${transaction.account} balance`;
    case "transfer":
    case "deposit":
      return "Crypto transfer";
    default:
      return "Transaction";
  }
};

const Transaction: React.FC<Props> = ({ transaction }) => {
  const isOutgoing = transaction.type === "transfer" && transaction.amount > 0;
  const isIncoming =
    transaction.type === "deposit" ||
    transaction.type === "convert" ||
    (transaction.type === "transfer" && transaction.amount < 0);

  const IconComponent = getTransactionIcon(transaction, isOutgoing);
  const typeLabel = getTransactionLabel(transaction);
  const amountPrefix = isOutgoing ? "- " : isIncoming ? "+ " : "";
  const displayAmount = Math.abs(transaction.amount);

  return (
    <HStack className="items-center justify-between py-4">
      <HStack className="items-center flex-1">
        <Box className="p-3 mr-3 rounded-lg bg-estable-grey-400">
          <IconComponent size={20} color={COLOR_BRANDING.base.light} />
        </Box>
        <VStack className="flex-1">
          <Text className="text-base font-medium text-white">{typeLabel}</Text>
          <Text className="text-sm text-gray-400">
            {formatDateTime(transaction.date)}
          </Text>
        </VStack>
      </HStack>
      <VStack className="items-end">
        <Text className="text-base font-medium text-white">
          {amountPrefix}
          {displayAmount} {transaction.account}
        </Text>
        <Text className={`text-sm capitalize text-white`}>
          {capitalizeFirstLetter(transaction.status)}
        </Text>
      </VStack>
    </HStack>
  );
};

export { Transaction };
