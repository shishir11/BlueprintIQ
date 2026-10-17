import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Gem, Loader2, Lock, Mail, ShieldCheck } from 'lucide-react';
import { btnPrimary } from '../../ui';
import { Field } from '../ui/Field';
import { usePortalSession } from '../session/PortalSession';

/* Customer gateway — work email and password only. There is no SSO route and no identity
   provider: credentials are matched in memory by PortalSession. Demo accounts are documented in
   the PR body and the project doc, deliberately not advertised in the UI. */

const AUTHORITY = {
  heading: 'BlueprintIQ Enterprise Directory',
  body:
    'Federated access for organisations assessed by BlueprintIQ. Your administrator controls ' +
    'membership, roles and retention.',
};

/* Wording taken from the approved security answer in src/data/appData.ts. These describe what the
   product is designed for; none of them asserts a certification or an audit result. */
const SECURITY_POSTURE = {
  heading: 'Security posture',
  chips: ['Data isolation', 'Audit logging', 'Retention control', 'In-tenant deployment'],
};

interface LoginScreenProps {
  onSignedIn?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSignedIn }) => {
  const { signIn, pending, error, clearError } = usePortalSession();
  const [email, setEmail] = useState('');
  const [secret, setSecret] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (pending) return;
    const user = await signIn({ email, password: secret });
    if (user) onSignedIn?.();
  };

  const errorId = 'portal-login-error';
  const invalid = Boolean(error);

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

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
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
                invalid={invalid}
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
                invalid={invalid}
                describedBy={error ? errorId : undefined}
                disabled={pending}
              />

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
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
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
          <div className="flex flex-wrap items-center gap-2">
            <ShieldCheck className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
            <p className="text-sm font-semibold text-ink">{SECURITY_POSTURE.heading}</p>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SECURITY_POSTURE.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-input border border-border-subtle bg-surface px-3 py-2 text-center text-xs font-medium text-ink"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
