import React, { useEffect, useState } from "react";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import UserTable from "./components/UserTable";
import FeedbackTable from "./components/FeedbackTable";
import SettingsPanel from "./components/SettingsPanel";
import UserGrowthChart from "./components/Charts/LineChart";
import RevenueChart from "./components/Charts/BarChart";
import UserDistributionChart from "./components/Charts/PieChart";
import StatCardSkeleton from "./components/StatCardSkeleton";
import AllNotificationsPage from "./components/AllNotificationsPage";
import RevenuePage from "./components/RevenuePage";
import { useLanguage } from "./contexts/LanguageContext";
import axiosInstance from "./api/axiosConfig";
interface User {
  accountId: string;
  email: string;
  phoneNumber: string;
  nickName: string;
  role: string;
  status: string;
  createdAt: string;
}

function App() {
  const { t } = useLanguage();
  const [activeMenuItem, setActiveMenuItem] = useState("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    accountId?: string;
    role?: string;
    email?: string;
  } | null>(null);

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = async () => {
    try {
      const data = (await axiosInstance.get<User[]>(
        "/accounts"
      )) as unknown as User[];

      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (user: {
    accountId?: string;
    role?: string;
    email?: string;
  }) => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setIsLoading(false);
      // if user can only view revenue, navigate there
      if (user.role === "REVENUE_ONLY") setActiveMenuItem("revenue");
    }, 500);
  };

  const handleMenuChange = (menuItem: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveMenuItem(menuItem);
      setIsLoading(false);
    }, 300);
  };

  const handleLoginImmediate = (user?: {
    accountId?: string;
    role?: string;
    email?: string;
  }) => {
    if (user) return handleLogin(user);
    // fallback: set as admin
    handleLogin({ role: "ADMIN", accountId: "demo" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveMenuItem("overview");
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const totalUsers = userData.length;
  const activeUsers = userData.filter(
    (user) => user.status === "ACTIVE"
  ).length;
  const freeUsers = userData.filter((user) => user.role === "FREE_USER").length;
  const basicUsers = userData.filter(
    (user) => user.role === "BASIC_USER"
  ).length;
  const premiumUsers = userData.filter(
    (user) => user.role === "PREMIUM_USER"
  ).length;
  const vipUsers = userData.filter((user) => user.role === "VIP_USER").length;
  const dailyUsers = userData.filter(
    (user) => user.role === "DAILY_USER"
  ).length;
  const adminUsers = userData.filter((user) => user.role === "ADMIN").length;
  const newUsers = userData.filter((user) => {
    const createdDate = new Date(user.createdAt);
    const currentDate = new Date();
    return (
      createdDate.getMonth() === currentDate.getMonth() &&
      createdDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  const getPageTitle = () => {
    switch (activeMenuItem) {
      case "overview":
        return t("overview");
      case "user":
        return t("user");
      case "revenue":
        return t("revenue");
      case "feedback":
        return t("feedback");
      case "notifications":
        return t("notifications");
      case "settings":
        return t("settings");
      default:
        return "Dashboard";
    }
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case "overview":
        if (isLoading) {
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                <StatCardSkeleton />
                <StatCardSkeleton />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80 animate-pulse"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-80 animate-pulse"></div>
              </div>
            </>
          );
        }
        return (
          <>
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              <RevenueChart />
              <UserDistributionChart
                data={[
                  { name: "Free Users", value: freeUsers, color: "#60A5FA" },
                  {
                    name: "Basic Users",
                    value: basicUsers,
                    color: "#A78BFA",
                  },
                  {
                    name: "Premium Users",
                    value: premiumUsers,
                    color: "#34D399",
                  },
                  { name: "VIP Users", value: vipUsers, color: "#F59E0B" },
                  {
                    name: "Daily Users",
                    value: dailyUsers,
                    color: "#F97316",
                  },
                ]}
              />
            </div>
          </>
        );

      case "user":
        return (
          <>
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="totalUsers"
                value={totalUsers.toString()}
                change=""
                isPositive={true}
                variant="blue"
              />
              <StatCard
                title="activeUsers"
                value={freeUsers.toString()}
                change=""
                isPositive={true}
                variant="dark"
              />
              <div className="bg-green-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">
                    {t("newThisMonth")}
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">
                    {premiumUsers.toString()}
                  </div>
                </div>
              </div>
              <div className="bg-purple-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">
                    {t("churnRate")}
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">
                    {vipUsers.toString()}
                  </div>
                </div>
              </div>
            </div>
            <UserTable data={userData} />
          </>
        );

      case "revenue":
        return <RevenuePage />;

      case "feedback":
        return (
          <>
            {/* Feedback Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">
                    {t("totalReviews")}
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">1,247</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">+23%</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">
                    {t("averageRating")}
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">4.2</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">+0.3</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">
                    {t("pendingReviews")}
                  </h3>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">23</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">-12%</span>
                  </div>
                </div>
              </div>
            </div>
            <FeedbackTable />
          </>
        );

      case "settings":
        return <SettingsPanel />;

      case "notifications":
        return <AllNotificationsPage />;

      default:
        return <div>Page not found</div>;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Sidebar
        activeItem={activeMenuItem}
        onItemClick={handleMenuChange}
        onLogout={handleLogout}
        userRole={currentUser?.role}
      />

      <div className="ml-64">
        <Header
          title={getPageTitle()}
          subtitle={`${t("dashboards")} ${getPageTitle()}`}
        />

        <div className="p-6 pt-24">{renderContent()}</div>
      </div>
    </div>
  );
}

export default App;
