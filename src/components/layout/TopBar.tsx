
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Bell, HelpCircle } from 'lucide-react';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="h-14 border-b flex items-center justify-between px-4 bg-background">
      <div>
        <h2 className="text-lg font-semibold">Дашборд</h2>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </Button>
        <Button variant="ghost" size="icon">
          <Bell size={18} />
        </Button>
        <Button variant="ghost" size="icon">
          <HelpCircle size={18} />
        </Button>
        <div className="w-px h-6 bg-border mx-2"></div>
        <Button variant="outline" className="ml-2">
          Обратная связь
        </Button>
      </div>
    </div>
  );
}
