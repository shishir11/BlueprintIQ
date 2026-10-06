import React, { useState } from 'react';
import {
  ArrowRight, Boxes, Check, Database, Download, FileText, Network, Play, ShieldCheck, Workflow,
} from 'lucide-react';
import { btnPrimary, btnSecondary } from '../../ui';
import { Chip, PortalCard, SectionHeading, StatusPill, Toggle } from '../ui/primitives';
import { Sparkline } from '../ui/charts';
import {
  ATTESTATION, DATA_MODELS, EXECUTION_HORIZON, GUARDRAILS, OUTPUT_HEADER, OUTPUT_METRICS,
  PATTERN_CARDS, PIPELINE_STEPS, RESIDENCY, REVIEWERS, TOPOLOGY, VALUE_PROPOSITION,
} from '../data/output';

/* Synthesis output — built from `Output.png`. */

export const OutputScreen: React.FC = () => {
  const [guardrails, setGuardrails] = useState(GUARDRAILS.rows.map((r) => ({ ...r })));

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Chip row */}
      <div className="flex flex-wrap items-center gap-2">
        <StatusPill tone="primary">{OUTPUT_HEADER.chips[0]}</StatusPill>
        {OUTPUT_HEADER.chips.slice(1).map((c) => <Chip key={c}>{c}</Chip>)}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
        {OUTPUT_HEADER.meta.map((m) => <span key={m}>{m}</span>)}
      </div>

      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-ink">{OUTPUT_HEADER.title}</h1>
          <p className="mt-3 text-sm text-foreground-secondary">{OUTPUT_HEADER.intro}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
            {OUTPUT_HEADER.sourcesLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {OUTPUT_HEADER.sources.map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5 rounded-input border border-border-subtle bg-surface px-2.5 py-1 text-xs text-foreground-secondary">
                <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2">
          <button type="button" className={`${btnPrimary} px-4 py-3`}>
            <Download className="h-4 w-4" aria-hidden="true" />
            {OUTPUT_HEADER.actions[0]}
          </button>
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>{OUTPUT_HEADER.actions[1]}</button>
          <button type="button" className={`${btnSecondary} px-4 py-2.5`}>
            <Play className="h-4 w-4" aria-hidden="true" />
            {OUTPUT_HEADER.actions[2]}
          </button>
        </div>
      </div>

      {/* Metric tiles */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {OUTPUT_METRICS.map((m) => (
          <PortalCard key={m.label} className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">{m.label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight text-ink">{m.value}</p>
            <dl className="mt-4 space-y-1 border-t border-border-subtle pt-3">
              {m.rows.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-3 text-xs">
                  <dt className="text-foreground-muted">{r.label}</dt>
                  <dd className="font-medium text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </PortalCard>
        ))}
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          {/* Value proposition */}
          <PortalCard className="p-6">
            <SectionHeading
              icon={Boxes}
              title={VALUE_PROPOSITION.title}
              subtitle={VALUE_PROPOSITION.subtitle}
              action={<StatusPill tone="primary">{VALUE_PROPOSITION.badge}</StatusPill>}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {PATTERN_CARDS.map((p) => (
                <div key={p.title} className="rounded-card bg-primary-tint p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{p.tag}</span>
                    <Chip muted>{p.adoption}</Chip>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink">{p.title}</p>
                  <p className="mt-2 text-xs text-foreground-secondary">{p.body}</p>
                  <div className="mt-3 flex flex-wrap gap-2 border-t border-border-subtle pt-3">
                    {p.stats.map((s) => <Chip key={s.label} muted>{s.label}</Chip>)}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              {EXECUTION_HORIZON.label}
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {EXECUTION_HORIZON.phases.map((ph) => (
                <div key={ph.title} className="rounded-card border border-border-subtle p-4">
                  <p className="text-xs font-medium text-foreground-muted">{ph.window}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{ph.title}</p>
                  <p className="mt-2 text-xs text-foreground-secondary">{ph.body}</p>
                  <div className="mt-3"><StatusPill tone={ph.tone}>{ph.status}</StatusPill></div>
                </div>
              ))}
            </div>
          </PortalCard>

          {/* Topology */}
          <PortalCard className="p-6">
            <SectionHeading
              icon={Network}
              title={TOPOLOGY.title}
              subtitle={TOPOLOGY.subtitle}
              action={<StatusPill tone="primary">{TOPOLOGY.badge}</StatusPill>}
            />
            <ol className="mt-6 flex flex-wrap items-stretch gap-2">
              {TOPOLOGY.nodes.map((n, i) => (
                <li key={n.name} className="flex flex-1 items-center gap-2">
                  <div className="min-w-[9rem] flex-1 rounded-card border border-border-subtle p-3 text-center">
                    <p className="text-xs font-semibold text-ink">{n.name}</p>
                    <p className="mt-1 text-xs text-foreground-muted">{n.detail}</p>
                    <span className="mt-2 inline-block"><Chip muted>{n.chip}</Chip></span>
                  </div>
                  {i < TOPOLOGY.nodes.length - 1 && (
                    <ArrowRight className="hidden h-4 w-4 shrink-0 text-foreground-muted sm:block" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {TOPOLOGY.footers.map((f) => (
                <div key={f.name} className="rounded-card bg-primary-tint p-3">
                  <p className="text-xs font-semibold text-ink">{f.name}</p>
                  <p className="mt-1 text-xs text-foreground-secondary">{f.detail}</p>
                </div>
              ))}
            </div>
          </PortalCard>

          {/* Data models */}
          <PortalCard className="p-6">
            <SectionHeading
              icon={Database}
              title={DATA_MODELS.title}
              subtitle={DATA_MODELS.subtitle}
              action={<Chip muted>{DATA_MODELS.badge}</Chip>}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {DATA_MODELS.columns.map((c) => (
                <div key={c.name} className="rounded-card border border-border-subtle p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{c.kind}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{c.name}</p>
                  <ul className="mt-3 space-y-1">
                    {c.rows.map((r) => (
                      <li key={r} className="text-xs text-foreground-secondary">{r}</li>
                    ))}
                  </ul>
                  <p className="mt-3 flex items-center justify-between gap-2 border-t border-border-subtle pt-2 text-xs">
                    <span className="text-foreground-muted">{c.footer.label}</span>
                    <span className="font-medium text-ink">{c.footer.value}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-hidden rounded-card bg-ink-dark">
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground-on-dark">
                  {DATA_MODELS.snapshot.label}
                </p>
                <p className="text-xs text-foreground-on-dark">{DATA_MODELS.snapshot.validated}</p>
              </div>
              <pre className="overflow-x-auto px-4 pb-4 font-mono text-xs leading-relaxed text-foreground-on-dark">
                {DATA_MODELS.snapshot.sql}
              </pre>
            </div>
          </PortalCard>

          {/* Pipeline */}
          <PortalCard className="p-6">
            <SectionHeading
              icon={Workflow}
              title={PIPELINE_STEPS.title}
              subtitle={PIPELINE_STEPS.subtitle}
              action={<StatusPill tone="primary">{PIPELINE_STEPS.badge}</StatusPill>}
            />
            <ol className="mt-6 space-y-3">
              {PIPELINE_STEPS.steps.map((s) => (
                <li key={s.index} className="flex flex-wrap items-center justify-between gap-3 rounded-card bg-primary-tint p-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="text-xs font-semibold text-primary">{s.index}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{s.name}</p>
                      <p className="mt-1 text-xs text-foreground-secondary">{s.detail}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Chip muted>{s.stat}</Chip>
                    <Chip>{s.value}</Chip>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-5 rounded-card border border-border-subtle p-4">
              <p className="text-sm font-semibold text-ink">{PIPELINE_STEPS.throughput.title}</p>
              <p className="mt-1 text-xs text-foreground-secondary">{PIPELINE_STEPS.throughput.detail}</p>
              <div className="mt-3">
                <Sparkline points={PIPELINE_STEPS.throughput.points} label={PIPELINE_STEPS.throughput.title} />
              </div>
            </div>
          </PortalCard>
        </div>

        {/* Right rail */}
        <div className="min-w-0 space-y-6">
          <PortalCard className="p-5">
            <h2 className="text-base font-semibold text-ink">{GUARDRAILS.title}</h2>
            <ul className="mt-4 space-y-3">
              {guardrails.map((g) => (
                <li key={g.name} className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-ink">{g.name}</span>
                    {g.detail && <span className="block text-xs text-foreground-secondary">{g.detail}</span>}
                    <span className="mt-1 inline-block"><Chip muted>{g.badge}</Chip></span>
                  </span>
                  <Toggle
                    checked={g.on}
                    label={g.name}
                    onChange={(next) =>
                      setGuardrails((list) => list.map((x) => (x.name === g.name ? { ...x, on: next } : x)))
                    }
                  />
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-card bg-primary-tint p-3">
              <p className="text-xs font-semibold text-ink">{GUARDRAILS.ledger.title}</p>
              {GUARDRAILS.ledger.rows.map((r) => (
                <p key={r.label} className="mt-1 flex items-center justify-between gap-2 text-xs">
                  <span className="text-foreground-muted">{r.label}</span>
                  <span className="font-medium text-ink">{r.value}</span>
                </p>
              ))}
            </div>
          </PortalCard>

          <PortalCard className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-semibold text-ink">{RESIDENCY.title}</h2>
              <Chip>{RESIDENCY.badge}</Chip>
            </div>
            <p className="mt-1 text-xs text-foreground-secondary">{RESIDENCY.subtitle}</p>
            <ul className="mt-4 space-y-2">
              {RESIDENCY.regions.map((r) => (
                <li key={r.name} className="rounded-card bg-primary-tint p-3">
                  <p className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm font-medium text-ink">{r.name}</span>
                    <Chip muted>{r.tag}</Chip>
                  </p>
                  <p className="mt-1 break-all text-xs text-foreground-muted">{r.meta}</p>
                </li>
              ))}
            </ul>
            <p className="mt-3 rounded-card bg-ink-dark px-3 py-2 text-xs text-foreground-on-dark">
              {RESIDENCY.mapCaption}
            </p>
            <dl className="mt-3 space-y-1">
              {RESIDENCY.fields.map((f) => (
                <div key={f.label} className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <dt className="text-foreground-muted">{f.label}</dt>
                  <dd className="font-medium text-primary">{f.value}</dd>
                </div>
              ))}
            </dl>
          </PortalCard>

          <PortalCard className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
                <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                {ATTESTATION.title}
              </h2>
              <StatusPill tone="success">{ATTESTATION.badge}</StatusPill>
            </div>
            <p className="mt-1 text-xs text-foreground-secondary">{ATTESTATION.subtitle}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {ATTESTATION.badges.map((b) => (
                <div key={b.name} className="rounded-card bg-primary-tint p-3">
                  <p className="text-xs font-semibold text-ink">{b.name}</p>
                  <p className="mt-1 text-xs text-foreground-muted">{b.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-border-subtle pt-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                {ATTESTATION.signer.initials}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-ink">{ATTESTATION.signer.name}</span>
                <span className="block text-xs text-foreground-muted">{ATTESTATION.signer.title}</span>
              </span>
              <Check className="ml-auto h-4 w-4 text-success" aria-hidden="true" />
            </div>
          </PortalCard>

          <PortalCard className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              {REVIEWERS.title}
            </p>
            <ul className="mt-3 space-y-2">
              {REVIEWERS.rows.map((r) => (
                <li key={r.name} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {r.initials}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-ink">{r.name}</span>
                    <span className="block text-xs text-foreground-muted">{r.title}</span>
                  </span>
                  <StatusPill tone="success">{r.state}</StatusPill>
                </li>
              ))}
            </ul>
          </PortalCard>
        </div>
      </div>
    </div>
  );
};
