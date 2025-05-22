
import React from 'react';
import { PortfolioChart } from './PortfolioChart';
import { AssetDistributionChart } from './AssetDistributionChart';
import { UnclaimedFees } from './UnclaimedFees';

interface OverviewTabProps {
  portfolioData: Array<{
    name: string;
    value: number;
    eth: number;
  }>;
  tokenDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  unclaimedFees: Array<{
    name: string;
    fullName: string;
    balance: string;
    value: number;
    icon: string;
  }>;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ 
  portfolioData,
  tokenDistribution,
  unclaimedFees
}) => {
  return (
    <div className="space-y-6 mt-6">
      {/* Gráfico principal */}
      <PortfolioChart data={portfolioData} />

      {/* Distribuição de ativos e fees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Distribuição de ativos */}
        <AssetDistributionChart data={tokenDistribution} />

        {/* Unclaimed fees */}
        <UnclaimedFees fees={unclaimedFees} />
      </div>
    </div>
  );
};
