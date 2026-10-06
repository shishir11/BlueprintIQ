import React, { useEffect } from 'react';
import type { TabType } from '../../types';
import { PortalShell } from './PortalShell';
import { usePortalSession } from './session/PortalSession';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { BillingSetupScreen } from './screens/BillingSetupScreen';
import { InvoicingScreen } from './screens/InvoicingScreen';
import { IngestionScreen } from './screens/IngestionScreen';
import { GovernanceScreen } from './screens/GovernanceScreen';
import { OutputScreen } from './screens/OutputScreen';

/* Picks the portal screen for the current tab and enforces the session guard.
   Kept out of App.tsx so the marketing shell stays a three-line change. */

interface PortalRouterProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

const SCREENS: Partial<Record<TabType, React.FC>> = {
  'portal-onboarding': OnboardingScreen,
  'portal-billing': BillingSetupScreen,
  'portal-invoicing': InvoicingScreen,
  'portal-ingestion': IngestionScreen,
  'portal-governance': GovernanceScreen,
  'portal-output': OutputScreen,
};

export const PortalRouter: React.FC<PortalRouterProps> = ({ currentTab, onSelectTab }) => {
  const { signedIn } = usePortalSession();

  // A portal URL opened without a session goes back to the gateway.
  useEffect(() => {
    if (!signedIn) onSelectTab('login');
  }, [signedIn, onSelectTab]);

  if (!signedIn) return null;

  const Screen = SCREENS[currentTab];
  if (!Screen) return null;

  return (
    <PortalShell currentTab={currentTab} onSelectTab={onSelectTab}>
      <Screen />
    </PortalShell>
  );
};
