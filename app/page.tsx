import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Landmark, Home, PiggyBank, TrendingUp, Baby,
  BarChart3, ArrowRight, ArrowUpRight,
} from 'lucide-react';
import { KlaraLogo } from '@/components/ui/KlaraLogo';
import { WaitlistForm } from '@/components/waitlist/WaitlistForm';
import { AnimatedStats } from '@/components/landing/AnimatedStats';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';

const features = [
  { icon: Landmark,   title: 'Pension overview',   desc: '2nd & 3rd pillar balance, provider, strategy.' },
  { icon: BarChart3,  title: 'Net worth snapshot', desc: 'Assets minus liabilities — one clear number.' },
  { icon: TrendingUp, title: 'Strategy simulator', desc: 'Conservative, Balanced or Growth to age 65.' },
  { icon: Home,       title: 'Mortgage tracker',   desc: 'Balance and refinancing simulation.' },
  { icon: PiggyBank,  title: 'Investments',        desc: 'Portfolio in context of your full picture.' },
  { icon: Baby,       title: 'Child savings',      desc: 'Long-term savings goals for your family.' },
];


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* Nav */}
      <header className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <div className="shrink-0">
            <KlaraLogo size="sm" />
          </div>

          {/* Center links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: '#features', label: 'Features', icon: BarChart3 },
              { href: '/roadmap', label: 'Roadmap', icon: TrendingUp },
              { href: '#waitlist', label: 'Early access', icon: Baby },
            ].map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/login">
              <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
                Sign in
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-cta h-9 px-5 text-sm flex items-center gap-2">
                Get started <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — full editorial */}
      <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 overflow-hidden">

        {/* Animated background */}
        <div className="hero-bg absolute inset-0 -z-20 rounded-3xl" />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,196,167,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />

        {/* Soft blobs */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="animate-blob1 absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px]" />
          <div className="animate-blob2 absolute top-20 right-1/4 w-80 h-80 rounded-full bg-[oklch(0.17_0.07_255)]/6 blur-[120px]" />
          <div className="animate-blob3 absolute bottom-0 left-1/2 w-72 h-72 rounded-full bg-primary/8 blur-[80px]" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">

          {/* Left: headline + CTA */}
          <div className="max-w-2xl">
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold text-foreground leading-[0.92] tracking-tight mb-8">
              Your pension.<br />
              Your money.<br />
              <span className="text-primary">Clearly.</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mb-10">
              Klara is not a bank. It&apos;s a financial aggregator that brings
              your pensions, investments and net worth into one clear dashboard.
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-16">
              <Link href="/register">
                <button className="h-14 px-10 bg-foreground text-background rounded-full text-base font-bold flex items-center gap-2 hover:opacity-85 transition-opacity">
                  Create account <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">
                Try demo mode
              </Link>
            </div>

            {/* Stats row */}
            <AnimatedStats />
          </div>

          {/* Right: brand visual */}
          <div className="hidden lg:flex flex-col items-end gap-4 pt-4 min-w-[340px]">

            {/* Top stat card */}
            <div className="animate-float1 bg-white border border-border rounded-2xl px-6 py-4 shadow-sm self-start ml-8">
              <p className="text-xs text-muted-foreground mb-1">Projected pension at 65</p>
              <p className="text-3xl font-bold text-foreground">+€84,000</p>
              <p className="text-xs text-primary mt-1">Growth strategy · 7%/yr</p>
            </div>

            {/* Brand circles visual */}
            <div className="relative w-80 h-80">
              {/* Navy ring */}
              <div className="animate-float2 absolute top-8 left-0 w-60 h-60 rounded-full border-[16px] border-[oklch(0.17_0.07_255)]" />
              {/* Teal filled circle */}
              <div className="animate-float1 absolute top-0 right-0 w-60 h-60 rounded-full bg-primary flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-xs font-medium opacity-70 uppercase tracking-wider mb-1">Net worth</p>
                  <p className="text-3xl font-bold">€47k</p>
                </div>
              </div>
              {/* Floating mini cards */}
              <div className="animate-float3 absolute bottom-0 left-0 bg-white border border-border rounded-2xl px-4 py-3 shadow-md">
                <p className="text-xs text-muted-foreground">2nd Pillar</p>
                <p className="font-bold text-foreground">€24,000</p>
              </div>
              <div className="animate-float2 absolute bottom-8 right-0 bg-[oklch(0.17_0.07_255)] rounded-2xl px-4 py-3 shadow-md">
                <p className="text-xs text-white/50">Investments</p>
                <p className="font-bold text-white">€18,000</p>
              </div>
            </div>

            {/* Bottom: demo avatars */}
            <div className="flex items-center gap-3 self-end mr-2">
              <div className="flex -space-x-2">
                {[
                  { l: 'M', bg: 'bg-primary' },
                  { l: 'A', bg: 'bg-[oklch(0.17_0.07_255)]' },
                  { l: 'I', bg: 'bg-primary/60' },
                ].map(({ l, bg }, i) => (
                  <div key={i} className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${bg}`}>
                    {l}
                  </div>
                ))}
              </div>
              <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Try 3 demo profiles →
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Marquee ticker */}
      <div className="bg-[oklch(0.17_0.07_255)] py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, copy) => (
            <div key={copy} className="flex gap-10 items-center px-10 shrink-0">
              {['Pensions', '·', 'Net Worth', '·', 'Investments', '·', 'Mortgage', '·', 'Child Savings', '·', 'Pension Simulator', '·', 'Strategy Comparison', '·', 'Neon Database', '·', 'Latvia', '·'].map((t, i) => (
                <span key={i} className={`text-sm font-medium ${t === '·' ? 'text-white/20' : 'text-white/35'}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <h2 className="text-5xl font-bold text-foreground leading-tight max-w-md">
            One dashboard.<br />Full picture.
          </h2>
          <p className="text-muted-foreground max-w-xs leading-relaxed">
            Manually enter your data once. Klara stores it securely and builds
            your financial overview instantly.
          </p>
        </div>

        <FeaturesGrid />
      </section>

      {/* Waitlist */}
      <section className="bg-[oklch(0.17_0.07_255)] relative overflow-hidden min-h-[600px] flex items-center">
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        {/* Pulsing rings */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-primary/30 animate-ping-slow absolute -translate-x-1/2 -translate-y-1/2" />
          <div className="w-[350px] h-[350px] rounded-full border border-primary/20 animate-ping-slow2 absolute -translate-x-1/2 -translate-y-1/2" />
          <div className="w-[200px] h-[200px] rounded-full border border-primary/15 absolute -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Glow center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/15 rounded-full blur-[80px] pointer-events-none" />

        {/* Floating badges */}
        <div className="animate-float1 absolute top-16 left-12 hidden lg:block">
          <div className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-white">
            <p className="text-xs text-white/50 mb-0.5">2nd Pillar</p>
            <p className="font-bold">€24,000</p>
          </div>
        </div>
        <div className="animate-float2 absolute top-24 right-16 hidden lg:block">
          <div className="bg-primary/20 border border-primary/30 backdrop-blur-sm rounded-2xl px-4 py-3 text-white">
            <p className="text-xs text-white/60 mb-0.5">Projected at 65</p>
            <p className="font-bold text-primary">+€84k</p>
          </div>
        </div>
        <div className="animate-float3 absolute bottom-24 right-24 hidden lg:block">
          <div className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-white">
            <p className="text-xs text-white/50 mb-0.5">Net Worth</p>
            <p className="font-bold">€47,500</p>
          </div>
        </div>
        <div className="animate-float2 absolute bottom-16 left-20 hidden lg:block">
          <div className="bg-white/8 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 text-white">
            <p className="text-xs text-white/50 mb-0.5">Strategy</p>
            <p className="font-bold text-primary">Growth · 7%</p>
          </div>
        </div>

        {/* Content */}
        <div className="relative w-full max-w-xl mx-auto px-6 py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 text-primary text-xs px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Early access
          </div>

          <h2 className="animate-text-reveal text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Be the first<br />
            to see clearly.
          </h2>

          <p className="text-white/40 text-base mb-10 leading-relaxed">
            Join the waitlist. Get notified when Klara launches
            with Smart-ID and real bank integrations.
          </p>

          <div className="flex justify-center mb-6">
            <WaitlistForm />
          </div>

          {/* Social proof dots */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-1.5">
              {['bg-primary', 'bg-white/40', 'bg-primary/60', 'bg-white/30', 'bg-primary/80'].map((bg, i) => (
                <div key={i} className={`w-6 h-6 rounded-full border-2 border-[oklch(0.17_0.07_255)] ${bg}`} />
              ))}
            </div>
            <p className="text-white/30 text-xs">No spam · Unsubscribe anytime</p>
          </div>
        </div>
      </section>


    </div>
  );
}
