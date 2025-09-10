import React from 'react';
import Skeleton from './Skeleton';

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 5, columns = 6 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
      {/* Header Skeleton */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <Skeleton width={150} height={24} />
      </div>
      
      {/* Table Header Skeleton */}
      <div className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 px-6 py-3">
        <div className="grid grid-cols-6 gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} width="80%" height={16} />
          ))}
        </div>
      </div>
      
      {/* Table Rows Skeleton */}
      <div className="divide-y divide-gray-200 dark:divide-gray-600">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="grid grid-cols-6 gap-4 items-center">
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={16} height={16} />
                <Skeleton width="70%" height={16} />
              </div>
              {Array.from({ length: columns - 1 }).map((_, colIndex) => (
                <Skeleton key={colIndex} width="60%" height={16} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Skeleton */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
        <Skeleton width={100} height={16} />
        <div className="flex items-center gap-4">
          <Skeleton width={120} height={32} />
          <div className="flex gap-2">
            <Skeleton width={32} height={32} />
            <Skeleton width={32} height={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSkeleton;