
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Database, 
  LineChart as LineChartIcon, 
  BarChart as BarChartIcon,
  FileSpreadsheet, 
  FileChart,
  Filter,
  ArrowUpDown,
  Download
} from 'lucide-react';
import { useRightPanel, useRightPanelContent } from '@/context/RightPanelContext';

// Демо-данные
const sampleData = [
  { name: 'Янв', значение: 400, доход: 2400, активность: 240 },
  { name: 'Фев', значение: 300, доход: 1398, активность: 110 },
  { name: 'Мар', значение: 200, доход: 9800, активность: 290 },
  { name: 'Апр', значение: 278, доход: 3908, активность: 200 },
  { name: 'Май', значение: 189, доход: 4800, активность: 218 },
  { name: 'Июн', значение: 239, доход: 3800, активность: 250 }
];

const pieData = [
  { name: 'Категория A', value: 400 },
  { name: 'Категория B', value: 300 },
  { name: 'Категория C', value: 300 },
  { name: 'Категория D', value: 200 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Компоненты для правой панели
const DataFilterPanel = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Фильтры данных</h3>
      <div className="space-y-2">
        <div>
          <label className="text-sm font-medium">Диапазон дат</label>
          <div className="flex gap-2 mt-1">
            <input type="date" className="border rounded p-1 text-sm"/>
            <input type="date" className="border rounded p-1 text-sm"/>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Категории</label>
          <div className="mt-1">
            <select className="w-full border rounded p-1 text-sm">
              <option>Все категории</option>
              <option>Категория A</option>
              <option>Категория B</option>
              <option>Категория C</option>
            </select>
          </div>
        </div>
        <div className="pt-2">
          <Button className="w-full">Применить фильтры</Button>
        </div>
      </div>
    </div>
  );
};

const DataPropertiesPanel = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Свойства данных</h3>
      <div>
        <h4 className="text-sm font-medium">Источник</h4>
        <p className="text-sm text-muted-foreground">sample_data.csv</p>
      </div>
      <div>
        <h4 className="text-sm font-medium">Записей</h4>
        <p className="text-sm text-muted-foreground">1,452</p>
      </div>
      <div>
        <h4 className="text-sm font-medium">Столбцов</h4>
        <p className="text-sm text-muted-foreground">8</p>
      </div>
      <div>
        <h4 className="text-sm font-medium">Последнее обновление</h4>
        <p className="text-sm text-muted-foreground">2 часа назад</p>
      </div>
      <div className="pt-2">
        <Button variant="outline" className="w-full flex items-center gap-1">
          <Download size={14} />
          <span>Скачать данные</span>
        </Button>
      </div>
    </div>
  );
};

export default function DataAnalysis() {
  const { open } = useRightPanel();
  const { setContent } = useRightPanelContent();
  
  const showFilters = () => {
    setContent({
      title: "Фильтры данных",
      content: <DataFilterPanel />
    });
    open();
  };
  
  const showProperties = () => {
    setContent({
      title: "Свойства данных",
      content: <DataPropertiesPanel />
    });
    open();
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Анализ данных</h1>
          <p className="text-muted-foreground">Визуализация и анализ данных для ваших проектов</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={showFilters} className="flex items-center gap-1">
            <Filter size={16} />
            <span>Фильтры</span>
          </Button>
          <Button variant="outline" onClick={showProperties} className="flex items-center gap-1">
            <FileSpreadsheet size={16} />
            <span>Свойства</span>
          </Button>
          <Button className="bg-gradient-to-r from-nova-600 to-forge-500">
            <FileChart size={16} className="mr-1" />
            Создать отчет
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <LineChartIcon size={16} />
            <span>Дашборд</span>
          </TabsTrigger>
          <TabsTrigger value="raw" className="flex items-center gap-1">
            <Database size={16} />
            <span>Сырые данные</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-1">
            <BarChartIcon size={16} />
            <span>Графики</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Общие записи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,452</div>
                <p className="text-xs text-muted-foreground">+12% за месяц</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Среднее значение</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">267.8</div>
                <p className="text-xs text-muted-foreground">-2.3% за месяц</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Аномалии</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Обнаружено сегодня</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Тренды значений</CardTitle>
                <CardDescription>Динамика изменений по месяцам</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="значение" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="активность" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Распределение по категориям</CardTitle>
                <CardDescription>Процентное соотношение категорий</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="raw">
          <Card>
            <CardHeader>
              <CardTitle>Исходные данные</CardTitle>
              <CardDescription>Просмотр и фильтрация данных</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-auto max-h-[500px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Месяц
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Значение
                          <ArrowUpDown size={14} className="ml-1" />
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Доход
                          <ArrowUpDown size={14} className="ml-1" />
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center">
                          Активность
                          <ArrowUpDown size={14} className="ml-1" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-gray-200">
                    {sampleData.map((row, i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{row.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{row.значение}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{row.доход}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{row.активность}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Показано 6 из 1,452 записей
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">Предыдущая</Button>
                  <Button variant="outline" size="sm">Следующая</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Конструктор графиков</CardTitle>
              <CardDescription>Создание пользовательских визуализаций</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Тип графика</label>
                  <select className="w-full border rounded-md p-2">
                    <option>Линейный график</option>
                    <option>Столбчатая диаграмма</option>
                    <option>Круговая диаграмма</option>
                    <option>Область</option>
                    <option>Точечная</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ось X</label>
                  <select className="w-full border rounded-md p-2">
                    <option>name (Месяц)</option>
                    <option>значение</option>
                    <option>доход</option>
                    <option>активность</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ось Y</label>
                  <select className="w-full border rounded-md p-2">
                    <option>значение</option>
                    <option>доход</option>
                    <option>активность</option>
                  </select>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <ChartContainer
                  className="h-[400px]"
                  config={{
                    values: {
                      label: "Значения",
                      color: "#8884d8"
                    },
                    income: {
                      label: "Доход",
                      color: "#82ca9d"
                    }
                  }}
                >
                  <BarChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="значение" name="values" fill="#8884d8" />
                    <Bar dataKey="доход" name="income" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-nova-600 to-forge-500">
                  <Download size={16} className="mr-1" />
                  Сохранить график
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
