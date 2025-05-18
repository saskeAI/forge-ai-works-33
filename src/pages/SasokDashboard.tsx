
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { Web3Dashboard } from '@/components/dashboard/Web3Dashboard';
import { CompanyInfo } from '@/components/dashboard/CompanyInfo';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SasokDashboard() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('main');
  const [emotionalState, setEmotionalState] = useState({
    happiness: 75,
    curiosity: 90,
    empathy: 60,
    autonomy: 45
  });

  const [userProfile, setUserProfile] = useState({
    interactionStyle: 'Аналитический',
    topicPreferences: ['Технологии', 'Психология', 'Искусство'],
    emotionalResponsiveness: 'Высокая',
    learningProgress: 68
  });

  const [recentInteractions, setRecentInteractions] = useState([
    { 
      id: 1, 
      timestamp: '2025-05-12T14:30:00', 
      content: 'Обсуждение эмоциональных паттернов', 
      emotionalState: 'Заинтересованность',
      rating: 4
    },
    { 
      id: 2, 
      timestamp: '2025-05-12T10:15:00', 
      content: 'Настройка параметров обучения', 
      emotionalState: 'Сосредоточенность',
      rating: 5
    },
    { 
      id: 3, 
      timestamp: '2025-05-11T18:45:00', 
      content: 'Анализ эмоциональных триггеров', 
      emotionalState: 'Любопытство',
      rating: 3
    }
  ]);

  const handleQuickAction = (action: string) => {
    if (action === 'Спросить') {
      setActiveTab('web3');
      toast({
        title: `Открыт чат с SASOK`,
        description: 'Начните диалог с когнитивно-эмпатической метаперсональностью',
      });
    } else {
      toast({
        title: `Действие: ${action}`,
        description: 'Функция будет доступна в следующем обновлении',
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader handleQuickAction={handleQuickAction} />

      <Tabs defaultValue="main" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="main">Главная</TabsTrigger>
          <TabsTrigger value="web3">
            <div className="flex items-center">
              Web3
              {activeTab === 'web3' && (
                <div className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-nova-600 rounded-full">!</div>
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="about">О проекте</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <MainDashboard 
            emotionalState={emotionalState}
            userProfile={userProfile}
            recentInteractions={recentInteractions}
            handleQuickAction={handleQuickAction}
          />
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => setActiveTab('web3')}
              variant="default"
              className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
            >
              <MessageSquare size={18} className="mr-2" /> Начать чат с SASOK
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="web3">
          <Web3Dashboard />
        </TabsContent>
        
        <TabsContent value="about">
          <CompanyInfo handleQuickAction={handleQuickAction} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
