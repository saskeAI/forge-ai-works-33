
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MainDashboard } from '@/components/dashboard/MainDashboard';
import { Web3Dashboard } from '@/components/dashboard/Web3Dashboard';

export default function SasokDashboard() {
  const { toast } = useToast();
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
    toast({
      title: `Действие: ${action}`,
      description: 'Функция будет доступна в следующем обновлении',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <DashboardHeader handleQuickAction={handleQuickAction} />

      <Tabs defaultValue="main">
        <TabsList className="mb-4">
          <TabsTrigger value="main">Главная</TabsTrigger>
          <TabsTrigger value="web3">Web3</TabsTrigger>
        </TabsList>

        <TabsContent value="main">
          <MainDashboard 
            emotionalState={emotionalState}
            userProfile={userProfile}
            recentInteractions={recentInteractions}
            handleQuickAction={handleQuickAction}
          />
        </TabsContent>
        
        <TabsContent value="web3">
          <Web3Dashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
