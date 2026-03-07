import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const glassCardVariants = cva(
    'relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/40 backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.08),inset_0_-1px_1px_rgba(255,255,255,0.02)] before:absolute before:inset-0 before:pointer-events-none before:rounded-inherit before:p-[1px] before:bg-gradient-to-br before:from-white/10 before:via-white/[0.02] before:to-white/5 before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude]',
    {
        variants: {
            hover: {
                true: 'transition-all duration-500 cubic-bezier(0.16,1,0.3,1) hover:bg-black/60 hover:shadow-[0_16px_48px_rgba(0,0,0,0.8),0_0_30px_rgba(55,91,210,0.15),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:border-white/10 hover:-translate-y-[2px]',
                false: '',
            },
            accent: {
                none: '',
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
