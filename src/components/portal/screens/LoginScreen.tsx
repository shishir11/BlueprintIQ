import React, { useState } from 'react';
import {
  AlertCircle, ArrowRight, Building2, Gem, KeyRound, Loader2, Lock, Mail, ShieldCheck,
} from 'lucide-react';
import { btnPrimary } from '../../ui';
import { Field } from '../ui/Field';
import { SegmentedControl, type SegmentOption } from '../ui/SegmentedControl';
import { usePortalSession } from '../session/PortalSession';
import { DEMO_CREDENTIALS } from '../data/accounts';

/* Login / SSO gateway — static UI built from `login sso.png`.
   No auth provider and no network call: credentials are matched in memory by PortalSession.
   The content below is supplied mockup placeholder data. */

type AuthMode = 'sso' | 'email';

const MODES: SegmentOption<AuthMode>[] = [
  { id: 'sso', label: 'Single Sign-On (SSO)', icon: Building2 },
  { id: 'email', label: 'Work Email', icon: Lock },
];

const IDP_PROVIDER = {
  title: 'Custom SAML 2.0 Endpoint',
  detail: 'PingFederate, OneLogin, Shibboleth or ADFS',
  action: 'Direct Connect',
};

const AUTHORITY = {
  heading: 'StrataCloud Global Authority',
  body:
    'Empowering 500+ global enterprises to automate cloud workflows, provision secure access, ' +
    'and stay compliant across multitenant clusters.',
};

const ZERO_TRUST = {
  heading: 'Zero Trust Architecture',
  spec: '256-Bit AES / TLS 1.3',
  chips: ['SOC2 Type II', 'ISO 27001', 'GDPR Ready', 'HIPAA Enforced'],
};

interface LoginScreenProps {
  onSignedIn?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSignedIn }) => {
  const { signIn, pending, error, clearError } = usePortalSession();
  const [mode, setMode] = useState<AuthMode>('sso');
  // Held per field so switching tabs never discards what was typed.
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending) return;
    const user = await signIn(
      mode === 'sso'
        ? { mode: 'sso', domain }
        : { mode: 'email', email, password: secret }
    );
    if (user) onSignedIn?.();
  };

  const changeMode = (next: AuthMode) => {
    setMode(next);
    clearError();
  };

  const fill = (row: (typeof DEMO_CREDENTIALS)[number]) => {
    clearError();
    if (row.route === 'sso') {
      setMode('sso');
      setDomain(row.enter);
    } else {
      setMode('email');
      setEmail(row.enter);
      setSecret(row.password ?? '');
    }
  };

  const errorId = 'portal-login-error';
  const invalidDomain = Boolean(error) && mode === 'sso';
  const invalidEmail = Boolean(error) && mode === 'email';

  return (
    <div className="flex w-full justify-center bg-background px-4 py-12 sm:px-6 sm:py-16">
      <div className="w-full max-w-2xl">
        <div className="overflow-hidden rounded-card border border-border-subtle bg-surface shadow-card">
          <div className="h-1.5 bg-primary" />

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex items-center justify-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-input bg-primary">
                <Gem className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-xl font-semibold tracking-tight text-ink">
                Blueprint<span className="text-primary">IQ</span>
              </span>
            </div>

            <h1 className="mt-6 text-center text-2xl font-bold text-ink sm:text-3xl">
              Enterprise Gateway
            </h1>
            <p className="mt-2 text-center text-sm text-foreground-secondary">
              Unified Directory, Identity Provisioning &amp; Zero-Trust Access
            </p>

            <div className="mt-8">
              <SegmentedControl
                options={MODES}
                value={mode}
                onChange={changeMode}
                idPrefix="portal-login"
                ariaLabel="Authentication method"
              />
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
              {mode === 'sso' ? (
                <div id="portal-login-panel-sso" role="tabpanel" aria-labelledby="portal-login-tab-sso">
                  <Field
                    id="portal-login-domain"
                    label="Corporate Domain or Tenant ID"
                    caption="Identity Router"
                    icon={Building2}
                    suffix=".strata.id"
                    placeholder="acme-corp.com or strata-org-842"
                    autoComplete="organization"
                    help="Federated routes dynamically resolve your Identity Provider (IdP) metadata."
                    value={domain}
                    onChange={(v) => { if (error) clearError(); setDomain(v); }}
                    invalid={invalidDomain}
                    describedBy={error ? errorId : undefined}
                    disabled={pending}
                  />
                </div>
              ) : (
                <div
                  id="portal-login-panel-email"
                  role="tabpanel"
                  aria-labelledby="portal-login-tab-email"
                  className="space-y-6"
                >
                  <Field
                    id="portal-login-email"
                    label="Work Email"
                    caption="Directory Lookup"
                    icon={Mail}
                    type="email"
                    placeholder="e.vance@acmeglobal.com"
                    autoComplete="username"
                    value={email}
                    onChange={(v) => { if (error) clearError(); setEmail(v); }}
                    invalid={invalidEmail}
                    describedBy={error ? errorId : undefined}
                    disabled={pending}
                  />
                  <Field
                    id="portal-login-secret"
                    label="Password or Access Code"
                    icon={Lock}
                    type="password"
                    placeholder="Enter your access code"
                    autoComplete="current-password"
                    help="Single-use codes expire five minutes after they are issued."
                    value={secret}
                    onChange={(v) => { if (error) clearError(); setSecret(v); }}
                    invalid={invalidEmail}
                    describedBy={error ? errorId : undefined}
                    disabled={pending}
                  />
                </div>
              )}

              <div id={errorId} role="alert" aria-live="polite">
                {error && (
                  <p className="flex items-center gap-2 text-sm font-medium text-danger">
                    <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {error}
                  </p>
                )}
              </div>

              <button type="submit" disabled={pending} className={`${btnPrimary} w-full py-3.5`}>
                {pending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    <span>Authenticating</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate with Organization</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <span className="h-px flex-1 bg-border-subtle" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-muted">
                Enterprise IdP Providers
              </span>
              <span className="h-px flex-1 bg-border-subtle" />
            </div>

            <div className="mt-6 flex flex-col gap-4 rounded-card bg-primary-tint p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <KeyRound className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-ink">{IDP_PROVIDER.title}</p>
                  <p className="mt-1 text-sm text-foreground-secondary">{IDP_PROVIDER.detail}</p>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-button border border-border-subtle bg-surface px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
              >
                {IDP_PROVIDER.action}
              </button>
            </div>
          </div>

          <div className="border-t border-border-subtle bg-primary-tint px-6 py-6 sm:px-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              <p className="text-sm font-semibold text-ink">{AUTHORITY.heading}</p>
            </div>
            <p className="mt-2 text-sm text-foreground-secondary">{AUTHORITY.body}</p>
          </div>
        </div>

        <div className="mt-6 rounded-card bg-primary-tint px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-success" aria-hidden="true" />
              <p className="text-sm font-semibold text-ink">{ZERO_TRUST.heading}</p>
            </div>
            <p className="text-sm text-foreground-muted">{ZERO_TRUST.spec}</p>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {ZERO_TRUST.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-input border border-border-subtle bg-surface px-3 py-2 text-center text-xs font-medium text-ink"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        {/* Demo credentials — development only, excluded from production builds */}
        {import.meta.env.DEV && (
          <div
            id="portal-demo-credentials"
            className="mt-6 rounded-card border border-border-subtle bg-surface p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground-muted">
              Demo credentials (development only)
            </p>
            <ul className="mt-3 space-y-2">
              {DEMO_CREDENTIALS.map((row) => (
                <li key={`${row.route}-${row.enter}`}>
                  <button
                    type="button"
                    onClick={() => fill(row)}
                    className="flex w-full flex-wrap items-center justify-between gap-2 rounded-input border border-border-subtle px-3 py-2 text-left text-xs transition hover:border-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
                  >
                    <span className="font-medium text-ink">
                      {row.route === 'sso' ? 'SSO' : 'Email'} · {row.enter}
                      {row.password ? ` / ${row.password}` : ''}
                    </span>
                    <span className="text-foreground-muted">{row.signsInAs}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
