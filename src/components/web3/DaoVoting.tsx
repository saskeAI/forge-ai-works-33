
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Network, FilePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ProposalList } from './ProposalList';
import { Proposal } from './types/dao.types';

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
            <ProposalList 
              proposals={proposals} 
              status="active" 
              handleVote={handleVote} 
            />
          </TabsContent>
          
          <TabsContent value="passed">
            <ProposalList 
              proposals={proposals} 
              status="passed" 
              handleVote={handleVote} 
            />
          </TabsContent>
          
          <TabsContent value="rejected">
            <ProposalList 
              proposals={proposals} 
              status="rejected" 
              handleVote={handleVote} 
            />
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
