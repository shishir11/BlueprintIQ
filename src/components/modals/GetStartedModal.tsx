import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Engineering Leader');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#d3e4fe] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#76777d] hover:text-[#0b1c30] rounded-lg hover:bg-[#eff4ff] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 bg-[#dcfce7] text-[#15803d] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#0b1c30]">Welcome to BlueprintIQ!</h3>
            <p className="text-sm text-[#45464d] leading-relaxed max-w-sm mx-auto">
              We&apos;ve provisioned your 14-day enterprise trial sandbox. A magic activation link has been sent to <span className="font-semibold text-[#0b1c30]">{email}</span>.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#4648d4] text-white font-semibold rounded-lg hover:bg-[#3738b5] transition-colors"
              >
                Go to Workspace
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#eff4ff] text-[#4648d4] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-[#0b1c30]">Start Your 14-Day Free Trial</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#45464d] mb-6">
              No credit card required. Full access to AI Agents, automated ADRs, and 100+ connectors.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                  Work Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd] bg-[#f8f9ff] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#4648d4]/40 focus:border-[#4648d4] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                  Primary Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd] bg-[#f8f9ff] text-sm text-[#0b1c30] focus:ring-2 focus:ring-[#4648d4]/40 focus:border-[#4648d4] outline-none"
                >
                  <option>Engineering Leader (VP / Director / EM)</option>
                  <option>Software Architect / Staff Engineer</option>
                  <option>Product Manager</option>
                  <option>DevOps / Platform Engineer</option>
                  <option>Other Executive</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#4648d4] hover:bg-[#3738b5] text-white font-semibold rounded-lg text-sm flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#4648d4]/20 cursor-pointer"
                >
                  <span>Launch Enterprise Sandbox</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 pt-2 text-[11px] text-[#76777d]">
                <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#15803d]" /> SOC2 Compliant</span>
                <span className="flex items-center"><Zap className="w-3.5 h-3.5 mr-1 text-[#4648d4]" /> Instant Setup</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
