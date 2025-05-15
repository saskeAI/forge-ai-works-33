
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet, Database, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const WalletConnection = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();
  
  const connectWallet = async () => {
    // В реальном приложении здесь был бы код для подключения к MetaMask или другому провайдеру
    // Сейчас сделаем имитацию подключения
    try {
      // Имитация задержки подключения
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Генерация случайного адреса кошелька для демонстрации
      const mockAddress = '0x' + Array.from({length: 40}, () => 
        '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16))
      ).join('');
      
      setConnected(true);
      setAddress(mockAddress);
      
      toast({
        title: 'Кошелёк подключен',
        description: `Адрес: ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка подключения',
        description: 'Не удалось подключиться к кошельку',
        variant: 'destructive',
      });
    }
  };
  
  const disconnectWallet = () => {
    setConnected(false);
    setAddress(null);
    toast({
      title: 'Кошелёк отключен',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="mr-2" size={20} />
          Web3 Кошелёк
        </CardTitle>
        <CardDescription>Подключите свой криптокошелёк для взаимодействия с SASOK DAO</CardDescription>
      </CardHeader>
      <CardContent>
        {!connected ? (
          <Button 
            onClick={connectWallet} 
            className="w-full bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
          >
            <Wallet size={16} className="mr-2" />
            Подключить кошелёк
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md">
              <div className="text-xs text-muted-foreground mb-1">Адрес кошелька</div>
              <div className="font-mono text-sm truncate">
                {address}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm flex items-center text-green-500">
                <Shield size={14} className="mr-1" /> Подключен
              </span>
              <Button variant="outline" size="sm" onClick={disconnectWallet}>
                Отключить
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
