import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Gauge,
  BadgeCheck
} from 'lucide-react';
import heroBrainImg from '../../assets/images/ai_neural_brain_hero_1787291410887.jpg';

interface HomeScreenProps {
  onOpenGetStarted: () => void;
  onSelectTab: (tab: 'home' | 'features' | 'team' | 'contact' | 'pricing' | 'about') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenGetStarted,
  onSelectTab,
}) => {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Pitch & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4648d4]">
              AI feasibility and target architecture · UK and EU
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0b1c30] leading-[1.15]">
              Find out if AI will beat what you already do
            </h1>

            <p className="text-sm sm:text-base text-[#45464d] leading-relaxed max-w-xl">
              89% of enterprises now use AI. Only 6% see meaningful profit impact. BlueprintIQ reads the policies, requirements and code you already have, and returns an implementation-grade plan in days — every recommendation traced to a line in your own material, scored for confidence, and signed by a named architect.
            </p>

            <p className="text-xs text-[#64748b]">
              McKinsey, The State of AI, August 2026 — n=1,719 across 97 countries
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenGetStarted}
                id="home-hero-scoping-call-btn"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] text-white font-medium text-sm sm:text-base shadow-md shadow-[#4648d4]/25 hover:shadow-lg hover:shadow-[#4648d4]/35 transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <span>Book a scoping call</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectTab('features')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#cbd5e1] text-[#0b1c30] hover:border-[#4648d4] hover:text-[#4648d4] font-medium text-sm sm:text-base transition-all duration-200 cursor-pointer"
              >
                See what a blueprint contains
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#cbd5e1]/40 bg-[#070e1b] aspect-[4/3] flex items-center justify-center group">
              <img
                src={heroBrainImg}
                alt="AI Neural Network Intelligence Engine"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e1b]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Honest status line (replaces placeholder "trusted by" strip) */}
      <section className="py-8 border-y border-[#e2e8f0]/70 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-[#64748b]">
            Pre-incorporation. Currently selecting design partners in UK and EU financial services.
          </p>
        </div>
      </section>

      {/* 3. Powerful features for modern teams */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight mb-3">
            An implementation-grade answer, in days
          </h2>
          <p className="text-sm sm:text-base text-[#45464d] max-w-xl mx-auto">
            Three things every blueprint does.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Grounded in your own material */}
          <div
            onClick={() => onSelectTab('features')}
            className="bg-white rounded-2xl p-7 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#4648d4] flex items-center justify-center mb-6 ring-1 ring-[#d3e4fe]/80 group-hover:bg-[#4648d4] group-hover:text-white transition-colors duration-200">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3 group-hover:text-[#4648d4] transition-colors">
                Grounded in your own material
              </h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                We read your policies, requirements documents, data schemas and — at the design stage — your code. Every recommendation cites the document and section it came from. A claim that cannot be traced to your material is not written; it goes into a gap register instead, which is a deliverable in its own right.
              </p>
            </div>
          </div>

          {/* Card 2: Scored, not asserted */}
          <div
            onClick={() => onSelectTab('features')}
            className="bg-white rounded-2xl p-7 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#4648d4] flex items-center justify-center mb-6 ring-1 ring-[#d3e4fe]/80 group-hover:bg-[#4648d4] group-hover:text-white transition-colors duration-200">
                <Gauge className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3 group-hover:text-[#4648d4] transition-colors">
                Scored, not asserted
              </h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                Each recommendation carries a confidence band based on how current, complete and consistent the evidence behind it is. The band governs the language: where we cannot verify a policy against its implementation, we say so on the page rather than in a footnote.
              </p>
            </div>
          </div>

          {/* Card 3: Signed by a named architect */}
          <div
            onClick={() => onSelectTab('features')}
            className="bg-white rounded-2xl p-7 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#4648d4] flex items-center justify-center mb-6 ring-1 ring-[#d3e4fe]/80 group-hover:bg-[#4648d4] group-hover:text-white transition-colors duration-200">
                <BadgeCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3 group-hover:text-[#4648d4] transition-colors">
                Signed by a named architect
              </h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                No blueprint leaves without a human expert reviewing it and putting their name to a specific version. We publish the proportion of recommendations senior architects accept unchanged, and we hold ourselves to it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What the review gives you */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-[#edf4ff]/50 to-[#f8f9ff]">
        {/* Concentric subtle background glow circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-[#d3e4fe]/40 opacity-70" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-[#d3e4fe]/50 opacity-80" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#dce9ff]/30 blur-2xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1c30] mb-8 tracking-tight">
            What the review gives you
          </h2>

          {/* Primary CTA Button */}
          <div className="mb-10 flex justify-center">
            <button
              onClick={onOpenGetStarted}
              id="intelligence-scoping-call-btn"
              className="w-full sm:w-auto px-10 py-3.5 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] text-white font-semibold text-base shadow-md shadow-[#4648d4]/30 hover:shadow-lg transition-all active:scale-98 cursor-pointer min-w-[260px]"
            >
              Book a scoping call
            </button>
          </div>

          {/* 3 Checkmark Items in Left-Aligned Card Stack */}
          <div className="max-w-md mx-auto text-left space-y-5">
            {/* Point 1 */}
            <div className="flex items-start space-x-3.5">
              <div className="w-5 h-5 rounded-full text-[#4648d4] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#4648d4]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">
                  Operational Excellence
                </h4>
                <p className="text-xs sm:text-sm text-[#45464d] mt-0.5 leading-relaxed">
                Achieve operational resilience and regulatory alignment: Our review evaluates AI architectures against compliance frameworks to convert regulatory requirements into structured technical controls and delivery plans.
                 </p>
              </div>
            </div>

            {/* Point 2 */}
            <div className="flex items-start space-x-3.5">
              <div className="w-5 h-5 rounded-full text-[#4648d4] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#4648d4]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">
                  Data-Driven Strategy
                </h4>
                <p className="text-xs sm:text-sm text-[#45464d] mt-0.5 leading-relaxed">
                Faster and more repeatable than a fully manual assessment, more implementation-oriented than an architecture repository, and more evidence-controlled than a general-purpose AI report.
                 </p>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex items-start space-x-3.5">
              <div className="w-5 h-5 rounded-full text-[#4648d4] shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#4648d4]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b1c30]">
                  Scalable Innovation
                </h4>
                <p className="text-xs sm:text-sm text-[#45464d] mt-0.5 leading-relaxed">
                Converts customer business and technical artifacts into an evidence-linked, confidence-scored AI Strategy Plan with optional ADRs, customised patterns and expert collaboration
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
