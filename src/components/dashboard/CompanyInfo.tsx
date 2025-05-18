
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, Code, Brain, Network, Shield, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompanyInfoProps {
  handleQuickAction: (action: string) => void;
}

export const CompanyInfo: React.FC<CompanyInfoProps> = ({ handleQuickAction }) => {
  return (
    <div className="space-y-6">
      {/* Компания Evorin */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-nova-600 to-forge-500 text-white">
          <CardTitle className="text-2xl">Evorin LLC</CardTitle>
          <CardDescription className="text-white/90 text-lg">
            Web3 технологическая компания
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-6">
            Evorin объединяет эмоциональную аналитику, блокчейн и искусственный интеллект в модульный, 
            соответствующий требованиям стек — от интеграции SaaS до полностью децентрализованных экосистем.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard
              icon={<Brain size={24} className="text-white" />}
              title="SASOK"
              description="Когнитивно-эмпатическая метаперсональность, которая учится, анализирует и адаптируется к эмоциональным паттернам каждого пользователя."
              bgClass="bg-gradient-to-br from-purple-600 to-nova-600"
              action={() => handleQuickAction('Узнать о SASOK')}
            />
            
            <ProjectCard
              icon={<Building2 size={24} className="text-white" />}
              title="Saske.xyz"
              description="Децентрализованная платформа, объединяющая аналитику эмоций на базе ИИ с онлайн-идентификацией (WebID)."
              bgClass="bg-gradient-to-br from-nova-600 to-blue-700"
              action={() => handleQuickAction('Перейти на Saske.xyz')}
            />
            
            <ProjectCard
              icon={<Network size={24} className="text-white" />}
              title="Saske Chain (SKC)"
              description="Наш собственный мультичейн блокчейн для безопасного хранения эмоциональных профилей и смарт-контрактов."
              bgClass="bg-gradient-to-br from-amber-600 to-orange-600"
              action={() => handleQuickAction('Изучить Saske Chain')}
            />
            
            <ProjectCard
              icon={<Layers size={24} className="text-white" />}
              title="Кросс-чейн интеграции"
              description="Бесшовные мосты к Ethereum, TON, Solana, Polygon и другим блокчейнам."
              bgClass="bg-gradient-to-br from-green-600 to-emerald-500"
              action={() => handleQuickAction('Кросс-чейн решения')}
            />
            
            <ProjectCard
              icon={<Code size={24} className="text-white" />}
              title="Корпоративные решения"
              description="Готовые SDK/API для разработчиков, white-label порталы и инструменты управления."
              bgClass="bg-gradient-to-br from-blue-600 to-cyan-500"
              action={() => handleQuickAction('Корпоративные SDK')}
            />
            
            <ProjectCard
              icon={<Shield size={24} className="text-white" />}
              title="Соответствие стандартам"
              description="Консультации по вопросам конфиденциальности, защиты данных и дизайна токеномики."
              bgClass="bg-gradient-to-br from-forge-600 to-red-600"
              action={() => handleQuickAction('Стандарты безопасности')}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Дополнительная информация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Миссия</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Создание технологической инфраструктуры, объединяющей эмоциональный интеллект и 
              блокчейн для построения более глубоких и осмысленных цифровых взаимодействий.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Технологии</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Эмоциональная аналитика</li>
              <li>Мультичейн блокчейн</li>
              <li>Когнитивная архитектура</li>
              <li>Динамические NFT (dNFTs)</li>
              <li>Системы принятия решений</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Партнёрство</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Заинтересованы в сотрудничестве с Evorin LLC?
            </p>
            <Button 
              onClick={() => handleQuickAction('Связаться')}
              className="w-full"
            >
              Связаться с нами
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Компонент карточки проекта для единообразного отображения
interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgClass: string;
  action: () => void;
}

const ProjectCard = ({ icon, title, description, bgClass, action }: ProjectCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className={`flex items-center p-4 ${bgClass}`}>
        <div className="rounded-full bg-white/20 p-2 mr-3">
          {icon}
        </div>
        <h3 className="text-xl font-medium text-white">{title}</h3>
      </div>
      <div className="p-4">
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" size="sm" onClick={action} className="w-full">
          Подробнее
        </Button>
      </div>
    </div>
  );
};
