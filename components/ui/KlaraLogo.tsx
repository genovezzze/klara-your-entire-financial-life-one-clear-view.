interface KlaraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: { icon: 28, font: 18, gap: 8 },
  md: { icon: 40, font: 26, gap: 10 },
  lg: { icon: 58, font: 38, gap: 14 },
  xl: { icon: 96, font: 62, gap: 20 },
};

export function KlaraLogo({ size = 'md', className }: KlaraLogoProps) {
  const { icon, font, gap } = sizes[size];
  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap }}
    >
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 62 62"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Right circle — mint fill, rendered first (behind) */}
        <circle cx="37" cy="24" r="20" fill="#00E5C0" stroke="currentColor" strokeWidth="3.8" />
        {/* Left circle — no fill, outline on top so it shows through the overlap */}
        <circle cx="24" cy="38" r="22" fill="none" stroke="currentColor" strokeWidth="3.8" />
      </svg>
      <span
        style={{
          fontSize: font,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: 'currentColor',
        }}
      >
        Klara
      </span>
    </div>
  );
}
