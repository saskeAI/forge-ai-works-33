
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ActivityTrackingChart } from '@/components/analysis/ActivityTrackingChart';
import { LearningProgressChart } from '@/components/analysis/LearningProgressChart';
import { Button } from '@/components/ui/button';
import { Brain, Users, Target, Layers, BadgePlus, Code2 } from 'lucide-react';
import { DashboardNavigation } from '@/components/dashboard/DashboardNavigation';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Дашборд NovaForge AI</h1>
        <p className="text-muted-foreground">Система управления ИИ с эмоциональным интеллектом</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain size={18} />
              Активные модели
            </CardTitle>
            <CardDescription>Текущие рабочие модели</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <span>+2 за последний месяц</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users size={18} />
              Пользователи
            </CardTitle>
            <CardDescription>Активные пользователи</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,824</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <span>+305 за последнюю неделю</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target size={18} />
              Точность моделей
            </CardTitle>
            <CardDescription>Средняя точность</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89.7%</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <span>+2.1% по сравнению с прошлым месяцем</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityTrackingChart />
        <LearningProgressChart />
      </div>
      
      <h2 className="text-xl font-bold mt-6 mb-4">SASOK Модули</h2>
      <DashboardNavigation />
      
      <h2 className="text-xl font-bold mt-6 mb-4">Быстрый доступ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover-card">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg mb-2">Проекты</CardTitle>
            <CardDescription className="mb-4">
              Управление проектами и моделями ИИ
            </CardDescription>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/projects')}
            >
              Открыть
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover-card">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <BadgePlus className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg mb-2">SASOK AI</CardTitle>
            <CardDescription className="mb-4">
              Эмоциональный ИИ для сложных задач
            </CardDescription>
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => navigate('/sasok')}
            >
              Открыть
            </Button>
          </CardContent>
        </Card>
        
        <Card className="hover-card">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Code2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-lg mb-2">AI Инструменты</CardTitle>
            <CardDescription className="mb-4">
              Инструменты для разработки и обучения
            </CardDescription>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/ai-tools')}
            >
              Открыть
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
