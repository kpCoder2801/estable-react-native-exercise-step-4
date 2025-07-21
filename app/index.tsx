import { Header } from "@/components/header";
import { TransactionList } from "@/components/list/transaction-list";
import { ScreenLayout } from "@/components/screen-layout";
import { ErrorState } from "@/components/states/error-state";
import { LoadingState } from "@/components/states/loading-state";
import { useTransactionData } from "@/hooks/use-transaction-data";
import React from "react";

const TRANSACTIONS_PAGE_SIZE = 10;

const Screen: React.FC = () => {
  const { flatListData, isLoading, isFetchingNextPage, error, handleLoadMore } =
    useTransactionData({ pageSize: TRANSACTIONS_PAGE_SIZE });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <ScreenLayout className="flex-1">
      <Header />
      <TransactionList
        data={flatListData}
        onLoadMore={handleLoadMore}
        isLoadingMore={isFetchingNextPage}
      />
    </ScreenLayout>
  );
};

export default Screen;
