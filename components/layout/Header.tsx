'use client';

interface HeaderProps {
  userName: string;
  title: string;
  subtitle?: string;
}

export function Header({ userName, title, subtitle }: HeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-sm border border-border">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-sm">
          {userName.charAt(0).toUpperCase()}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-foreground leading-none">{userName}</p>
        </div>
      </div>
    </div>
  );
}
