'use client';

import { logout } from '@/lib/actions/auth';
import { LogOut } from 'lucide-react';

export function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors w-full"
    >
      <LogOut className="w-4 h-4 shrink-0" />
      Log out
    </button>
  );
}
