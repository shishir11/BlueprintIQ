import React, { useEffect, useState } from 'react';
import { TabType, TeamMember } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/screens/HomeScreen';
import { FeaturesScreen } from './components/screens/FeaturesScreen';
import { TeamScreen } from './components/screens/TeamScreen';
import { ContactScreen } from './components/screens/ContactScreen';
import { PricingScreen } from './components/screens/PricingScreen';
import { GetStartedModal } from './components/modals/GetStartedModal';
import { WatchDemoModal } from './components/modals/WatchDemoModal';
import { HelpCenterModal } from './components/modals/HelpCenterModal';
import { CareersModal } from './components/modals/CareersModal';
import { TeamMemberModal } from './components/modals/TeamMemberModal';
import { LoginScreen } from './components/portal/screens/LoginScreen';
import { PortalRouter } from './components/portal/PortalRouter';
import { PortalSessionProvider } from './components/portal/session/PortalSession';
import { isPortalTab, syncSearch, tabFromSearch } from './components/portal/routing';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>(() => tabFromSearch(window.location.search) ?? 'home');
  const [getStartedOpen, setGetStartedOpen] = useState(false);
  const [watchDemoOpen, setWatchDemoOpen] = useState(false);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Scroll to top on tab change
  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Portal screens render without the marketing chrome.
  const isPortal = isPortalTab(currentTab);

  // Mirror the tab into ?screen= so a refresh lands on the same screen.
  useEffect(() => { syncSearch(currentTab); }, [currentTab]);

  return (
    <PortalSessionProvider onSignedOut={() => handleSelectTab('home')}>
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30] relative selection:bg-[#4648d4]/20 selection:text-[#4648d4]">
      {/* Top Navbar — marketing only */}
      {!isPortal && (
        <Navbar
          currentTab={currentTab}
          onSelectTab={handleSelectTab}
          onOpenGetStarted={() => setGetStartedOpen(true)}
          brandName="BlueprintIQ"
        />
      )}

      {/* Main Content View Container */}
      <main className="flex-grow flex flex-col" id="main-content">
        {currentTab === 'home' && (
          <HomeScreen
            onOpenGetStarted={() => setGetStartedOpen(true)}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'features' && (
          <FeaturesScreen
            onOpenGetStarted={() => setGetStartedOpen(true)}
            onOpenWatchDemo={() => setWatchDemoOpen(true)}
            onSelectTab={handleSelectTab}
          />
        )}

        {currentTab === 'team' && (
          <TeamScreen
            onOpenCareers={() => setCareersOpen(true)}
            onSelectMember={(member: any) => setSelectedMember(member)}
            onOpenContact={() => handleSelectTab('contact')}
          />
        )}

        {currentTab === 'contact' && (
          <ContactScreen
            onOpenHelpCenter={() => setHelpCenterOpen(true)}
          />
        )}

        {currentTab === 'pricing' && (
          <PricingScreen
            onOpenGetStarted={() => setGetStartedOpen(true)}
            onOpenContact={() => handleSelectTab('contact')}
          />
        )}

        {currentTab === 'login' && <LoginScreen onSignedIn={() => handleSelectTab('portal-output')} />}

        {currentTab !== 'login' && isPortal && (
          <PortalRouter currentTab={currentTab} onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'about' && (
          <TeamScreen
            onOpenCareers={() => setCareersOpen(true)}
            onSelectMember={(member: any) => setSelectedMember(member)}
            onOpenContact={() => handleSelectTab('contact')}
          />
        )}
      </main>

      {/* Screen Switcher Floating Bar — development only, excluded from production builds */}
      {import.meta.env.DEV && (
      <aside
        aria-label="Screen Quick Switcher"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#0f172a]/95 text-white backdrop-blur-md px-3 py-2 rounded-full shadow-2xl border border-[#334155] flex items-center space-x-1.5 text-xs font-medium"
      >
        <button
          onClick={() => handleSelectTab('home')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'bg-[#4648d4] text-white font-semibold shadow-sm'
              : 'text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleSelectTab('features')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentTab === 'features'
              ? 'bg-[#4648d4] text-white font-semibold shadow-sm'
              : 'text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          Features
        </button>
        <button
          onClick={() => handleSelectTab('team')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentTab === 'team' || currentTab === 'about'
              ? 'bg-[#4648d4] text-white font-semibold shadow-sm'
              : 'text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          Team
        </button>
        <button
          onClick={() => handleSelectTab('pricing')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentTab === 'pricing'
              ? 'bg-[#4648d4] text-white font-semibold shadow-sm'
              : 'text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          Pricing
        </button>
        <button
          onClick={() => handleSelectTab('contact')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            currentTab === 'contact'
              ? 'bg-[#4648d4] text-white font-semibold shadow-sm'
              : 'text-[#cbd5e1] hover:text-white hover:bg-[#1e293b]'
          }`}
        >
          Contact
        </button>
      </aside>
      )}

      {/* Global Footer — marketing only */}
      {!isPortal && (
        <Footer
          onSelectTab={handleSelectTab}
          brandName="BlueprintIQ"
        />
      )}

      {/* Interactive Modals */}
      <GetStartedModal
        isOpen={getStartedOpen}
        onClose={() => setGetStartedOpen(false)}
      />

      <WatchDemoModal
        isOpen={watchDemoOpen}
        onClose={() => setWatchDemoOpen(false)}
        onOpenGetStarted={() => setGetStartedOpen(true)}
      />

      <HelpCenterModal
        isOpen={helpCenterOpen}
        onClose={() => setHelpCenterOpen(false)}
      />

      <CareersModal
        isOpen={careersOpen}
        onClose={() => setCareersOpen(false)}
      />

      <TeamMemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
        onOpenContact={() => handleSelectTab('contact')}
      />
    </div>
    </PortalSessionProvider>
  );
}
