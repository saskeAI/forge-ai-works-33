
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Upload, 
  Database, 
  FilePlus2, 
  FileEdit,
  Search, 
  Filter, 
  ArrowUpDown,
  Folder,
  FileJson,
  FileText,
  FileImage
} from 'lucide-react';

interface DatasetItem {
  name: string;
  type: string;
  records: number;
  lastUpdated: string;
  size: string;
  icon: React.ReactNode;
}

export default function DataManagement() {
  // Демо-данные датасетов
  const datasets: DatasetItem[] = [
    {
      name: "Клиентские данные",
      type: "CSV",
      records: 15420,
      lastUpdated: "2 дня назад",
      size: "4.2 MB",
      icon: <FileText className="text-blue-500" />
    },
    {
      name: "Изображения продуктов",
      type: "Images",
      records: 532,
      lastUpdated: "5 дней назад",
      size: "128 MB",
      icon: <FileImage className="text-green-500" />
    },
    {
      name: "API Логи",
      type: "JSON",
      records: 54230,
      lastUpdated: "1 день назад",
      size: "18.5 MB",
      icon: <FileJson className="text-amber-500" />
    },
    {
      name: "Пользовательские отзывы",
      type: "CSV",
      records: 3245,
      lastUpdated: "1 неделю назад",
      size: "1.1 MB",
      icon: <FileText className="text-blue-500" />
    },
    {
      name: "Данные датчиков",
      type: "JSON",
      records: 186540,
      lastUpdated: "3 дня назад",
      size: "32.4 MB",
      icon: <FileJson className="text-amber-500" />
    }
  ];
  
  // Статистика данных
  const dataStats = [
    { title: "Всего датасетов", value: "12", icon: <Folder size={18} /> },
    { title: "Всего записей", value: "256,324", icon: <Database size={18} /> },
    { title: "Хранилище", value: "342 MB / 5 GB", icon: <Database size={18} /> }
  ];
  
  return (
    <div className="p-6 space-y-6">
      {/* Заголовок и кнопки */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Управление данными</h1>
          <p className="text-muted-foreground">Управляйте вашими датасетами</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-gradient-to-r from-nova-600 to-forge-500">
            <Upload size={16} className="mr-1" />
            Импорт данных
          </Button>
          <Button variant="outline">
            <FilePlus2 size={16} className="mr-1" />
            Новый датасет
          </Button>
        </div>
      </div>
      
      {/* Статистика данных */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dataStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Панель поиска и фильтрации */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
            placeholder="Поиск датасетов..."
          />
        </div>
        <Button variant="outline" className="flex items-center gap-1">
          <Filter size={16} />
          <span>Фильтр</span>
        </Button>
      </div>
      
      {/* Таблица датасетов */}
      <Card>
        <CardHeader>
          <CardTitle>Датасеты</CardTitle>
          <CardDescription>Список всех доступных датасетов</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <div className="flex items-center">
                    Имя
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Тип</TableHead>
                <TableHead className="text-right">
                  <div className="flex items-center justify-end">
                    Записи
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </TableHead>
                <TableHead>Обновлено</TableHead>
                <TableHead>Размер</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="mr-2">{dataset.icon}</div>
                      {dataset.name}
                    </div>
                  </TableCell>
                  <TableCell>{dataset.type}</TableCell>
                  <TableCell className="text-right">{dataset.records.toLocaleString()}</TableCell>
                  <TableCell>{dataset.lastUpdated}</TableCell>
                  <TableCell>{dataset.size}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileEdit size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Дополнительные карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Импорт данных</CardTitle>
            <CardDescription>Загрузите файлы для создания нового датасета</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Перетащите файлы сюда или нажмите для выбора
              </p>
              <Button variant="outline" size="sm">Выбрать файлы</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Интеграция данных</CardTitle>
            <CardDescription>Подключить внешние источники данных</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Database size={16} className="mr-2" />
              Подключить базу данных
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText size={16} className="mr-2" />
              Импорт из API
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileJson size={16} className="mr-2" />
              Импорт JSON/CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
