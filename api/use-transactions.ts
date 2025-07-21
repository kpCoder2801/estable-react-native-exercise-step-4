import { MOCK_TRANSACTION_LIST } from "@/constants";
import { Transaction, TransactionAccount, TransactionType } from "@/types";
import { Log, sleep } from "@/utils";
import { useQuery } from "@tanstack/react-query";

type TransactionFilters = {
  types?: TransactionType[];
  accounts?: TransactionAccount[];
};

type PaginationParams = {
  page: number;
  pageSize: number;
};

type GetTransactionsParams = PaginationParams & TransactionFilters;

type TransactionGroup = {
  date: string;
  transactions: Transaction[];
};

type PaginatedResponse<T> = {
  success: boolean;
  data: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    items: T;
  };
  error?: string;
};

type TransactionsResponse = PaginatedResponse<Transaction[]>;
type GroupedTransactionsResponse = PaginatedResponse<TransactionGroup[]>;

const filterTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters
): Transaction[] => {
  const { types = [], accounts = [] } = filters;

  return transactions.filter((transaction) => {
    const matchesType = types.length === 0 || types.includes(transaction.type);
    const matchesAccount =
      accounts.length === 0 || accounts.includes(transaction.account);

    return matchesType && matchesAccount;
  });
};

const getTransactions = async (
  params: GetTransactionsParams
): Promise<TransactionsResponse> => {
  const { page = 1, pageSize = 10, ...filters } = params;

  Log.info("Fetching transactions", { page, pageSize, filters });

  try {
    await sleep(Math.random() * 500 + 200); // 200-700ms delay

    const filteredTransactions = filterTransactions(
      MOCK_TRANSACTION_LIST,
      filters
    );
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / pageSize);

    if (page < 1 || (page > totalPages && totalPages > 0)) {
      throw new Error(
        `Invalid page ${page}. Must be between 1 and ${totalPages}`
      );
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const transactions = filteredTransactions.slice(startIndex, endIndex);

    return {
      success: true,
      data: {
        page,
        pageSize,
        totalPages,
        totalItems,
        items: transactions,
      },
    };
  } catch (error) {
    return {
      success: false,
      data: {
        page,
        pageSize,
        totalPages: 0,
        totalItems: 0,
        items: [],
      },
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

const useGetTransactions = (params: GetTransactionsParams) => {
  const { page = 1, pageSize = 10, types = [], accounts = [] } = params;

  return useQuery<TransactionsResponse>({
    queryKey: ["transactions", page, pageSize, types, accounts],
    queryFn: () => getTransactions(params),
    staleTime: 1000 * 60 * 5,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchInterval: 5000, // Auto poll every 5 seconds
  });
};

export {
  getTransactions,
  useGetTransactions,
  type GetTransactionsParams,
  type GroupedTransactionsResponse,
  type PaginationParams,
  type TransactionFilters,
  type TransactionGroup,
  type TransactionsResponse
};
