import React, { useState } from 'react';
import {
  Building2, Check, ChevronRight,
} from 'lucide-react';
import { btnSecondary } from '../../ui';
import {
  INERT_TITLE,
  PortalCard,
  SectionHeading,
  StatusPill,
  btnInertPrimary,
} from '../ui/primitives';
import { Donut } from '../ui/charts';
import {
  ONBOARDING_ACTIONS, ONBOARDING_HEADER, ORG_METADATA,
  PROVISIONING_VELOCITY, WIZARD_STEPS,
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
  const [draftSaved, setDraftSaved] = useState(false);

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

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink">Onboarding Provisioning</h1>

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
        </div>

        {/* Right rail */}
        <div className="min-w-0 space-y-6">
          <PortalCard className="p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-ink">Onboarding Status</h2>
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
            <button type="button" disabled aria-disabled="true" title={INERT_TITLE} className={`${btnInertPrimary} w-full py-3`}>
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
