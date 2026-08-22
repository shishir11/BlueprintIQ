import React, { useState } from 'react';
import { TabType } from '../types';
import { Menu, X, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenGetStarted: () => void;
  brandName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenGetStarted,
  brandName = 'BlueprintIQ'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: TabType; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'team', label: 'Team' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f8f9ff]/95 backdrop-blur-md border-b border-[#d3e4fe]/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => { onSelectTab('home'); }}
            className="flex items-center space-x-2 text-left focus:outline-none group cursor-pointer"
            id="nav-brand-btn"
          >
            <span className="text-xl font-bold tracking-tight text-[#0b1c30] group-hover:text-[#4648d4] transition-colors">
              {brandName}
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-9" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onSelectTab(link.id)}
                id={`nav-link-${link.id}`}
                className={`text-sm font-medium transition-all py-1.5 relative cursor-pointer ${
                  isActive
                    ? 'text-[#4648d4] font-semibold'
                    : 'text-[#45464d] hover:text-[#4648d4]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#4648d4] rounded-full animate-in fade-in duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Trailing Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={onOpenGetStarted}
            id="nav-get-started-btn"
            className="bg-[#4648d4] hover:bg-[#3738b5] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-sm shadow-[#4648d4]/25 hover:shadow-md hover:shadow-[#4648d4]/35 active:scale-98 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="p-2 rounded-md text-[#45464d] hover:text-[#0b1c30] hover:bg-[#e5eeff] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#d3e4fe] bg-[#ffffff] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onSelectTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#eff4ff] text-[#4648d4] font-semibold'
                    : 'text-[#45464d] hover:bg-[#f8f9ff] hover:text-[#0b1c30]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#eff4ff] flex flex-col space-y-2">
            <button
              onClick={() => {
                onSelectTab('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2 text-sm font-medium text-[#45464d] hover:text-[#0b1c30]"
            >
              Login
            </button>
            <button
              onClick={() => {
                onOpenGetStarted();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#4648d4] text-white rounded-lg text-sm font-semibold shadow-sm text-center flex items-center justify-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
