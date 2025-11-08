import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";

interface UserDistributionChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const UserDistributionChart: React.FC<UserDistributionChartProps> = ({
  data,
}) => {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("userDistribution")}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("breakdownByUserType")}
        </p>
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
              backgroundColor: isDark ? "#1F2937" : "white",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{
              color: isDark ? "#E5E7EB" : "#374151",
              fontWeight: "bold",
            }}
            itemStyle={{
              color: isDark ? "#E5E7EB" : "#374151",
            }}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ color: isDark ? "#E5E7EB" : "#374151" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDistributionChart;
