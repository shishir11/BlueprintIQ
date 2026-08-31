import React, { useState } from 'react';
import { CORE_CAPABILITIES, ADR_RECORDS } from '../../data/appData';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  FileText,
  Gauge,
  BadgeCheck,
  ClipboardList,
  Ruler
} from 'lucide-react';

interface FeaturesScreenProps {
  onOpenGetStarted: () => void;
  onOpenWatchDemo: () => void;
  onSelectTab: (tab: 'features' | 'team' | 'contact' | 'pricing' | 'about') => void;
}

export const FeaturesScreen: React.FC<FeaturesScreenProps> = ({
  onOpenGetStarted,
  onOpenWatchDemo,
  onSelectTab,
}) => {
  const [selectedAdrIndex, setSelectedAdrIndex] = useState(0);
  const [adrExpanded, setAdrExpanded] = useState(false);

  const activeAdr = ADR_RECORDS[selectedAdrIndex];

  // Helper to render lucide icon dynamically
  const renderIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-[#4648d4]";
    switch (iconName) {
      case 'FileText': return <FileText className={iconClass} />;
      case 'Gauge': return <Gauge className={iconClass} />;
      case 'ShieldCheck': return <ShieldCheck className={iconClass} />;
      case 'BadgeCheck': return <BadgeCheck className={iconClass} />;
      case 'ClipboardList': return <ClipboardList className={iconClass} />;
      case 'Ruler': return <Ruler className={iconClass} />;
      default: return <FileText className={iconClass} />;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 text-center bg-gradient-to-b from-[#eff4ff]/60 via-[#f8f9ff] to-[#f8f9ff]">
        {/* Subtle background glow / circuit tech wave */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-pattern-subtle" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d3e4fe]/50 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-[#dce9ff] text-[#2f2ebe] tracking-wider uppercase mb-5">
            What a blueprint contains
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0b1c30] leading-tight mb-6">
            Every recommendation traced to a line in <span className="text-[#4648d4]">your own material</span>
          </h1>
          <p className="text-base sm:text-lg text-[#45464d] max-w-2xl mx-auto leading-relaxed mb-8">
            We read the policies, requirements and — at the design stage — code you already have, and return an implementation-grade plan in days. Each recommendation cites its source, carries a confidence band, and is signed by a named architect. Where the honest answer is not to build, we say so.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenGetStarted}
              id="hero-book-scoping-call-btn"
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] text-white font-semibold text-base shadow-sm shadow-[#4648d4]/30 hover:shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Book a scoping call
            </button>
            <button
              onClick={onOpenWatchDemo}
              id="hero-watch-demo-btn"
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-white hover:bg-[#f8f9ff] text-[#0b1c30] font-semibold text-base border border-[#c6c6cd]/80 hover:border-[#4648d4] shadow-sm transition-all flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
            >
              <Play className="w-4 h-4 text-[#4648d4] fill-[#4648d4]" />
              <span>Watch how an engagement runs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0b1c30] mb-3 tracking-tight">
            What every blueprint does
          </h2>
          <p className="text-base text-[#45464d] max-w-xl mx-auto">
            Six things a general assistant cannot do: ground every claim in your material, score it, and stand behind it.
          </p>
        </div>

        {/* 6 Capabilities Grid (2x3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_CAPABILITIES.map((capability) => (
            <div
              key={capability.id}
              className="bg-white rounded-xl p-6 sm:p-7 border border-[#c6c6cd]/40 shadow-[0_2px_8px_rgba(15,23,42,0.04)] card-hover flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-[#eff4ff] flex items-center justify-center mb-5 ring-1 ring-[#d3e4fe]/70">
                  {renderIcon(capability.icon)}
                </div>
                <h3 className="text-lg font-bold text-[#0b1c30] mb-2.5">
                  {capability.title}
                </h3>
                <p className="text-sm text-[#45464d] leading-relaxed">
                  {capability.description}
                </p>
              </div>
              {capability.metric && (
                <div className="mt-5 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#4648d4] font-semibold">
                  <span>What you get</span>
                  <span className="bg-[#eff4ff] px-2 py-0.5 rounded text-[#4648d4]">{capability.metric}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ADVANCED CAPABILITY: ADR Section */}
      <section className="py-16 md:py-20 bg-[#eff4ff]/40 border-y border-[#d3e4fe]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-[#dce9ff] text-[#2f2ebe] tracking-wider uppercase mb-3">
                  Inside the blueprint
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0b1c30] tracking-tight">
                  Decision records you can reproduce
                </h2>
              </div>

              <p className="text-base text-[#45464d] leading-relaxed">
                Every recommendation is recorded as a decision: the context we found in your material, what we decided, the confidence behind it, and the consequences. When a risk committee asks about it eighteen months later, the same finding can be reproduced from its evidence trail. The examples on the right are synthetic, not customer work.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4648d4] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-[#0b1c30]">
                    Context traced to the document and section it came from.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4648d4] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-[#0b1c30]">
                    A confidence band that governs the language we use.
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-[#4648d4] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-[#0b1c30]">
                    Signed off by a named architect against a specific version.
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setAdrExpanded(!adrExpanded)}
                  className="inline-flex items-center text-[#4648d4] hover:text-[#3738b5] font-semibold text-sm group cursor-pointer"
                >
                  <span>{adrExpanded ? 'Collapse the record' : 'Read a full record'}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right ADR Interactive Card Column */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl border border-[#c6c6cd]/50 shadow-sm p-6 sm:p-7 relative transition-all">
                {/* ADR Tab Selector */}
                <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-4 mb-4">
                  <div className="flex space-x-2">
                    {ADR_RECORDS.map((adr, index) => (
                      <button
                        key={adr.id}
                        onClick={() => setSelectedAdrIndex(index)}
                        className={`text-xs px-2.5 py-1 rounded font-medium transition-all ${
                          selectedAdrIndex === index
                            ? 'bg-[#4648d4] text-white'
                            : 'bg-[#f1f5f9] text-[#45464d] hover:bg-[#e2e8f0]'
                        }`}
                      >
                        {adr.id}
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-[#76777d]">Synthetic example</span>
                </div>

                {/* Card Title & Authors */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-[#0b1c30]">
                    {activeAdr.title}
                  </h3>
                  <div className="flex items-center -space-x-1.5">
                    {activeAdr.authors.map((author, i) => (
                      <div
                        key={i}
                        title={author.name}
                        className="w-7 h-7 rounded-full bg-[#dce9ff] text-[#2f2ebe] border-2 border-white flex items-center justify-center text-[10px] font-bold"
                      >
                        {author.initials}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div className="mb-4 text-xs font-semibold text-[#16a34a] flex items-center space-x-1">
                  <span>Status:</span>
                  <span className="bg-[#dcfce7] text-[#15803d] px-2 py-0.5 rounded text-[11px] font-semibold">
                    {activeAdr.status}
                  </span>
                </div>

                <div className="h-[1px] bg-[#e5e7eb] w-full mb-4" />

                {/* Context Section */}
                <div className="mb-5">
                  <p className="text-xs font-bold text-[#0b1c30] mb-2 uppercase tracking-wide">
                    Context
                  </p>
                  {adrExpanded ? (
                    <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed bg-[#f8f9ff] p-3 rounded-lg border border-[#e5eeff]">
                      {activeAdr.context}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-2 bg-[#d3e4fe] rounded-full w-full opacity-80 animate-pulse" />
                      <div className="h-2 bg-[#d3e4fe] rounded-full w-4/5 opacity-80 animate-pulse" />
                      <div className="h-2 bg-[#d3e4fe] rounded-full w-2/3 opacity-80 animate-pulse" />
                    </div>
                  )}
                </div>

                {/* Decision Section */}
                <div>
                  <p className="text-xs font-bold text-[#0b1c30] mb-2 uppercase tracking-wide">
                    Decision
                  </p>
                  {adrExpanded ? (
                    <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed bg-[#f8f9ff] p-3 rounded-lg border border-[#e5eeff]">
                      {activeAdr.decision}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="h-2 bg-[#d3e4fe] rounded-full w-full opacity-80 animate-pulse" />
                      <div className="h-2 bg-[#d3e4fe] rounded-full w-5/6 opacity-80 animate-pulse" />
                    </div>
                  )}
                </div>

                {adrExpanded && (
                  <div className="mt-4 pt-3 border-t border-[#f1f5f9]">
                    <p className="text-xs font-bold text-[#0b1c30] mb-1 uppercase tracking-wide">
                      Consequences & Outcome
                    </p>
                    <p className="text-xs sm:text-sm text-[#45464d]">
                      {activeAdr.consequences}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Call-to-Action Section */}
      <section className="bg-[#0f172a] text-white py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-grid-glow pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Put a real decision in front of us
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] max-w-xl mx-auto mb-8 leading-relaxed">
            Bring the use case you are weighing up. We will tell you whether we can assess it, what we would need, and how long it would take. We are pre-incorporation and selecting design partners in UK and EU financial services.
          </p>
          <button
            onClick={onOpenGetStarted}
            id="cta-book-scoping-call-btn"
            className="px-8 py-3.5 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] text-white font-semibold text-base shadow-lg shadow-[#4648d4]/40 hover:shadow-[#4648d4]/60 transition-all active:scale-98 cursor-pointer"
          >
            Book a scoping call
          </button>
        </div>
      </section>
    </div>
  );
};
