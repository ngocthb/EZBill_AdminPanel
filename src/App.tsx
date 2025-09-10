import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import UserTable from './components/UserTable';
import FeedbackTable from './components/FeedbackTable';
import SettingsPanel from './components/SettingsPanel';
import UserGrowthChart from './components/Charts/LineChart';
import RevenueChart from './components/Charts/BarChart';
import UserDistributionChart from './components/Charts/PieChart';
import StatCardSkeleton from './components/StatCardSkeleton';
import AllNotificationsPage from './components/AllNotificationsPage';
import { useLanguage } from './contexts/LanguageContext';

function App() {
  const { t } = useLanguage();
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleMenuChange = (menuItem: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveMenuItem(menuItem);
      setIsLoading(false);
    }, 300);
  };

  const handleLoginImmediate = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveMenuItem('overview');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLoginImmediate} />;
  }

  const getPageTitle = () => {
    switch (activeMenuItem) {
      case 'overview': return t('overview');
      case 'user': return t('user');
      case 'feedback': return t('feedback');
      case 'notifications': return t('notifications');
      case 'settings': return t('settings');
      default: return 'Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'overview':
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
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
              <StatCard
                title="newUsers"
                value="256"
                change="+15.03%"
                isPositive={true}
                variant="blue"
              />
              <StatCard
                title="premiumUsers"
                value="2,318"
                change="+6.08%"
                isPositive={true}
                variant="dark"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <UserGrowthChart />
              <RevenueChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <UserTable />
              </div>
              <div>
                <UserDistributionChart />
              </div>
            </div>
          </>
        );
      
      case 'user':
        return (
          <>
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="totalUsers"
                value="4,264"
                change="+12.5%"
                isPositive={true}
                variant="blue"
              />
              <StatCard
                title="activeUsers"
                value="3,891"
                change="+8.2%"
                isPositive={true}
                variant="dark"
              />
              <div className="bg-green-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">{t('newThisMonth')}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">256</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">+15.03%</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">{t('churnRate')}</h3>
                </div>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">2.1%</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">-0.5%</span>
                  </div>
                </div>
              </div>
            </div>
            <UserTable />
          </>
        );
      
      case 'feedback':
        return (
          <>
            {/* Feedback Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-500 text-white p-6 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">{t('totalReviews')}</h3>
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
                  <h3 className="text-sm font-medium opacity-90">{t('averageRating')}</h3>
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
                  <h3 className="text-sm font-medium opacity-90">{t('pendingReviews')}</h3>
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
      
      case 'settings':
        return <SettingsPanel />;
      
      case 'notifications':
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
      />
      
      <div className="ml-64">
        <Header title={getPageTitle()} subtitle={`${t('dashboards')} ${getPageTitle()}`} />
        
        <div className="p-6 pt-24">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;