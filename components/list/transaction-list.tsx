import { TransactionGroup } from "@/components/transaction-group";
import { Box } from "@/components/ui/box";
import { TransactionListItem } from "@/hooks/use-transaction-data";
import React, { useCallback } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { LoadMoreFooter } from "./load-more-footer";

type Props = {
  data: TransactionListItem[];
  onLoadMore: () => void;
  isLoadingMore: boolean;
};

const LIST_SEPARATOR_HEIGHT = 16;

const TransactionList: React.FC<Props> = ({
  data,
  onLoadMore,
  isLoadingMore,
}) => {
  const renderItem: ListRenderItem<TransactionListItem> = useCallback(
    ({ item }) => (
      <TransactionGroup
        key={item.id}
        date={item.date}
        transactions={item.transactions}
      />
    ),
    []
  );

  const renderFooter = useCallback(
    () => <LoadMoreFooter isLoading={isLoadingMore} />,
    [isLoadingMore]
  );

  const renderSeparator = useCallback(() => <Box className="h-4" />, []);

  const keyExtractor = useCallback((item: TransactionListItem) => item.id, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: LIST_SEPARATOR_HEIGHT,
      }}
      ItemSeparatorComponent={renderSeparator}
    />
  );
};

export { TransactionList };
