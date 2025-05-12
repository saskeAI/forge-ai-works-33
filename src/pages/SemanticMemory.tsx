
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
  BarChart2,
  X
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
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { CognitiveMap } from '@/components/memory/CognitiveMap';
import { CreateMemoryNodeForm } from '@/components/memory/CreateMemoryNodeForm';
import { SymbiosisMetrics } from '@/components/memory/SymbiosisMetrics';

export default function SemanticMemory() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNode, setExpandedNode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('memory-structure');
  const [showCreateNodeDialog, setShowCreateNodeDialog] = useState(false);
  
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
    setShowCreateNodeDialog(true);
  };

  const handleSaveNode = (data: any) => {
    console.log("Новый узел памяти:", data);
    setShowCreateNodeDialog(false);
    
    toast({
      title: "Узел памяти создан",
      description: `${data.name} добавлен в семантическую сеть`,
    });
  };

  const handleVisualizationOpen = () => {
    if (activeTab !== 'cognitive-map') {
      setActiveTab('cognitive-map');
      
      toast({
        title: "Визуализация связей",
        description: "Открываю когнитивную карту SASOK",
      });
    }
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
            onClick={handleVisualizationOpen}
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            <CardContent>
              <CognitiveMap />
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Symbiosis Tab */}
        <TabsContent value="symbiosis">
          <SymbiosisMetrics />
        </TabsContent>
      </Tabs>
      
      {/* Dialog for creating new memory node */}
      <Dialog open={showCreateNodeDialog} onOpenChange={setShowCreateNodeDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Создание нового узла памяти</DialogTitle>
          </DialogHeader>
          <CreateMemoryNodeForm 
            onClose={() => setShowCreateNodeDialog(false)}
            onSave={handleSaveNode}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
