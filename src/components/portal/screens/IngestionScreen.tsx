import React, { useMemo, useState } from 'react';
import {
  AlertTriangle, Check, Download, FileText, FileWarning, Loader2, Lock, Package, RefreshCw,
  Search, ShieldCheck,
} from 'lucide-react';
import { btnPrimary, btnSecondary } from '../../ui';
import { Chip, PortalCard, SectionHeading, StatusPill, type StatusTone } from '../ui/primitives';
import {
  INGESTION_HEADER, INGESTION_PROTOCOL, LEDGER, LEDGER_ROWS, PIPELINE_GRAPH, PIPELINE_NODES,
  SPEC_GRID, SPEC_MODULES, type SpecModule,
} from '../data/ingestion';

/* Document repository & ingestion — built from `input ingestion.png`. */

const STATE_TONE: Record<SpecModule['state'], StatusTone> = {
  Verified: 'success',
  'Parsing 82%': 'primary',
  'Missing PDF': 'danger',
  Pending: 'neutral',
};

const STATE_ICON = {
  Verified: Check,
  'Parsing 82%': Loader2,
  'Missing PDF': FileWarning,
  Pending: FileText,
} as const;

export const IngestionScreen: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return LEDGER_ROWS;
    return LEDGER_ROWS.filter(
      (r) => r.file.toLowerCase().includes(q) || r.checksum.toLowerCase().includes(q)
    );
  }, [query]);

  const active = SPEC_MODULES.find((m) => m.id === selected) ?? null;

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="text-2xl font-bold tracking-tight text-ink">{INGESTION_HEADER.title}</h1>
          <p className="mt-2 text-sm text-foreground-secondary">{INGESTION_HEADER.intro}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>
            <Package className="h-4 w-4" aria-hidden="true" />
            {INGESTION_HEADER.actions[0]}
          </button>
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            {INGESTION_HEADER.actions[1]}
          </button>
          <button type="button" className={`${btnPrimary} px-4 py-2.5`}>
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {INGESTION_HEADER.actions[2]}
          </button>
        </div>
      </div>

      {/* Protocol notice */}
      <PortalCard className="mt-6 bg-primary-tint p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-input bg-primary">
              <Lock className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                {INGESTION_PROTOCOL.title}
                <Chip muted>{INGESTION_PROTOCOL.chip}</Chip>
              </p>
              <p className="mt-2 max-w-3xl text-sm text-foreground-secondary">{INGESTION_PROTOCOL.body}</p>
            </div>
          </div>
          <p className="shrink-0 text-sm font-medium text-primary">{INGESTION_PROTOCOL.link} →</p>
        </div>
      </PortalCard>

      {/* Spec module grid — built from the ledger/pipeline because the comp renders this area empty */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-ink">{SPEC_GRID.title}</h2>
          <Chip>{SPEC_GRID.chip}</Chip>
        </div>
        <p className="text-xs text-foreground-muted">{SPEC_GRID.hint}</p>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SPEC_MODULES.map((m) => {
          const Icon = STATE_ICON[m.state];
          const isActive = selected === m.id;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelected(isActive ? null : m.id)}
              className={`rounded-card border p-5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
                isActive ? 'border-primary bg-primary-tint' : 'border-border-subtle bg-surface hover:border-primary'
              }`}
            >
              <span className="flex items-start justify-between gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-input bg-primary-tint">
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </span>
                <StatusPill tone={STATE_TONE[m.state]}>{m.state}</StatusPill>
              </span>
              <span className="mt-3 block text-sm font-semibold text-ink">{m.name}</span>
              <span className="mt-1 block text-xs text-foreground-muted">{m.kind}</span>
              <span className="mt-2 block text-xs text-foreground-secondary">{m.detail}</span>
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-4">
        {active && (
          <PortalCard className="p-5">
            <p className="text-sm font-semibold text-ink">
              Extracted entity graph — {active.name}
            </p>
            <p className="mt-1 text-sm text-foreground-secondary">{active.detail}</p>
            <p className="mt-3 text-xs text-foreground-muted">
              Static preview: a real deployment resolves the parsed entity graph for this module.
            </p>
          </PortalCard>
        )}
      </div>

      {/* Pipeline verification graph */}
      <PortalCard className="mt-8 p-6">
        <SectionHeading
          title={PIPELINE_GRAPH.title}
          subtitle={PIPELINE_GRAPH.subtitle}
          action={
            <div className="flex flex-wrap items-center gap-4 text-xs text-foreground-secondary">
              {PIPELINE_GRAPH.legend.map((l, i) => (
                <span key={l} className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${i === 0 ? 'bg-primary' : 'bg-border-strong'}`}
                    aria-hidden="true"
                  />
                  {l}
                </span>
              ))}
            </div>
          }
        />
        <div className="mt-6 overflow-x-auto pb-2">
          <ol className="flex min-w-max gap-4">
          {PIPELINE_NODES.map((n, i) => {
            const done = n.state === 'Verified';
            const blocked = n.state === 'Missing PDF';
            return (
              <li key={n.index} className="min-w-[8rem] flex-1">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                    done
                      ? 'border-primary bg-primary text-white'
                      : blocked
                        ? 'border-danger bg-surface text-danger'
                        : 'border-border-strong bg-surface text-foreground-muted'
                  }`}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden="true" />
                    : blocked ? <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                      : <span className="text-xs font-semibold">{n.index}</span>}
                </span>
                <p className="mt-2 text-sm font-medium text-ink">{i + 1}. {n.name}</p>
                <p className={`text-xs ${blocked ? 'text-danger' : done ? 'text-foreground-muted' : 'text-primary'}`}>
                  {n.state}
                </p>
              </li>
            );
          })}
          </ol>
        </div>
      </PortalCard>

      {/* Ledger */}
      <PortalCard className="mt-6 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-ink">{LEDGER.title}</h2>
            <Chip>{LEDGER.chip}</Chip>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative min-w-[15rem]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" aria-hidden="true" />
              <label htmlFor="ing-filter" className="sr-only">Filter by document name or checksum</label>
              <input
                id="ing-filter"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={LEDGER.filterPlaceholder}
                className="w-full rounded-input border border-border-strong bg-surface py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-foreground-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              />
            </div>
            <button type="button" aria-label="Download ledger" className={`${btnSecondary} min-h-11 px-3 py-2.5`}>
              <Download className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[58rem] text-left text-sm">
            <caption className="sr-only">Ingestion ledger and cryptographic manifest</caption>
            <thead>
              <tr className="border-b border-border-subtle text-xs uppercase tracking-[0.08em] text-foreground-muted">
                <th scope="col" className="py-2 pr-3 font-semibold">Business Requirements</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Type</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Size</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Checksum</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Validation</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Extraction</th>
                <th scope="col" className="py-2 pr-3 font-semibold">Owner</th>
                <th scope="col" className="py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.file} className="border-b border-border-subtle last:border-0">
                  <td className="py-3 pr-3">
                    <span className="flex items-start gap-2">
                      <FileText className="mt-0.5 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-xs text-foreground-muted">{r.type}</span>
                        <span className="block font-medium text-ink">{r.file}</span>
                      </span>
                    </span>
                  </td>
                  <td className="py-3 pr-3"><Chip muted>{r.mime}</Chip></td>
                  <td className="py-3 pr-3 text-foreground-secondary">{r.size}</td>
                  <td className="py-3 pr-3 text-primary">{r.checksum}</td>
                  <td className="py-3 pr-3"><StatusPill tone={r.validationTone}>{r.validation}</StatusPill></td>
                  <td className="py-3 pr-3"><Chip>{r.extraction}</Chip></td>
                  <td className="py-3 pr-3 text-foreground-secondary">{r.owner}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-2">
                      <button type="button" aria-label={`Download ${r.file}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-input text-foreground-muted transition hover:bg-primary-tint hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer">
                        <Download className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button type="button" aria-label={`Lock ${r.file}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-input text-foreground-muted transition hover:bg-primary-tint hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer">
                        <Lock className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-sm text-foreground-secondary">
                    No artifacts match that filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle pt-4 text-xs">
          <p className="flex items-center gap-2 text-foreground-secondary">
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            {LEDGER.footerLeft}
          </p>
          <p className="text-foreground-muted">{LEDGER.footerRight}</p>
        </div>
      </PortalCard>
    </div>
  );
};
