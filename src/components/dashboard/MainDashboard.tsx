
import React from 'react';
import { EmotionalState } from './EmotionalState';
import { UserProfile } from './UserProfile';
import { InteractionHistory } from './InteractionHistory';

interface MainDashboardProps {
  emotionalState: {
    happiness: number;
    curiosity: number;
    empathy: number;
    autonomy: number;
  };
  userProfile: {
    interactionStyle: string;
    topicPreferences: string[];
    emotionalResponsiveness: string;
    learningProgress: number;
  };
  recentInteractions: {
    id: number;
    timestamp: string;
    content: string;
    emotionalState: string;
    rating: number;
  }[];
  handleQuickAction: (action: string) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({ 
  emotionalState, 
  userProfile, 
  recentInteractions,
  handleQuickAction 
}) => {
  return (
    <>
      <EmotionalState emotionalState={emotionalState} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1">
          <UserProfile userProfile={userProfile} handleQuickAction={handleQuickAction} />
        </div>
        
        <div className="lg:col-span-2">
          <InteractionHistory 
            recentInteractions={recentInteractions}
            handleQuickAction={handleQuickAction}
          />
        </div>
      </div>
    </>
  );
};
