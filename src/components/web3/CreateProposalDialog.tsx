
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ImportanceSlider } from '@/components/memory/form/ImportanceSlider';

export const CreateProposalDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState([0.5]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Здесь был бы код для создания нового предложения
    toast({
      title: "Предложение создано",
      description: "Ваше предложение было успешно добавлено в список голосований",
    });
    
    // Очистить форму и закрыть диалог
    setTitle('');
    setDescription('');
    setImportance([0.5]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          Создать новое предложение
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Создать предложение для голосования</DialogTitle>
            <DialogDescription>
              Создайте новое предложение для обсуждения и голосования в SASOK DAO
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Заголовок предложения</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите заголовок предложения"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание предложения</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Детально опишите ваше предложение и его пользу для сообщества"
                required
                rows={5}
              />
            </div>
            <ImportanceSlider
              value={importance}
              onChange={setImportance}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Отмена
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-nova-600 to-forge-500 hover:opacity-90"
            >
              Создать предложение
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
