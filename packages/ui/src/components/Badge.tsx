import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@propery-agents/config';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400',
        secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        success: 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-400',
        warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-400',
        error: 'bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-400',
        outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />;
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
