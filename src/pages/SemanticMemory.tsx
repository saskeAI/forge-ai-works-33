
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Database,
  Search,
  Plus,
  Settings,
  LayoutGrid,
  ListFilter,
  Save,
  FolderTree,
  Link2,
  FileSearch,
  Tag,
  Filter,
  AlertTriangle
} from 'lucide-react';
import { useRightPanel, useRightPanelContent } from '@/context/RightPanelContext';

// Компонент для правой панели с настройками семантического поиска
const SearchSettingsPanel = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Настройки поиска</h3>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Параметры поиска</h4>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Порог релевантности</label>
            <input type="range" min="0.1" max="1.0" step="0.05" defaultValue="0.7" className="w-full" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0.1</span>
              <span>0.7</span>
              <span>1.0</span>
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Максимум результатов</label>
            <input type="number" min="1" max="100" defaultValue="10" className="w-full border rounded p-1 text-sm" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Фильтры</h4>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-muted-foreground">Тип объекта</label>
            <select className="w-full border rounded p-1 text-sm">
              <option>Все типы</option>
              <option>Документ</option>
              <option>Код</option>
              <option>Изображение</option>
              <option>Аудио</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Дата создания</label>
            <div className="flex gap-2">
              <input type="date" className="flex-1 border rounded p-1 text-sm" />
              <input type="date" className="flex-1 border rounded p-1 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Теги</label>
            <input type="text" placeholder="Введите теги через запятую" className="w-full border rounded p-1 text-sm" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Модель для поиска</h4>
        <select className="w-full border rounded p-1 text-sm">
          <option>Стандартная (фасттекст)</option>
          <option>BERT эмбеддинги</option>
          <option>Custom модель</option>
        </select>
      </div>
      
      <div className="pt-2">
        <Button className="w-full">Применить настройки</Button>
      </div>
    </div>
  );
};

// Демо-данные для семантической памяти
const memoryItems = [
  {
    id: 'mem001',
    title: 'Отчет по продажам Q1 2025',
    snippet: 'Общий объем продаж в первом квартале составил $3.2 млн, что на 15% выше планируемых показателей...',
    type: 'document',
    tags: ['отчет', 'финансы', 'Q1'],
    date: '12.04.2025',
    relevance: 0.92
  },
  {
    id: 'mem002',
    title: 'Код API для интеграции с платежной системой',
    snippet: 'class PaymentIntegration { constructor(apiKey) { this.apiKey = apiKey; ... }',
    type: 'code',
    tags: ['api', 'платежи', 'javascript'],
    date: '05.05.2025',
    relevance: 0.87
  },
  {
    id: 'mem003',
    title: 'Концепт дизайна мобильного приложения',
    snippet: 'Дизайн-концепция предусматривает минималистичный интерфейс с акцентом на удобство навигации...',
    type: 'image',
    tags: ['дизайн', 'ui/ux', 'мобильное'],
    date: '28.04.2025',
    relevance: 0.81
  },
  {
    id: 'mem004',
    title: 'Заметки со встречи с клиентом',
    snippet: 'Клиент подчеркнул важность интеграции с существующими системами и сохранения текущих бизнес-процессов...',
    type: 'document',
    tags: ['встреча', 'клиент', 'требования'],
    date: '02.05.2025',
    relevance: 0.79
  },
  {
    id: 'mem005',
    title: 'Данные пользовательского тестирования',
    snippet: 'Среднее время выполнения задачи составило 45 секунд, что на 20% быстрее по сравнению с предыдущей версией...',
    type: 'data',
    tags: ['тестирование', 'ux', 'метрики'],
    date: '10.05.2025',
    relevance: 0.76
  }
];

// Иконка для типа объекта
const TypeIcon = ({ type }: { type: string }) => {
  switch(type) {
    case 'document':
      return <FileSearch size={16} className="text-blue-500" />;
    case 'code':
      return <Database size={16} className="text-green-500" />;
    case 'image':
      return <LayoutGrid size={16} className="text-purple-500" />;
    case 'data':
      return <ListFilter size={16} className="text-amber-500" />;
    default:
      return <FileSearch size={16} className="text-gray-500" />;
  }
};

export default function SemanticMemory() {
  const { open } = useRightPanel();
  const { setContent } = useRightPanelContent();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const showSearchSettings = () => {
    setContent({
      title: "Настройки поиска",
      content: <SearchSettingsPanel />
    });
    open();
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Семантическая память</h1>
          <p className="text-muted-foreground">Управление структурированными данными и семантический поиск</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={showSearchSettings} className="flex items-center gap-1">
            <Settings size={16} />
            <span>Настройки</span>
          </Button>
          <Button className="bg-gradient-to-r from-nova-600 to-forge-500">
            <Plus size={16} className="mr-1" />
            Новый объект
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input 
          className="pl-10 pr-4 py-6 border-border text-lg" 
          placeholder="Семантический поиск по знаниям..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="search">
        <TabsList className="mb-4">
          <TabsTrigger value="search" className="flex items-center gap-1">
            <Search size={16} />
            <span>Поиск</span>
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex items-center gap-1">
            <FolderTree size={16} />
            <span>Структура данных</span>
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-1">
            <Link2 size={16} />
            <span>Связи</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="search" className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Tag size={14} />
              <span>Все типы</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
              <FileSearch size={14} />
              <span>Документы</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
              <Database size={14} />
              <span>Код</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800">
              <LayoutGrid size={14} />
              <span>Изображения</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800">
              <ListFilter size={14} />
              <span>Данные</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 ml-auto">
              <Filter size={14} />
              <span>Фильтры</span>
            </Button>
          </div>
          
          <div className="space-y-3">
            {memoryItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                        <TypeIcon type={item.type} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                          <h3 className="font-medium truncate">{item.title}</h3>
                          <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-2 mt-1">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span className="capitalize">{item.type}</span>
                            <span>•</span>
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, i) => (
                                <span key={i} className="bg-muted px-1.5 py-0.5 rounded-sm text-xs">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                          {(item.relevance * 100).toFixed(0)}% релевантность
                        </div>
                      </div>
                      <p className="mt-2 text-sm line-clamp-2">{item.snippet}</p>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">Связи</Button>
                        <Button variant="outline" size="sm">Просмотр</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="structure" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-sm font-medium">Общая структура</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Plus size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="max-h-[400px] overflow-auto">
                <div className="space-y-1 py-1">
                  <div className="pl-2 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <FolderTree size={16} />
                    <span className="text-sm font-medium">Root</span>
                  </div>
                  <div className="pl-6 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <FolderTree size={16} />
                    <span className="text-sm">Проекты</span>
                  </div>
                  <div className="pl-10 py-1 hover:bg-muted/50 rounded flex items-center gap-2 bg-muted/30">
                    <FolderTree size={16} />
                    <span className="text-sm">NovaForge AI</span>
                  </div>
                  <div className="pl-14 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <FileSearch size={16} className="text-blue-500" />
                    <span className="text-sm">Документация</span>
                  </div>
                  <div className="pl-14 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <Database size={16} className="text-green-500" />
                    <span className="text-sm">Исходный код</span>
                  </div>
                  <div className="pl-10 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <FolderTree size={16} />
                    <span className="text-sm">E-commerce</span>
                  </div>
                  <div className="pl-6 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <FolderTree size={16} />
                    <span className="text-sm">Данные</span>
                  </div>
                  <div className="pl-10 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <ListFilter size={16} className="text-amber-500" />
                    <span className="text-sm">Аналитика</span>
                  </div>
                  <div className="pl-10 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <ListFilter size={16} className="text-amber-500" />
                    <span className="text-sm">Датасеты</span>
                  </div>
                  <div className="pl-6 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <FolderTree size={16} />
                    <span className="text-sm">Медиа</span>
                  </div>
                  <div className="pl-10 py-1 hover:bg-muted/50 rounded flex items-center gap-2">
                    <LayoutGrid size={16} className="text-purple-500" />
                    <span className="text-sm">Изображения</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>NovaForge AI</CardTitle>
                <CardDescription>Структура и свойства объекта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Название</label>
                    <Input defaultValue="NovaForge AI" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Тип</label>
                    <select className="w-full border rounded p-2">
                      <option>Папка</option>
                      <option>Документ</option>
                      <option>Код</option>
                      <option>Данные</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm text-muted-foreground">Описание</label>
                  <textarea 
                    className="w-full rounded-md border border-border p-2 min-h-[100px]" 
                    defaultValue="Проект NovaForge AI для разработки платформы с интеграцией искусственного интеллекта"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Теги</label>
                    <Input defaultValue="ai, платформа, разработка" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Родительский объект</label>
                    <Input defaultValue="Проекты" readOnly className="bg-muted/30" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Дата создания</label>
                    <Input defaultValue="01.05.2025" readOnly className="bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-muted-foreground">Последнее изменение</label>
                    <Input defaultValue="12.05.2025" readOnly className="bg-muted/30" />
                  </div>
                </div>
                
                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="outline">Отменить</Button>
                  <Button className="flex items-center gap-1">
                    <Save size={16} />
                    <span>Сохранить</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Дочерние объекты</CardTitle>
              <CardDescription>Объекты, содержащиеся в текущей структуре</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Название</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Тип</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Дата изменения</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Размер</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="bg-background divide-y divide-border">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <FileSearch size={16} className="text-blue-500" />
                          <span>Документация</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Папка</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">10.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">12 объектов</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Открыть</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <Database size={16} className="text-green-500" />
                          <span>Исходный код</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Папка</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">12.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">35 объектов</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Открыть</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <FileSearch size={16} className="text-blue-500" />
                          <span>Архитектура системы</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Документ</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">08.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">1.2 MB</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Открыть</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <AlertTriangle size={16} className="text-red-500" />
                          <span>Отчет об ошибках</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">Документ</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">05.05.2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">512 KB</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="ghost" size="sm">Открыть</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Граф связей</CardTitle>
              <CardDescription>Визуализация семантических связей между объектами</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] bg-muted/20 rounded-md flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Граф связей будет отображаться здесь</p>
                <p className="text-sm">Визуализация взаимосвязей между компонентами и объектами</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Прямые связи</CardTitle>
                <CardDescription>Объекты, напрямую связанные с текущим</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  <div className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <FileSearch size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Спецификация API</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">Документ • 0.85 релевантность</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">Просмотр</Button>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <Database size={16} className="text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Модуль обучения</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">Код • 0.78 релевантность</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">Просмотр</Button>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <LayoutGrid size={16} className="text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">UI Макеты</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">Изображение • 0.72 релевантность</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">Просмотр</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2 pb-4">
                <Button variant="outline" size="sm">Показать все связи</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Семантически похожие</CardTitle>
                <CardDescription>Объекты, связанные по смыслу или контексту</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  <div className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <FileSearch size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Требования к платформе</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">Документ • 0.92 релевантность</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">Просмотр</Button>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <ListFilter size={16} className="text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Метрики производительности</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">Данные • 0.83 релевантность</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">Просмотр</Button>
                    </div>
                  </div>
                  <div className="p-4 hover:bg-muted/20 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                        <FolderTree size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium">AI-DevOps</h4>
                        <p className="text-sm text-muted-foreground mt-0.5">Папка • 0.75 релевантность</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">Просмотр</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2 pb-4">
                <Button variant="outline" size="sm">Показать все похожие</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
