
import React from 'react';
import { 
  BarChart, 
  Bar, 
  Cell, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DistributionItem {
  name: string;
  value: number;
  color: string;
}

interface AssetDistributionChartProps {
  data: DistributionItem[];
}

export const AssetDistributionChart: React.FC<AssetDistributionChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Ativos</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" />
            <Tooltip formatter={(value) => [`${value}%`, 'Alocação']} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
