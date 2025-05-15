
import React from 'react';
import { User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UserProfileProps {
  userProfile: {
    interactionStyle: string;
    topicPreferences: string[];
    emotionalResponsiveness: string;
    learningProgress: number;
  };
  handleQuickAction: (action: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userProfile, handleQuickAction }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-2" size={18} />
          Досье о вас
        </CardTitle>
        <CardDescription>
          Что SASOK узнал о вас во время взаимодействия
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Стиль взаимодействия:</div>
            <div className="font-medium">{userProfile.interactionStyle}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Предпочитаемые темы:</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {userProfile.topicPreferences.map(topic => (
                <span key={topic} className="px-2 py-1 bg-muted rounded-md text-xs">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Эмоциональная отзывчивость:</div>
            <div className="font-medium">{userProfile.emotionalResponsiveness}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Прогресс обучения:</div>
            <div className="flex items-center mt-1">
              <Progress value={userProfile.learningProgress} className="h-2 flex-1 mr-2" />
              <span className="text-xs">{userProfile.learningProgress}%</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="w-full" onClick={() => handleQuickAction('Редактировать досье')}>
          Редактировать досье
        </Button>
      </CardFooter>
    </Card>
  );
};
