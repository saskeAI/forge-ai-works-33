
import React from 'react';
import { WalletConnection } from '@/components/web3/WalletConnection';
import { TokenBalance } from '@/components/web3/TokenBalance';
import { DaoVoting } from '@/components/web3/DaoVoting';

export const Web3Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <WalletConnection />
        </div>
        <div className="md:col-span-2">
          <TokenBalance />
        </div>
      </div>
      
      <div className="mt-6">
        <DaoVoting />
      </div>
    </>
  );
};
