import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown, CreditCard, Database, Gem, LayoutDashboard, LogOut, Menu,
  ReceiptText, ShieldCheck, UserCog, type LucideIcon,
} from 'lucide-react';
import type { TabType } from '../../types';
import { usePortalSession } from './session/PortalSession';

/* Portal chrome, taken from the left rail and top bar in `Output.png`.
   Every portal screen except the login gateway renders inside it. */

interface NavItem {
  id: TabType;
  label: string;
  icon: LucideIcon;
}

export const PORTAL_NAV: NavItem[] = [
  { id: 'portal-onboarding', label: 'Organisation Access', icon: UserCog },
  { id: 'portal-billing', label: 'Commercial & Billing', icon: CreditCard },
  { id: 'portal-invoicing', label: 'Billing & Invoicing', icon: ReceiptText },
  { id: 'portal-ingestion', label: 'Document Ingestion', icon: Database },
  { id: 'portal-governance', label: 'Sign-off & Governance', icon: ShieldCheck },
  { id: 'portal-output', label: 'Synthesis Output', icon: LayoutDashboard },
];

interface PortalShellProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  children: React.ReactNode;
}

export const PortalShell: React.FC<PortalShellProps> = ({ currentTab, onSelectTab, children }) => {
  const { user, org, signOut } = usePortalSession();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onDocClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onEsc);
    };
  }, [menuOpen]);

  const go = (tab: TabType) => {
    onSelectTab(tab);
    setDrawerOpen(false);
  };

  const rail = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-input bg-primary">
          <Gem className="h-4 w-4 text-white" aria-hidden="true" />
        </span>
        <span className="text-base font-semibold tracking-tight text-ink">
          Blueprint<span className="text-primary">IQ</span>
        </span>
      </div>

      <p className="px-5 pb-2 pt-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">
        Architecture Engine
      </p>

      <nav className="flex-1 space-y-1 px-3" aria-label="Portal sections">
        {PORTAL_NAV.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => go(item.id)}
              aria-current={active ? 'page' : undefined}
              className={`flex w-full items-center gap-3 rounded-input px-3 py-2.5 text-left text-sm transition
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
                  active
                    ? 'bg-primary font-semibold text-white'
                    : 'font-medium text-foreground-secondary hover:bg-primary-tint hover:text-ink'
                }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="m-3 rounded-card border border-border-subtle bg-primary-tint p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
          Environment
        </p>
        <p className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
          Global Prod-AI
        </p>
        {user && (
          <div className="mt-3 flex items-center gap-2 border-t border-border-subtle pt-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
              {user.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-ink">{user.name}</span>
              <span className="block truncate text-xs text-foreground-muted">{user.title}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Rail — static at md and up */}
      <aside className="hidden w-64 shrink-0 border-r border-border-subtle bg-surface md:block">
        {rail}
      </aside>

      {/* Rail — drawer below md */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-ink/40 cursor-pointer"
          />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-border-subtle bg-surface shadow-card-hover">
            {rail}
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-border-subtle bg-surface px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation"
              id="portal-drawer-btn"
              className="rounded-input p-2 text-foreground-secondary transition hover:bg-primary-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
            {org && (
              <>
                <span className="truncate rounded-input border border-border-subtle bg-primary-tint px-3 py-1.5 text-xs font-semibold text-ink">
                  {org.name}
                </span>
                <span className="hidden rounded-input border border-border-subtle px-3 py-1.5 text-xs font-medium text-foreground-muted sm:inline">
                  {org.region}
                </span>
              </>
            )}
          </div>

          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              id="portal-user-menu-btn"
              onClick={() => setMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-2 rounded-input px-2 py-1.5 transition hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {user ? user.initials : '--'}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium text-ink">{user?.name}</span>
                <span className="block text-xs text-foreground-muted">{user?.role}</span>
              </span>
              <ChevronDown className="h-4 w-4 text-foreground-muted" aria-hidden="true" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 z-50 mt-2 w-60 rounded-card border border-border-subtle bg-surface p-2 shadow-card-hover"
              >
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-ink">{user?.name}</p>
                  <p className="text-xs text-foreground-muted">{user?.email}</p>
                  <p className="mt-1 inline-block rounded-input bg-primary-tint px-2 py-0.5 text-xs font-medium text-primary">
                    {user?.role}
                  </p>
                </div>
                <button
                  type="button"
                  role="menuitem"
                  id="portal-sign-out-btn"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="mt-1 flex w-full items-center gap-2 rounded-input px-3 py-2.5 text-left text-sm font-medium text-foreground-secondary transition hover:bg-primary-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8" id="portal-content">
          {children}
        </main>
      </div>
    </div>
  );
};
