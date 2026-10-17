import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  AUTH_MESSAGES, PORTAL_ORG, findByEmail,
  type PortalOrg, type PortalUser,
} from '../data/accounts';

/* In-memory portal session. Deliberately not persisted to any browser storage mechanism and no
   cookie, no identity SDK. A refresh therefore signs out, which is correct for a static demo. */

export type PortalCredentials = { email: string; password: string };

interface PortalSessionValue {
  user: PortalUser | null;
  org: PortalOrg | null;
  signedIn: boolean;
  pending: boolean;
  error: string | null;
  signIn: (credentials: PortalCredentials) => Promise<PortalUser | null>;
  signOut: () => void;
  clearError: () => void;
}

const PortalSessionContext = createContext<PortalSessionValue | null>(null);

/** Deliberate latency so the loading state is real rather than theoretical. */
const SIGN_IN_DELAY_MS = 600;
const wait = (ms: number) => new Promise<void>((resolve) => { setTimeout(resolve, ms); });

export const PortalSessionProvider: React.FC<{
  children: React.ReactNode;
  onSignedOut?: () => void;
}> = ({ children, onSignedOut }) => {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(async (credentials: PortalCredentials) => {
    setError(null);

    if (!credentials.email.trim()) {
      setError(AUTH_MESSAGES.emptyEmail);
      return null;
    }

    setPending(true);
    try {
      await wait(SIGN_IN_DELAY_MS);
      const found = findByEmail(credentials.email, credentials.password);

      if (!found) {
        setError(AUTH_MESSAGES.badCredentials);
        return null;
      }
      setUser(found);
      return found;
    } finally {
      setPending(false);
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setError(null);
    onSignedOut?.();
  }, [onSignedOut]);

  const clearError = useCallback(() => { setError(null); }, []);

  const value = useMemo<PortalSessionValue>(() => ({
    user,
    org: user ? PORTAL_ORG : null,
    signedIn: user !== null,
    pending,
    error,
    signIn,
    signOut,
    clearError,
  }), [user, pending, error, signIn, signOut, clearError]);

  return <PortalSessionContext.Provider value={value}>{children}</PortalSessionContext.Provider>;
};

export function usePortalSession(): PortalSessionValue {
  const ctx = useContext(PortalSessionContext);
  if (!ctx) throw new Error('usePortalSession must be used inside a PortalSessionProvider');
  return ctx;
}
