import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Key, RefreshCw, Save } from 'lucide-react';

export default function Settings() {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState({
    claude_api_key: '',
    openrouter_api_key: ''
  });

  // Load saved API keys from localStorage on component mount
  useEffect(() => {
    const claudeKey = localStorage.getItem('claude_api_key') || '';
    const openrouterKey = localStorage.getItem('openrouter_api_key') || '';
    
    setApiKeys({
      claude_api_key: claudeKey,
      openrouter_api_key: openrouterKey
    });
  }, []);

  // Save API keys to localStorage
  const saveApiKey = (keyName: string) => {
    const value = apiKeys[keyName as keyof typeof apiKeys];
    
    if (value) {
      localStorage.setItem(keyName, value);
      toast({
        title: 'API-ключ сохранен',
        description: `${keyName === 'claude_api_key' ? 'Claude' : 'OpenRouter'} API-ключ успешно сохранен`,
      });
    }
  };

  // Reset API key
  const resetApiKey = (keyName: string) => {
    localStorage.removeItem(keyName);
    setApiKeys(prev => ({
      ...prev,
      [keyName]: ''
    }));
    toast({
      title: 'API-ключ удален',
      description: `${keyName === 'claude_api_key' ? 'Claude' : 'OpenRouter'} API-ключ был удален из локального хранилища`,
    });
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiKeys(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-bold heading-gradient">Настройки</h1>
        <p className="text-muted-foreground">Настройте приложение под свои потребности</p>
      </div>
      
      {/* Вкладки настроек */}
      <Tabs defaultValue="general">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="general">Основное</TabsTrigger>
          <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
          <TabsTrigger value="apikeys">API Ключи</TabsTrigger>
          <TabsTrigger value="account">Аккаунт</TabsTrigger>
        </TabsList>
        
        {/* Основные настройки */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Основные настройки</CardTitle>
              <CardDescription>Управляйте основными настройками приложения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Язык</Label>
                <select 
                  id="language"
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Часовой пояс</Label>
                <select 
                  id="timezone"
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="utc+3">Москва (UTC+3)</option>
                  <option value="utc+0">Greenwich Mean Time (UTC+0)</option>
                  <option value="utc-5">Eastern Time (UTC-5)</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Уведомления</Label>
                  <p className="text-sm text-muted-foreground">Получать уведомления о событиях</p>
                </div>
                <Switch id="notifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autosave">Автосохранение</Label>
                  <p className="text-sm text-muted-foreground">Автоматически сохранять изменения</p>
                </div>
                <Switch id="autosave" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Интеграции</CardTitle>
              <CardDescription>Управляйте подключениями к внешним сервисам</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">OpenAI API</p>
                  <p className="text-sm text-muted-foreground">Не подключено</p>
                </div>
                <Button variant="outline">Подключить</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-muted-foreground">Подключено</p>
                </div>
                <Button variant="outline">Отключить</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Google Drive</p>
                  <p className="text-sm text-muted-foreground">Не подключено</p>
                </div>
                <Button variant="outline">Подключить</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Внешний вид */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Тема</CardTitle>
              <CardDescription>Выберите предпочитаемую тему оформления</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-border rounded-md p-3 cursor-pointer transition-all hover:shadow-md">
                  <div className="h-20 bg-white rounded mb-2"></div>
                  <p className="text-sm text-center">Светлая</p>
                </div>
                
                <div className="border border-primary rounded-md p-3 cursor-pointer transition-all shadow-sm">
                  <div className="h-20 bg-slate-900 rounded mb-2"></div>
                  <p className="text-sm text-center">Темная</p>
                </div>
                
                <div className="border border-border rounded-md p-3 cursor-pointer transition-all hover:shadow-md">
                  <div className="h-20 bg-gradient-to-b from-white to-slate-900 rounded mb-2"></div>
                  <p className="text-sm text-center">Системная</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="animations">Анимации</Label>
                  <p className="text-sm text-muted-foreground">Включить анимации интерфейса</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontSize">Размер шрифта</Label>
                <select 
                  id="fontSize"
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="small">Маленький</option>
                  <option value="medium" selected>Средний</option>
                  <option value="large">Большой</option>
                </select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Настройки интерфейса</CardTitle>
              <CardDescription>Персонализируйте внешний вид интерфейса</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compactMode">Компактный режим</Label>
                  <p className="text-sm text-muted-foreground">Уменьшить размеры элементов интерфейса</p>
                </div>
                <Switch id="compactMode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sidebarCollapsed">Свернутая боковая панель</Label>
                  <p className="text-sm text-muted-foreground">Запускать с свернутой боковой панелью</p>
                </div>
                <Switch id="sidebarCollapsed" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Ключи */}
        <TabsContent value="apikeys" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="mr-2" />
                API Ключи
              </CardTitle>
              <CardDescription>Управляйте ключами API для внешних сервисов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Claude API Key */}
              <div className="space-y-2">
                <Label htmlFor="claude_api_key" className="text-base font-medium">Claude API Ключ</Label>
                <p className="text-sm text-muted-foreground">Используется для чата SASOK и других функций ИИ</p>
                <div className="flex space-x-2">
                  <Input
                    id="claude_api_key"
                    name="claude_api_key"
                    value={apiKeys.claude_api_key}
                    onChange={handleInputChange}
                    placeholder="Введите ваш Claude API ключ..."
                    className="flex-1"
                    type="password"
                  />
                  <Button 
                    onClick={() => saveApiKey('claude_api_key')} 
                    disabled={!apiKeys.claude_api_key.trim()} 
                    className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
                  >
                    <Save size={18} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => resetApiKey('claude_api_key')}
                    disabled={!localStorage.getItem('claude_api_key')}
                  >
                    <RefreshCw size={18} className="mr-2" />
                    Сбросить
                  </Button>
                </div>
              </div>

              {/* OpenRouter API Key */}
              <div className="space-y-2">
                <Label htmlFor="openrouter_api_key" className="text-base font-medium">OpenRouter API Ключ</Label>
                <p className="text-sm text-muted-foreground">Для доступа к различным LLM моделям через OpenRouter</p>
                <div className="flex space-x-2">
                  <Input
                    id="openrouter_api_key"
                    name="openrouter_api_key"
                    value={apiKeys.openrouter_api_key}
                    onChange={handleInputChange}
                    placeholder="Введите ваш OpenRouter API ключ..."
                    className="flex-1"
                    type="password"
                  />
                  <Button 
                    onClick={() => saveApiKey('openrouter_api_key')} 
                    disabled={!apiKeys.openrouter_api_key.trim()} 
                    className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
                  >
                    <Save size={18} className="mr-2" />
                    Сохранить
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => resetApiKey('openrouter_api_key')}
                    disabled={!localStorage.getItem('openrouter_api_key')}
                  >
                    <RefreshCw size={18} className="mr-2" />
                    Сбросить
                  </Button>
                </div>
                {apiKeys.openrouter_api_key === '' && !localStorage.getItem('openrouter_api_key') && (
                  <div className="mt-1 p-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded text-sm">
                    Рекомендуемый ключ: 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
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Аккаунт */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Профиль</CardTitle>
              <CardDescription>Управляйте информацией своего профиля</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-nova-600 to-forge-500 flex items-center justify-center text-white text-xl font-bold">
                  U
                </div>
                <Button variant="outline">Изменить фото</Button>
              </div>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Имя
                  </Label>
                  <Input id="name" value="Пользователь" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" value="user@example.com" className="col-span-3" />
                </div>
              </div>
              
              <Button className="w-full">Сохранить изменения</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Управляйте настройками безопасности вашего аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">Изменить пароль</Button>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="2fa">Двухфакторная аутентификация</Label>
                  <p className="text-sm text-muted-foreground">Дополнительный уровень защиты для вашего аккаунта</p>
                </div>
                <Switch id="2fa" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Данные аккаунта</CardTitle>
              <CardDescription>Управляйте данными вашего аккаунта</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">Экспорт данных</Button>
              <Button variant="destructive" className="w-full">Удалить аккаунт</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
