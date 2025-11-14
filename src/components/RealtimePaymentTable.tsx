import React, { useEffect, useState, useCallback } from "react";
// import * as signalR from "@microsoft/signalr";
import { useLanguage } from "../contexts/LanguageContext";
import axiosInstance from "../api/axiosConfig";

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

const RealtimePaymentTable: React.FC = () => {
  const { t } = useLanguage();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Connecting...");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // const HUB_URL = `${BASE_URL}/paymentHub`;
  // const HUB_EVENT = "PaymentsUpdated";
  // const JOIN_GROUP_METHOD = "JoinAdminGroup";

  const getStatusBadge = (status: string) => {
    let text = status;
    let classes = "px-2 py-0.5 rounded-full text-xs font-medium ";

    switch (status.toUpperCase()) {
      case "COMPLETED":
        classes +=
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        text = "Completed";
        break;
      case "PENDING":
        classes +=
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        text = "Pending";
        break;
      case "FAILED":
        classes += "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        text = "Failed";
        break;
      default:
        classes +=
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
    return { text, classes };
  };

  const fetchAllPayments = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = (await axiosInstance.get<Payment[]>(
        "/payment"
      )) as unknown as Payment[];

      console.log(data);

      // Sort: newest first
      const sortedPayments = data.sort(
        (a: Payment, b: Payment) =>
          new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()
      );

      setPayments(sortedPayments);
      setIsError(false);
      setConnectionStatus("Data loaded successfully");
    } catch (error) {
      console.error("Error fetching payments:", error);
      setIsError(true);
      setConnectionStatus("Error loading data. Check console.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    // Fetch initial data without SignalR
    fetchAllPayments();
  }, []);

  // useEffect(() => {
  //   let connection: signalR.HubConnection | null = null;

  //   const startConnection = async () => {
  //     setConnectionStatus("Connecting to SignalR...");
  //     setIsError(false);
  //     console.log(`Attempting to connect to Hub: ${HUB_URL}`);

  //     connection = new signalR.HubConnectionBuilder()
  //       .withUrl(HUB_URL)
  //       .withAutomaticReconnect()
  //       .build();

  //     // Listen for payment updates
  //     connection.on(HUB_EVENT, () => {
  //       console.log(`Received '${HUB_EVENT}' ping! Refetching data...`);
  //       setConnectionStatus("Payment update received! Refreshing...");
  //       fetchAllPayments();
  //     });

  //     try {
  //       await connection.start();
  //       console.log("SignalR Connected.");
  //       setConnectionStatus("Connected. Joining admin group...");

  //       // Join admin group
  //       await connection.invoke(JOIN_GROUP_METHOD);
  //       console.log("Joined admin group.");
  //       setConnectionStatus("Connected & Listening for updates");
  //       setIsError(false);

  //       // Fetch initial data
  //       await fetchAllPayments();
  //     } catch (err: any) {
  //       console.error("SignalR Connection Error: ", err);
  //       setConnectionStatus(`Connection Error: ${err.message}. Retrying...`);
  //       setIsError(true);

  //       // Retry after 5 seconds
  //       setTimeout(startConnection, 5000);
  //     }
  //   };

  //   startConnection();

  //   // Cleanup on unmount
  //   return () => {
  //     if (connection) {
  //       connection.stop();
  //     }
  //   };
  // }, [HUB_URL, HUB_EVENT, JOIN_GROUP_METHOD, fetchAllPayments]);

  // Pagination logic
  const totalPages = Math.ceil(payments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPayments = payments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Status Bar */}
      {/* <div
        className={`px-6 py-3 rounded-t-lg text-white font-medium ${
          isError ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {connectionStatus}
      </div> */}

      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("realtimePayments") || "Real-time Payments"}
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {t("email") || "Email"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {t("plan") || "Plan"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {t("amount") || "Amount"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {t("date") || "Date"}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {t("status") || "Status"}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {!payments || payments.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                >
                  {isError
                    ? "Error loading data. Check console."
                    : "Loading initial data..."}
                </td>
              </tr>
            ) : (
              currentPayments.map((payment) => {
                const { text: statusText, classes: statusClasses } =
                  getStatusBadge(payment.status);
                const formattedAmount = new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(payment.amount);
                const formattedDate = new Date(
                  payment.paymentDate
                ).toLocaleString("vi-VN");

                return (
                  <tr
                    key={payment.paymentHistoryModelId}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {payment.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {payment.planName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formattedAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formattedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={statusClasses}>{statusText}</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {payments.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t("rowsPerPage")}
            </span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t("showing")} {startIndex + 1}-
              {Math.min(endIndex, payments.length)} {t("of")} {payments.length}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {t("previous")}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 border rounded text-sm ${
                  currentPage === page
                    ? "bg-blue-500 text-white border-blue-500"
                    : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {t("next")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RealtimePaymentTable;
