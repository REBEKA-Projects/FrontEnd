import { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
    variant?: "h1" | "h2" | "h3" | "h4" | "p" | "subtitle" | "caption";
    as?: ElementType;
    children: ReactNode;
}

export const Typography = ({
    variant = "p",
    as,
    className,
    children,
    ...props
}: TypographyProps) => {
    const Component = as || (variant.startsWith("h") ? (variant as ElementType) : "p");

    const baseStyles = "text-text-primary font-sans tracking-tight";

    const variants = {
        h1: "text-4xl sm:text-5xl font-black uppercase italic tracking-tighter",
        h2: "text-3xl sm:text-4xl font-black uppercase italic tracking-tighter",
        h3: "text-2xl sm:text-3xl font-black uppercase italic tracking-tighter",
        h4: "text-xl sm:text-2xl font-black uppercase italic tracking-tight",
        p: "text-base text-text-secondary leading-relaxed font-medium",
        subtitle: "text-sm text-[var(--rebeka-primary)] font-black uppercase tracking-[0.2em] italic",
        caption: "text-[10px] text-white/40 uppercase font-bold tracking-widest",
    };

    return (
        <Component className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </Component>
    );
};
