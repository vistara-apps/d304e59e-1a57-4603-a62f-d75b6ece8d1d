'use client';

import { cn } from '@/lib/utils';
import { formatCarbonValue } from '@/lib/utils';
import { MetricCardProps } from '@/lib/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricCard({ 
  type, 
  value, 
  unit, 
  change, 
  icon 
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (type) {
      case 'transport':
        return 'bg-red-50 border-red-200';
      case 'food':
        return 'bg-orange-50 border-orange-200';
      case 'energy':
        return 'bg-yellow-50 border-yellow-200';
      case 'total':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-surface border-border';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'transport':
        return 'Transport';
      case 'food':
        return 'Food';
      case 'energy':
        return 'Energy';
      case 'total':
        return 'Total Footprint';
      default:
        return 'Metric';
    }
  };

  return (
    <div className={cn(
      'card border-2 transition-all duration-200 hover:shadow-lg',
      getVariantStyles()
    )}>
      <div className="flex items-center justify-between mb-sm">
        <div className="flex items-center gap-sm">
          <div className="text-xl">{icon}</div>
          <span className="text-sm font-medium text-foreground/70">
            {getTypeLabel()}
          </span>
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium',
            change > 0 ? 'text-red-600' : 'text-green-600'
          )}>
            {change > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">
          {formatCarbonValue(value, unit)}
        </div>
        {type === 'total' && (
          <div className="text-xs text-foreground/60">
            This week
          </div>
        )}
      </div>
    </div>
  );
}
