type TransactionType = "transfer" | "convert" | "deposit";

type TransactionAccount = "ETH" | "USDT" | "BTC";

type TransactionStatus = "pending" | "completed" | "failed";

type Transaction = {
  id: string;
  type: TransactionType;
  account: TransactionAccount;
  amount: number;
  date: string; // ISO date string
  status: TransactionStatus;
};

export type {
  Transaction,
  TransactionAccount,
  TransactionStatus,
  TransactionType
};
