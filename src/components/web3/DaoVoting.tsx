
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Network, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { CreateProposalDialog } from './CreateProposalDialog';

interface Proposal {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  endTime: Date;
}

export const DaoVoting = () => {
  const { toast } = useToast();
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'Обновление алгоритма эмоционального интеллекта SASOK',
      description: 'Добавление нового алгоритма распознавания эмоций на основе нейроморфных вычислений',
      votesFor: 340,
      votesAgainst: 120,
      endTime: new Date('2025-06-01')
    },
    {
      id: 2,
      title: 'Интеграция с децентрализованными хранилищами данных',
      description: 'Использование IPFS для хранения и обработки пользовательских данных',
      votesFor: 280,
      votesAgainst: 90,
      endTime: new Date('2025-05-25')
    }
  ]);

  const handleVote = (proposalId: number, isFor: boolean) => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === proposalId) {
        if (isFor) {
          return { ...proposal, votesFor: proposal.votesFor + 1 };
        } else {
          return { ...proposal, votesAgainst: proposal.votesAgainst + 1 };
        }
      }
      return proposal;
    }));

    toast({
      title: "Голос учтен",
      description: `Вы проголосовали ${isFor ? 'за' : 'против'} предложение #${proposalId}`,
    });
  };

  const getTotalVotes = (proposal: Proposal) => proposal.votesFor + proposal.votesAgainst;
  const getForPercentage = (proposal: Proposal) => 
    (proposal.votesFor / getTotalVotes(proposal)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Network className="mr-2" size={20} />
          SASOK DAO Голосования
        </CardTitle>
        <CardDescription>Участвуйте в принятии решений по развитию платформы</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {proposals.map(proposal => (
          <div key={proposal.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{proposal.title}</h3>
              <span className="text-xs bg-muted px-2 py-1 rounded">ID: {proposal.id}</span>
            </div>
            <p className="text-sm text-muted-foreground">{proposal.description}</p>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>За: {proposal.votesFor}</span>
                <span>Против: {proposal.votesAgainst}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-nova-600 to-forge-500" 
                  style={{ width: `${getForPercentage(proposal)}%` }}
                />
              </div>
              <div className="text-xs text-right text-muted-foreground">
                {Math.round(getForPercentage(proposal))}% поддержки
              </div>
            </div>
            
            <div className="pt-2 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                Окончание: {proposal.endTime.toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleVote(proposal.id, true)}
                >
                  <ThumbsUp size={14} />
                  За
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleVote(proposal.id, false)}
                >
                  <ThumbsDown size={14} />
                  Против
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <CreateProposalDialog />
      </CardFooter>
    </Card>
  );
};
