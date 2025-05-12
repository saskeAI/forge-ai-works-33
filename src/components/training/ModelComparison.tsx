
import React from 'react';
import { 
  Check, 
  X, 
  FileDown, 
  Clock, 
  BarChart2, 
  Cpu, 
  Gauge, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Model {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  f1Score: number;
  trainingTime: string;
  datasetSize: string;
  lastUpdated: string;
  status: 'active' | 'testing' | 'archived';
}

export const ModelComparison = () => {
  const { toast } = useToast();
  
  const models: Model[] = [
    {
      id: 'model-001',
      name: 'SASOK Core v1.0',
      type: 'Transformer',
      accuracy: 0.92,
      f1Score: 0.89,
      trainingTime: '6ч 23м',
      datasetSize: '12.5 ГБ',
      lastUpdated: '2025-05-10',
      status: 'active'
    },
    {
      id: 'model-002',
      name: 'SASOK Emotional v0.8',
      type: 'Fine-tuned LLaMA',
      accuracy: 0.87,
      f1Score: 0.84,
      trainingTime: '4ч 15м',
      datasetSize: '8.2 ГБ',
      lastUpdated: '2025-05-11',
      status: 'testing'
    },
    {
      id: 'model-003',
      name: 'SASOK Legacy v0.5',
      type: 'GPT Neo',
      accuracy: 0.79,
      f1Score: 0.76,
      trainingTime: '3ч 48м',
      datasetSize: '5.7 ГБ',
      lastUpdated: '2025-04-28',
      status: 'archived'
    },
    {
      id: 'model-004',
      name: 'SASOK Experimental v0.2',
      type: 'Custom RLHF',
      accuracy: 0.94,
      f1Score: 0.91,
      trainingTime: '8ч 52м',
      datasetSize: '18.3 ГБ',
      lastUpdated: '2025-05-12',
      status: 'testing'
    },
  ];
  
  const handleExportMetrics = (modelId: string) => {
    const model = models.find(m => m.id === modelId);
    if (model) {
      toast({
        title: "Экспорт метрик",
        description: `Метрики для модели ${model.name} экспортированы в формате CSV.`
      });
    }
  };
  
  const getStatusBadge = (status: Model['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Активна</Badge>;
      case 'testing':
        return <Badge className="bg-blue-500">Тестирование</Badge>;
      case 'archived':
        return <Badge variant="outline">Архив</Badge>;
      default:
        return null;
    }
  };

  // Вычисление средних значений для всех моделей
  const averageAccuracy = models.reduce((sum, model) => sum + model.accuracy, 0) / models.length;
  const averageF1Score = models.reduce((sum, model) => sum + model.f1Score, 0) / models.length;
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart2 className="mr-2 h-5 w-5" />
          Сравнение моделей SASOK
        </CardTitle>
        <CardDescription>
          Сравнение производительности и метрик различных моделей
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <Gauge className="h-8 w-8 mb-2 text-blue-500" />
            <h3 className="font-medium">Средняя точность</h3>
            <p className="text-2xl font-bold">{(averageAccuracy * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <Sparkles className="h-8 w-8 mb-2 text-amber-500" />
            <h3 className="font-medium">Средний F1-Score</h3>
            <p className="text-2xl font-bold">{(averageF1Score * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <Cpu className="h-8 w-8 mb-2 text-green-500" />
            <h3 className="font-medium">Активных моделей</h3>
            <p className="text-2xl font-bold">{models.filter(m => m.status === 'active').length}</p>
          </div>
        </div>
        
        <Table>
          <TableCaption>Список обученных моделей SASOK</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Модель</TableHead>
              <TableHead>Точность</TableHead>
              <TableHead>F1-Score</TableHead>
              <TableHead className="hidden md:table-cell">Время обучения</TableHead>
              <TableHead className="hidden md:table-cell">Размер набора данных</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{model.name}</div>
                    <div className="text-sm text-muted-foreground">{model.type}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {model.accuracy >= 0.9 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                    ) : model.accuracy >= 0.8 ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span>{(model.accuracy * 100).toFixed(1)}%</span>
                  </div>
                </TableCell>
                <TableCell>{(model.f1Score * 100).toFixed(1)}%</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    {model.trainingTime}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{model.datasetSize}</TableCell>
                <TableCell>{getStatusBadge(model.status)}</TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => handleExportMetrics(model.id)}
                    className="flex items-center"
                  >
                    <FileDown className="h-4 w-4 mr-1" />
                    <span className="hidden md:inline">Экспорт</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
