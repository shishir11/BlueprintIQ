import React, { useState } from 'react';
import {
  ArrowLeft, Check, CreditCard, Download, Globe2, Mail, Rocket, ShieldCheck, Wallet,
} from 'lucide-react';
import { btnPrimary, btnSecondary } from '../../ui';
import { Chip, PortalCard, SectionHeading, StatusPill } from '../ui/primitives';
import {
  BILLING_MISC, BILLING_SECTIONS, BILLING_STEPS, CLOUD_ZONES, COMPLIANCE_FRAMEWORK,
  CONTRACT_DATES, DIVISIONS, ESCALATION_MATRIX, GATEKEEPER_POLICIES, INVOICING_ENTITY,
  PLAN_TIERS, SETTLEMENT_METHODS,
} from '../data/billing';

/* Commercial & billing setup — built from `Billing onboarding.png`. */

export const BillingSetupScreen: React.FC = () => {
  const [section, setSection] = useState(BILLING_SECTIONS[0]);
  const [plan, setPlan] = useState(PLAN_TIERS[0].id);
  const [settlement, setSettlement] = useState(SETTLEMENT_METHODS[0].id);
  const [zone, setZone] = useState(CLOUD_ZONES[0].name);
  const [frameworks, setFrameworks] = useState<string[]>(COMPLIANCE_FRAMEWORK.map((f) => f.id));
  const [saved, setSaved] = useState(false);

  const toggleFramework = (id: string) =>
    setFrameworks((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  return (
    <div className="mx-auto w-full max-w-7xl">
      <h1 className="text-2xl font-bold tracking-tight text-ink">Enterprise Workspace Provisioning</h1>

      {/* Stepper */}
      <PortalCard className="mt-5 p-5">
        <div className="overflow-x-auto">
        <ol className="flex min-w-max gap-6">
          {BILLING_STEPS.map((s, i) => {
            const done = i < 3;
            const current = i === 3;
            return (
              <li key={s.index} className="min-w-[8rem]">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                    done || current ? 'border-primary bg-primary text-white' : 'border-border-strong bg-surface text-foreground-muted'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : s.index}
                </span>
                <p className="mt-2 text-sm font-medium text-ink">{i + 1}. {s.title}</p>
                <p className={`text-xs ${current ? 'text-primary' : 'text-foreground-muted'}`}>{s.state}</p>
              </li>
            );
          })}
        </ol>
        </div>
      </PortalCard>

      {/* Section pills */}
      <div role="tablist" aria-label="Setup sections" className="mt-5 flex flex-wrap gap-2">
        {BILLING_SECTIONS.map((s) => {
          const selected = section === s;
          return (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSection(s)}
              className={`min-h-11 rounded-button px-4 py-2.5 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
                selected
                  ? 'bg-primary font-semibold text-white'
                  : 'border border-border-subtle bg-surface font-medium text-foreground-secondary hover:text-ink'
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-3">
        <div className="min-w-0 space-y-6 lg:col-span-2">
          {/* Phase 04 */}
          <PortalCard className="p-6">
            <Chip muted>Phase 04</Chip>
            <div className="mt-3">
              <SectionHeading
                icon={CreditCard}
                title="Commercial Billing &amp; Subscription"
                subtitle="Configure subscription master service agreements, PO routing, and fiscal legal entity billing."
                action={<StatusPill tone="primary" icon={ShieldCheck}>{BILLING_MISC.msaBadge}</StatusPill>}
              />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Active Contract Plan
            </p>
            <fieldset className="mt-3 grid gap-4 sm:grid-cols-2">
              <legend className="sr-only">Contract plan</legend>
              {PLAN_TIERS.map((tier) => {
                const selected = plan === tier.id;
                return (
                  <label
                    key={tier.id}
                    className={`cursor-pointer rounded-card border p-5 transition ${
                      selected ? 'border-primary bg-primary-tint' : 'border-border-subtle bg-surface hover:border-primary'
                    }`}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-sm font-semibold text-ink">{tier.name}</span>
                      <input
                        type="radio"
                        name="plan-tier"
                        checked={selected}
                        onChange={() => setPlan(tier.id)}
                        className="h-4 w-4 accent-primary"
                      />
                    </span>
                    {tier.badge && <span className="mt-2 block"><Chip>{tier.badge}</Chip></span>}
                    <span className="mt-3 block">
                      <span className="text-3xl font-bold text-ink">{tier.price}</span>
                      <span className="text-sm text-foreground-secondary"> {tier.cadence}</span>
                    </span>
                    <span className="mt-2 block text-sm text-foreground-secondary">{tier.blurb}</span>
                    <span className="mt-3 flex flex-wrap gap-2">
                      {tier.features.map((f) => <Chip key={f} muted>{f}</Chip>)}
                    </span>
                  </label>
                );
              })}
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {Object.entries(CONTRACT_DATES).map(([key, field]) => (
                <div key={key}>
                  <label htmlFor={`bl-${key}`} className="text-sm font-medium text-ink">{field.label}</label>
                  <input
                    id={`bl-${key}`}
                    readOnly
                    value={field.value}
                    className="mt-2 w-full rounded-input border border-border-strong bg-primary-tint px-3 py-2.5 text-sm text-ink"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-card bg-primary-tint p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-ink">{INVOICING_ENTITY.heading}</p>
                <span className="text-xs font-medium text-primary">{INVOICING_ENTITY.editLabel}</span>
              </div>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-foreground-muted">{INVOICING_ENTITY.corporate.label}</p>
                  <p className="mt-1 text-sm font-semibold text-ink">{INVOICING_ENTITY.corporate.name}</p>
                  {INVOICING_ENTITY.corporate.lines.map((l) => (
                    <p key={l} className="text-sm text-foreground-secondary">{l}</p>
                  ))}
                  <p className="mt-2 text-xs text-foreground-muted">{INVOICING_ENTITY.corporate.meta}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground-muted">{INVOICING_ENTITY.routing.label}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{INVOICING_ENTITY.routing.email}</p>
                  <p className="text-sm text-foreground-secondary">{INVOICING_ENTITY.routing.attn}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {INVOICING_ENTITY.routing.chips.map((c) => <Chip key={c}>{c}</Chip>)}
                  </div>
                </div>
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                Commercial Settlement Method
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {SETTLEMENT_METHODS.map((m) => {
                  const selected = settlement === m.id;
                  return (
                    <label
                      key={m.id}
                      className={`flex cursor-pointer items-center gap-3 rounded-input border px-3 py-3 transition ${
                        selected ? 'border-primary bg-primary-tint' : 'border-border-subtle bg-surface hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="settlement"
                        checked={selected}
                        onChange={() => setSettlement(m.id)}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-ink">{m.name}</span>
                        <span className="block truncate text-xs text-foreground-muted">{m.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </PortalCard>

          {/* Phase 05 */}
          <PortalCard className="p-6">
            <Chip muted>Phase 05</Chip>
            <div className="mt-3">
              <SectionHeading
                icon={Globe2}
                title="Security, Governance &amp; Data Residency"
                subtitle="Multi-region containment, compliance posture verification, and incident escalation channels."
                action={<StatusPill tone="primary" icon={ShieldCheck}>{BILLING_MISC.kmsBadge}</StatusPill>}
              />
            </div>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ink">Primary Cloud Zone &amp; Data Sovereignty</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {CLOUD_ZONES.map((z) => {
                  const selected = zone === z.name;
                  return (
                    <label
                      key={z.name}
                      className={`cursor-pointer rounded-input border p-4 transition ${
                        selected ? 'border-primary bg-primary-tint' : 'border-border-subtle bg-surface hover:border-primary'
                      }`}
                    >
                      <span className="flex items-start justify-between gap-2">
                        <span className="text-sm font-semibold text-ink">{z.name}</span>
                        <input
                          type="radio"
                          name="cloud-zone"
                          checked={selected}
                          onChange={() => setZone(z.name)}
                          className="h-4 w-4 accent-primary"
                        />
                      </span>
                      <span className="mt-1 block text-xs text-foreground-muted">{z.meta}</span>
                      <span className="mt-2 block text-xs text-foreground-secondary">{z.detail}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                BlueprintIQ Compliance Framework
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {COMPLIANCE_FRAMEWORK.map((f) => (
                  <label
                    key={f.id}
                    className="flex cursor-pointer items-start gap-3 rounded-input border border-border-subtle bg-primary-tint p-3"
                  >
                    <input
                      type="checkbox"
                      checked={frameworks.includes(f.id)}
                      onChange={() => toggleFramework(f.id)}
                      className="mt-0.5 h-4 w-4 accent-primary"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-ink">{f.name}</span>
                        <span className="text-xs font-medium text-primary">{f.status}</span>
                      </span>
                      <span className="mt-1 block text-xs text-foreground-secondary">{f.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                  SecOps &amp; Incident Escalation Matrix
                </p>
                <span className="text-xs font-medium text-primary">+ Add Escalation Node</span>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[42rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border-subtle text-xs uppercase tracking-[0.08em] text-foreground-muted">
                      <th scope="col" className="py-2 pr-3 font-semibold">Role / Designation</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Contact Person</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Notification Channel</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">SLA Escalation</th>
                      <th scope="col" className="py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ESCALATION_MATRIX.map((r) => (
                      <tr key={r.role} className="border-b border-border-subtle last:border-0">
                        <td className="py-3 pr-3 font-medium text-ink">{r.role}</td>
                        <td className="py-3 pr-3 text-foreground-secondary">{r.contact}</td>
                        <td className="py-3 pr-3 text-foreground-secondary">{r.channel}</td>
                        <td className="py-3 pr-3 text-foreground-secondary">{r.sla}</td>
                        <td className="py-3"><StatusPill tone="primary">{r.status}</StatusPill></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </PortalCard>

          {/* Phase 06 */}
          <PortalCard className="p-6">
            <Chip muted>Phase 06</Chip>
            <div className="mt-3">
              <SectionHeading
                icon={Wallet}
                title="Business Unit Configuration &amp; Cost Centers"
                subtitle="Segment organizations, designate cost center billing codes, and control provisioning approval gates."
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                Active Regional Divisions &amp; Ledger Codes
              </p>
              <span className="text-xs font-medium text-primary">+ New Division</span>
            </div>
            <ul className="mt-3 space-y-2">
              {DIVISIONS.map((d) => (
                <li
                  key={d.ledger}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-input bg-primary-tint px-4 py-3"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink">{d.name}</span>
                    <span className="block text-xs text-foreground-secondary">{d.detail}</span>
                  </span>
                  <Chip muted>{d.ledger}</Chip>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-card bg-primary-tint p-5">
              <p className="text-sm font-semibold text-ink">Provisioning &amp; API Key Gatekeeper Policy</p>
              <p className="mt-1 text-sm text-foreground-secondary">
                Enforce multi-tiered quorum signatures prior to distributing elevated production privileges.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {GATEKEEPER_POLICIES.map((p) => (
                  <div key={p.name} className="rounded-input border border-border-subtle bg-surface p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{p.name}</p>
                      <Chip>{p.badge}</Chip>
                    </div>
                    <p className="mt-2 text-xs text-foreground-secondary">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Enterprise Alerting &amp; Digest Webhooks
            </p>
            <div className="mt-3 inline-flex items-center gap-3 rounded-input bg-primary-tint px-4 py-3">
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              <span>
                <span className="block text-sm font-medium text-ink">{BILLING_MISC.webhook.name}</span>
                <span className="block text-xs text-foreground-muted">{BILLING_MISC.webhook.detail}</span>
              </span>
            </div>
          </PortalCard>

          {/* Footer action bar */}
          <PortalCard className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="flex flex-wrap gap-2">
              <button type="button" className={`${btnSecondary} px-4 py-2.5`}>
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {BILLING_MISC.actions.back}
              </button>
              <button type="button" className={`${btnSecondary} px-4 py-2.5`}>
                <Download className="h-4 w-4" aria-hidden="true" />
                {BILLING_MISC.actions.download}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setSaved(true)} className={`${btnSecondary} px-4 py-2.5`}>
                {saved ? 'Draft saved' : BILLING_MISC.actions.draft}
              </button>
              <button type="button" className={`${btnPrimary} px-4 py-2.5`}>
                <Rocket className="h-4 w-4" aria-hidden="true" />
                {BILLING_MISC.actions.primary}
              </button>
            </div>
          </PortalCard>
        </div>

        {/* Right rail */}
        <div>
          <PortalCard className="p-5">
            <p className="text-sm font-semibold text-ink">{BILLING_MISC.tam.heading}</p>
            <p className="mt-2 text-sm text-foreground-secondary">{BILLING_MISC.tam.body}</p>
            <button type="button" className={`${btnSecondary} mt-4 w-full px-3 py-2.5`}>
              {BILLING_MISC.tam.action}
            </button>
          </PortalCard>
        </div>
      </div>
    </div>
  );
};
