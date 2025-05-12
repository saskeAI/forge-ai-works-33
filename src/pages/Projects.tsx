
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List
} from 'lucide-react';
import { ProjectGrid } from '@/components/projects/ProjectGrid';
import { ProjectDetails } from '@/components/projects/ProjectDetails';
import { Project } from '@/components/projects/ProjectCard';
import { CreateProjectButton } from '@/components/projects/CreateProjectButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Демо-данные проектов
  const projects: Project[] = [
    {
      id: '1',
      name: 'Чат-бот с GPT-4',
      description: 'AI проект с использованием GPT-4 для создания умного чат-бота с контекстным пониманием.',
      lastUpdated: '2 дня назад',
      type: 'ai'
    },
    {
      id: '2',
      name: 'Веб-портал для клиентов',
      description: 'Веб-платформа для взаимодействия с клиентами и предоставления информации о продуктах.',
      lastUpdated: '5 дней назад',
      type: 'web'
    },
    {
      id: '3',
      name: 'Мобильное приложение Fitness',
      description: 'Мобильное приложение для отслеживания фитнес-целей с интеграцией AI для персональных рекомендаций.',
      lastUpdated: '1 неделю назад',
      type: 'mobile'
    },
    {
      id: '4',
      name: 'Система аналитики данных',
      description: 'Проект для сбора, анализа и визуализации данных с использованием AI алгоритмов.',
      lastUpdated: '2 недели назад',
      type: 'ai'
    },
    {
      id: '5',
      name: 'Онлайн-магазин',
      description: 'Веб-платформа для электронной коммерции с персонализированными рекомендациями на основе AI.',
      lastUpdated: '3 недели назад',
      type: 'web'
    },
    {
      id: '6',
      name: 'AR-приложение для образования',
      description: 'Мобильное приложение с дополненной реальностью для образовательных целей.',
      lastUpdated: '1 месяц назад',
      type: 'mobile'
    },
  ];
  
  // Фильтрация проектов по поисковому запросу
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Обработчики событий
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setRightPanelOpen(true);
  };
  
  const handleSettingsProject = (project: Project) => {
    console.log('Открыть настройки проекта:', project);
  };
  
  return (
    <div className="p-6 space-y-6">
      {/* Заголовок и кнопки действий */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold heading-gradient">Проекты</h1>
          <p className="text-muted-foreground">Управление вашими проектами</p>
        </div>
        <div className="flex gap-2">
          <CreateProjectButton onClick={() => console.log('Создание проекта')} />
        </div>
      </div>
      
      {/* Панель поиска и фильтрации */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-10"
            placeholder="Поиск проектов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Filter size={16} />
            <span>Фильтр</span>
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Вывод проектов */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Проекты не найдены</h3>
          <p className="text-muted-foreground mt-1">Попробуйте изменить параметры поиска</p>
        </div>
      ) : (
        <ProjectGrid 
          projects={filteredProjects} 
          onSelectProject={handleSelectProject} 
          onSettingsProject={handleSettingsProject} 
        />
      )}
      
      {/* Правая панель с деталями проекта */}
      {selectedProject && (
        <div 
          className={`fixed top-14 right-0 h-[calc(100vh-3.5rem)] bg-background border-l border-border shadow-lg transition-all duration-300 overflow-auto
            ${rightPanelOpen ? 'translate-x-0 w-80' : 'translate-x-full w-0 opacity-0'}`}
        >
          <div className="p-4">
            <ProjectDetails 
              project={selectedProject} 
              onClose={() => setRightPanelOpen(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
