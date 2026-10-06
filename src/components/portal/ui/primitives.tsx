import React, { useId, useState } from 'react';
import { Check, ChevronDown, type LucideIcon } from 'lucide-react';

/* Shared portal primitives. Marketing screens import from src/components/ui.tsx; portal-only
   pieces live here so neither side drifts into the other. Colour comes from @theme tokens. */

export type StatusTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger';

const TONE: Record<StatusTone, string> = {
  neutral: 'border-border-subtle bg-surface text-foreground-secondary',
  primary: 'border-border-subtle bg-primary-tint text-primary',
  success: 'border-border-subtle bg-primary-tint text-success',
  warning: 'border-border-subtle bg-primary-tint text-warning',
  danger: 'border-border-subtle bg-primary-tint text-danger',
};

export const StatusPill: React.FC<{
  children: React.ReactNode;
  tone?: StatusTone;
  icon?: LucideIcon;
}> = ({ children, tone = 'neutral', icon: Icon }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-input border px-2.5 py-1 text-xs font-medium ${TONE[tone]}`}
  >
    {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
    {children}
  </span>
);

export const PortalCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <section className={`rounded-card border border-border-subtle bg-surface shadow-card ${className}`}>
    {children}
  </section>
);

export const SectionHeading: React.FC<{
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  as?: 'h2' | 'h3';
}> = ({ title, subtitle, icon: Icon, action, as: Tag = 'h2' }) => (
  <div className="flex flex-wrap items-start justify-between gap-3">
    <div className="flex items-start gap-3">
      {Icon && (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-input bg-primary-tint">
          <Icon className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
        </span>
      )}
      <div>
        <Tag className="text-lg font-semibold text-ink">{title}</Tag>
        {subtitle && <p className="mt-1 text-sm text-foreground-secondary">{subtitle}</p>}
      </div>
    </div>
    {action}
  </div>
);

export const Chip: React.FC<{ children: React.ReactNode; muted?: boolean }> = ({ children, muted }) => (
  <span
    className={`inline-flex items-center rounded-input border border-border-subtle px-2.5 py-1 text-xs font-medium ${
      muted ? 'bg-surface text-foreground-muted' : 'bg-primary-tint text-ink'
    }`}
  >
    {children}
  </span>
);

/** Accessible switch. Label text is required so state is never colour-alone. */
export const Toggle: React.FC<{
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  describedBy?: string;
}> = ({ checked, onChange, label, describedBy }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    aria-describedby={describedBy}
    onClick={() => onChange(!checked)}
    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-input
      focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
  >
    <span
      className={`relative inline-flex h-6 w-11 items-center rounded-full border transition ${
        checked ? 'border-primary bg-primary' : 'border-border-strong bg-surface'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full transition ${
          checked ? 'translate-x-6 bg-surface' : 'translate-x-1 bg-border-strong'
        }`}
      />
    </span>
  </button>
);

export const ProgressBar: React.FC<{
  value: number;
  max?: number;
  label: string;
  tone?: 'primary' | 'warning' | 'danger';
}> = ({ value, max = 100, label, tone = 'primary' }) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === 'danger' ? 'bg-danger' : tone === 'warning' ? 'bg-warning' : 'bg-primary';
  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="h-2 w-full overflow-hidden rounded-full bg-primary-tint"
    >
      <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
    </div>
  );
};

export const MetricTile: React.FC<{
  label: string;
  value: string;
  icon?: LucideIcon;
  rows?: { label: string; value: string }[];
}> = ({ label, value, icon: Icon, rows = [] }) => (
  <PortalCard className="p-5">
    <div className="flex items-start justify-between gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">{label}</p>
      {Icon && <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />}
    </div>
    <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{value}</p>
    {rows.length > 0 && (
      <dl className="mt-4 space-y-1 border-t border-border-subtle pt-3">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 text-xs">
            <dt className="text-foreground-muted">{row.label}</dt>
            <dd className="font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    )}
  </PortalCard>
);

/** Disclosure used for optional detail panels; keeps tables from dominating a screen. */
export const Disclosure: React.FC<{
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ summary, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="rounded-card border border-border-subtle bg-surface">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink transition hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
      >
        {summary}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-foreground-muted transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={id} className="border-t border-border-subtle px-4 py-3">
          {children}
        </div>
      )}
    </div>
  );
};

export const CheckRow: React.FC<{ done: boolean; children: React.ReactNode }> = ({ done, children }) => (
  <li className="flex items-start gap-2.5 text-sm">
    <span
      className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border ${
        done ? 'border-success bg-success' : 'border-border-strong bg-surface'
      }`}
      aria-hidden="true"
    >
      {done && <Check className="h-3 w-3 text-white" />}
    </span>
    <span className={done ? 'text-foreground-secondary' : 'text-ink'}>{children}</span>
    <span className="sr-only">{done ? ' (complete)' : ' (outstanding)'}</span>
  </li>
);
