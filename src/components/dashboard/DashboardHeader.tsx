
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  totalPortfolioValue: number;
  monthlyPerformance: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  totalPortfolioValue,
  monthlyPerformance
}) => {
  const navigate = useNavigate();

  const handleBackToWallet = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</span>
          <Badge 
            className={`${monthlyPerformance >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded-md px-2 py-1`}
          >
            {monthlyPerformance >= 0 ? '+' : ''}{monthlyPerformance}%
          </Badge>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button onClick={handleBackToWallet} variant="outline">
          <Wallet className="mr-2 h-4 w-4" />
          Voltar à Carteira
        </Button>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
