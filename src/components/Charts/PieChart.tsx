import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';


const UserDistributionChart: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const data = [
    { name: 'Premium Users', value: 2318, color: isDark ? '#60A5FA' : '#3b82f6' },
    { name: 'Free Users', value: 1256, color: isDark ? '#F59E0B' : '#1f2937' },
    { name: 'Trial Users', value: 456, color: isDark ? '#10B981' : '#6b7280' },
    { name: 'Inactive', value: 234, color: isDark ? '#6B7280' : '#d1d5db' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('userDistribution')}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('breakdownByUserType')}</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: isDark ? '#1F2937' : 'white',
              border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
              color: isDark ? 'white' : 'black',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            wrapperStyle={{ color: isDark ? '#E5E7EB' : '#374151' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDistributionChart;