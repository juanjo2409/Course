import React from 'react';
import { Terminal, BookOpen, ShoppingBag, User, LayoutDashboard } from 'lucide-react';

export type NavigationTab = 'dashboard' | 'lesson' | 'catalog' | 'store' | 'profile';

export interface NavigationRailProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.FC<{ size?: number; className?: string }> }[] = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'lesson', label: 'RUNNER', icon: Terminal },
    { id: 'catalog', label: 'CATALOG', icon: BookOpen },
    { id: 'store', label: 'STORE', icon: ShoppingBag },
    { id: 'profile', label: 'PROFILE', icon: User },
  ];

  return (
    <aside className="w-16 md:w-56 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between font-mono rounded-none select-none">
      <div className="py-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-wider font-semibold border-l-2 transition-colors cursor-pointer rounded-none ${
                isActive
                  ? 'border-emerald-500 bg-zinc-900 text-emerald-400'
                  : 'border-transparent text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-200'
              }`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 border-t border-zinc-900 text-[10px] text-zinc-600 hidden md:block">
        <div>STATUS: ONLINE</div>
        <div>MEM_ALLOC: NORMAL</div>
      </div>
    </aside>
  );
};
