import React from 'react';

interface SkeletonProps {
  variant?: 'paragraph' | 'avatar' | 'block';
  rows?: number;
  width?: string;
  height?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ variant, rows, width, height, className }) => {
  let skeletonContent;

  switch (variant) {
    case 'avatar':
      skeletonContent = (
        <div className={`mx-auto w-full max-w-sm ${className}`}>
          <div className="bg-gradient-animation flex animate-pulse space-x-4 rounded-full p-4">
            <div className="h-12 w-12 rounded-full bg-gray-400" style={{ width, height }} />
          </div>
        </div>
      );
      break;
    case 'paragraph':
      const skeletonRows = Array.from({ length: rows ?? 3 }).map((_, index, arr) => (
        <div
          key={index}
          className={`h-6 w-full rounded-md bg-gray-400 ${index !== arr?.length - 1 ? 'mb-4' : ''} ${className}`}
        />
      ));
      skeletonContent = (
        <div className="w-full max-w-sm">
          <div className="from-ant-skeleton-gradient-from-color via-ant-skeleton-color to-ant-skeleton-gradient-to-color animate-pulse bg-gradient-to-r">
            {skeletonRows}
          </div>
        </div>
      );
      break;
    case 'block':
      skeletonContent = (
        <div className={`mx-auto max-w-sm ${className}`}>
          <div className="from-ant-skeleton-gradient-from-color via-ant-skeleton-color to-ant-skeleton-gradient-to-color flex animate-pulse space-x-4 rounded-full bg-gradient-to-r p-4">
            <div className="rounded-md bg-gray-400" style={{ height, width }} />
          </div>
        </div>
      );
      break;
    default:
      skeletonContent = (
        <div className="mx-auto w-full max-w-sm">
          <div className="from-ant-skeleton-gradient-from-color via-ant-skeleton-color to-ant-skeleton-gradient-to-color flex animate-pulse space-x-4 rounded bg-gradient-to-r p-4">
            <div className="h-12 w-12 rounded-full bg-gray-400" />
          </div>
        </div>
      );
  }

  return skeletonContent;
};

export default Skeleton;
