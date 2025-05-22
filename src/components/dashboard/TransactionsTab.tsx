
import React from 'react';
import { TransactionsTable } from './TransactionsTable';

interface Transaction {
  id: number;
  type: string;
  token: string;
  amount: string;
  from: string;
  to: string;
  date: string;
  status: string;
  fee: string;
  hash: string;
}

interface TransactionsTabProps {
  transactions: Transaction[];
}

export const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions }) => {
  return (
    <div className="space-y-6 mt-6">
      {/* Transaction history */}
      <TransactionsTable transactions={transactions} />
    </div>
  );
};
