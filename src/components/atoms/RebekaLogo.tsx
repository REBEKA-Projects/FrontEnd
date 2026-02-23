import { Typography } from "@/components/atoms/Typography";
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
        sm: "text-xl",
        md: "text-3xl",
        lg: "text-5xl",
    };

    return (
        <div className={cn("flex flex-col items-start leading-none", className)}>
            <span className={cn(
                "font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#28A0F0] via-[#5AC1F0] to-[#B89363] drop-shadow-sm",
                sizeClasses[size]
            )}>
                REBEKA
            </span>
        </div>
    );
};
