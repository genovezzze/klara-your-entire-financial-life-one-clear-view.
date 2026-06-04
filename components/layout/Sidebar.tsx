'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Landmark,
  Home,
  PiggyBank,
  TrendingUp,
  Baby,
  Map,
  UserCog,
  Scale,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoutButton } from './LogoutButton';
import { KlaraLogo } from '@/components/ui/KlaraLogo';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pensions', label: 'Pensions (2nd Pillar)', icon: Landmark, exact: false, exclude: ['/pensions/compare'] },
  { href: '/pensions/compare', label: 'Compare Plans', icon: Scale, exact: false, exclude: [] },
  { href: '/mortgages', label: 'Mortgages', icon: Home },
  { href: '/pillar3', label: '3rd & 4th Pillar', icon: PiggyBank },
  { href: '/investing', label: 'Investing', icon: TrendingUp },
  { href: '/child-funds', label: 'Child Funds', icon: Baby },
  { href: '/roadmap', label: 'Roadmap', icon: Map },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col shrink-0 bg-white border-r border-border h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-border">
        <Link href="/">
          <KlaraLogo size="sm" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 pb-4">
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon, exclude = [] }) => {
            const active = (pathname === href || pathname.startsWith(href + '/'))
              && !exclude.some(ex => pathname.startsWith(ex));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
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
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
            pathname.startsWith('/profile')
              ? 'bg-primary text-white'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
        >
          <UserCog className="w-4 h-4 shrink-0" />
          Edit profile
        </Link>
        <LogoutButton />
      </div>
    </aside>
  );
}
