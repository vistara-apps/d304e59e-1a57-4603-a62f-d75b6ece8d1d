'use client';

import { cn } from '@/lib/utils';
import { ActionBannerProps } from '@/lib/types';
import { Gift, Target, Lightbulb, ChevronRight } from 'lucide-react';

export function ActionBanner({ 
  variant, 
  title, 
  description, 
  action, 
  actionText = 'Learn More' 
}: ActionBannerProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'challenge':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'reward':
        return 'bg-green-50 border-green-200 text-green-900';
      case 'tip':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      default:
        return 'bg-surface border-border text-foreground';
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'challenge':
        return <Target className="w-5 h-5" />;
      case 'reward':
        return <Gift className="w-5 h-5" />;
      case 'tip':
        return <Lightbulb className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      'card border-2 cursor-pointer transition-all duration-200 hover:shadow-lg',
      getVariantStyles(),
      action && 'hover:scale-[1.02]'
    )} onClick={action}>
      <div className="flex items-start gap-sm">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-1">{title}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{description}</p>
        </div>
        {action && (
          <div className="flex-shrink-0 flex items-center gap-1 text-sm font-medium">
            <span>{actionText}</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
