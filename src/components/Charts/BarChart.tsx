import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTheme } from "../../contexts/ThemeContext";
import axiosInstance from "../../api/axiosConfig";

const RevenueChart: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [chartData, setChartData] = useState<
    { name: string; revenue: number }[]
  >([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = (await axiosInstance.get(
          "/dashboard/payments/month-nearest?month=6"
        )) as unknown as {
          payments: { month: number; totalAmount: number }[];
        };
        console.log(data);

        const currentMonth = new Date().getMonth() + 1; // Get current month (1-12)
        const allMonths = Array.from({ length: 6 }, (_, i) => {
          const month = currentMonth - i;
          return month > 0 ? month : 12 + month; // Handle year wrap-around
        }).reverse(); // Ensure months are in ascending order

        const formattedData = allMonths.map((month) => {
          const payment = data.payments.find((p) => p.month === month);
          return {
            name: `Tháng ${month}`,
            revenue: payment ? payment.totalAmount : 0,
          };
        });

        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {t("monthlyRevenue")}
        </h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#374151" : "#f0f0f0"}
          />
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
            tickFormatter={(value) => `${value.toLocaleString()} `} // Format Y-axis values with VND
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#1F2937" : "white",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              color: isDark ? "white" : "black",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value: number) => [
              `${value.toLocaleString()} VND`,
              t("revenue"),
            ]} // Format tooltip values with VND and label
          />
          <Bar
            dataKey="revenue"
            fill={isDark ? "#60A5FA" : "#3b82f6"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
