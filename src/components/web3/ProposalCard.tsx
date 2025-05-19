
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, CheckCircle2 } from 'lucide-react';
import { Proposal } from './types/dao.types';
import { calculateTimeRemaining } from './utils/dao.utils';

interface ProposalCardProps {
  proposal: Proposal;
  handleVote: (proposalId: number, voteType: 'for' | 'against') => void;
  isActive?: boolean;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ 
  proposal, 
  handleVote,
  isActive = false
}) => {
  if (isActive) {
    return (
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
    );
  }

  // For passed/rejected proposals
  return (
    <Card key={proposal.id}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center mb-1">
              <span className={`text-xs font-medium mr-2 px-2 py-0.5 rounded ${
                proposal.status === 'passed' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {proposal.status === 'passed' ? 'Принято' : 'Отклонено'}
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
  );
};
