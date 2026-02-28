import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Layers, Sparkles, Target, Timer, TrendingUp, HelpCircle } from 'lucide-react';

const navItems = [
  { id: 'dashboard', path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'vault', path: '/vault', label: 'Vault', icon: Layers },
  { id: 'inject', path: '/inject', label: 'Inject', icon: Sparkles },
  { id: 'quiz', path: '/quiz', label: 'Quiz', icon: Target },
  { id: 'timer', path: '/timer', label: 'Timer', icon: Timer },
  { id: 'progress', path: '/progress', label: 'Progress', icon: TrendingUp },
  { id: 'faq', path: '/faq', label: 'FAQ', icon: HelpCircle },
] as const;

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-full md:w-28 border-t md:border-t-0 md:border-r border-border bg-bg-surface/90 backdrop-blur-xl flex md:flex-col items-center justify-around md:justify-start py-2 md:py-8 px-2 md:px-0 gap-2 md:gap-6 h-auto md:h-screen fixed bottom-0 md:sticky md:top-0 z-50 shrink-0 order-last md:order-first">
      <div className="hidden md:flex mb-6">
        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center border border-accent/20 shadow-[0_0_30px_var(--color-accent-glow)]">
          <Sparkles className="w-7 h-7 text-accent" />
        </div>
      </div>
      <nav className="flex md:flex-col gap-1 md:gap-4 w-full md:px-3 flex-1 overflow-x-auto md:overflow-y-auto hide-scrollbar justify-between md:justify-start">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1.5 p-2 md:p-3.5 rounded-xl transition-all duration-300 group relative flex-1 md:flex-none ${
                  isActive
                    ? 'text-accent bg-accent/10 shadow-[0_0_15px_var(--color-accent-glow)]'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-hover'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className={`text-[10px] md:text-xs font-medium tracking-wide transition-colors ${isActive ? 'text-accent font-bold' : ''}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-accent rounded-r-full shadow-[0_0_10px_var(--color-accent-glow)]" />
                  )}
                  {isActive && (
                    <span className="md:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-b-full shadow-[0_0_10px_var(--color-accent-glow)]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};
