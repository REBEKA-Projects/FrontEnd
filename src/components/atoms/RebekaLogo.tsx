import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface RebekaLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const RebekaLogo = ({ className, size = 'md' }: RebekaLogoProps) => {
    const sizeClasses = {
        sm: "text-xl tracking-[0.04em]",
        md: "text-[1.75rem] tracking-[0.06em]",
        lg: "text-5xl tracking-[0.06em]",
    };

    return (
        <div className={cn("flex items-center leading-none", className)}>
            <span
                className={cn(
                    "font-heading font-black text-white select-none",
                    sizeClasses[size]
                )}
            >
                FIDUCCI
            </span>
        </div>
    );
};
