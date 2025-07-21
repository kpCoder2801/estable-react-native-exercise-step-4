import { useGetTransactionsInfinite } from "@/api";
import { Header } from "@/components/header";
import { ScreenLayout } from "@/components/screen-layout";
import { TransactionGroup } from "@/components/transaction-group";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Transaction as ITransaction } from "@/types";
import { formatDateGroup } from "@/utils";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList } from "react-native";

type TransactionGroupItem = {
  type: 'group';
  date: string;
  transactions: ITransaction[];
  id: string;
};

type FlatListItem = TransactionGroupItem;

const Screen: React.FC = () => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useGetTransactionsInfinite({ pageSize: 10 });

  // Flatten all transactions from all pages
  const allTransactions = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => 
      page.success ? page.data.items : []
    );
  }, [data]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { [dateKey: string]: ITransaction[] } = {};
    
    allTransactions.forEach((transaction) => {
      const dateKey = formatDateGroup(transaction.date);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(transaction);
    });

    return groups;
  }, [allTransactions]);

  // Convert to flat list items and sort by date
  const flatListData = useMemo(() => {
    const items: FlatListItem[] = Object.keys(groupedTransactions)
      .sort((a, b) => {
        const dateA = new Date(groupedTransactions[a][0].date);
        const dateB = new Date(groupedTransactions[b][0].date);
        return dateB.getTime() - dateA.getTime();
      })
      .map((dateKey) => ({
        type: 'group' as const,
        date: dateKey,
        transactions: groupedTransactions[dateKey],
        id: dateKey,
      }));

    return items;
  }, [groupedTransactions]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback(({ item }: { item: FlatListItem }) => {
    return (
      <TransactionGroup
        key={item.id}
        date={item.date}
        transactions={item.transactions}
      />
    );
  }, []);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <Box className="py-4 items-center">
        <ActivityIndicator size="small" color="#ffffff" />
      </Box>
    );
  }, [isFetchingNextPage]);

  const keyExtractor = useCallback((item: FlatListItem) => item.id, []);

  if (isLoading) {
    return (
      <ScreenLayout className="flex-1 justify-center items-center">
        <Header />
        <Box className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffffff" />
          <Text className="text-white mt-2">Loading transactions...</Text>
        </Box>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout className="flex-1 justify-center items-center">
        <Header />
        <Box className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-center">
            Error loading transactions: {error.message}
          </Text>
        </Box>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout className="flex-1">
      <Header />
      <FlatList
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 16,
        }}
        ItemSeparatorComponent={() => <Box className="h-4" />}
      />
    </ScreenLayout>
  );
};

export default Screen;
