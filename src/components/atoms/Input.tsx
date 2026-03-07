import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, id, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-widest text-[#8892B0] mb-1.5 block">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--rebeka-primary)] transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        id={id}
                        ref={ref}
                        className={cn(
                            "flex h-[50px] w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white shadow-inner transition-all duration-300 placeholder:text-white/20 focus-visible:outline-none focus-visible:border-[var(--rebeka-primary)] focus-visible:ring-1 focus-visible:ring-[var(--rebeka-primary)] focus-visible:bg-black/60 focus-visible:shadow-[0_0_20px_var(--rebeka-primary-dim)] disabled:cursor-not-allowed disabled:opacity-50",
                            icon && "pl-11",
                            error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500",
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-[10px] font-mono font-medium text-red-400 mt-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
