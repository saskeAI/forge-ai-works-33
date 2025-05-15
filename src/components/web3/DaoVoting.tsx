
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Network, FilePlus, CheckCircle2, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Proposal {
  id: number;
  title: string;
  description: string;
  creator: string;
  createdAt: string;
  endDate: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  voted?: boolean;
  voteType?: 'for' | 'against';
  category: string;
}

export const DaoVoting = () => {
  const { toast } = useToast();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: "Добавление эмоциональных параметров",
      description: "Предложение добавить новые эмоциональные параметры для более тонкой настройки ИИ-моделей SASOK",
      creator: "0x1234...5678",
      createdAt: "2025-05-08T10:30:00",
      endDate: "2025-05-15T10:30:00",
      votesFor: 682,
      votesAgainst: 128,
      status: 'active',
      category: "Технический"
    },
    {
      id: 2,
      title: "Интеграция с внешними API",
      description: "Предложение интегрировать API для расширения возможностей SASOK",
      creator: "0xABCD...EF01",
      createdAt: "2025-05-06T14:15:00",
      endDate: "2025-05-13T14:15:00",
      votesFor: 853,
      votesAgainst: 342,
      status: 'active',
      category: "Интеграции"
    },
    {
      id: 3,
      title: "Новая система вознаграждений",
      description: "Внедрение улучшенной системы вознаграждений для поощрения активных участников экосистемы",
      creator: "0x9876...5432",
      createdAt: "2025-05-03T09:45:00",
      endDate: "2025-05-10T09:45:00",
      votesFor: 1205,
      votesAgainst: 115,
      status: 'passed',
      category: "Экономика"
    },
    {
      id: 4,
      title: "Модификация модели обучения",
      description: "Предложение по изменению модели машинного обучения для улучшения точности предсказаний",
      creator: "0x4567...8901",
      createdAt: "2025-04-28T16:20:00",
      endDate: "2025-05-05T16:20:00",
      votesFor: 422,
      votesAgainst: 753,
      status: 'rejected',
      category: "Технический"
    }
  ]);

  const handleCreateProposal = () => {
    toast({
      title: "Создание предложения",
      description: "Эта функция будет доступна в следующем обновлении",
    });
  };

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === proposalId) {
        if (proposal.voted) {
          // Already voted, cancel vote
          return {
            ...proposal,
            voted: false,
            votesFor: proposal.voteType === 'for' ? proposal.votesFor - 1 : proposal.votesFor,
            votesAgainst: proposal.voteType === 'against' ? proposal.votesAgainst - 1 : proposal.votesAgainst,
            voteType: undefined
          };
        } else {
          // New vote
          return {
            ...proposal,
            voted: true,
            voteType,
            votesFor: voteType === 'for' ? proposal.votesFor + 1 : proposal.votesFor,
            votesAgainst: voteType === 'against' ? proposal.votesAgainst + 1 : proposal.votesAgainst
          };
        }
      }
      return proposal;
    }));

    toast({
      title: "Голос учтен",
      description: `Ваш голос за предложение #${proposalId} был ${voteType === 'for' ? 'за' : 'против'}`,
    });
  };

  // Calculate time remaining for proposals
  const calculateTimeRemaining = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    
    if (diffTime <= 0) return "Голосование завершено";
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} д ${diffHours} ч`;
    } else {
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      return `${diffHours} ч ${diffMinutes} мин`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Network size={18} />
              DAO Голосование
            </CardTitle>
            <CardDescription>
              Принимайте участие в управлении экосистемой SASOK через DAO
            </CardDescription>
          </div>
          <Button onClick={handleCreateProposal}>
            <FilePlus size={16} className="mr-1.5" /> 
            Создать предложение
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="mb-4 grid grid-cols-3">
            <TabsTrigger value="active">Активные</TabsTrigger>
            <TabsTrigger value="passed">Принятые</TabsTrigger>
            <TabsTrigger value="rejected">Отклоненные</TabsTrigger>
          </TabsList>
          
          <TabsContent value="active">
            <div className="space-y-4">
              {proposals.filter(p => p.status === 'active').map(proposal => (
                <Card key={proposal.id} className="overflow-hidden">
                  <div className="bg-muted px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs font-medium mr-2 px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {proposal.category}
                      </span>
                      <span className="text-xs text-muted-foreground">ID #{proposal.id}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      {calculateTimeRemaining(proposal.endDate)}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-1">{proposal.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-4">
                      <Users size={14} className="mr-1" />
                      Создатель: {proposal.creator} | Создано: {new Date(proposal.createdAt).toLocaleDateString()}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <div>За: {proposal.votesFor}</div>
                        <div>Против: {proposal.votesAgainst}</div>
                      </div>
                      <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                        <div 
                          className="bg-green-500"
                          style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-red-500"
                          style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        className={`flex-1 ${proposal.voteType === 'for' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                        variant={proposal.voteType === 'for' ? 'default' : 'outline'}
                        onClick={() => handleVote(proposal.id, 'for')}
                      >
                        {proposal.voteType === 'for' ? (
                          <CheckCircle2 size={16} className="mr-1.5" />
                        ) : null}
                        За
                      </Button>
                      <Button 
                        className={`flex-1 ${proposal.voteType === 'against' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                        variant={proposal.voteType === 'against' ? 'default' : 'outline'}
                        onClick={() => handleVote(proposal.id, 'against')}
                      >
                        {proposal.voteType === 'against' ? (
                          <CheckCircle2 size={16} className="mr-1.5" />
                        ) : null}
                        Против
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="passed">
            <div className="space-y-4">
              {proposals.filter(p => p.status === 'passed').map(proposal => (
                <Card key={proposal.id}>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium mr-2 px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Принято
                          </span>
                          <span className="text-xs text-muted-foreground">ID #{proposal.id}</span>
                        </div>
                        <h3 className="text-lg font-medium">{proposal.title}</h3>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(proposal.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <div>За: {proposal.votesFor}</div>
                      <div>Против: {proposal.votesAgainst}</div>
                    </div>
                    <Progress value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} className="h-2" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rejected">
            <div className="space-y-4">
              {proposals.filter(p => p.status === 'rejected').map(proposal => (
                <Card key={proposal.id}>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center mb-1">
                          <span className="text-xs font-medium mr-2 px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            Отклонено
                          </span>
                          <span className="text-xs text-muted-foreground">ID #{proposal.id}</span>
                        </div>
                        <h3 className="text-lg font-medium">{proposal.title}</h3>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(proposal.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{proposal.description}</p>
                    
                    <div className="flex justify-between text-sm mb-1">
                      <div>За: {proposal.votesFor}</div>
                      <div>Против: {proposal.votesAgainst}</div>
                    </div>
                    <Progress value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} className="h-2" />
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" size="sm">
          Показать все предложения
        </Button>
      </CardFooter>
    </Card>
  );
};
