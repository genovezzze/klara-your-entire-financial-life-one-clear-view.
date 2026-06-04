'use client';

import { useRef, useState, useEffect } from 'react';
import { Landmark, Home, PiggyBank, TrendingUp, Baby, BarChart3, ArrowUpRight } from 'lucide-react';

const features = [
  { icon: Landmark,   title: 'Pension overview',   desc: '2nd & 3rd pillar balance, provider, strategy.', accent: false },
  { icon: BarChart3,  title: 'Net worth snapshot', desc: 'Assets minus liabilities — one clear number.',   accent: false },
  { icon: TrendingUp, title: 'Strategy simulator', desc: 'Conservative, Balanced or Growth to age 65.',    accent: true  },
  { icon: Home,       title: 'Mortgage tracker',   desc: 'Balance and refinancing simulation.',            accent: false },
  { icon: PiggyBank,  title: 'Investments',        desc: 'Portfolio in context of your full picture.',     accent: false },
  { icon: Baby,       title: 'Child savings',      desc: 'Long-term savings goals for your family.',       accent: false },
];

const floatConfigs = [
  { duration: 4.2, delay: 0,   amplitude: 8  },
  { duration: 5.1, delay: 0.6, amplitude: 10 },
  { duration: 3.8, delay: 0.3, amplitude: 7  },
  { duration: 4.7, delay: 0.9, amplitude: 9  },
  { duration: 5.5, delay: 0.2, amplitude: 11 },
  { duration: 4.0, delay: 0.7, amplitude: 8  },
];

function TiltCard({ icon: Icon, title, desc, accent, floatConfig, index }: {
  icon: React.ElementType; title: string; desc: string; accent: boolean;
  floatConfig: { duration: number; delay: number; amplitude: number }; index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 120);
    return () => clearTimeout(t);
  }, [index]);

  function onMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    const y = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    setTilt({ x: x * -8, y: y * 8 });
  }

  function onMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }

  const floatStyle = {
    animation: `floatCard${index} ${floatConfig.duration}s ease-in-out ${floatConfig.delay}s infinite`,
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer"
      style={{
        ...floatStyle,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'scale(1.04)' : 'scale(1)'}`
          : 'translateY(32px) scale(0.95)',
        transition: hovered
          ? 'transform 0.12s ease-out, opacity 0.6s ease, box-shadow 0.2s'
          : 'transform 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, box-shadow 0.3s',
        boxShadow: hovered
          ? accent
            ? '0 20px 60px rgba(0,196,167,0.35), 0 4px 16px rgba(0,0,0,0.1)'
            : '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        borderRadius: '24px',
        willChange: 'transform',
      }}
    >
      <div className={`p-6 flex flex-col gap-4 h-full rounded-3xl border ${
        accent ? 'bg-primary border-transparent' : 'bg-secondary border-border'
      }`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent ? 'bg-white/20' : 'bg-white'}`}>
          <Icon className={`w-5 h-5 ${accent ? 'text-white' : 'text-primary'}`} />
        </div>
        <div className="flex-1">
          <p className={`font-bold mb-1 ${accent ? 'text-white' : 'text-foreground'}`}>{title}</p>
          <p className={`text-sm leading-relaxed ${accent ? 'text-white/70' : 'text-muted-foreground'}`}>{desc}</p>
        </div>
        <ArrowUpRight className={`w-4 h-4 transition-transform duration-200 ${
          accent ? 'text-white/60' : 'text-muted-foreground'
        } ${hovered ? 'translate-x-1 -translate-y-1' : ''}`} />
      </div>
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <>
      <style>{`
        ${floatConfigs.map((c, i) => `
          @keyframes floatCard${i} {
            0%,100% { transform: translateY(0px) rotate(${i % 2 === 0 ? '0' : '0'}deg); }
            33%      { transform: translateY(-${c.amplitude}px) rotate(${i % 2 === 0 ? '0.3' : '-0.3'}deg); }
            66%      { transform: translateY(-${c.amplitude * 0.5}px) rotate(${i % 2 === 0 ? '-0.2' : '0.2'}deg); }
          }
        `).join('')}
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <TiltCard key={f.title} {...f} floatConfig={floatConfigs[i]} index={i} />
        ))}
      </div>
    </>
  );
}
