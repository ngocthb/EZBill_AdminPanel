import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

const data = [
  { name: 'Jan', users: 400, premium: 240 },
  { name: 'Feb', users: 300, premium: 139 },
  { name: 'Mar', users: 200, premium: 980 },
  { name: 'Apr', users: 278, premium: 390 },
  { name: 'May', users: 189, premium: 480 },
  { name: 'Jun', users: 239, premium: 380 },
  { name: 'Jul', users: 349, premium: 430 },
];

const UserGrowthChart: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('userGrowth')}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('monthlyUserAcquisition')}</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#374151" : "#f0f0f0"} />
          <XAxis 
            dataKey="name" 
            stroke={isDark ? "#9CA3AF" : "#6B7280"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke={isDark ? "#9CA3AF" : "#6B7280"}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? '#1F2937' : 'white',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              color: isDark ? 'white' : 'black',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="users" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="premium" 
            stroke={isDark ? "#F59E0B" : "#1f2937"}
            strokeWidth={3}
            dot={{ fill: isDark ? "#F59E0B" : '#1f2937', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: isDark ? "#F59E0B" : '#1f2937', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;