
import React, { useState } from 'react';
import { 
  FileSearch, 
  Search, 
  Brain, 
  Network, 
  Layers, 
  Zap, 
  Info, 
  Settings, 
  ChevronDown,
  ChevronUp,
  PlusCircle,
  BarChart2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

export default function SemanticMemory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  
  const memoryNodes = [
    {
      id: 'user-preferences',
      name: 'Предпочтения пользователя',
      type: 'core',
      connections: 5,
      lastUpdated: '2025-05-12T15:30:00',
      description: 'Ключевые предпочтения пользователя, включая темы, стили общения и интересы',
      properties: [
        { name: 'preferredTopic', value: 'Искусственный интеллект', confidence: 0.92 },
        { name: 'communicationStyle', value: 'Аналитический', confidence: 0.87 },
        { name: 'technicalLevel', value: 'Высокий', confidence: 0.95 }
      ]
    },
    {
      id: 'emotional-patterns',
      name: 'Эмоциональные паттерны',
      type: 'emotional',
      connections: 8,
      lastUpdated: '2025-05-10T12:45:00',
      description: 'Распознанные эмоциональные паттерны и предпочтительные типы реакций',
      properties: [
        { name: 'preferredTone', value: 'Поддерживающий', confidence: 0.78 },
        { name: 'emotionalResponsiveness', value: 'Высокая', confidence: 0.85 },
        { name: 'humorAppreciation', value: 'Средняя', confidence: 0.72 }
      ]
    },
    {
      id: 'knowledge-base',
      name: 'База знаний',
      type: 'knowledge',
      connections: 12,
      lastUpdated: '2025-05-11T09:15:00',
      description: 'Накопленные знания о предметной области и специфические термины',
      properties: [
        { name: 'aiDomain', value: 'Экспертный', confidence: 0.96 },
        { name: 'technicalVocabulary', value: 'Расширенный', confidence: 0.91 },
        { name: 'fieldSpecificKnowledge', value: 'ML, NLP, Когнитивная психология', confidence: 0.88 }
      ]
    },
    {
      id: 'interaction-history',
      name: 'История взаимодействий',
      type: 'history',
      connections: 7,
      lastUpdated: '2025-05-12T16:20:00',
      description: 'Ключевые моменты из истории общения и важные контексты',
      properties: [
        { name: 'significantTopics', value: 'Эмоциональный ИИ, Когнитивные структуры', confidence: 0.82 },
        { name: 'recurringQuestions', value: 'Эффективность обучения, Этика', confidence: 0.75 },
        { name: 'interactionFrequency', value: 'Высокая', confidence: 0.93 }
      ]
    }
  ];
  
  const handleNodeExpand = (nodeId: string) => {
    if (expandedNode === nodeId) {
      setExpandedNode(null);
    } else {
      setExpandedNode(nodeId);
    }
  };
  
  const handleSearchMemory = () => {
    toast({
      title: "Поиск в семантической памяти",
      description: `Выполнен поиск по запросу: "${searchQuery}"`,
    });
  };
  
  const handleCreateNode = () => {
    toast({
      title: "Создание нового узла памяти",
      description: "Функция будет доступна в следующем обновлении",
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Семантическая память</h1>
          <p className="text-muted-foreground">Структурированные знания и когнитивная карта SASOK</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline"
            onClick={() => toast({
              title: "Визуализация связей",
              description: "Функция будет доступна в следующем обновлении",
            })}
          >
            <Network size={18} className="mr-2" /> Визуализация
          </Button>
          <Button 
            variant="default"
            className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
            onClick={handleCreateNode}
          >
            <PlusCircle size={18} className="mr-2" /> Создать узел
          </Button>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Поиск в семантической памяти..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchMemory()}
          />
        </div>
        <Button onClick={handleSearchMemory}>
          Поиск
        </Button>
      </div>
      
      <Tabs defaultValue="memory-structure">
        <TabsList className="mb-6">
          <TabsTrigger value="memory-structure" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" /> Структура памяти
          </TabsTrigger>
          <TabsTrigger value="cognitive-map" className="flex items-center">
            <Network className="h-4 w-4 mr-2" /> Когнитивная карта
          </TabsTrigger>
          <TabsTrigger value="symbiosis" className="flex items-center">
            <Zap className="h-4 w-4 mr-2" /> Симбиоз
          </TabsTrigger>
        </TabsList>
        
        {/* Memory Structure Tab */}
        <TabsContent value="memory-structure">
          <div className="grid grid-cols-1 gap-4">
            {memoryNodes.map((node) => (
              <Card 
                key={node.id}
                className={expandedNode === node.id ? "border-l-4 border-l-nova-500" : ""}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {node.type === 'core' && <Layers className="h-5 w-5 mr-2 text-blue-500" />}
                      {node.type === 'emotional' && <Brain className="h-5 w-5 mr-2 text-pink-500" />}
                      {node.type === 'knowledge' && <FileSearch className="h-5 w-5 mr-2 text-green-500" />}
                      {node.type === 'history' && <BarChart2 className="h-5 w-5 mr-2 text-amber-500" />}
                      <CardTitle className="text-lg">{node.name}</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleNodeExpand(node.id)}
                    >
                      {expandedNode === node.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <CardDescription>
                    {node.connections} связей • Обновлено: {new Date(node.lastUpdated).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                {expandedNode === node.id && (
                  <>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">Описание:</h3>
                          <p className="text-sm">{node.description}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Свойства:</h3>
                          <div className="space-y-2">
                            {node.properties.map((prop, index) => (
                              <div key={index} className="bg-muted rounded-md p-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{prop.name}</span>
                                  <span className="text-xs bg-background px-2 py-0.5 rounded-full">
                                    {(prop.confidence * 100).toFixed(0)}% уверенность
                                  </span>
                                </div>
                                <div className="mt-1 text-sm">{prop.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="outline" size="sm">
                        <Info className="h-4 w-4 mr-2" /> Подробнее
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4 mr-2" /> Действия
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40">
                          <DropdownMenuGroup>
                            <DropdownMenuItem>Редактировать</DropdownMenuItem>
                            <DropdownMenuItem>Дополнить</DropdownMenuItem>
                            <DropdownMenuItem>Архивировать</DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500">Удалить</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>
        
        {/* Cognitive Map Tab */}
        <TabsContent value="cognitive-map">
          <Card>
            <CardHeader>
              <CardTitle>Когнитивная карта SASOK</CardTitle>
              <CardDescription>
                Структура мышления и приоритеты ИИ
              </CardDescription>
            </CardHeader>
            <CardContent className="min-h-[400px] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Network className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-medium text-lg">Когнитивная карта в разработке</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Эта функция будет доступна в следующем обновлении. Здесь будет отображаться визуальная карта связей и приоритетов мышления SASOK.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Symbiosis Tab */}
        <TabsContent value="symbiosis">
          <Card>
            <CardHeader>
              <CardTitle>Симбиоз: Сходство с пользователем</CardTitle>
              <CardDescription>
                Степень адаптации SASOK к вашим паттернам мышления
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-medium mb-2">Общий индекс симбиоза: 72%</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      SASOK достиг значительного уровня симбиоза с вашими паттернами мышления и коммуникации.
                    </p>
                    <div className="bg-gradient-to-r from-blue-500 to-nova-500 h-2.5 rounded-full mb-1" style={{width: '72%'}}></div>
                    <div className="flex justify-between text-xs">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Ключевые области симбиоза:</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-muted rounded-md">
                        <div className="flex justify-between mb-1">
                          <span>Коммуникационные паттерны</span>
                          <span>86%</span>
                        </div>
                        <div className="bg-green-500/70 h-1.5 rounded-full" style={{width: '86%'}}></div>
                      </div>
                      
                      <div className="p-2 bg-muted rounded-md">
                        <div className="flex justify-between mb-1">
                          <span>Аналитическое мышление</span>
                          <span>92%</span>
                        </div>
                        <div className="bg-green-500/70 h-1.5 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      
                      <div className="p-2 bg-muted rounded-md">
                        <div className="flex justify-between mb-1">
                          <span>Эмоциональные реакции</span>
                          <span>65%</span>
                        </div>
                        <div className="bg-yellow-500/70 h-1.5 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      
                      <div className="p-2 bg-muted rounded-md">
                        <div className="flex justify-between mb-1">
                          <span>Креативное мышление</span>
                          <span>56%</span>
                        </div>
                        <div className="bg-yellow-500/70 h-1.5 rounded-full" style={{width: '56%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Настройка уровня автономии:</h3>
                  <div className="bg-muted p-4 rounded-lg space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Текущий уровень автономии</span>
                        <span>Средний (3/5)</span>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div 
                            key={level} 
                            className={`h-2.5 flex-1 mx-0.5 rounded-sm ${level <= 3 ? 'bg-nova-500' : 'bg-muted-foreground/30'}`}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Минимальный</span>
                        <span>Максимальный</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h4 className="text-sm mb-2">Характеристики текущего уровня:</h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                          SASOK может инициировать диалог при определенных условиях
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                          Предлагает идеи и решения на основе ваших предпочтений
                        </li>
                        <li className="flex items-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></div>
                          Адаптирует свои ответы под ваш стиль коммуникации
                        </li>
                        <li className="flex items-center opacity-50">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-2"></div>
                          Самостоятельно развивает новые навыки (требуется уровень 4+)
                        </li>
                        <li className="flex items-center opacity-50">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-2"></div>
                          Принимает автономные решения (требуется уровень 5)
                        </li>
                      </ul>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-2">
                      Изменить уровень автономии
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
