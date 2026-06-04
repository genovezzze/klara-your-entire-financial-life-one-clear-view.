import { Database } from 'lucide-react';

export function DataSourceLabel() {
  return (
    <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full mb-6">
      <Database className="w-3 h-3" />
      Data source: Manually entered by user and stored in Neon prototype database.
    </div>
  );
}
