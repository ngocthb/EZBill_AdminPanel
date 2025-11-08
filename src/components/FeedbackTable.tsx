import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface Revenue {
  id: string;
  source: string;
  amount: number;
  date: string;
}

const RevenueTable: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const revenues: Revenue[] = [
    { id: "1", source: "Subscription", amount: 500, date: "2024-01-15" },
    { id: "2", source: "Ad Revenue", amount: 300, date: "2024-01-14" },
    { id: "3", source: "Affiliate", amount: 200, date: "2024-01-13" },
    { id: "4", source: "Product Sales", amount: 1000, date: "2024-01-12" },
    { id: "5", source: "Service Fees", amount: 150, date: "2024-01-11" },
  ];

  const totalPages = Math.ceil(revenues.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRevenues = revenues.slice(startIndex, startIndex + rowsPerPage);

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
              <th className="px-6 py-3 text-left">{t("Source")}</th>
              <th className="px-6 py-3 text-left">{t("Amount")}</th>
              <th className="px-6 py-3 text-left">{t("Date")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {currentRevenues.map((revenue) => (
              <tr
                key={revenue.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {revenue.source}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  ${revenue.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {revenue.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center px-6 py-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
        >
          {t("Previous")}
        </button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {t("Page")} {currentPage} {t("of")} {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50"
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default RevenueTable;
