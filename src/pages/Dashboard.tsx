
import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Code2, 
  Database, 
  Clock, 
  Activity,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreateProjectButton } from '@/components/projects/CreateProjectButton';

export default function Dashboard() {
  // Данные для быстрого доступа
  const quickAccessItems = [
    { name: "AI Модель чата", type: "AI Проект", date: "5 дней назад", icon: Code2 },
    { name: "Визуальный редактор", type: "Веб Проект", date: "1 неделя назад", icon: Layers },
    { name: "База данных клиентов", type: "Данные", date: "2 недели назад", icon: Database },
  ];
  
  // Данные для статистики
  const statsItems = [
    { title: "Активные проекты", value: "8", change: "+2", changeType: "increase", icon: Activity },
    { title: "AI Модели", value: "5", change: "+1", changeType: "increase", icon: Code2 },
    { title: "Последнее обновление", value: "5 дней назад", icon: Clock },
  ];
  
  // Вкладки на дашборде
  const dashboardSections = [
    { name: "Проекты", icon: <Layers size={18} /> },
    { name: "AI Модели", icon: <Code2 size={18} /> },
    { name: "Датасеты", icon: <Database size={18} /> },
  ];
  
  // Новости и обновления
  const updates = [
    { title: "Выпущено обновление 1.2.0", description: "Добавлены новые функции для AI интеграции", date: "3 дня назад" },
    { title: "Интеграция с новыми API", description: "Поддержка популярных AI сервисов и инструментов", date: "1 неделю назад" },
  ];
  
  return (
    <div className="p-6 space-y-6">
      {/* Заголовок и приветствие */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Дашборд</h1>
          <p className="text-muted-foreground">Добро пожаловать в NovaForge AI</p>
        </div>
        <CreateProjectButton onClick={() => console.log('Создание нового проекта')} />
      </div>
      
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statsItems.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon size={18} className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} за последний месяц
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Быстрый доступ */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Быстрый доступ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickAccessItems.map((item, index) => (
            <Card key={index} className="hover-card cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.type === 'AI Проект' ? (
                      <div className="w-2 h-2 bg-forge-500 rounded-full"></div>
                    ) : item.type === 'Веб Проект' ? (
                      <div className="w-2 h-2 bg-nova-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    )}
                    <span className="text-xs text-muted-foreground">{item.type}</span>
                  </div>
                </div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
              </CardHeader>
              <CardFooter className="pt-2 border-t">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock size={12} className="mr-1" />
                  <span>Обновлено {item.date}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
          
          {/* Карточка для создания нового проекта */}
          <Card className="border-dashed border-2 flex items-center justify-center hover-card cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-2">
                <Plus size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-medium">Создать проект</h3>
              <p className="text-sm text-muted-foreground">Начните с нового проекта или шаблона</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Вкладки дашборда и новости */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Ваш дашборд</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardSections.map((section, index) => (
              <Card key={index} className="hover-card cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                    {section.icon}
                  </div>
                  <h3 className="font-medium">{section.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Новости и обновления</h2>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{update.title}</CardTitle>
                  <CardDescription className="text-xs">{update.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{update.description}</p>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="link" className="p-0 h-auto text-sm">Подробнее</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
