import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const glassCardVariants = cva(
    'relative overflow-hidden rounded-2xl border bg-[rgba(15,16,21,0.7)] backdrop-blur-[32px] shadow-[0_4px_24px_rgba(0,0,0,0.4),0_1px_1px_rgba(255,255,255,0.08)] before:absolute before:inset-0 before:pointer-events-none before:rounded-inherit before:p-[1px] before:bg-gradient-to-br before:from-white/12 before:to-white/4 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude]',
    {
        variants: {
            hover: {
                true: 'transition-all duration-300 cubic-bezier(0.4,0,0.2,1) hover:bg-[rgba(20,21,28,0.85)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_1px_1px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] hover:-translate-y-[2px]',
                false: '',
            },
            accent: {
                none: 'border-white/4',
                primary: 'border-primary/40 shadow-[0_0_15px_var(--color-primary-dim)]',
                secondary: 'border-secondary/40 shadow-[0_0_15px_var(--color-secondary-dim)]',
                success: 'border-success/30 shadow-[0_0_15px_var(--color-success-dim)]',
            },
        },
        defaultVariants: {
            hover: true,
            accent: 'none',
        },
    }
);

export interface GlassCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {
    hover?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, hover, accent, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(glassCardVariants({ hover, accent, className }))}
                {...props}
            >
                {children}
            </div>
        );
    }
);

GlassCard.displayName = 'GlassCard';
