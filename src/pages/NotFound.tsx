
import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold heading-gradient">404</h1>
          <h2 className="text-2xl font-semibold">Страница не найдена</h2>
          <p className="text-muted-foreground">
            Страница по адресу <span className="font-mono">{location.pathname}</span> не существует или была перемещена.
          </p>
        </div>
        
        <div className="w-full max-w-xs mx-auto">
          <Link to="/">
            <Button variant="default" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
