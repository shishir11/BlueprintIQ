import React, { useState } from 'react';
import {
  Building2, CalendarDays, Check, ChevronRight, CloudUpload, MessageSquare, Users, UserCog,
} from 'lucide-react';
import { btnPrimary, btnSecondary } from '../../ui';
import { CheckRow, Chip, PortalCard, ProgressBar, SectionHeading, StatusPill } from '../ui/primitives';
import { Donut } from '../ui/charts';
import {
  BULK_INGEST, CSM_POD, GOVERNANCE_CONTACTS, ONBOARDING_ACTIONS, ONBOARDING_HEADER, ORG_METADATA,
  PROVISIONING_VELOCITY, RBAC_TEMPLATES, READINESS, SCIM_PROVIDERS, SEAT_ENTITLEMENT, STAGED_USERS,
  WIZARD_STEPS,
} from '../data/onboarding';

/* Provisioning wizard, step 3 of 7 — built from `Onboarding org access.png`. */

const STEP_TONE = {
  Completed: 'text-success',
  Active: 'text-primary',
  'In Scope': 'text-primary',
  Upcoming: 'text-foreground-muted',
  'Sign-Off': 'text-foreground-muted',
} as const;

export const OnboardingScreen: React.FC = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [industry, setIndustry] = useState(ORG_METADATA.industry);
  const [workforce, setWorkforce] = useState(ORG_METADATA.workforce);
  const [provider, setProvider] = useState(SCIM_PROVIDERS[0].name);
  const [rbac, setRbac] = useState(RBAC_TEMPLATES[0].id);
  const [draftSaved, setDraftSaved] = useState(false);

  const allocated = SEAT_ENTITLEMENT.pools.reduce((sum, p) => sum + p.value, 0);

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
          {ONBOARDING_HEADER.breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              <span className={i === ONBOARDING_HEADER.breadcrumb.length - 1 ? 'font-medium text-ink' : ''}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">
          Region: <span className="text-ink">{ONBOARDING_HEADER.region}</span>
        </p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusPill tone="primary">{ONBOARDING_HEADER.stepChip}</StatusPill>
        <StatusPill tone="success">{ONBOARDING_HEADER.systemStatus}</StatusPill>
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">Enterprise Workspace Provisioning</h1>

      {/* Stepper */}
      <PortalCard className="mt-5 p-5">
        <div className="overflow-x-auto">
        <ol className="flex min-w-max items-start gap-2">
          {WIZARD_STEPS.map((step, i) => {
            const done = i < activeStep;
            const current = i === activeStep;
            return (
              <li key={step.index} className="flex min-w-[9rem] flex-1 flex-col items-start">
                <button
                  type="button"
                  onClick={() => setActiveStep(i)}
                  aria-current={current ? 'step' : undefined}
                  className="group flex min-h-11 w-full items-center gap-2 rounded-input py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      done
                        ? 'border-primary bg-primary text-white'
                        : current
                          ? 'border-primary bg-primary text-white'
                          : 'border-border-strong bg-surface text-foreground-muted'
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" aria-hidden="true" /> : step.index}
                  </span>
                  <span className="h-px flex-1 bg-border-subtle" aria-hidden="true" />
                </button>
                <p className="mt-2 text-sm font-medium text-ink">
                  {i + 1}. {step.title}
                </p>
                <p className={`text-xs ${STEP_TONE[step.state]}`}>{step.state}</p>
              </li>
            );
          })}
        </ol>
        </div>
      </PortalCard>

      <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="min-w-0 space-y-6 lg:col-span-2">
          <PortalCard className="p-6">
            <SectionHeading
              icon={Building2}
              title="Organization Metadata &amp; Legal Entity"
              subtitle="Enterprise entity registration and tax clearance profile"
              action={<StatusPill tone="primary">{ORG_METADATA.badge}</StatusPill>}
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="ob-brand" className="text-sm font-medium text-ink">
                  Company / Organization Brand Name
                </label>
                <input
                  id="ob-brand"
                  readOnly
                  value={ORG_METADATA.brandName}
                  className="mt-2 w-full rounded-input border border-border-strong bg-primary-tint px-3 py-2.5 text-sm text-ink"
                />
              </div>
              <div>
                <label htmlFor="ob-legal" className="text-sm font-medium text-ink">
                  Registered Legal Entity Name
                </label>
                <input
                  id="ob-legal"
                  readOnly
                  value={ORG_METADATA.legalName}
                  className="mt-2 w-full rounded-input border border-border-strong bg-primary-tint px-3 py-2.5 text-sm text-ink"
                />
              </div>

              <div>
                <label htmlFor="ob-industry" className="text-sm font-medium text-ink">
                  Industry Classification
                </label>
                <select
                  id="ob-industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="mt-2 w-full rounded-input border border-border-strong bg-surface px-3 py-2.5 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                >
                  {ORG_METADATA.industryOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="ob-workforce" className="text-sm font-medium text-ink">
                  Global Workforce Size
                </label>
                <select
                  id="ob-workforce"
                  value={workforce}
                  onChange={(e) => setWorkforce(e.target.value)}
                  className="mt-2 w-full rounded-input border border-border-strong bg-surface px-3 py-2.5 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                >
                  {ORG_METADATA.workforceOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="ob-domain" className="text-sm font-medium text-ink">
                  Primary Domain / Web Endpoint
                </label>
                <div className="mt-2 flex items-stretch overflow-hidden rounded-input border border-border-strong">
                  <span className="flex items-center bg-primary-tint px-3 text-xs text-foreground-muted">https://</span>
                  <input
                    id="ob-domain"
                    readOnly
                    value={ORG_METADATA.domain}
                    className="w-full bg-surface px-3 py-2.5 text-sm text-ink"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="ob-tax" className="text-sm font-medium text-ink">
                    Tax Identification (EIN / VAT / GST)
                  </label>
                  <StatusPill tone="success">{ORG_METADATA.taxBadge}</StatusPill>
                </div>
                <input
                  id="ob-tax"
                  readOnly
                  value={ORG_METADATA.taxId}
                  className="mt-2 w-full rounded-input border border-border-strong bg-primary-tint px-3 py-2.5 text-sm text-ink"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ob-hq" className="text-sm font-medium text-ink">
                  Corporate Headquarters Address &amp; Statutory Jurisdiction
                </label>
                <input
                  id="ob-hq"
                  readOnly
                  value={ORG_METADATA.headquarters}
                  className="mt-2 w-full rounded-input border border-border-strong bg-primary-tint px-3 py-2.5 text-sm text-ink"
                />
              </div>
            </div>
          </PortalCard>

          <PortalCard className="p-6">
            <SectionHeading
              icon={Users}
              title="Primary Administrative &amp; Governance Contacts"
              subtitle="Designated executive, technical, and compliance custodians"
              action={<button type="button" className={`${btnSecondary} px-4 py-2`}>Add Custom Role</button>}
            />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {GOVERNANCE_CONTACTS.map((c) => (
                <div key={c.role} className="rounded-card bg-primary-tint p-4">
                  <Chip>{c.role}</Chip>
                  <p className="mt-3 text-base font-semibold text-ink">{c.name}</p>
                  <p className="text-sm text-foreground-secondary">{c.title}</p>
                  <p className="mt-3 text-xs text-foreground-muted">{c.email}</p>
                  <p className="text-xs text-foreground-muted">{c.phone}</p>
                </div>
              ))}
            </div>
          </PortalCard>

          <PortalCard className="p-6">
            <SectionHeading
              icon={UserCog}
              title="User Ingestion &amp; Directory Synchronization"
              subtitle="Seat commitments, automated SCIM connectors, and RBAC matrix setup"
              action={<StatusPill tone="primary">Automated Ingestion</StatusPill>}
            />

            {/* Seat entitlement */}
            <div className="mt-6 rounded-card bg-primary-tint p-5">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink">{SEAT_ENTITLEMENT.title}</p>
                  <p className="text-sm text-foreground-secondary">{SEAT_ENTITLEMENT.subtitle}</p>
                </div>
                <p className="text-ink">
                  <span className="text-3xl font-bold">{SEAT_ENTITLEMENT.total}</span>{' '}
                  <span className="text-sm text-foreground-secondary">{SEAT_ENTITLEMENT.totalLabel}</span>
                </p>
              </div>
              <div className="mt-4">
                <ProgressBar value={allocated} max={SEAT_ENTITLEMENT.total} label="Seat pools allocated" />
              </div>
              <ul className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                {SEAT_ENTITLEMENT.pools.map((p) => (
                  <li key={p.label} className="flex items-center gap-2 text-foreground-secondary">
                    <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    {p.label} ({p.value})
                  </li>
                ))}
                <li className="text-primary">+ Add Seat Pools</li>
              </ul>
            </div>

            {/* SCIM providers */}
            <fieldset className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <legend className="text-sm font-medium text-ink">
                  Directory &amp; SCIM 2.0 Real-time Sync Provider
                </legend>
                <span className="text-xs font-medium text-primary">Zero-Day Deprovisioning Enforced</span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {SCIM_PROVIDERS.map((p) => {
                  const selected = provider === p.name;
                  return (
                    <label
                      key={p.name}
                      className={`flex cursor-pointer items-center gap-3 rounded-input border px-3 py-3 transition ${
                        selected ? 'border-primary bg-primary-tint' : 'border-border-subtle bg-surface hover:border-primary'
                      }`}
                    >
                      <input
                        type="radio"
                        name="scim-provider"
                        value={p.name}
                        checked={selected}
                        onChange={() => setProvider(p.name)}
                        className="h-4 w-4 accent-primary"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-ink">{p.name}</span>
                        <span className="block truncate text-xs text-foreground-muted">{p.state}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Bulk ingest */}
            <div className="mt-6 flex flex-col gap-4 rounded-card border border-border-subtle p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <CloudUpload className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{BULK_INGEST.title}</p>
                  <p className="text-sm text-foreground-secondary">{BULK_INGEST.detail}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className={`${btnSecondary} px-4 py-2`}>{BULK_INGEST.secondaryAction}</button>
                <button type="button" className={`${btnPrimary} px-4 py-2`}>{BULK_INGEST.primaryAction}</button>
              </div>
            </div>

            {/* Staging preview */}
            <div className="mt-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-ink">Ingest Staging Preview (4 of 250 Parsed)</p>
                <span className="text-xs font-medium text-primary">Zero Schema Warnings</span>
              </div>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[40rem] text-left text-sm">
                  <thead>
                    <tr className="border-b border-border-subtle text-xs uppercase tracking-[0.08em] text-foreground-muted">
                      <th scope="col" className="py-2 pr-3 font-semibold">Subject Name</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Corporate Email</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Assigned Role Preset</th>
                      <th scope="col" className="py-2 pr-3 font-semibold">Org Unit / Dept</th>
                      <th scope="col" className="py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAGED_USERS.map((u) => (
                      <tr key={u.email} className="border-b border-border-subtle last:border-0">
                        <td className="py-3 pr-3">
                          <span className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-tint text-xs font-semibold text-primary">
                              {u.initials}
                            </span>
                            <span className="font-medium text-ink">{u.name}</span>
                          </span>
                        </td>
                        <td className="py-3 pr-3 text-foreground-secondary">{u.email}</td>
                        <td className="py-3 pr-3"><Chip>{u.preset}</Chip></td>
                        <td className="py-3 pr-3 text-foreground-secondary">{u.unit}</td>
                        <td className="py-3"><StatusPill tone="primary">{u.status}</StatusPill></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RBAC */}
            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ink">
                Role-Based Access Control (RBAC) Default Template
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {RBAC_TEMPLATES.map((t) => {
                  const selected = rbac === t.id;
                  return (
                    <label
                      key={t.id}
                      className={`flex cursor-pointer flex-col gap-2 rounded-input border p-4 transition ${
                        selected ? 'border-primary bg-primary-tint' : 'border-border-subtle bg-surface hover:border-primary'
                      }`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-ink">{t.name}</span>
                        <input
                          type="radio"
                          name="rbac-template"
                          value={t.id}
                          checked={selected}
                          onChange={() => setRbac(t.id)}
                          className="h-4 w-4 accent-primary"
                        />
                      </span>
                      <span className="text-xs text-foreground-secondary">{t.detail}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </PortalCard>
        </div>

        {/* Right rail */}
        <div className="min-w-0 space-y-6">
          <PortalCard className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-ink">Provisioning Velocity</h2>
              <StatusPill tone="success">{PROVISIONING_VELOCITY.badge}</StatusPill>
            </div>
            <div className="mt-4">
              <Donut
                title="Provisioning milestones completed"
                centreValue={`${PROVISIONING_VELOCITY.percent}%`}
                centreLabel="COMPLETED"
                data={[
                  { label: 'Completed', value: PROVISIONING_VELOCITY.percent, step: 0 },
                  { label: 'Remaining', value: 100 - PROVISIONING_VELOCITY.percent, step: 2 },
                ]}
                unit="%"
              />
            </div>
            <p className="mt-4 text-sm font-medium text-ink">{PROVISIONING_VELOCITY.milestones}</p>
            <p className="mt-1 text-sm text-foreground-secondary">{PROVISIONING_VELOCITY.next}</p>
            <p className="mt-2 text-xs text-foreground-muted">{PROVISIONING_VELOCITY.remaining}</p>
          </PortalCard>

          <PortalCard className="p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
                {CSM_POD.label}
              </p>
              <span className="text-xs font-medium text-primary">{CSM_POD.availability}</span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                JA
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{CSM_POD.name}</p>
                <p className="text-xs text-foreground-secondary">{CSM_POD.title}</p>
                <p className="text-xs text-primary">{CSM_POD.org}</p>
              </div>
            </div>
            <blockquote className="mt-4 rounded-card bg-primary-tint p-3 text-sm text-foreground-secondary">
              {CSM_POD.quote}
            </blockquote>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" className={`${btnSecondary} px-3 py-2.5`}>
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                {CSM_POD.actions[0]}
              </button>
              <button type="button" className={`${btnPrimary} px-3 py-2.5`}>
                <MessageSquare className="h-4 w-4" aria-hidden="true" />
                {CSM_POD.actions[1]}
              </button>
            </div>
          </PortalCard>

          <PortalCard className="p-5">
            <h2 className="text-base font-semibold text-ink">Pre-Flight Readiness Checklist</h2>
            <p className="mt-1 text-sm text-foreground-secondary">
              Mandatory compliance gates before Part 2 activation.
            </p>
            <ul className="mt-4 space-y-4">
              {READINESS.map((item) => (
                <CheckRow key={item.title} done={item.done}>
                  <span className="block font-medium text-ink">{item.title}</span>
                  <span className="block text-xs text-foreground-secondary">{item.detail}</span>
                </CheckRow>
              ))}
            </ul>
          </PortalCard>

          <PortalCard className="p-5">
            <button type="button" className={`${btnPrimary} w-full py-3`}>
              {ONBOARDING_ACTIONS.primary}
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                className={`${btnSecondary} px-3 py-2.5`}
              >
                {ONBOARDING_ACTIONS.secondary}
              </button>
              <button
                type="button"
                onClick={() => setDraftSaved(true)}
                className={`${btnSecondary} px-3 py-2.5`}
              >
                {draftSaved ? 'Draft saved' : ONBOARDING_ACTIONS.tertiary}
              </button>
            </div>
            <p aria-live="polite" className="mt-3 text-center text-xs text-foreground-muted">
              {draftSaved ? 'Draft saved locally — nothing was sent.' : ONBOARDING_ACTIONS.sessionToken}
            </p>
          </PortalCard>
        </div>
      </div>
    </div>
  );
};
