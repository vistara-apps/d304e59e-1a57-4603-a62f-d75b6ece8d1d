'use client';

import { cn } from '@/lib/utils';
import { ProgressBarProps } from '@/lib/types';

export function ProgressBar({ 
  variant, 
  progress, 
  max, 
  label 
}: ProgressBarProps) {
  const percentage = Math.min((progress / max) * 100, 100);
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'achievement':
        return 'bg-green-600';
      case 'challenge':
        return 'bg-blue-500';
      default:
        return 'bg-green-600';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <span className="text-sm text-gray-600">
          {progress}/{max}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            getVariantStyles()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
