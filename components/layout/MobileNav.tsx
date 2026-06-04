'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Landmark, Home, PiggyBank,
  TrendingUp, Baby, Map, UserCog, Menu, X, Scale,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoutButton } from './LogoutButton';
import { KlaraLogo } from '@/components/ui/KlaraLogo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pensions', label: 'Pensions (2nd Pillar)', icon: Landmark, exclude: ['/pensions/compare'] },
  { href: '/pensions/compare', label: 'Compare Plans', icon: Scale, exclude: [] },
  { href: '/mortgages', label: 'Mortgages', icon: Home },
  { href: '/pillar3', label: '3rd & 4th Pillar', icon: PiggyBank },
  { href: '/investing', label: 'Investing', icon: TrendingUp },
  { href: '/child-funds', label: 'Child Funds', icon: Baby },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-border flex items-center justify-between px-4 h-14">
        <KlaraLogo size="sm" />
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </header>

      {/* Spacer so content doesn't go under fixed header */}
      <div className="md:hidden h-14" />

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={cn(
        'md:hidden fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <KlaraLogo size="sm" />
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon, exclude = [] }) => {
              const active = (pathname === href || pathname.startsWith(href + '/'))
                && !exclude.some((ex: string) => pathname.startsWith(ex));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors',
                      active
                        ? 'bg-primary text-white'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom actions */}
        <div className="px-3 py-4 border-t border-border space-y-0.5">
          <Link
            href="/profile/edit"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <UserCog className="w-4 h-4 shrink-0" />
            Edit profile
          </Link>
          <LogoutButton />
        </div>
      </div>
    </>
  );
}
