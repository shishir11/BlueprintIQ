import React, { useMemo, useState } from 'react';
import {
  ArrowUpDown, Building2, CreditCard, Download, Eye, Receipt, Search, SlidersHorizontal, UserPlus,
} from 'lucide-react';
import { btnPrimary, btnSecondary } from '../../ui';
import { Chip, PortalCard, ProgressBar, SectionHeading, StatusPill, Toggle } from '../ui/primitives';
import { Donut } from '../ui/charts';
import {
  ALERT_PREFERENCES, BILLING_REPRESENTATIVES, COST_BREAKDOWN, ENTITLEMENT, INVOICES,
  INVOICE_FILTERS, INVOICE_FOOTER, INVOICING_FOOTNOTES, INVOICING_HEADER, KPI_TILES,
  LEGAL_ENTITY, SETTLEMENT_CHANNELS, USAGE_FOOTNOTES, USAGE_METERS, type Invoice,
} from '../data/invoicing';

/* Billing & invoicing dashboard — built from `billing invoicing.png`.
   The invoice table filters, sorts and paginates locally; nothing calls out. */

type SortKey = 'id' | 'issued' | 'amount';
const PAGE_SIZE = 3;

const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const InvoicingScreen: React.FC = () => {
  const [filter, setFilter] = useState(INVOICE_FILTERS[0]);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('issued');
  const [asc, setAsc] = useState(false);
  const [page, setPage] = useState(0);
  const [alerts, setAlerts] = useState(ALERT_PREFERENCES);

  const rows = useMemo(() => {
    let list: Invoice[] = [...INVOICES];
    if (filter.startsWith('Paid')) list = list.filter((i) => i.status === 'Paid & Settled');
    if (filter.startsWith('Pending')) list = list.filter((i) => i.status === 'Under Review (AP)');
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((i) => i.id.toLowerCase().includes(q) || i.instrument.toLowerCase().includes(q));
    list.sort((a, b) => {
      const cmp = sortKey === 'amount' ? a.amount - b.amount : String(a[sortKey]).localeCompare(String(b[sortKey]));
      return asc ? cmp : -cmp;
    });
    return list;
  }, [filter, query, sortKey, asc]);

  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = rows.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const sortBy = (key: SortKey) => {
    if (key === sortKey) setAsc((v) => !v);
    else { setSortKey(key); setAsc(true); }
    setPage(0);
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-ink">{INVOICING_HEADER.title}</h1>
          <p className="mt-2 text-sm text-foreground-secondary">{INVOICING_HEADER.intro}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>
            <Download className="h-4 w-4" aria-hidden="true" />
            {INVOICING_HEADER.actions[0]}
          </button>
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>{INVOICING_HEADER.actions[1]}</button>
          <button type="button" className={`${btnPrimary} px-4 py-2.5`}>
            <CreditCard className="h-4 w-4" aria-hidden="true" />
            {INVOICING_HEADER.actions[2]}
          </button>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPI_TILES.map((t) => (
          <PortalCard key={t.label} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">{t.label}</p>
            <p className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-ink">{t.value}</span>
              {t.suffix && <span className="text-xs text-foreground-muted">{t.suffix}</span>}
            </p>
            <dl className="mt-4 space-y-1 border-t border-border-subtle pt-3">
              {t.rows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-3 text-xs">
                  <dt className="text-foreground-muted">{r.label}</dt>
                  <dd className="font-medium text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </PortalCard>
        ))}
      </div>

      {/* Entitlement */}
      <PortalCard className="mt-6 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-input bg-primary">
              <Receipt className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-ink">{ENTITLEMENT.tier}</h2>
                <StatusPill tone="primary">{ENTITLEMENT.badge}</StatusPill>
              </div>
              <p className="mt-1 text-sm text-foreground-secondary">{ENTITLEMENT.contract}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={`${btnSecondary} px-4 py-2`}>{ENTITLEMENT.actions[0]}</button>
            <button type="button" className={`${btnPrimary} px-4 py-2`}>{ENTITLEMENT.actions[1]}</button>
          </div>
        </div>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {ENTITLEMENT.columns.map((c) => (
            <div key={c.label} className="rounded-input border border-border-subtle bg-primary-tint p-4">
              <dt className="text-xs font-medium text-primary">{c.label}</dt>
              <dd className="mt-2 text-sm font-semibold text-ink">{c.value}</dd>
              <dd className="mt-1 text-xs text-foreground-muted">{c.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 rounded-card bg-primary-tint p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-ink">{ENTITLEMENT.cycle.title}</p>
              <p className="mt-1 text-xs text-foreground-secondary">{ENTITLEMENT.cycle.detail}</p>
            </div>
            <div className="min-w-[12rem]">
              <p className="text-xs text-foreground-muted">{ENTITLEMENT.cycle.elapsedLabel}</p>
              <p className="mt-1 text-xs font-medium text-ink">{ENTITLEMENT.cycle.elapsed}</p>
              <div className="mt-2">
                <ProgressBar value={ENTITLEMENT.cycle.percent} label="Contract cycle elapsed" />
              </div>
            </div>
          </div>
        </div>
      </PortalCard>

      {/* Usage + cost */}
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-3">
        <PortalCard className="min-w-0 p-6 lg:col-span-2">
          <SectionHeading
            title="Live Entitlements &amp; Consumption"
            subtitle="Real-time usage metrics tracked against monthly contracted platform quotas."
            action={<StatusPill tone="primary">Live Sync: 4m ago</StatusPill>}
          />
          <div className="mt-6 space-y-6">
            {USAGE_METERS.map((m) => (
              <div key={m.label}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-ink">{m.label}</p>
                  <p className="text-sm font-semibold text-ink">{m.note}</p>
                </div>
                <div className="mt-2">
                  <ProgressBar
                    value={m.percent}
                    label={`${m.label} consumption`}
                    tone={m.percent >= 85 ? 'warning' : 'primary'}
                  />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-foreground-secondary">{m.detail}</p>
                  <p className="text-xs font-medium text-primary">{m.link}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 border-t border-border-subtle pt-4">
            {USAGE_FOOTNOTES.map((f) => (
              <p key={f} className="text-xs text-foreground-secondary">{f}</p>
            ))}
          </div>
        </PortalCard>

        <PortalCard className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-ink">{COST_BREAKDOWN.title}</h2>
              <p className="text-sm text-foreground-secondary">{COST_BREAKDOWN.subtitle}</p>
            </div>
            <span className="text-xs font-medium text-primary">{COST_BREAKDOWN.exportLabel}</span>
          </div>
          <div className="mt-6">
            <Donut
              title="Monthly cost allocated by business unit"
              centreValue={COST_BREAKDOWN.centre}
              centreLabel={COST_BREAKDOWN.centreLabel}
              data={COST_BREAKDOWN.segments.map((s) => ({ label: s.label, value: s.value, step: s.step }))}
            />
          </div>
          <ul className="mt-4 space-y-2 border-t border-border-subtle pt-4">
            {COST_BREAKDOWN.segments.map((s) => (
              <li key={s.label} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-foreground-muted">{s.seats}</span>
                <span className="font-medium text-ink">{money(s.value)} ({s.percent})</span>
              </li>
            ))}
          </ul>
        </PortalCard>
      </div>

      {/* Settlement + legal entity */}
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <PortalCard className="p-6">
          <SectionHeading
            icon={CreditCard}
            title={SETTLEMENT_CHANNELS.title}
            subtitle={SETTLEMENT_CHANNELS.subtitle}
            action={<StatusPill tone="primary">{SETTLEMENT_CHANNELS.badge}</StatusPill>}
          />
          <ul className="mt-6 space-y-3">
            {SETTLEMENT_CHANNELS.instruments.map((i) => (
              <li key={i.code} className="rounded-card bg-primary-tint p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <span className="rounded-input bg-surface px-2 py-1 text-xs font-semibold text-primary">
                      {i.code}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{i.name}</p>
                      <p className="mt-1 text-xs text-foreground-secondary">{i.detail}</p>
                    </div>
                  </div>
                  <Chip>{i.tag}</Chip>
                </div>
                {i.meta && (
                  <p className="mt-3 rounded-input bg-surface px-3 py-2 text-xs text-foreground-muted">{i.meta}</p>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-medium text-primary">{SETTLEMENT_CHANNELS.footerLinks[0]}</span>
            <span className="text-foreground-muted">{SETTLEMENT_CHANNELS.footerLinks[1]}</span>
          </div>
        </PortalCard>

        <PortalCard className="p-6">
          <SectionHeading
            icon={Building2}
            title={LEGAL_ENTITY.title}
            subtitle={LEGAL_ENTITY.subtitle}
            action={<span className="text-xs font-medium text-primary">{LEGAL_ENTITY.editLabel}</span>}
          />
          <div className="mt-6 rounded-card bg-primary-tint p-4">
            <p className="text-sm font-semibold text-ink">{LEGAL_ENTITY.name}</p>
            {LEGAL_ENTITY.lines.map((l) => (
              <p key={l} className="text-sm text-foreground-secondary">{l}</p>
            ))}
            <dl className="mt-4 grid gap-3 sm:grid-cols-2 border-t border-border-subtle pt-3">
              {LEGAL_ENTITY.fields.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs text-foreground-muted">{f.label}</dt>
                  <dd className="mt-1 text-xs font-medium text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-medium text-primary">{LEGAL_ENTITY.footerLinks[0]}</span>
            <span className="text-foreground-muted">{LEGAL_ENTITY.footerLinks[1]}</span>
          </div>
        </PortalCard>
      </div>

      {/* Invoice table */}
      <PortalCard className="mt-6 p-6">
        <SectionHeading
          title="Invoice History &amp; Receipts"
          subtitle="Review historical invoices, check current reconciliation status, and export certified tax receipts."
        />

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {INVOICE_FILTERS.map((f) => {
            const selected = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={selected}
                onClick={() => { setFilter(f); setPage(0); }}
                className={`min-h-11 rounded-input px-3 py-2 text-xs font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
                  selected ? 'bg-primary text-white' : 'border border-border-subtle bg-surface text-foreground-secondary hover:text-ink'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[16rem] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" aria-hidden="true" />
            <label htmlFor="inv-search" className="sr-only">Search by invoice ID or PO number</label>
            <input
              id="inv-search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              placeholder="Search by invoice ID, PO number..."
              className="w-full rounded-input border border-border-strong bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-foreground-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            />
          </div>
          <span className="inline-flex items-center gap-2 rounded-input border border-border-subtle px-3 py-2.5 text-xs text-foreground-secondary">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Date Range: Past 12 Months
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <caption className="sr-only">Invoice history</caption>
            <thead>
              <tr className="border-b border-border-subtle text-xs uppercase tracking-[0.08em] text-foreground-muted">
                <th scope="col" className="py-2 pr-3 font-semibold">
                  <button type="button" onClick={() => sortBy('id')} className="inline-flex min-h-11 items-center gap-1 cursor-pointer hover:text-ink">
                    Invoice ID <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">Billing Period</th>
                <th scope="col" className="py-2 pr-3 font-semibold">
                  <button type="button" onClick={() => sortBy('issued')} className="inline-flex min-h-11 items-center gap-1 cursor-pointer hover:text-ink">
                    Issue Date <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">Due Date</th>
                <th scope="col" className="py-2 pr-3 font-semibold">
                  <button type="button" onClick={() => sortBy('amount')} className="inline-flex min-h-11 items-center gap-1 cursor-pointer hover:text-ink">
                    Amount (USD) <ArrowUpDown className="h-3 w-3" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="py-2 pr-3 font-semibold">Payment Instrument</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Status</th>
                <th scope="col" className="py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((inv) => (
                <tr key={inv.id} className="border-b border-border-subtle last:border-0">
                  <td className="py-3 pr-3 font-medium text-primary">{inv.id}</td>
                  <td className="py-3 pr-3 text-foreground-secondary">{inv.period}</td>
                  <td className="py-3 pr-3 text-foreground-secondary">{inv.issued}</td>
                  <td className="py-3 pr-3 text-foreground-secondary">{inv.due}</td>
                  <td className="py-3 pr-3">
                    <span className="font-medium text-ink">{money(inv.amount)}</span>
                    {inv.amountNote && <span className="block text-xs text-primary">{inv.amountNote}</span>}
                  </td>
                  <td className="py-3 pr-3 text-foreground-secondary">{inv.instrument}</td>
                  <td className="py-3 pr-3">
                    <StatusPill tone={inv.status === 'Paid & Settled' ? 'success' : 'warning'}>
                      {inv.status}
                    </StatusPill>
                  </td>
                  <td className="py-3">
                    <span className="flex items-center gap-2">
                      <button type="button" aria-label={`Download ${inv.id}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-input text-foreground-muted transition hover:bg-primary-tint hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer">
                        <Download className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button type="button" aria-label={`View ${inv.id}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-input text-foreground-muted transition hover:bg-primary-tint hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-sm text-foreground-secondary">
                    No invoices match that filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
          <p className="text-xs text-foreground-secondary">{INVOICE_FOOTER}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={current === 0}
              className={`${btnSecondary} min-h-11 px-3 py-2 disabled:opacity-50 disabled:pointer-events-none`}
            >
              Previous
            </button>
            <span aria-live="polite" className="text-xs text-foreground-muted">
              {current + 1} of {pageCount}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={current >= pageCount - 1}
              className={`${btnSecondary} min-h-11 px-3 py-2 disabled:opacity-50 disabled:pointer-events-none`}
            >
              Next
            </button>
          </div>
        </div>
      </PortalCard>

      {/* Reps + alerts */}
      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-2">
        <PortalCard className="p-6">
          <SectionHeading
            title="Designated Billing Representatives"
            subtitle="Authorized contacts entitled to sign SOW revisions, approve overages, and receive settlement invoices."
            action={
              <button type="button" className={`${btnSecondary} px-4 py-2`}>
                <UserPlus className="h-4 w-4" aria-hidden="true" />
                Add Contact
              </button>
            }
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {BILLING_REPRESENTATIVES.map((r) => (
              <div key={r.email} className="rounded-card bg-primary-tint p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {r.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                      {r.name}
                      <span className="text-xs font-medium text-primary">{r.tag}</span>
                    </p>
                    <p className="truncate text-xs text-foreground-secondary">{r.title}</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-primary">{r.email}</p>
                <p className="text-xs text-foreground-muted">{r.phone}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground-secondary">{INVOICING_FOOTNOTES.reps}</p>
        </PortalCard>

        <PortalCard className="p-6">
          <SectionHeading title="Billing Alert Preferences" subtitle="Automated proactive threshold alerts." />
          <ul className="mt-6 space-y-3">
            {alerts.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 rounded-card bg-primary-tint p-4">
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-ink">{a.name}</span>
                  <span className="block text-xs text-foreground-secondary">{a.detail}</span>
                </span>
                <Toggle
                  checked={a.on}
                  label={a.name}
                  onChange={(next) =>
                    setAlerts((list) => list.map((x) => (x.id === a.id ? { ...x, on: next } : x)))
                  }
                />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-right text-xs text-foreground-muted">{INVOICING_FOOTNOTES.alerts}</p>
        </PortalCard>
      </div>
    </div>
  );
};
