import { Transaction } from "@/types";
import { faker } from "@faker-js/faker";

const MOCK_TRANSACTION_LIST: Transaction[] = Array.from(
  { length: 100 },
  (_, index) => ({
    id: faker.string.uuid(),
    type: faker.helpers.arrayElement(["transfer", "convert", "deposit"]),
    account: faker.helpers.arrayElement(["ETH", "USDT", "BTC"]),
    amount: faker.number.int({ min: 1, max: 1000 }),
    date: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(["pending", "completed", "failed"]),
  })
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export { MOCK_TRANSACTION_LIST };
