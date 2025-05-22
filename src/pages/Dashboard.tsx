
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { TimeRangeToggle } from '@/components/dashboard/TimeRangeToggle';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { OverviewTab } from '@/components/dashboard/OverviewTab';
import { AssetsTab } from '@/components/dashboard/AssetsTab';
import { TransactionsTab } from '@/components/dashboard/TransactionsTab';

// Portfolio data over time
const portfolioData = [
  { name: 'Sep 13', value: 145000, eth: 140000 },
  { name: 'Sep 20', value: 148000, eth: 142000 },
  { name: 'Sep 27', value: 152000, eth: 147000 },
  { name: 'Oct 04', value: 149000, eth: 145000 },
  { name: 'Oct 11', value: 160000, eth: 152000 },
  { name: 'Oct 18', value: 158000, eth: 150000 },
];

// Token distribution
const tokenDistribution = [
  { name: 'ETH', value: 65, color: '#627EEA' },
  { name: 'USDT', value: 15, color: '#26A17B' },
  { name: 'BTC', value: 10, color: '#F7931A' },
  { name: 'LINK', value: 5, color: '#2A5ADA' },
  { name: 'MATIC', value: 5, color: '#8247E5' },
];

// Assets portfolio
const assetsData = [
  { 
    name: 'ETH', 
    fullName: 'Ethereum',
    price: 4151.56, 
    holdings: 3.2932, 
    marketValue: 13671747.81, 
    portfolioPercent: 65, 
    performance: {
      '1D': 2.31,
      '7D': -4.64,
      '1M': 1.69,
      'YTD': 11.50
    },
    avgBuyPrice: 2354.25,
    netProfit: 71747.81,
    icon: '🔷'
  },
  { 
    name: 'USDT', 
    fullName: 'Tether',
    price: 1.00, 
    holdings: 6835874, 
    marketValue: 6835874, 
    portfolioPercent: 15, 
    performance: {
      '1D': 0.01,
      '7D': 0.00,
      '1M': 0.02,
      'YTD': 0.05
    },
    avgBuyPrice: 1.00,
    netProfit: 0,
    icon: '💵'
  },
  { 
    name: 'BTC', 
    fullName: 'Bitcoin',
    price: 63540.25, 
    holdings: 0.15, 
    marketValue: 9531037.50, 
    portfolioPercent: 10, 
    performance: {
      '1D': 1.5,
      '7D': -2.1,
      '1M': 5.3,
      'YTD': 32.5
    },
    avgBuyPrice: 58240.10,
    netProfit: 795.02,
    icon: '🔶'
  },
  { 
    name: 'LINK', 
    fullName: 'Chainlink',
    price: 15.75, 
    holdings: 1250, 
    marketValue: 19687.50, 
    portfolioPercent: 5, 
    performance: {
      '1D': -1.2,
      '7D': 4.5,
      '1M': 12.3,
      'YTD': 25.7
    },
    avgBuyPrice: 12.50,
    netProfit: 4062.50,
    icon: '🔗'
  },
  { 
    name: 'MATIC', 
    fullName: 'Polygon',
    price: 0.58, 
    holdings: 25000, 
    marketValue: 14500, 
    portfolioPercent: 5, 
    performance: {
      '1D': 3.2,
      '7D': -1.5,
      '1M': 8.7,
      'YTD': -12.3
    },
    avgBuyPrice: 0.62,
    netProfit: -1000,
    icon: '💠'
  }
];

// Transaction history
const transactions = [
  { 
    id: 1, 
    type: 'Deposit', 
    token: 'ETH', 
    amount: '1.313', 
    from: '0x1a2b3c4d5e6f', 
    to: '0x6f5e4d3c2b1a', 
    date: '2025-05-20 14:32', 
    status: 'Complete',
    fee: '0.002 ETH',
    hash: '0xabcd...1234'
  },
  { 
    id: 2, 
    type: 'Swap', 
    token: 'ETH → USDT', 
    amount: '0.5', 
    from: '0x6f5e4d3c2b1a', 
    to: '0x6f5e4d3c2b1a', 
    date: '2025-05-19 09:15', 
    status: 'Complete',
    fee: '0.001 ETH',
    hash: '0xefgh...5678'
  },
  { 
    id: 3, 
    type: 'Receive', 
    token: 'BTC', 
    amount: '0.025', 
    from: '0x9a8b7c6d5e4f', 
    to: '0x6f5e4d3c2b1a', 
    date: '2025-05-18 17:45', 
    status: 'Complete',
    fee: '0.0001 BTC',
    hash: '0xijkl...9012'
  },
  { 
    id: 4, 
    type: 'Send', 
    token: 'USDT', 
    amount: '1000', 
    from: '0x6f5e4d3c2b1a', 
    to: '0x3f2e1d0c9b8a', 
    date: '2025-05-17 11:22', 
    status: 'Complete',
    fee: '5 USDT',
    hash: '0xmnop...3456'
  },
  { 
    id: 5, 
    type: 'Stake', 
    token: 'ETH', 
    amount: '2.0', 
    from: '0x6f5e4d3c2b1a', 
    to: 'Staking Contract', 
    date: '2025-05-15 16:30', 
    status: 'Active',
    fee: '0.001 ETH',
    hash: '0xqrst...7890'
  },
];

// Unclaimed fees
const unclaimedFees = [
  { name: 'ETH', fullName: 'Ethereum', balance: '0.125', value: 518.95, icon: '🔷' },
  { name: 'UNI', fullName: 'Uniswap', balance: '15.45', value: 123.60, icon: '🦄' }
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [activeTab, setActiveTab] = useState('overview');

  const totalPortfolioValue = assetsData.reduce((acc, asset) => acc + asset.marketValue, 0);
  const totalProfitLoss = assetsData.reduce((acc, asset) => acc + asset.netProfit, 0);
  const portfolioPerformance = {
    '1D': -1.36,
    '7D': -4.25,
    '1M': 21.32,
    'YTD': 50.24,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Dashboard header with main values */}
        <DashboardHeader 
          totalPortfolioValue={totalPortfolioValue} 
          monthlyPerformance={portfolioPerformance['1M']}
        />

        {/* Period selection */}
        <TimeRangeToggle value={timeRange} onValueChange={setTimeRange} />

        {/* Summary cards */}
        <SummaryCards 
          totalPortfolioValue={totalPortfolioValue}
          totalProfitLoss={totalProfitLoss}
          portfolioPerformance={portfolioPerformance}
          timeRange={timeRange}
          assetCount={assetsData.length}
        />

        {/* Tabs for content sections */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="assets">Ativos</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab 
              portfolioData={portfolioData}
              tokenDistribution={tokenDistribution}
              unclaimedFees={unclaimedFees}
            />
          </TabsContent>

          <TabsContent value="assets">
            <AssetsTab 
              assets={assetsData}
              portfolioData={portfolioData}
            />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionsTab transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
