
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const EMOTIONS_DATA = [
  { name: 'Заинтересованность', value: 35, color: '#4F46E5' },
  { name: 'Сосредоточенность', value: 25, color: '#10B981' },
  { name: 'Радость', value: 15, color: '#F59E0B' },
  { name: 'Любопытство', value: 12, color: '#8B5CF6' },
  { name: 'Нейтральность', value: 8, color: '#64748B' },
  { name: 'Другое', value: 5, color: '#94A3B8' },
];

export const EmotionalAnalyticsChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Эмоциональное распределение</CardTitle>
        <CardDescription>Распределение эмоций в диалогах за последние 30 дней</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={EMOTIONS_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={45}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {EMOTIONS_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend layout="vertical" verticalAlign="middle" align="right" />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Частота']}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
