import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import axiosInstance from "../api/axiosConfig";

interface Revenue {
  month: number;
  year: number;
  totalAmount: number;
}

const RevenueTable: React.FC = () => {
  const { t } = useLanguage();
  const [revenues, setRevenues] = useState<Revenue[]>([]);

  useEffect(() => {
    const fetchRevenues = async () => {
      try {
        const response = await axiosInstance.get(
          "/dashboard/payments/month-nearest?month=7"
        );
        const data = response.data as { payments: Revenue[] };
        setRevenues(data.payments);
      } catch (error) {
        console.error("Failed to fetch revenues:", error);
      }
    };

    fetchRevenues();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("Revenue")}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">{t("Month")}</th>
              <th className="px-6 py-3 text-left">{t("Year")}</th>
              <th className="px-6 py-3 text-left">{t("Total Amount")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {revenues.map((revenue, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {revenue.month}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {revenue.year}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {revenue.totalAmount.toLocaleString()} VND
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTable;
