import type { TabType } from '../../types';

/* Query-string routing for the portal. There is no router and none is being added:
   the tab lives in App's existing useState, and `?screen=` mirrors it so a link or a
   refresh lands on the same place. */

export const PORTAL_TABS: TabType[] = [
  'portal-onboarding',
  'portal-billing',
  'portal-invoicing',
  'portal-ingestion',
  'portal-governance',
  'portal-output',
];

const ROUTABLE: TabType[] = ['login', ...PORTAL_TABS];

export const isPortalTab = (tab: TabType): boolean =>
  tab === 'login' || tab.startsWith('portal-');

/** The tab named by `?screen=`, or null when it names nothing routable. */
export function tabFromSearch(search: string): TabType | null {
  const value = new URLSearchParams(search).get('screen');
  if (!value) return null;
  return (ROUTABLE as string[]).includes(value) ? (value as TabType) : null;
}

/** Mirror the current tab into the URL without adding history entries. */
export function syncSearch(tab: TabType): void {
  const url = new URL(window.location.href);
  if (isPortalTab(tab)) url.searchParams.set('screen', tab);
  else url.searchParams.delete('screen');
  window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
}
