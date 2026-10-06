import React, { useMemo, useState } from 'react';
import {
  AlertCircle, Check, ClipboardCheck, Copy, FileSignature, Hourglass, Mail, Rocket, Search,
  ShieldCheck, Users,
} from 'lucide-react';
import { btnPrimary, btnSecondary } from '../../ui';
import { Chip, PortalCard, ProgressBar, SectionHeading, StatusPill } from '../ui/primitives';
import {
  AUDIT_ENTRIES, AUDIT_LOG, CUTOVER_BANNER, CUTOVER_BLOCKER, DELEGATION, FRAMEWORK_COMPLIANCE,
  GOVERNANCE_HEADER, GOVERNANCE_TILES, QUORUM_POLICY, SIGNATORIES, SIGNATORY_MATRIX,
} from '../data/governance';

/* Sign-off & governance — built from `stackholder approval givernance.png`. */

const QUORUM_ICON = { success: Check, warning: Hourglass, danger: AlertCircle } as const;

export const GovernanceScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [nudged, setNudged] = useState(false);
  const [copied, setCopied] = useState(false);

  const roster = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SIGNATORIES;
    return SIGNATORIES.filter(
      (s) => s.name.toLowerCase().includes(q) || s.roleBadge.toLowerCase().includes(q) || s.title.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-ink">{GOVERNANCE_HEADER.title}</h1>
          <p className="mt-2 text-sm text-foreground-secondary">{GOVERNANCE_HEADER.intro}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>{GOVERNANCE_HEADER.actions[0]}</button>
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>
            <Mail className="h-4 w-4" aria-hidden="true" />
            {GOVERNANCE_HEADER.actions[1]}
          </button>
          <button type="button" className={`${btnPrimary} px-4 py-2.5`}>{GOVERNANCE_HEADER.actions[2]}</button>
        </div>
      </div>

      {/* Status tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {GOVERNANCE_TILES.map((t) => (
          <PortalCard key={t.label} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">{t.label}</p>
            <p className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-ink">{t.value}</span>
              <span className="text-sm text-foreground-secondary">{t.suffix}</span>
            </p>
            {typeof t.percent === 'number' ? (
              <div className="mt-4">
                <p className="text-xs font-medium text-primary">{t.note}</p>
                <div className="mt-2"><ProgressBar value={t.percent} label="Approvals completed" /></div>
              </div>
            ) : (
              <p className="mt-4 flex items-center gap-2 text-xs text-foreground-secondary">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                {t.note}
              </p>
            )}
          </PortalCard>
        ))}

        {/* Highlighted blocker tile */}
        <PortalCard className="border-danger bg-primary-tint p-5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-danger">
            <span className="h-2 w-2 rounded-full bg-danger" aria-hidden="true" />
            {CUTOVER_BLOCKER.label}
          </p>
          <p className="mt-3 text-base font-bold text-ink">{CUTOVER_BLOCKER.title}</p>
          <p className="mt-1 text-xs text-foreground-secondary">{CUTOVER_BLOCKER.detail}</p>
          <p className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-foreground-muted">{CUTOVER_BLOCKER.sla}</span>
            <span className="font-semibold text-danger">{CUTOVER_BLOCKER.countdown}</span>
          </p>
        </PortalCard>
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-3">
        {/* Roster */}
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <PortalCard className="p-6">
            <SectionHeading
              title={SIGNATORY_MATRIX.title}
              subtitle={SIGNATORY_MATRIX.subtitle}
              action={
                <div className="relative min-w-[14rem]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" aria-hidden="true" />
                  <label htmlFor="gov-filter" className="sr-only">Filter role or name</label>
                  <input
                    id="gov-filter"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={SIGNATORY_MATRIX.filterPlaceholder}
                    className="w-full rounded-input border border-border-strong bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-foreground-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                </div>
              }
            />

            <ul className="mt-6 space-y-3">
              {roster.map((s) => (
                <li
                  key={s.id}
                  className={`rounded-card border p-4 ${
                    s.blocking ? 'border-danger border-l-4 bg-primary-tint' : 'border-border-subtle bg-surface'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                        {s.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-semibold text-ink">{s.name}</span>
                          <Chip muted>{s.roleBadge}</Chip>
                          <StatusPill tone={s.statusTone}>{s.status}</StatusPill>
                        </p>
                        <p className="mt-1 text-sm text-foreground-secondary">
                          {s.title} • {s.email}
                        </p>
                        <p className="mt-1 text-xs text-foreground-muted">
                          {s.scope}{s.meta ? ` • ${s.meta}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 flex-wrap gap-2">
                      {s.secondaryAction && (
                        <button type="button" className={`${btnSecondary} px-4 py-2`}>{s.secondaryAction}</button>
                      )}
                      <button
                        type="button"
                        className={s.blocking ? `${btnPrimary} px-4 py-2` : `${btnSecondary} px-4 py-2`}
                      >
                        {s.action}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
              {roster.length === 0 && (
                <li className="py-6 text-center text-sm text-foreground-secondary">
                  No signatory matches that filter.
                </li>
              )}
            </ul>
          </PortalCard>

          {/* Delegation */}
          <PortalCard className="p-6">
            <SectionHeading
              icon={Users}
              title={DELEGATION.title}
              subtitle={DELEGATION.subtitle}
              action={<button type="button" className={`${btnSecondary} px-4 py-2`}>{DELEGATION.action}</button>}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {DELEGATION.proxies.map((p) => (
                <div key={p.initials} className="flex min-w-0 items-center justify-between gap-3 rounded-card bg-primary-tint p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-semibold text-primary">
                      {p.initials}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-ink">{p.name}</span>
                      <span className="block truncate text-xs text-foreground-secondary">{p.detail}</span>
                    </span>
                  </div>
                  <span className="shrink-0 text-xs font-medium text-primary">{p.state}</span>
                </div>
              ))}
            </div>
          </PortalCard>
        </div>

        {/* Right rail */}
        <div className="min-w-0 space-y-6">
          <PortalCard className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                {QUORUM_POLICY.title}
              </h2>
              <Chip>{QUORUM_POLICY.badge}</Chip>
            </div>
            <p className="mt-3 text-sm text-foreground-secondary">{QUORUM_POLICY.body}</p>
            <ul className="mt-4 space-y-2">
              {QUORUM_POLICY.rows.map((r) => {
                const Icon = QUORUM_ICON[r.tone];
                return (
                  <li
                    key={r.name}
                    className={`flex items-center justify-between gap-3 rounded-input px-3 py-2.5 text-sm ${
                      r.tone === 'danger' ? 'bg-primary-tint' : 'bg-primary-tint'
                    }`}
                  >
                    <span className="text-ink">{r.name}</span>
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium ${
                        r.tone === 'success' ? 'text-success' : r.tone === 'warning' ? 'text-warning' : 'text-danger'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {r.state}
                    </span>
                  </li>
                );
              })}
            </ul>
          </PortalCard>

          <PortalCard className="p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
              <ClipboardCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              {FRAMEWORK_COMPLIANCE.title}
            </h2>
            <ul className="mt-4 space-y-3">
              {FRAMEWORK_COMPLIANCE.rows.map((r) => (
                <li key={r.name} className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{r.name}</span>
                    <span className="block text-xs text-foreground-secondary">{r.detail}</span>
                  </span>
                  <StatusPill tone={r.tone}>{r.state}</StatusPill>
                </li>
              ))}
            </ul>
          </PortalCard>

          <PortalCard className="p-5">
            <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
              <FileSignature className="h-4 w-4 text-primary" aria-hidden="true" />
              {AUDIT_LOG.title}
            </h2>
            <p className="mt-1 text-sm text-foreground-secondary">{AUDIT_LOG.subtitle}</p>
            <ul className="mt-4 space-y-3">
              {AUDIT_ENTRIES.map((e) => (
                <li key={e.sha} className="rounded-card bg-primary-tint p-3">
                  <p className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink">{e.who}</span>
                    <span className="text-xs text-foreground-muted">{e.when}</span>
                  </p>
                  <p className="mt-1 text-xs text-foreground-secondary">{e.what}</p>
                  <p className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-foreground-muted">
                    <span>{e.ip}</span>
                    <span className="text-primary">{e.sha}</span>
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-4 rounded-card bg-ink-dark p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-on-dark">
                  {AUDIT_LOG.masterLabel}
                </p>
                <button
                  type="button"
                  onClick={() => setCopied(true)}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-input px-3 py-1 text-xs font-medium text-foreground-on-dark transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                >
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  {copied ? 'Copied' : AUDIT_LOG.copyLabel}
                </button>
              </div>
              <p className="mt-2 break-all font-mono text-xs text-foreground-on-dark">{AUDIT_LOG.masterHash}</p>
              <span aria-live="polite" className="sr-only">{copied ? 'Master ledger hash copied' : ''}</span>
            </div>
          </PortalCard>
        </div>
      </div>

      {/* Blocking banner */}
      <PortalCard className="mt-6 bg-primary-tint p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-input bg-primary">
              <Rocket className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base font-semibold text-ink">{CUTOVER_BANNER.title}</p>
              <p className="mt-1 max-w-2xl text-sm text-foreground-secondary">{CUTOVER_BANNER.detail}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" className={`${btnSecondary} px-4 py-2.5`}>{CUTOVER_BANNER.secondary}</button>
            <button type="button" onClick={() => setNudged(true)} className={`${btnPrimary} px-4 py-2.5`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              {nudged ? 'Reminder sent' : CUTOVER_BANNER.primary}
            </button>
          </div>
        </div>
        <p aria-live="polite" className="mt-3 text-xs text-foreground-muted">
          {nudged ? 'Static demo: no message was actually dispatched.' : ''}
        </p>
      </PortalCard>
    </div>
  );
};
