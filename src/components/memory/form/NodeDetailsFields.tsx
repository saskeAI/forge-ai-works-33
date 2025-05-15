
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const NodeDetailsFields: React.FC = () => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Название узла</Label>
        <Input id="name" name="name" placeholder="Введите название узла памяти" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea 
          id="description" 
          name="description"
          placeholder="Детальное описание содержимого узла памяти"
          className="resize-none min-h-[100px]"
        />
      </div>
    </>
  );
};
