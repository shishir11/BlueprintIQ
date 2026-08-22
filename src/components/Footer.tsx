import React from 'react';
import { TabType } from '../types';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
  brandName?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  brandName = 'BlueprintIQ'
}) => {
  return (
    <footer className="bg-[#131b2e] text-white border-t border-[#213145] w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-white">
              {brandName}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#94a3b8]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <button 
              onClick={() => onSelectTab('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button 
              onClick={() => onSelectTab('team')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Careers
            </button>
          </div>

          {/* Copyright */}
          <div className="text-xs text-[#94a3b8]">
            © {new Date().getFullYear()} BlueprintIQ Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
