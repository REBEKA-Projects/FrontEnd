import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-xl text-[11px] uppercase tracking-widest font-black transition-all duration-300 cubic-bezier(0.16,1,0.3,1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "bg-gradient-to-b from-[#4A6EE0] to-[var(--rebeka-primary)] text-white shadow-[0_8px_16px_rgba(55,91,210,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_24px_rgba(55,91,210,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-[2px] border border-white/10 before:absolute before:inset-0 before:bg-white/0 hover:before:bg-white/10 before:transition-colors",
                secondary:
                    "bg-black/40 text-white border border-white/15 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-black/60 hover:border-[var(--rebeka-primary)] hover:shadow-[0_8px_24px_var(--rebeka-primary-dim),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-[2px]",
                gold:
                    "bg-gradient-to-b from-[#FFCF4A] to-[var(--rebeka-secondary)] text-black shadow-[0_8px_16px_rgba(247,181,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:shadow-[0_12px_24px_rgba(247,181,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:-translate-y-[2px] border border-black/10 before:absolute before:inset-0 before:bg-white/0 hover:before:bg-white/20 before:transition-colors",
                outline:
                    "border border-white/20 bg-transparent hover:bg-white/5 text-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] hover:border-white/40",
                ghost:
                    "bg-transparent hover:bg-white/5 text-white/70 hover:text-white",
                danger:
                    "bg-gradient-to-b from-red-500 to-red-600 text-white hover:shadow-[0_8px_16px_rgba(220,38,38,0.4)] hover:-translate-y-[1px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-red-400/20",
            },
            size: {
                default: "h-[50px] px-8 py-3.5",
                sm: "h-10 px-5 text-[9px]",
                md: "h-12 px-8 text-[10px]",
                lg: "h-[60px] px-10 text-xs",
                icon: "h-12 w-12 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, isLoading, children, disabled, ...props }, ref) => {
        if (asChild) {
            return (
                <Slot
                    className={cn(buttonVariants({ variant, size, className }))}
                    ref={ref}
                    {...props}
                >
                    {children}
                </Slot>
            );
        }

        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";
