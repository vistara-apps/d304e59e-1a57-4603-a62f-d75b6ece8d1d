'use client';

import { cn } from '@/lib/utils';

interface FrameContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FrameContainer({ children, className }: FrameContainerProps) {
  return (
    <div className={cn('container min-h-screen py-lg', className)}>
      <div className="animate-fade-in">
        {children}
      </div>
    </div>
  );
}
