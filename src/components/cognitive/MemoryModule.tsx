
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Database, Clock, Star, Trash2, Search, Archive } from 'lucide-react';

interface MemoryEntry {
  id: string;
  timestamp: string;
  type: 'interaction' | 'emotion' | 'learning' | 'decision';
  content: string;
  emotionalContext: string;
  importance: number;
  recalled: number;
}

export const MemoryModule: React.FC = () => {
  const [memories] = useState<MemoryEntry[]>([
    {
      id: '1',
      timestamp: '2025-05-20T14:30:00',
      type: 'interaction',
      content: 'Обсуждение архитектуры когнитивных систем',
      emotionalContext: 'Высокая заинтересованность, аналитический подход',
      importance: 0.9,
      recalled: 3
    },
    {
      id: '2',
      timestamp: '2025-05-20T12:15:00',
      type: 'emotion',
      content: 'Пользователь выразил восхищение возможностями SASOK',
      emotionalContext: 'Удовлетворение, гордость за достижения',
      importance: 0.8,
      recalled: 2
    },
    {
      id: '3',
      timestamp: '2025-05-19T16:45:00',
      type: 'learning',
      content: 'Успешное применение мультимодального анализа',
      emotionalContext: 'Достижение, самоудовлетворение',
      importance: 0.85,
      recalled: 5
    },
    {
      id: '4',
      timestamp: '2025-05-19T10:20:00',
      type: 'decision',
      content: 'Адаптация стиля общения под предпочтения пользователя',
      emotionalContext: 'Стремление к эмпатии и пониманию',
      importance: 0.75,
      recalled: 1
    }
  ]);

  const [selectedType, setSelectedType] = useState<string>('all');
  const [storageStats] = useState({
    totalMemories: 1247,
    emotionalProfiles: 89,
    learningPatterns: 156,
    storageUsed: 67,
    compressionRatio: 0.34
  });

  const getTypeIcon = (type: string) => {
    const icons = {
      interaction: '💬',
      emotion: '❤️',
      learning: '🧠',
      decision: '⚡'
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      interaction: 'bg-blue-100 text-blue-800',
      emotion: 'bg-red-100 text-red-800',
      learning: 'bg-green-100 text-green-800',
      decision: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredMemories = selectedType === 'all' 
    ? memories 
    : memories.filter(memory => memory.type === selectedType);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="text-green-600" size={24} />
          Модуль памяти и опыта
        </CardTitle>
        <CardDescription>
          Долговременное хранилище эмоциональных профилей и обучающих паттернов
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{storageStats.totalMemories}</div>
            <div className="text-xs text-muted-foreground">Всего воспоминаний</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{storageStats.emotionalProfiles}</div>
            <div className="text-xs text-muted-foreground">Эмоц. профилей</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{storageStats.learningPatterns}</div>
            <div className="text-xs text-muted-foreground">Паттернов обучения</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{storageStats.storageUsed}%</div>
            <div className="text-xs text-muted-foreground">Использовано</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{Math.round(storageStats.compressionRatio * 100)}%</div>
            <div className="text-xs text-muted-foreground">Сжатие</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Использование памяти</span>
            <span>{storageStats.storageUsed}%</span>
          </div>
          <Progress value={storageStats.storageUsed} className="h-2" />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('all')}
          >
            Все типы
          </Button>
          {['interaction', 'emotion', 'learning', 'decision'].map(type => (
            <Button
              key={type}
              variant={selectedType === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type)}
              className="capitalize"
            >
              {getTypeIcon(type)} {type === 'interaction' ? 'Взаимодействия' : 
                                type === 'emotion' ? 'Эмоции' :
                                type === 'learning' ? 'Обучение' : 'Решения'}
            </Button>
          ))}
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMemories.map((memory) => (
            <div key={memory.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(memory.type)}>
                    {getTypeIcon(memory.type)} {memory.type}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < memory.importance * 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={12} />
                  {new Date(memory.timestamp).toLocaleString()}
                </div>
              </div>
              
              <div className="text-sm font-medium">{memory.content}</div>
              
              <div className="text-xs text-muted-foreground">
                <strong>Эмоциональный контекст:</strong> {memory.emotionalContext}
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span>Обращений: {memory.recalled}</span>
                  <span>Важность: {Math.round(memory.importance * 100)}%</span>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Search size={12} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Archive size={12} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
          <p>Система использует LSTM сети и специализированные базы данных для эффективного хранения эмоциональной истории</p>
        </div>
      </CardContent>
    </Card>
  );
};
