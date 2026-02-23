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

    const baseStyles = "text-gray-900 font-sans tracking-tight";

    const variants = {
        h1: "text-4xl sm:text-5xl font-extrabold",
        h2: "text-3xl sm:text-4xl font-bold",
        h3: "text-2xl sm:text-3xl font-semibold",
        h4: "text-xl sm:text-2xl font-semibold",
        p: "text-base text-gray-700 leading-relaxed",
        subtitle: "text-lg text-gray-600 font-medium",
        caption: "text-sm text-gray-500",
    };

    return (
        <Component className={cn(baseStyles, variants[variant], className)} {...props}>
            {children}
        </Component>
    );
};
