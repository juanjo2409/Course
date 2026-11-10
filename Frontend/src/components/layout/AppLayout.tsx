import React from 'react';
import { Header } from './Header';
import { NavigationRail, NavigationTab } from './NavigationRail';

export interface AppLayoutProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  activeTab,
  onSelectTab,
  children,
}) => {
  return (
    <div className="flex flex-col h-screen w-full bg-zinc-950 text-zinc-100 font-mono overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <NavigationRail activeTab={activeTab} onSelectTab={onSelectTab} />
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
