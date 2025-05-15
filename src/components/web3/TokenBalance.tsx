
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const TokenBalance = () => {
  const { toast } = useToast();
  
  const handleTokenClaim = () => {
    toast({
      title: "Токены SASOK начислены",
      description: "100 SASOK токенов добавлены в ваш кошелек",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="mr-2" size={20} />
          Токены SASOK
        </CardTitle>
        <CardDescription>Ваш баланс и управление токенами</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="text-sm text-muted-foreground">Доступный баланс</div>
          <div className="text-xl font-bold">500 SASOK</div>
        </div>
        
        <div className="flex justify-between items-center border-b pb-3">
          <div className="text-sm text-muted-foreground">Заблокировано в стейкинге</div>
          <div className="text-xl font-bold">200 SASOK</div>
        </div>
        
        <div className="flex justify-between items-center pb-3">
          <div className="text-sm text-muted-foreground">Начисленные награды</div>
          <div className="text-xl font-bold text-green-500">+100 SASOK</div>
        </div>
        
        <Button onClick={handleTokenClaim} className="w-full bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90">
          Получить награду
        </Button>
      </CardContent>
    </Card>
  );
};
