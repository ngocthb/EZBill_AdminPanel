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

interface Payment {
  paymentHistoryModelId: string;
  userId: string;
  planId: string;
  email: string;
  planName: string;
  amount: number;
  paymentDate: string;
  status: string;
}

const RevenueChart: React.FC = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [chartData, setChartData] = useState<
    { name: string; revenue: number }[]
  >([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const data = (await axiosInstance.get<Payment[]>(
          "/payment"
        )) as unknown as Payment[];
        console.log(data);

        // Group payments by month and calculate total revenue
        const revenueByMonth: { [key: string]: number } = {};

        data.forEach((payment) => {
          if (payment.status === "COMPLETED") {
            const date = new Date(payment.paymentDate);
            const month = date.getMonth() + 1; // 1-12
            const year = date.getFullYear();
            const key = `${year}-${month}`;

            if (!revenueByMonth[key]) {
              revenueByMonth[key] = 0;
            }
            revenueByMonth[key] += payment.amount;
          }
        });

        // Get last 6 months
        const currentDate = new Date();
        const chartData = Array.from({ length: 6 }, (_, i) => {
          const date = new Date(currentDate);
          date.setMonth(date.getMonth() - (5 - i));
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const key = `${year}-${month}`;

          return {
            name: `Tháng ${month}`,
            revenue: revenueByMonth[key] || 0,
          };
        });

        setChartData(chartData);
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
