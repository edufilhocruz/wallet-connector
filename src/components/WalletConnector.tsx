import React, { useEffect } from 'react';
import { Wallet, Zap, Globe, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

export const WalletConnector: React.FC = () => {
  const { walletData, status, error, connectWallet, disconnectWallet, isConnected } = useWallet();
  const navigate = useNavigate();

  // Redirecionar para o dashboard quando conectado
  useEffect(() => {
    if (isConnected) {
      toast({
        title: "Carteira conectada!",
        description: "Redirecionando para o dashboard...",
        duration: 2000,
      });
      
      // Pequeno atraso para mostrar a mensagem de sucesso
      const timeout = setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [isConnected, navigate]);

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'text-green-600';
      case 'connecting': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'connecting': return <Loader2 className="h-5 w-5 text-yellow-600 animate-spin" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />;
      default: return <Wallet className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-blue-600 rounded-full">
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MetaMask Wallet</h1>
          <p className="text-gray-600">Conecte sua carteira para começar</p>
        </div>

        {/* Status Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon()}
                <CardTitle className={`text-lg ${getStatusColor()}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </CardTitle>
              </div>
              {isConnected && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Online
                </Badge>
              )}
            </div>
            <CardDescription>
              {status === 'disconnected' && 'Pronto para conectar sua carteira MetaMask'}
              {status === 'connecting' && 'Estabelecendo conexão...'}
              {status === 'connected' && 'Conexão bem-sucedida! Redirecionando...'}
              {status === 'error' && 'Falha na conexão'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Wallet Information */}
            {walletData && (
              <div className="space-y-4">
                {/* Address */}
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Endereço da Carteira</span>
                  </div>
                  <p className="text-sm font-mono text-gray-900 break-all">{walletData.address}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatAddress(walletData.address)}</p>
                </div>

                {/* Network */}
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Rede</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-900">{walletData.network.name}</p>
                    <Badge variant="secondary">Chain {walletData.network.chainId}</Badge>
                  </div>
                </div>

                {/* Balance */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Saldo</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{walletData.balance}</p>
                  <p className="text-sm text-blue-600">ETH</p>
                </div>
              </div>
            )}

            {/* Connect/Disconnect Button */}
            <Button
              onClick={isConnected ? disconnectWallet : connectWallet}
              disabled={status === 'connecting'}
              className={`w-full h-12 text-base font-medium ${
                isConnected 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {status === 'connecting' && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isConnected ? 'Desconectar Carteira' : 'Conectar MetaMask'}
            </Button>

            {/* MetaMask Install Link */}
            {!window.ethereum && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Não tem MetaMask?</p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
                >
                  Baixar MetaMask
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Conexão segura de carteira com Ethers.js</p>
        </div>
      </div>
    </div>
  );
};
