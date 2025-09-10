import React, { useState } from 'react';
import { Bell, X, Check, AlertCircle, Info, CheckCircle, Filter, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
}

const AllNotificationsPage: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'New User Registration',
      message: 'John Doe has successfully registered to the platform',
      time: '2 minutes ago',
      date: '2024-01-15',
      read: false
    },
    {
      id: '2',
      type: 'warning',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will begin in 30 minutes. Please save your work.',
      time: '15 minutes ago',
      date: '2024-01-15',
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Weekly Report Available',
      message: 'Your weekly analytics report is ready for download',
      time: '1 hour ago',
      date: '2024-01-15',
      read: true
    },
    {
      id: '4',
      type: 'error',
      title: 'Payment Processing Failed',
      message: 'Payment processing failed for user #1234. Please check the payment gateway.',
      time: '2 hours ago',
      date: '2024-01-15',
      read: true
    },
    {
      id: '5',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily system backup has been completed successfully',
      time: '3 hours ago',
      date: '2024-01-15',
      read: true
    },
    {
      id: '6',
      type: 'info',
      title: 'New Feature Released',
      message: 'Check out our new dashboard analytics feature',
      time: '5 hours ago',
      date: '2024-01-14',
      read: false
    },
    {
      id: '7',
      type: 'warning',
      title: 'High Server Load',
      message: 'Server load is currently at 85%. Consider scaling resources.',
      time: '6 hours ago',
      date: '2024-01-14',
      read: true
    },
    {
      id: '8',
      type: 'success',
      title: 'Database Optimization',
      message: 'Database optimization completed. Performance improved by 25%.',
      time: '8 hours ago',
      date: '2024-01-14',
      read: true
    },
    {
      id: '9',
      type: 'error',
      title: 'API Rate Limit Exceeded',
      message: 'Third-party API rate limit exceeded. Some features may be temporarily unavailable.',
      time: '10 hours ago',
      date: '2024-01-14',
      read: false
    },
    {
      id: '10',
      type: 'info',
      title: 'Security Update',
      message: 'Security patches have been applied to the system',
      time: '12 hours ago',
      date: '2024-01-14',
      read: true
    },
    {
      id: '11',
      type: 'success',
      title: 'User Milestone Reached',
      message: 'Congratulations! You have reached 10,000 active users.',
      time: '1 day ago',
      date: '2024-01-13',
      read: true
    },
    {
      id: '12',
      type: 'warning',
      title: 'Storage Space Warning',
      message: 'Storage space is 80% full. Consider upgrading your plan.',
      time: '1 day ago',
      date: '2024-01-13',
      read: false
    }
  ]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'read' && notification.read) ||
                         (filterStatus === 'unread' && !notification.read);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'warning':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'error':
        return <AlertCircle className="text-red-500" size={20} />;
      case 'info':
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'error':
        return 'border-l-red-500';
      case 'info':
      default:
        return 'border-l-blue-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'info':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 transition-colors">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="text-blue-500" size={28} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('allNotifications')}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {unreadCount} {t('unreadNotifications')} • {notifications.length} {t('total')}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              {t('markAllRead')}
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('searchNotifications')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">{t('allTypes')}</option>
              <option value="info">{t('info')}</option>
              <option value="success">{t('success')}</option>
              <option value="warning">{t('warning')}</option>
              <option value="error">{t('error')}</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('allStatus')}</option>
            <option value="unread">{t('unread')}</option>
            <option value="read">{t('read')}</option>
          </select>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
        {currentNotifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('noNotificationsFound')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t('tryAdjustingFilters')}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-6 border-l-4 ${getBorderColor(notification.type)} ${
                  !notification.read 
                    ? 'bg-blue-50 dark:bg-blue-900/10' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                } transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {notification.title}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(notification.type)}`}>
                            {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>{notification.time}</span>
                          <span>•</span>
                          <span>{notification.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                            title={t('markAsRead')}
                          >
                            <Check size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                          title={t('remove')}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('showing')} {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredNotifications.length)} {t('of')} {filteredNotifications.length}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('previous')}
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 text-sm rounded ${
                        currentPage === page
                          ? 'bg-blue-500 text-white'
                          : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('next')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotificationsPage;