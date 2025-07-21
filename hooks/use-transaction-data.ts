import { useGetTransactionsInfinite } from "@/api";
import { Transaction } from "@/types";
import { formatDateGroup } from "@/utils";
import { useCallback, useMemo } from "react";

type TransactionGroupItem = {
  type: "group";
  date: string;
  transactions: Transaction[];
  id: string;
};

type TransactionListItem = TransactionGroupItem;

type UseTransactionDataParams = {
  pageSize?: number;
  refetchInterval?: number;
};

type UseTransactionDataReturn = {
  flatListData: TransactionListItem[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: Error | null;
  handleLoadMore: () => void;
};

const useTransactionData = ({
  pageSize = 10,
  refetchInterval = 5000,
}: UseTransactionDataParams = {}): UseTransactionDataReturn => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetTransactionsInfinite({ pageSize }, { refetchInterval });

  const allTransactions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => (page.success ? page.data.items : []));
  }, [data?.pages]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};

    allTransactions.forEach((transaction) => {
      const dateKey = formatDateGroup(transaction.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
    });

    return groups;
  }, [allTransactions]);

  const flatListData = useMemo(() => {
    return Object.entries(groupedTransactions)
      .sort(([, transactionsA], [, transactionsB]) => {
        const dateA = new Date(transactionsA[0].date);
        const dateB = new Date(transactionsB[0].date);
        return dateB.getTime() - dateA.getTime();
      })
      .map(([dateKey, transactions]) => ({
        type: "group" as const,
        date: dateKey,
        transactions,
        id: dateKey,
      }));
  }, [groupedTransactions]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    flatListData,
    isLoading,
    isFetchingNextPage,
    hasNextPage: hasNextPage ?? false,
    error,
    handleLoadMore,
  };
};

export { TransactionGroupItem, TransactionListItem, useTransactionData };
