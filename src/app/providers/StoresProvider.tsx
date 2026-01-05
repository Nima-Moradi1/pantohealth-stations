import { createContext, useContext } from 'react';
import type { RootStore } from '../../stores/rootStore';
import { rootStore } from '../../stores/rootStore';

const StoresContext = createContext<RootStore | null>(null);

export function StoresProvider({ children }: { children: React.ReactNode }) {
  return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>;
}

export function useRootStore(): RootStore {
  const ctx = useContext(StoresContext);
  if (!ctx) throw new Error('useRootStore must be used within StoresProvider');
  return ctx;
}
