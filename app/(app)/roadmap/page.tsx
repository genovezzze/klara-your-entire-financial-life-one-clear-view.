import { CheckCircle, Clock, Sparkles } from 'lucide-react';
import { getSession } from '@/lib/session';
import { Header } from '@/components/layout/Header';

const sections = [
  {
    icon: CheckCircle,
    iconColor: 'text-[color:var(--positive)]',
    bgColor: 'bg-green-50',
    label: 'Current prototype',
    items: [
      'Real user registration & login (email + password)',
      'Financial profile stored in Neon PostgreSQL',
      'Strategy simulation with saved results',
      'Demo personas (Marta, Andris, Ingrid)',
      'External redirect to official services (latvija.lv)',
    ],
  },
  {
    icon: Clock,
    iconColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
    label: 'Next MVP',
    items: [
      'Real Smart-ID / eID login',
      'Email verification & password reset',
      'Saved simulation history page',
      'Lead capture and waitlist',
      'Admin dashboard for demos',
    ],
  },
  {
    icon: Sparkles,
    iconColor: 'text-primary',
    bgColor: 'bg-secondary',
    label: 'Future version',
    items: [
      'VSAA / Latvija.lv / provider integrations',
      'Real pension account data via APIs',
      'Partner-based plan switching',
      'GDPR and compliance audit',
      'Open Banking integrations',
      'Real pension and investment provider partnerships',
    ],
  },
];

export default async function RoadmapPage() {
  const session = await getSession();
  const userName = session?.name ?? 'Guest';

  return (
    <div>
      <Header
        userName={userName}
        title="Integration roadmap"
        subtitle="From prototype to production — what's built and what's next"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {sections.map(({ icon: Icon, iconColor, bgColor, label, items }) => (
          <div key={label} className="bg-white rounded-2xl border border-border p-5">
            <div className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
              <Icon className={`w-4.5 h-4.5 ${iconColor}`} />
            </div>
            <p className="font-bold text-foreground text-sm mb-3">{label}</p>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                  <span className="text-primary font-bold shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-border p-5 mb-5">
        <p className="font-semibold text-foreground text-sm mb-3">Current tech stack</p>
        <div className="flex flex-wrap gap-2">
          {['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Prisma 7', 'Neon PostgreSQL', 'jose JWT', 'bcryptjs', 'Recharts', 'Vercel'].map((t) => (
            <span key={t} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full border border-border">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border p-5">
        <p className="font-semibold text-foreground text-sm mb-3">What is mock / demo in this prototype</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
          {[
            ['Smart-ID login', 'No real API — creates demo user in Neon'],
            ['Pension data', 'Manually entered by user, stored in DB'],
            ['Provider connections', 'Names only, no API connection'],
            ['Strategy change', 'Opens latvija.lv — no real action taken'],
            ['Investment portfolio', 'From user profile, no broker connected'],
            ['Mortgage simulations', 'Formula-based, not real bank data'],
          ].map(([item, note]) => (
            <div key={item} className="flex gap-2">
              <span className="text-amber-500 font-bold shrink-0">~</span>
              <span><strong className="text-foreground">{item}</strong> — {note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
