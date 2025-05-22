
import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { walletSchema, connectionStatusSchema, type WalletData, type ConnectionStatus } from '../schemas/walletSchema';

interface UseWalletReturn {
  walletData: WalletData | null;
  status: ConnectionStatus;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
}

export const useWallet = (): UseWalletReturn => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  // Check if MetaMask is installed
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }, []);

  // Get network information
  const getNetworkInfo = async (provider: ethers.BrowserProvider) => {
    const network = await provider.getNetwork();
    const networkNames: Record<string, string> = {
      '1': 'Ethereum Mainnet',
      '11155111': 'Sepolia Testnet',
      '137': 'Polygon Mainnet',
      '80001': 'Mumbai Testnet',
      '56': 'BSC Mainnet',
      '97': 'BSC Testnet',
    };

    return {
      name: networkNames[network.chainId.toString()] || `Chain ${network.chainId}`,
      chainId: Number(network.chainId),
    };
  };

  // Format balance to readable format
  const formatBalance = (balance: bigint): string => {
    const ethBalance = ethers.formatEther(balance);
    return parseFloat(ethBalance).toFixed(6);
  };

  // Connect wallet function
  const connectWallet = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      setStatus('error');
      return;
    }

    setStatus('connecting');
    setError(null);

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await getNetworkInfo(provider);

      const walletInfo = {
        address,
        network,
        balance: formatBalance(balance),
      };

      // Validate data with Zod
      const validation = walletSchema.safeParse(walletInfo);
      
      if (!validation.success) {
        console.error('Wallet data validation failed:', validation.error);
        setError('Invalid wallet data received');
        setStatus('error');
        return;
      }

      setWalletData(validation.data);
      setStatus('connected');
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || 'Failed to connect wallet');
      setStatus('error');
    }
  }, [isMetaMaskInstalled]);

  // Disconnect wallet function
  const disconnectWallet = useCallback(() => {
    setWalletData(null);
    setStatus('disconnected');
    setError(null);
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (walletData && accounts[0] !== walletData.address) {
        // Re-connect with new account
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      // Re-connect to get new network info
      if (status === 'connected') {
        connectWallet();
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [isMetaMaskInstalled, connectWallet, disconnectWallet, walletData, status]);

  return {
    walletData,
    status,
    error,
    connectWallet,
    disconnectWallet,
    isConnected: status === 'connected',
  };
};
