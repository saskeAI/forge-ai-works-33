
import React from 'react';
import { ProposalCard } from './ProposalCard';
import { Proposal } from './types/dao.types';

interface ProposalListProps {
  proposals: Proposal[];
  status: 'active' | 'passed' | 'rejected';
  handleVote: (proposalId: number, voteType: 'for' | 'against') => void;
}

export const ProposalList: React.FC<ProposalListProps> = ({ 
  proposals, 
  status, 
  handleVote 
}) => {
  const filteredProposals = proposals.filter(p => p.status === status);
  
  return (
    <div className="space-y-4">
      {filteredProposals.map(proposal => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          handleVote={handleVote}
          isActive={status === 'active'}
        />
      ))}
    </div>
  );
};
