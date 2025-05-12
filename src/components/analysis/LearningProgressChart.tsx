
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const LEARNING_DATA = [
  { day: '1', accuracy: 65, target: 80 },
  { day: '5', accuracy: 68, target: 80 },
  { day: '10', accuracy: 72, target: 80 },
  { day: '15', accuracy: 76, target: 80 },
  { day: '20', accuracy: 81, target: 80 },
  { day: '25', accuracy: 84, target: 80 },
  { day: '30', accuracy: 89, target: 80 },
];

export const LearningProgressChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Прогресс обучения</CardTitle>
        <CardDescription>Динамика точности моделей за последние 30 дней</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LEARNING_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" label={{ value: 'День', position: 'insideBottomRight', offset: -10 }} />
              <YAxis label={{ value: 'Точность (%)', angle: -90, position: 'insideLeft' }} domain={[50, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Точность']}
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem'
                }}
              />
              <Legend />
              <ReferenceLine y={80} stroke="#F43F5E" strokeDasharray="3 3" label={{ value: 'Целевая точность', position: 'right' }} />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                name="Точность модели" 
                stroke="#8B5CF6" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
