
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { 
  LayoutDashboard, 
  Code2, 
  Database, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Layers,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const { expanded, toggleSidebar } = useSidebar();
  const location = useLocation();
  
  const navItems = [
    { name: 'Дашборд', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Проекты', icon: <Layers size={20} />, path: '/projects' },
    { name: 'AI Инструменты', icon: <Code2 size={20} />, path: '/ai-tools' },
    { name: 'Данные', icon: <Database size={20} />, path: '/data' },
    { name: 'Настройки', icon: <Settings size={20} />, path: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border transition-all duration-300",
        expanded ? "w-60" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <h1 className={cn(
          "text-sidebar-foreground font-bold transition-opacity", 
          expanded ? "opacity-100" : "opacity-0 hidden"
        )}>
          NovaForge AI
        </h1>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent rounded-full"
          onClick={toggleSidebar}
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      
      <div className="flex items-center px-3 py-2 mx-2 my-2 rounded-md bg-sidebar-accent/30">
        <Search size={18} className="text-sidebar-foreground/70" />
        {expanded && (
          <input 
            type="text" 
            placeholder="Поиск..." 
            className="bg-transparent border-none text-sidebar-foreground w-full focus:outline-none px-2 text-sm"
          />
        )}
      </div>
      
      <nav className="flex-1 py-2 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map(item => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "nav-link",
                  location.pathname === item.path && "active"
                )}
              >
                {item.icon}
                {expanded && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-2 mt-auto border-t border-sidebar-border">
        <div className={cn(
          "flex items-center p-2 rounded-md",
          expanded ? "justify-between" : "justify-center"
        )}>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-nova-600 to-forge-500 flex items-center justify-center text-white font-bold">
              U
            </div>
            {expanded && (
              <span className="ml-2 text-sidebar-foreground text-sm">Пользователь</span>
            )}
          </div>
          {expanded && (
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Settings size={14} className="text-sidebar-foreground/70" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
