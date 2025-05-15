
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Coins, ArrowUpRight, RefreshCw } from 'lucide-react';

export const TokenBalance = () => {
  const [tokenBalance, setTokenBalance] = useState({
    SASOK: 0,
    SASTokens: 0,
    voteCredits: 0
  });
  const [loading, setLoading] = useState(true);

  // Simulate fetching token balances
  useEffect(() => {
    const fetchBalances = async () => {
      setLoading(true);
      try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        setTokenBalance({
          SASOK: 125.75,
          SASTokens: 500,
          voteCredits: 35
        });
      } catch (error) {
        console.error("Failed to fetch token balances", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalances();
  }, []);

  const handleRefresh = async () => {
    setLoading(true);
    
    // Mock refresh functionality
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate updated balances
      setTokenBalance(prev => ({
        SASOK: prev.SASOK + (Math.random() * 1.5 - 0.5), // Randomly adjust by -0.5 to +1.0
        SASTokens: Math.floor(prev.SASTokens + (Math.random() * 20 - 5)), // Randomly adjust by -5 to +15
        voteCredits: Math.min(50, prev.voteCredits + 1) // Increment with a cap at 50
      }));
    } catch (error) {
      console.error("Failed to refresh token balances", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Coins size={18} />
            Токены и баланс
          </CardTitle>
          <CardDescription>
            Управление токенами в экосистеме SASOK
          </CardDescription>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span className="sr-only">Обновить баланс</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* SASOK Token */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 bg-gradient-to-br from-nova-600 to-forge-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">$</span>
                  </div>
                  <div>
                    <h3 className="font-medium">SASOK</h3>
                    <p className="text-xs text-muted-foreground">Основная валюта</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{loading ? '...' : formatNumber(tokenBalance.SASOK)}</div>
                <div className="flex items-center text-xs text-green-600">
                  <span>+2.4%</span>
                  <ArrowUpRight size={12} className="ml-1" />
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button size="sm" variant="default" className="flex-1">
                Отправить
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Получить
              </Button>
            </div>
          </div>

          {/* SAS Tokens */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">ST</span>
                  </div>
                  <div>
                    <h3 className="font-medium">SAS Tokens</h3>
                    <p className="text-xs text-muted-foreground">Utility токены платформы</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{loading ? '...' : tokenBalance.SASTokens}</div>
                <div className="text-xs text-muted-foreground">Можно обменять на услуги</div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button size="sm" variant="default" className="flex-1">
                Использовать
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Купить
              </Button>
            </div>
          </div>

          {/* Voting Credits */}
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-2 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">VC</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Права голоса</h3>
                    <p className="text-xs text-muted-foreground">Для участия в DAO</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold">{loading ? '...' : tokenBalance.voteCredits}/50</div>
                <div className="text-xs text-muted-foreground">Пополняются каждую неделю</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between mb-1 text-xs">
                <span>Текущий лимит</span>
                <span>{Math.round((tokenBalance.voteCredits / 50) * 100)}%</span>
              </div>
              <Progress value={(tokenBalance.voteCredits / 50) * 100} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
