
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const WalletConnection = () => {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  const handleConnect = async () => {
    setConnecting(true);
    
    // Simulate wallet connection
    try {
      // Mock wallet connection process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a mock Ethereum address
      const mockAddress = '0x' + Array.from({length: 40}, () => 
        '0123456789ABCDEF'[Math.floor(Math.random() * 16)]
      ).join('');
      
      setWalletAddress(mockAddress);
      setConnected(true);
      
      toast({
        title: "Кошелек подключен",
        description: `${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
      });
    } catch (error) {
      toast({
        title: "Ошибка подключения",
        description: "Не удалось подключить кошелек",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setConnected(false);
    setWalletAddress('');
    toast({
      title: "Кошелек отключен",
      description: "Вы успешно отключили кошелек",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet size={18} />
          Подключение кошелька
        </CardTitle>
        <CardDescription>
          Подключите Web3 кошелек для взаимодействия с экосистемой SASOK
        </CardDescription>
      </CardHeader>
      <CardContent>
        {connected ? (
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <CheckCircle size={18} className="text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium">Кошелек подключен</p>
                <p className="text-sm text-muted-foreground">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground">Сеть</div>
                <div className="font-medium">SASOK Testnet</div>
              </div>
              <div className="p-3 border rounded-md">
                <div className="text-sm text-muted-foreground">Статус</div>
                <div className="font-medium text-green-600">Активен</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 space-y-4 text-center border border-dashed rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full">
              <Wallet size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Кошелек не подключен</h3>
              <p className="text-sm text-muted-foreground">
                Подключите кошелек для доступа к функциям Web3
              </p>
            </div>
            <Button 
              onClick={handleConnect} 
              disabled={connecting}
              className="w-full"
            >
              {connecting ? "Подключение..." : "Подключить кошелек"}
            </Button>
          </div>
        )}
      </CardContent>
      {connected && (
        <CardFooter>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDisconnect}
          >
            Отключить кошелек
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
