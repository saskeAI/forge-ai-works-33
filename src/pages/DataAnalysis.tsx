
import React, { useState } from 'react';
import { 
  BarChart2, 
  PieChart, 
  LineChart, 
  Download, 
  Filter, 
  ArrowDownUp, 
  RefreshCw, 
  Plus,
  FileText,
  Table as TableIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';

export default function DataAnalysis() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('emotion-analytics');

  const handleExportData = () => {
    toast({
      title: "Экспорт данных",
      description: "Файл с данными подготовлен к скачиванию",
    });
  };

  const handleRefreshData = () => {
    toast({
      title: "Обновление данных",
      description: "Данные успешно обновлены",
    });
  };
  
  // Sample data for the tables
  const emotionalAnalyticsData = [
    { 
      id: 1, 
      date: '12.05.2025', 
      interactionType: 'Диалог', 
      dominantEmotion: 'Заинтересованность', 
      intensity: 'Высокая', 
      duration: '15:42' 
    },
    { 
      id: 2, 
      date: '11.05.2025', 
      interactionType: 'Обучение', 
      dominantEmotion: 'Сосредоточенность', 
      intensity: 'Средняя', 
      duration: '32:18' 
    },
    { 
      id: 3, 
      date: '10.05.2025', 
      interactionType: 'Анализ данных', 
      dominantEmotion: 'Любопытство', 
      intensity: 'Высокая', 
      duration: '18:05' 
    },
    { 
      id: 4, 
      date: '09.05.2025', 
      interactionType: 'Диалог', 
      dominantEmotion: 'Радость', 
      intensity: 'Умеренная', 
      duration: '10:32' 
    },
    { 
      id: 5, 
      date: '08.05.2025', 
      interactionType: 'Настройка', 
      dominantEmotion: 'Нейтральность', 
      intensity: 'Низкая', 
      duration: '25:47' 
    }
  ];
  
  const learningProgressData = [
    { 
      id: 1, 
      concept: 'Распознавание эмоций', 
      initialAccuracy: '65%', 
      currentAccuracy: '89%', 
      improvement: '+24%', 
      lastTrained: '10.05.2025' 
    },
    { 
      id: 2, 
      concept: 'Контекстуальный анализ', 
      initialAccuracy: '58%', 
      currentAccuracy: '82%', 
      improvement: '+24%', 
      lastTrained: '11.05.2025' 
    },
    { 
      id: 3, 
      concept: 'Генерация ответов', 
      initialAccuracy: '72%', 
      currentAccuracy: '91%', 
      improvement: '+19%', 
      lastTrained: '12.05.2025' 
    },
    { 
      id: 4, 
      concept: 'Эмоциональная адаптация', 
      initialAccuracy: '51%', 
      currentAccuracy: '75%', 
      improvement: '+24%', 
      lastTrained: '09.05.2025' 
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Анализ данных</h1>
          <p className="text-muted-foreground">Инструменты для анализа эмоциональных данных и обучения</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={handleRefreshData}
          >
            <RefreshCw size={18} className="mr-2" /> Обновить
          </Button>
          <Button 
            variant="default"
            className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
            onClick={handleExportData}
          >
            <Download size={18} className="mr-2" /> Экспорт
          </Button>
        </div>
      </div>
      
      {/* Filter and Search Area */}
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1">
          <Input placeholder="Поиск по данным..." />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все время</SelectItem>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="week">Эта неделя</SelectItem>
              <SelectItem value="month">Этот месяц</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter size={16} className="mr-2" /> Фильтры
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Тип данных</DropdownMenuItem>
              <DropdownMenuItem>Интенсивность</DropdownMenuItem>
              <DropdownMenuItem>Эмоциональное состояние</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Сбросить фильтры</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              Эмоциональное распределение
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[200px]">
            <div className="bg-muted rounded-full w-[150px] h-[150px] flex items-center justify-center">
              <PieChart className="h-16 w-16 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Распределение эмоций в диалогах за последние 30 дней
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChart className="mr-2 h-5 w-5" />
              Прогресс обучения
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[200px]">
            <div className="bg-muted w-full h-[150px] rounded-md flex items-center justify-center">
              <LineChart className="h-16 w-16 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Динамика точности моделей за последние 30 дней
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5" />
              Активность взаимодействий
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-[200px]">
            <div className="bg-muted w-full h-[150px] rounded-md flex items-center justify-center">
              <BarChart2 className="h-16 w-16 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Частота и продолжительность взаимодействий по дням
          </CardFooter>
        </Card>
      </div>
      
      {/* Data Tables */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="emotion-analytics" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" /> Анализ эмоций
          </TabsTrigger>
          <TabsTrigger value="learning-progress" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" /> Прогресс обучения
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" /> Отчеты
          </TabsTrigger>
        </TabsList>
        
        {/* Emotional Analytics Tab */}
        <TabsContent value="emotion-analytics">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Аналитика эмоциональных взаимодействий</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <ArrowDownUp size={16} className="mr-2" /> Сортировать
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>По дате (новые)</DropdownMenuItem>
                    <DropdownMenuItem>По дате (старые)</DropdownMenuItem>
                    <DropdownMenuItem>По продолжительности</DropdownMenuItem>
                    <DropdownMenuItem>По интенсивности</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>
                Данные по эмоциональным взаимодействиям с SASOK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Дата</TableHead>
                    <TableHead>Тип взаимодействия</TableHead>
                    <TableHead>Доминирующая эмоция</TableHead>
                    <TableHead>Интенсивность</TableHead>
                    <TableHead>Длительность</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emotionalAnalyticsData.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.interactionType}</TableCell>
                      <TableCell>{row.dominantEmotion}</TableCell>
                      <TableCell>{row.intensity}</TableCell>
                      <TableCell>{row.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Learning Progress Tab */}
        <TabsContent value="learning-progress">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Прогресс обучения моделей</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus size={16} className="mr-2" /> Добавить концепцию
                </Button>
              </div>
              <CardDescription>
                Отслеживание улучшений в понимании концепций и областей знаний
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Концепция</TableHead>
                    <TableHead>Начальная точность</TableHead>
                    <TableHead>Текущая точность</TableHead>
                    <TableHead>Улучшение</TableHead>
                    <TableHead>Последнее обучение</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {learningProgressData.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.concept}</TableCell>
                      <TableCell>{row.initialAccuracy}</TableCell>
                      <TableCell>{row.currentAccuracy}</TableCell>
                      <TableCell className="text-green-500">{row.improvement}</TableCell>
                      <TableCell>{row.lastTrained}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Отчеты по анализу данных</CardTitle>
              <CardDescription>
                Сгенерированные отчеты и экспортированные данные
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <TableIcon className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-1">Нет доступных отчетов</h3>
                <p className="text-muted-foreground max-w-md mb-6">
                  Создайте и сохраните отчет по данным анализа для доступа к нему в этом разделе
                </p>
                <Button>
                  <Plus size={16} className="mr-2" /> Создать новый отчет
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
