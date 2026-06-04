import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile navigation */}
      <MobileNav />

      {/* Main content */}
      <main className="flex-1 min-w-0 px-4 py-6 md:px-10 md:py-10 max-w-5xl">
        {children}
      </main>
    </div>
  );
}
