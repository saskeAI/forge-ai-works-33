
import React from 'react';
import { MessageSquare, AlertTriangle, Brain } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Interaction {
  id: number;
  timestamp: string;
  content: string;
  emotionalState: string;
  rating: number;
}

interface InteractionHistoryProps {
  recentInteractions: Interaction[];
  handleQuickAction: (action: string) => void;
}

export const InteractionHistory: React.FC<InteractionHistoryProps> = ({ recentInteractions, handleQuickAction }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2" size={18} />
          Лента взаимодействий
        </CardTitle>
        <CardDescription>
          Хронология диалогов и взаимодействий
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Недавние</TabsTrigger>
            <TabsTrigger value="important">Важные</TabsTrigger>
            <TabsTrigger value="learning">Обучающие</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="space-y-4">
            {recentInteractions.map(interaction => (
              <div key={interaction.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{interaction.content}</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(interaction.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="px-2 py-1 bg-muted rounded-md text-xs mr-2">
                      {interaction.emotionalState}
                    </div>
                    <div className="flex">
                      {Array.from({length: 5}).map((_, i) => (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${i < interaction.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="important">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">Нет важных взаимодействий</h3>
              <p className="text-muted-foreground mt-1">
                Отметьте взаимодействия как важные, чтобы они появились здесь
              </p>
            </div>
          </TabsContent>
          <TabsContent value="learning">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Brain className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium text-lg">Нет обучающих взаимодействий</h3>
              <p className="text-muted-foreground mt-1">
                Используйте режим обучения для создания обучающих примеров
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleQuickAction('Все взаимодействия')}>
          Все взаимодействия
        </Button>
        <Button size="sm" onClick={() => handleQuickAction('Новый диалог')}>
          Новый диалог
        </Button>
      </CardFooter>
    </Card>
  );
};
