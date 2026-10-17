import React from 'react';

/* Shared visual primitives for the BlueprintIQ site.
   Direction: editorial, flat, one accent colour. See docs/brand-guidelines.md. */

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-button bg-primary px-6 py-3 text-sm font-medium ' +
  'text-white transition hover:bg-primary-hover active:scale-[0.98] focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 ' +
  'disabled:pointer-events-none cursor-pointer';

export const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-button border border-border-strong px-6 py-3 ' +
  'text-sm font-medium text-ink transition hover:border-primary hover:text-primary focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer';

export const btnGhost =
  'inline-flex items-center gap-1.5 text-sm font-medium text-primary transition hover:text-primary-hover ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer';

/* Flat card. Add `card-hover` alongside for interactive ones. */
export const card = 'rounded-card border border-border-subtle bg-surface';

export const Eyebrow: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <p className={`text-xs font-semibold uppercase tracking-[0.14em] text-primary ${className}`}>
    {children}
  </p>
);
