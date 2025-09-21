'use client';

import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface ProfileAvatarProps {
  variant: 'small' | 'large';
  src?: string;
  alt?: string;
  className?: string;
}

export function ProfileAvatar({ 
  variant, 
  src, 
  alt = 'Profile', 
  className 
}: ProfileAvatarProps) {
  const sizeClasses = variant === 'large' ? 'w-16 h-16' : 'w-8 h-8';
  const iconSize = variant === 'large' ? 'w-8 h-8' : 'w-4 h-4';

  return (
    <div className={cn(
      'rounded-full bg-primary/10 flex items-center justify-center overflow-hidden',
      sizeClasses,
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        <User className={cn('text-primary', iconSize)} />
      )}
    </div>
  );
}
