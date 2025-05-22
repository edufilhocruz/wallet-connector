
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';

interface AssetDetailsProps {
  portfolioData: Array<{
    name: string;
    value: number;
    eth: number;
  }>;
}

export const AssetDetails: React.FC<AssetDetailsProps> = ({ portfolioData }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência.",
      duration: 2000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔷</span>
            <div>
              <div className="text-xl">Ethereum (ETH)</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>0x6f5e4d3c2b1a</span>
                <Copy 
                  size={14} 
                  className="cursor-pointer hover:text-blue-600" 
                  onClick={() => copyToClipboard('0x6f5e4d3c2b1a')} 
                />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Asset stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-500">Saldo</div>
            <div className="text-lg font-medium">3.2932 ETH</div>
            <div className="text-sm text-gray-500">$13,671,747.81</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Preço médio de compra</div>
            <div className="text-lg font-medium">$2,354.25</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Lucro/Perda</div>
            <div className="text-lg font-medium text-green-600">+$71,747.81</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">% Portfolio</div>
            <div className="text-lg font-medium">65%</div>
          </div>
        </div>

        {/* Asset chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={portfolioData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="eth" 
                stroke="#627EEA" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button>Comprar</Button>
          <Button variant="outline">Vender</Button>
          <Button variant="outline">Stake</Button>
          <Button variant="outline">Enviar</Button>
          <Button variant="outline">Receber</Button>
        </div>
      </CardContent>
    </Card>
  );
};
