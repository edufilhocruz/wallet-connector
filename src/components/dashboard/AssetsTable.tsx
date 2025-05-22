
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AssetPerformance {
  '1D': number;
  '7D': number;
  '1M': number;
  'YTD': number;
}

interface Asset {
  name: string;
  fullName: string;
  price: number;
  holdings: number;
  marketValue: number;
  portfolioPercent: number;
  performance: AssetPerformance;
  avgBuyPrice: number;
  netProfit: number;
  icon: string;
}

interface AssetsTableProps {
  assets: Asset[];
}

export const AssetsTable: React.FC<AssetsTableProps> = ({ assets }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seus Ativos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Saldo</TableHead>
              <TableHead className="text-right">Valor USD</TableHead>
              <TableHead className="text-right">% Portfolio</TableHead>
              <TableHead className="text-right">24h</TableHead>
              <TableHead className="text-right">7d</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={index} className="cursor-pointer hover:bg-gray-50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{asset.icon}</span>
                    <div>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-gray-500">{asset.fullName}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">${asset.price.toLocaleString()}</TableCell>
                <TableCell className="text-right">{asset.holdings.toLocaleString()}</TableCell>
                <TableCell className="text-right font-medium">${asset.marketValue.toLocaleString()}</TableCell>
                <TableCell className="text-right">{asset.portfolioPercent}%</TableCell>
                <TableCell className={`text-right ${asset.performance['1D'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.performance['1D'] >= 0 ? '+' : ''}{asset.performance['1D']}%
                </TableCell>
                <TableCell className={`text-right ${asset.performance['7D'] >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.performance['7D'] >= 0 ? '+' : ''}{asset.performance['7D']}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
