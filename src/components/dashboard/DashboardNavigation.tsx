
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Brain, Users, Activity, LayoutDashboard, Network } from 'lucide-react';

export const DashboardNavigation: React.FC = () => {
  const navItems = [
    {
      title: 'Основная панель',
      icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
      path: '/sasok',
      description: 'Обзор системы SASOK'
    },
    {
      title: 'Эмоциональный анализ',
      icon: <Brain className="h-6 w-6 text-primary" />,
      path: '/emotional-analysis',
      description: 'Мультимодальный анализ эмоций'
    },
    {
      title: 'Когнитивная архитектура',
      icon: <Network className="h-6 w-6 text-primary" />,
      path: '/cognitive-architecture',
      description: 'Структура и компоненты ИИ'
    },
    {
      title: 'Web3 и DAO',
      icon: <Users className="h-6 w-6 text-primary" />,
      path: '/sasok',
      description: 'Децентрализованное взаимодействие'
    },
    {
      title: 'Семантическая память',
      icon: <Activity className="h-6 w-6 text-primary" />,
      path: '/semantic-memory',
      description: 'Управление знаниями SASOK'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <Card className="h-full hover:bg-accent/5 transition-colors cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-medium text-base mb-1">{item.title}</h3>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
