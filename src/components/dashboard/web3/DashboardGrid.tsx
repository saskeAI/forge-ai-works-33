
import React from 'react';
import { WalletConnection } from '@/components/web3/WalletConnection';
import { TokenBalance } from '@/components/web3/TokenBalance';

export const DashboardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <WalletConnection />
      </div>
      <div className="lg:col-span-2">
        <TokenBalance />
      </div>
    </div>
  );
};
