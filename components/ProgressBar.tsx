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
        return 'bg-primary';
      case 'challenge':
        return 'bg-blue-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="space-y-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-foreground/70">
          {progress}/{max}
        </span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
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
