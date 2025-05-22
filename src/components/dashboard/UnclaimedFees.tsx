
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface FeeItem {
  name: string;
  fullName: string;
  balance: string;
  value: number;
  icon: string;
}

interface UnclaimedFeesProps {
  fees: FeeItem[];
}

export const UnclaimedFees: React.FC<UnclaimedFeesProps> = ({ fees }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Taxas Não Reclamadas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Saldo</TableHead>
              <TableHead>Valor USD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fees.map((fee, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{fee.icon}</span>
                    <div>
                      <div className="font-medium">{fee.name}</div>
                      <div className="text-sm text-gray-500">{fee.fullName}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{fee.balance}</TableCell>
                <TableCell>${fee.value.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Resgatar Todas</Button>
      </CardFooter>
    </Card>
  );
};
