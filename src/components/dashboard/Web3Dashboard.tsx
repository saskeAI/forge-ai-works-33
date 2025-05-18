
import React from 'react';
import { WalletConnection } from '@/components/web3/WalletConnection';
import { TokenBalance } from '@/components/web3/TokenBalance';
import { DaoVoting } from '@/components/web3/DaoVoting';
import { SasokChat } from '@/components/chat/SasokChat';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Web3Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <WalletConnection />
        </div>
        <div className="lg:col-span-2">
          <TokenBalance />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DaoVoting />
        </div>
        <div className="lg:col-span-2 h-[600px]">
          <SasokChat />
        </div>
      </div>
    </div>
  );
};
