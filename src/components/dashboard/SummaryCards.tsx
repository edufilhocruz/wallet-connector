
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryCardProps {
  title: string;
  value: string | number;
  isMonetary?: boolean;
  isPercentage?: boolean;
  isPositive?: boolean;
  prefix?: string;
  suffix?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  isMonetary = false, 
  isPercentage = false, 
  isPositive, 
  prefix = '',
  suffix = ''
}) => {
  const formattedValue = typeof value === 'number' && isMonetary 
    ? value.toLocaleString() 
    : value;

  const valueClassName = isPositive !== undefined
    ? `text-lg md:text-xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`
    : "text-lg md:text-xl font-bold";

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={valueClassName}>
          {prefix}{formattedValue}{suffix}
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  totalPortfolioValue: number;
  totalProfitLoss: number;
  portfolioPerformance: Record<string, number>;
  timeRange: string;
  assetCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalPortfolioValue,
  totalProfitLoss,
  portfolioPerformance,
  timeRange,
  assetCount
}) => {
  const performance = portfolioPerformance[timeRange as keyof typeof portfolioPerformance];
  const isPerformancePositive = performance >= 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <SummaryCard 
        title="Portfolio" 
        value={totalPortfolioValue} 
        isMonetary={true} 
        prefix="$" 
      />
      <SummaryCard 
        title="Lucro/Perda" 
        value={Math.abs(totalProfitLoss)} 
        isMonetary={true} 
        isPositive={totalProfitLoss >= 0}
        prefix={totalProfitLoss >= 0 ? '+$' : '-$'} 
      />
      <SummaryCard 
        title={`Performance ${timeRange}`} 
        value={performance} 
        isPositive={isPerformancePositive}
        prefix={isPerformancePositive ? '+' : ''}
        suffix="%" 
      />
      <SummaryCard 
        title="Total de Ativos" 
        value={assetCount} 
      />
    </div>
  );
};
