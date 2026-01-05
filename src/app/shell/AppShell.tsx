import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { PageLoader } from '../../components/atoms/PageLoader';

export function AppShell() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <h1 className="text-lg font-semibold">PANTOhealth — Stations Map</h1>
          <p className="text-sm text-muted-fg">Leaflet map + filterable station list</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
