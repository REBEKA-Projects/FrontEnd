interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    accent?: 'primary' | 'secondary' | 'success';
}

export function GlassCard({
    children,
    className = '',
    hover = true,
    accent
}: GlassCardProps) {
    const accentStyles = accent ? {
        primary: 'border-[rgba(40,160,240,0.3)]',
        secondary: 'border-[rgba(184,147,99,0.3)]',
        success: 'border-[rgba(0,255,163,0.3)]',
    }[accent] : '';

    return (
        <div
            className={`
        ${hover ? 'glass-card' : 'glass-card-static'}
        ${accentStyles}
        ${className}
      `}
        >
            {children}
        </div>
    );
}
