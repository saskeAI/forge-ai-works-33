
import React from 'react';
import { MessageSquare, Settings, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DashboardHeaderProps {
  handleQuickAction: (action: string) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ handleQuickAction }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold heading-gradient">SASOK Web3 Платформа</h1>
        <p className="text-muted-foreground">Децентрализованная система эмоционального интеллекта</p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="default" 
          className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
          onClick={() => handleQuickAction('Спросить')}
        >
          <MessageSquare size={18} className="mr-2" /> Спросить
        </Button>
        <Button 
          variant="outline" 
          onClick={() => handleQuickAction('Настроить')}
        >
          <Settings size={18} className="mr-2" /> Настроить
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => handleQuickAction('DAO')}
        >
          <Network size={18} className="mr-2" /> DAO
        </Button>
      </div>
    </div>
  );
};
