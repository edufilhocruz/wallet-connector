
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

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

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Histórico de Transações</CardTitle>
          <Button variant="outline" size="sm">Exportar</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>De/Para</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Taxa</TableHead>
              <TableHead>Hash</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  <Badge variant={tx.type === 'Stake' ? 'outline' : 'secondary'}>
                    {tx.type}
                  </Badge>
                </TableCell>
                <TableCell>{tx.token}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <div className="text-xs text-gray-500">De: {tx.from.substring(0, 6)}...{tx.from.substring(tx.from.length - 4)}</div>
                    <div className="text-xs text-gray-500">Para: {tx.to.substring(0, 6)}...{tx.to.substring(tx.to.length - 4)}</div>
                  </div>
                </TableCell>
                <TableCell>{new Date(tx.date).toLocaleString()}</TableCell>
                <TableCell>{tx.fee}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">{tx.hash}</span>
                    <ExternalLink size={12} className="cursor-pointer hover:text-blue-600" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline">Carregar Mais</Button>
      </CardFooter>
    </Card>
  );
};
