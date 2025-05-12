
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const ACTIVITY_DATA = [
  { day: 'ПН', interactions: 28, avgDuration: 12 },
  { day: 'ВТ', interactions: 32, avgDuration: 15 },
  { day: 'СР', interactions: 45, avgDuration: 18 },
  { day: 'ЧТ', interactions: 26, avgDuration: 10 },
  { day: 'ПТ', interactions: 38, avgDuration: 14 },
  { day: 'СБ', interactions: 52, avgDuration: 20 },
  { day: 'ВС', interactions: 41, avgDuration: 17 },
];

export const ActivityTrackingChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Активность взаимодействий</CardTitle>
        <CardDescription>Частота и продолжительность взаимодействий по дням</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ACTIVITY_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" orientation="left" label={{ value: 'Кол-во взаимодействий', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Длительность (мин)', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: '0.5rem',
                  padding: '0.5rem'
                }}
              />
              <Legend />
              <Bar 
                yAxisId="left" 
                dataKey="interactions" 
                name="Количество взаимодействий" 
                fill="#8B5CF6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right" 
                dataKey="avgDuration" 
                name="Средняя длительность (мин)" 
                fill="#34D399" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
