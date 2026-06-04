interface KlaraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: { width: 140, height: 50 },
  md: { width: 200, height: 72 },
  lg: { width: 300, height: 108 },
  xl: { width: 500, height: 180 },
};

export function KlaraLogo({ size = 'md', className }: KlaraLogoProps) {
  const { width, height } = sizes[size];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="Klara"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: 'contain', objectPosition: 'left center' }}
    />
  );
}
