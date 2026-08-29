import React, { useState } from 'react';
import { X, Play, Sparkles, RefreshCw } from 'lucide-react';

interface WatchDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGetStarted: () => void;
}

export const WatchDemoModal: React.FC<WatchDemoModalProps> = ({
  isOpen,
  onClose,
  onOpenGetStarted,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: '1. Intake and inventory',
      description: 'You state the business objective, the use case and who owns the decision, and send what you already have. You see what we found in your own documents — what is current, what is stale, what contradicts something else.',
      tag: 'Days 1–2',
      highlight: 'Usually visible within hours of receiving your material.'
    },
    {
      title: '2. Analysis, traced to source',
      description: 'Each recommendation is drafted against your material and cites the document and section it came from. Where the input is insufficient to reach a conclusion, that gap is recorded rather than papered over.',
      tag: 'Days 2–4',
      highlight: 'A claim we cannot trace goes into a gap register, not onto the page.'
    },
    {
      title: '3. Joint review and sign-off',
      description: 'Your architects and risk representatives go through the draft with our expert. Every recommendation is accepted, edited or rejected on the record, and a named architect signs the version that ships.',
      tag: 'Day 5',
      highlight: 'Delivered with the evidence trail, confidence assessment and gap register.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#d3e4fe] relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#f1f5f9] flex items-center justify-between bg-[#f8f9ff]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#4648d4] text-white flex items-center justify-center">
              <Play className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0b1c30]">How an engagement runs</h3>
              <p className="text-xs text-[#76777d]">Five days, from a defined starting point</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#76777d] hover:text-[#0b1c30] rounded-lg hover:bg-[#eff4ff]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="p-6 bg-[#0f172a] text-white relative">
          <div className="bg-[#1e293b] rounded-xl p-6 border border-[#334155] shadow-inner space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#818cf8] bg-[#312e81] px-2.5 py-1 rounded">
                {demoSteps[activeStep].tag}
              </span>
              <span className="text-xs text-[#94a3b8]">Step {activeStep + 1} of {demoSteps.length}</span>
            </div>

            <h4 className="text-lg font-bold text-white">
              {demoSteps[activeStep].title}
            </h4>

            <p className="text-sm text-[#cbd5e1] leading-relaxed">
              {demoSteps[activeStep].description}
            </p>

            <div className="bg-[#0f172a] p-4 rounded-lg border border-[#1e293b] flex items-center justify-between text-xs text-[#38bdf8]">
              <span className="font-semibold">{demoSteps[activeStep].highlight}</span>
              <Sparkles className="w-4 h-4 text-[#fbbf24]" />
            </div>
          </div>

          {/* Step selector */}
          <div className="flex justify-center space-x-2 mt-4">
            {demoSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-2 rounded-full transition-all ${
                  activeStep === i ? 'w-8 bg-[#4648d4]' : 'w-2 bg-[#334155]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#76777d]">
            Want to put your own case through this?
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % demoSteps.length)}
              className="px-4 py-2 rounded-lg border border-[#c6c6cd] text-xs font-semibold text-[#0b1c30] hover:bg-[#f8f9ff] flex items-center justify-center space-x-1.5 flex-1 sm:flex-initial"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next step</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenGetStarted();
              }}
              className="px-5 py-2 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] text-white text-xs font-semibold shadow flex items-center justify-center space-x-1.5 flex-1 sm:flex-initial"
            >
              <span>Book a scoping call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
