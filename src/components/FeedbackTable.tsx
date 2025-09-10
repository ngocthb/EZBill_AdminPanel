import React, { useState } from 'react';
import { Star, MessageCircle, Calendar, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Feedback {
  id: string;
  userName: string;
  rating: number;
  message: string;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
}

const FeedbackTable: React.FC = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const rowsPerPage = 8;
  
  const feedbacks: Feedback[] = [
    {
      id: '1',
      userName: 'John Doe',
      rating: 5,
      message: 'Great service! Very satisfied with the platform.',
      date: '2024-01-15',
      status: 'new'
    },
    {
      id: '2',
      userName: 'Jane Smith',
      rating: 4,
      message: 'Good experience overall, but could improve loading speed.',
      date: '2024-01-14',
      status: 'reviewed'
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      rating: 3,
      message: 'Average service. Some features are confusing.',
      date: '2024-01-13',
      status: 'resolved'
    },
    {
      id: '4',
      userName: 'Sarah Wilson',
      rating: 5,
      message: 'Excellent platform! Highly recommend to others.',
      date: '2024-01-12',
      status: 'new'
    },
    {
      id: '5',
      userName: 'David Brown',
      rating: 2,
      message: 'Had some issues with billing. Need better support.',
      date: '2024-01-11',
      status: 'reviewed'
    },
  ];
  
  const filteredFeedbacks = statusFilter === 'all' 
    ? feedbacks 
    : feedbacks.filter(f => f.status === statusFilter);
  
  const totalPages = Math.ceil(filteredFeedbacks.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + rowsPerPage);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-blue-500" size={24} />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('customerFeedback')}</h2>
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('allStatus')}</option>
            <option value="new">{t('new')}</option>
            <option value="reviewed">{t('reviewed')}</option>
            <option value="resolved">{t('resolved')}</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('user')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('rating')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('message')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('date')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                {t('status')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {currentFeedbacks.map((feedback) => (
              <tr key={feedback.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{feedback.userName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {renderStars(feedback.rating)}
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">({feedback.rating})</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{feedback.message}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar size={14} />
                    {feedback.date}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(feedback.status)}`}>
                    {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {t('showing')} {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredFeedbacks.length)} {t('of')} {filteredFeedbacks.length}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('previous')}
          </button>
          <span className="px-3 py-1 text-sm bg-blue-500 text-white rounded">
            {currentPage}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackTable;