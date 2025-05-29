
import React from 'react';

export const ActivityLog: React.FC = () => {
  const activities = [
    { action: 'Memory recall strengthened', time: 'Just now', direction: '↑' },
    { action: 'Memory node forgotten', time: 'Just now', direction: '↓' }
  ];

  return (
    <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-cyan-400">Activity Log</h3>
        <span className="text-xs text-cyan-400">Just now</span>
      </div>
      
      <div className="space-y-2">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <span className={`text-lg ${activity.direction === '↑' ? 'text-green-400' : 'text-red-400'}`}>
              {activity.direction}
            </span>
            <span className="text-gray-300">{activity.action}</span>
            <span className="text-cyan-400 text-xs ml-auto">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
