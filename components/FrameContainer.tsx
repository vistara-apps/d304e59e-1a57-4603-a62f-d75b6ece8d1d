'use client';

import { cn } from '@/lib/utils';

interface FrameContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function FrameContainer({ children, className }: FrameContainerProps) {
  return (
    <div className={cn('container min-h-screen py-6', className)}>
      <div className="transition-opacity duration-500 opacity-100">
        {children}
      </div>
    </div>
  );
}
