import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingScreenProps {
  onOpenGetStarted: () => void;
  onOpenContact: () => void;
}

export const PricingScreen: React.FC<PricingScreenProps> = ({
  onOpenGetStarted,
  onOpenContact
}) => {
  const engagements = [
    {
      name: 'Feasibility question',
      badge: 'Hours, not weeks',
      description: 'A single, well-defined question — should we build this, and will it beat what we already do — answered against the material you send.',
      includes: [
        'One business objective and use case',
        'A read of your policy or requirements document',
        'A go / do-not-build recommendation with its confidence band',
        'The evidence trail behind the answer'
      ],
      cta: 'Book a scoping call',
      popular: false,
      onCta: onOpenGetStarted
    },
    {
      name: 'Full blueprint',
      badge: 'Most common',
      description: 'The implementation-grade plan: decision map, opportunity assessment, target architecture, decision records, regulatory control map and gap register.',
      includes: [
        'Everything in a feasibility question',
        'Target architecture traced to your material',
        'Regulatory control map for your specific case',
        'Confidence appendix and gap register',
        'Joint review with a named architect who signs the version'
      ],
      cta: 'Book a scoping call',
      popular: true,
      onCta: onOpenGetStarted
    },
    {
      name: 'Design partner',
      badge: 'Selecting now',
      description: 'For a small number of UK and EU financial services organisations willing to work through the first engagements with us while we are pre-incorporation.',
      includes: [
        'Direct access to both founders',
        'Scope shaped around your first real decision',
        'Deployment inside your tenant where the case needs it',
        'Terms agreed per engagement, in writing'
      ],
      cta: 'Talk to us',
      popular: false,
      onCta: onOpenContact
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="text-center pt-12 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#dce9ff] text-[#2f2ebe] tracking-wider uppercase inline-block mb-3">
          How engagements work
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1c30] mb-4 tracking-tight">
          Priced per engagement, not per seat
        </h1>
        <p className="text-base sm:text-lg text-[#45464d] max-w-2xl mx-auto mb-4">
          BlueprintIQ is an expert-reviewed assessment, not self-serve software. The scope depends on the decision you are trying to make, so every engagement is quoted after a scoping call. We are pre-incorporation and do not publish a rate card we could not stand behind.
        </p>
        <p className="text-sm text-[#76777d] max-w-2xl mx-auto">
          Simple questions come back in hours. The hardest case we scope — several departments, several regulations, interacting systems — is seven days.
        </p>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {engagements.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-white border-2 border-[#4648d4] shadow-xl relative scale-102 ring-4 ring-[#4648d4]/10'
                  : 'bg-white border border-[#c6c6cd]/50 shadow-sm hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4648d4] text-white text-xs font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-[#0b1c30]">{plan.name}</h3>
                  {!plan.popular && (
                    <span className="text-xs font-medium bg-[#eff4ff] text-[#4648d4] px-2.5 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#45464d] mb-6 min-h-[38px] leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-6 pb-6 border-b border-[#f1f5f9]">
                  <div className="text-2xl font-extrabold text-[#0b1c30]">
                    Quoted after scoping
                  </div>
                  <p className="text-xs text-[#76777d] mt-1">
                    No obligation to proceed
                  </p>
                </div>

                {/* Includes List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
                    What it includes:
                  </p>
                  {plan.includes.map((feature, i) => (
                    <div key={i} className="flex items-start text-xs sm:text-sm text-[#45464d] space-x-2.5">
                      <Check className="w-4 h-4 text-[#4648d4] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={plan.onCta}
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                  plan.popular
                    ? 'bg-[#4648d4] hover:bg-[#3738b5] text-white shadow-md'
                    : 'bg-[#eff4ff] hover:bg-[#dce9ff] text-[#4648d4]'
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
