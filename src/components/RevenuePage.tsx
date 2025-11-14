import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";

import RealtimePaymentTable from "./RealtimePaymentTable";
import { useLanguage } from "../contexts/LanguageContext";

const RevenuePage: React.FC = () => {
  const { t } = useLanguage();
  const [monthlyRevenues, setMonthlyRevenues] = useState<
    {
      month: number;
      year: number;
      totalAmount: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchMonthlyRevenues = async () => {
      try {
        const response = await axiosInstance.get(
          "/dashboard/payments/month-nearest?month=7"
        );
        const data = response.data as {
          payments?: { month: number; year: number; totalAmount: number }[];
        };

        console.log(data);
        if (data.payments) {
          setMonthlyRevenues(data.payments);
        }
      } catch (error) {
        console.error("Failed to fetch monthly revenues:", error);
      }
    };

    fetchMonthlyRevenues();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t("Revenue Overview")}
      </h1>

      {/* Real-time Payment Table */}
      <RealtimePaymentTable />
    </div>
  );
};

export default RevenuePage;
