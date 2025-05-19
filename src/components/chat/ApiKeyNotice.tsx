
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ApiKeyNotice: React.FC = () => {
  const navigate = useNavigate();
  
  const goToApiSettings = () => {
    navigate('/settings');
    // Таймаут, чтобы DOM успел обновиться и затем активировать вкладку API Keys
    setTimeout(() => {
      const apiKeysTab = document.querySelector('[value="apikeys"]') as HTMLButtonElement;
      if (apiKeysTab) {
        apiKeysTab.click();
      }
    }, 100);
  };

  return (
    <div className="p-4 border-t">
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded p-4 text-sm flex justify-between items-center">
        <div>
          <p className="font-medium">Требуется API-ключ для Claude</p>
          <p className="text-sm text-muted-foreground">Для полноценной работы чата добавьте ключ в настройках</p>
        </div>
        <Button 
          onClick={goToApiSettings} 
          className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
        >
          <Settings size={18} className="mr-2" />
          Настройки
        </Button>
      </div>
    </div>
  );
};
