import React from 'react';
import { 
  ArrowRight, 
  BarChart3, 
  Globe, 
  ShieldCheck, 
  CheckCircle2,
  Cpu,
  Boxes,
  Sparkles
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0b1c30] leading-[1.15]">
              Scale Your AI Business Faster
            </h1>
            
            <p className="text-sm sm:text-base text-[#45464d] leading-relaxed max-w-xl">
              Your PRD or BRD already asks a different question — &ldquo;how should AI be introduced into their existing business function?&rdquo; — and nobody is answering it. That question needs regulatory judgment and reference architecture, which is exactly what your two founders have. Everything below follows from taking that seriously.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenGetStarted}
                id="home-hero-start-trial-btn"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] text-white font-medium text-sm sm:text-base shadow-md shadow-[#4648d4]/25 hover:shadow-lg hover:shadow-[#4648d4]/35 transition-all duration-200 active:scale-98 cursor-pointer"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
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

      {/* 2. Trusted By Logos Section */}
      <section className="py-10 border-y border-[#e2e8f0]/70 bg-[#f8f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-6">
            Trusted by Innovative Teams Worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20 text-[#334155]">
            {/* Acme Corp */}
            <div className="flex items-center space-x-2.5 font-semibold text-base sm:text-lg text-[#1e293b]">
              <div className="w-6 h-6 flex items-center justify-center text-[#4648d4]">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="tracking-tight">Acme Corp</span>
            </div>

            {/* Globex */}
            <div className="flex items-center space-x-2.5 font-semibold text-base sm:text-lg text-[#1e293b]">
              <div className="w-6 h-6 flex items-center justify-center text-[#4648d4]">
                <Globe className="w-5 h-5" />
              </div>
              <span className="tracking-tight">Globex</span>
            </div>

            {/* Initech */}
            <div className="flex items-center space-x-2.5 font-semibold text-base sm:text-lg text-[#1e293b]">
              <div className="w-6 h-6 flex items-center justify-center text-[#4648d4]">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="tracking-tight">Initech</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Powerful features for modern teams */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1c30] tracking-tight mb-3">
            The mission control for your organization's AI journey.
          </h2>
          <p className="text-sm sm:text-base text-[#45464d] max-w-xl mx-auto">
               From strategy to impact see your AI transformation in real time.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Advanced Analytics */}
          <div 
            onClick={() => onSelectTab('features')}
            className="bg-white rounded-2xl p-7 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#4648d4] flex items-center justify-center mb-6 ring-1 ring-[#d3e4fe]/80 group-hover:bg-[#4648d4] group-hover:text-white transition-colors duration-200">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3 group-hover:text-[#4648d4] transition-colors">
                Advanced Analytics
              </h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                  Multi-agent intelligence, one unified transformation blueprint.
              </p>
            </div>
          </div>

          {/* Card 2: AI Strategy */}
          <div 
            onClick={() => onSelectTab('features')}
            className="bg-white rounded-2xl p-7 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#4648d4] flex items-center justify-center mb-6 ring-1 ring-[#d3e4fe]/80 group-hover:bg-[#4648d4] group-hover:text-white transition-colors duration-200">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3 group-hover:text-[#4648d4] transition-colors">
                AI Strategy
              </h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                The AI Transformation Blueprint will be the company’s principal product. It will provide a comprehensive organisation-level strategy covering current-state assessment, target architecture, model options, data requirements, MLOps, deployment, investment, build-versus-buy decisions, and resourcing.
              </p>
            </div>
          </div>

          {/* Card 3: Architectural Decision Record */}
          <div 
            onClick={() => onSelectTab('features')}
            className="bg-white rounded-2xl p-7 border border-[#e2e8f0] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#4648d4] flex items-center justify-center mb-6 ring-1 ring-[#d3e4fe]/80 group-hover:bg-[#4648d4] group-hover:text-white transition-colors duration-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1c30] mb-3 group-hover:text-[#4648d4] transition-colors">
                Architectural Decision Record
              </h3>
              <p className="text-sm text-[#45464d] leading-relaxed">
                Your data is protected with enterprise-grade encryption and compliance standards. Rest easy knowing your business is secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Empowering Enterprise Intelligence */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#f8f9ff] via-[#edf4ff]/50 to-[#f8f9ff]">
        {/* Concentric subtle background glow circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-[#d3e4fe]/40 opacity-70" />
          <div className="absolute w-[450px] h-[450px] rounded-full border border-[#d3e4fe]/50 opacity-80" />
          <div className="absolute w-[300px] h-[300px] rounded-full bg-[#dce9ff]/30 blur-2xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1c30] mb-8 tracking-tight">
            Empowering Enterprise Intelligence
          </h2>

          {/* Primary CTA Button */}
          <div className="mb-10 flex justify-center">
            <button
              onClick={onOpenGetStarted}
              id="intelligence-start-trial-btn"
              className="w-full sm:w-auto px-10 py-3.5 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] text-white font-semibold text-base shadow-md shadow-[#4648d4]/30 hover:shadow-lg transition-all active:scale-98 cursor-pointer min-w-[260px]"
            >
              Start Your Free Trial
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
