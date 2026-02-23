import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-[0.9375rem] font-medium transition-all duration-200 cubic-bezier(0.4, 0, 0.2, 1) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-white shadow-[0_4px_14px_rgba(40,160,240,0.35)] hover:bg-[#3BACF5] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(40,160,240,0.45)]",
                secondary:
                    "bg-transparent text-foreground border border-white/15 hover:bg-white/5 hover:border-primary hover:-translate-y-[2px]",
                gold:
                    "bg-secondary text-background shadow-[0_4px_14px_rgba(184,147,99,0.35)] hover:bg-[#CBA77A] hover:-translate-y-[2px] hover:shadow-[0_6px_20px_rgba(184,147,99,0.45)]",
                outline:
                    "border border-white/15 bg-transparent hover:bg-white/5 text-foreground",
                ghost:
                    "bg-transparent hover:bg-white/5 text-foreground",
                danger:
                    "bg-red-600 text-white hover:bg-red-700 shadow-sm",
            },
            size: {
                default: "h-[50px] px-7 py-3.5",
                sm: "h-10 rounded-lg px-4 text-sm",
                md: "h-12 rounded-xl px-8",
                lg: "h-14 rounded-xl px-8 text-base",
                icon: "h-12 w-12",
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
