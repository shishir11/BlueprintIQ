import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Building } from 'lucide-react';

interface PricingScreenProps {
  onOpenGetStarted: () => void;
  onOpenContact: () => void;
}

export const PricingScreen: React.FC<PricingScreenProps> = ({
  onOpenGetStarted,
  onOpenContact
}) => {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: 'Starter',
      badge: 'Pilot Ready',
      monthlyPrice: 49,
      annualPrice: 39,
      description: 'Ideal for small engineering pods adopting automated decision records and AI workflows.',
      features: [
        'Up to 15 team members',
        'Built-in ADR templates & history',
        'Standard Git & Slack integrations',
        'Community & standard email support',
        '10GB vector search index storage'
      ],
      cta: 'Start Free Trial',
      popular: false,
      onCta: onOpenGetStarted
    },
    {
      name: 'Professional',
      badge: 'Most Popular',
      monthlyPrice: 199,
      annualPrice: 159,
      description: 'Comprehensive AI operations for high-growth engineering organizations and distributed teams.',
      features: [
        'Unlimited team members',
        'Custom fine-tuned AI Agents',
        'Automated CI/CD compliance gatekeeper',
        'Multi-region high availability',
        'SOC2 Type II compliance reports',
        'Dedicated Solutions Architect (24/7 SLA)'
      ],
      cta: 'Get Started Now',
      popular: true,
      onCta: onOpenGetStarted
    },
    {
      name: 'Enterprise',
      badge: 'Custom Deployment',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      description: 'For regulated enterprises requiring on-premise air-gapped deployments and custom SLAs.',
      features: [
        'Dedicated VPC & On-Premises deployment',
        'Custom LLM fine-tuning & BYOK encryption',
        'Custom connector development',
        'Custom enterprise licensing & audit logging',
        '99.999% uptime guarantee SLA'
      ],
      cta: 'Contact Sales',
      popular: false,
      onCta: onOpenContact
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <section className="text-center pt-12 pb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#dce9ff] text-[#2f2ebe] tracking-wider uppercase inline-block mb-3">
          Transparent Pricing
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1c30] mb-4 tracking-tight">
          Scale effortlessly as your enterprise grows
        </h1>
        <p className="text-base sm:text-lg text-[#45464d] max-w-2xl mx-auto mb-8">
          Predictable flat-rate pricing with zero hidden egress charges. Start with a 14-day risk-free trial.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center bg-[#eff4ff] p-1.5 rounded-xl border border-[#d3e4fe]">
          <button
            onClick={() => setAnnualBilling(false)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              !annualBilling
                ? 'bg-white text-[#0b1c30] shadow-sm'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnualBilling(true)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
              annualBilling
                ? 'bg-[#4648d4] text-white shadow-sm'
                : 'text-[#45464d] hover:text-[#0b1c30]'
            }`}
          >
            <span>Annual Billing</span>
            <span className="bg-[#dcfce7] text-[#15803d] text-[10px] font-bold px-1.5 py-0.5 rounded">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
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

                <p className="text-xs sm:text-sm text-[#45464d] mb-6 min-h-[38px]">
                  {plan.description}
                </p>

                <div className="mb-6 pb-6 border-b border-[#f1f5f9]">
                  {typeof plan.annualPrice === 'number' ? (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-extrabold text-[#0b1c30]">
                        ${annualBilling ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-xs text-[#76777d] ml-2">
                        / user / month
                      </span>
                    </div>
                  ) : (
                    <div className="text-3xl font-extrabold text-[#0b1c30]">
                      Custom
                    </div>
                  )}
                  <p className="text-xs text-[#76777d] mt-1">
                    {annualBilling ? 'Billed annually' : 'Billed monthly, cancel anytime'}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0b1c30]">
                    Included Features:
                  </p>
                  {plan.features.map((feature, i) => (
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
