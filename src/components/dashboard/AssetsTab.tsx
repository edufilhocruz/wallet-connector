
import React from 'react';
import { AssetsTable } from './AssetsTable';
import { AssetDetails } from './AssetDetails';

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

interface AssetsTabProps {
  assets: Asset[];
  portfolioData: Array<{
    name: string;
    value: number;
    eth: number;
  }>;
}

export const AssetsTab: React.FC<AssetsTabProps> = ({ assets, portfolioData }) => {
  return (
    <div className="space-y-6 mt-6">
      {/* Assets table */}
      <AssetsTable assets={assets} />

      {/* Asset details */}
      <AssetDetails portfolioData={portfolioData} />
    </div>
  );
};
