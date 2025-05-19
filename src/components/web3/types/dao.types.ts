
export interface Proposal {
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
