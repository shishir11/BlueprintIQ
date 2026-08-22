import React, { useState } from 'react';
import { OFFICE_LOCATIONS } from '../../data/appData';
import { ContactInquiry } from '../../types';
import { 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';

interface ContactScreenProps {
  onOpenHelpCenter: () => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  onOpenHelpCenter
}) => {
  const [formData, setFormData] = useState<ContactInquiry>({
    firstName: '',
    lastName: '',
    workEmail: '',
    companyName: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.workEmail.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    if (!formData.workEmail.includes('@') || !formData.workEmail.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setErrorMessage('');
    }, 800);
  };

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard?.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Header */}
      <section className="text-center pt-12 pb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1c30] mb-4 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg text-[#45464d] max-w-2xl mx-auto leading-relaxed">
          Our enterprise solutions team is ready to assist you. Whether you have questions about BlueprintIQ capabilities, pricing, or technical integrations, we&apos;re here to help.
        </p>
      </section>

      {/* Two-Column Form and Direct Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Send us a message form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#c6c6cd]/50 shadow-[0_4px_16px_rgba(15,23,42,0.04)] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#0b1c30] mb-1">
              Send us a message
            </h2>
            <p className="text-sm text-[#45464d] mb-6">
              Fill out the form below and a representative will get back to you within 24 hours.
            </p>

            {status === 'success' ? (
              <div className="bg-[#eff4ff] border border-[#d3e4fe] rounded-xl p-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-[#4648d4] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0b1c30]">Inquiry Received</h3>
                <p className="text-sm text-[#45464d] max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#0b1c30]">{formData.firstName}</span>! We have routed your inquiry to our enterprise solutions team. A technical representative will follow up at <span className="font-semibold text-[#0b1c30]">{formData.workEmail}</span> shortly.
                </p>
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      firstName: '',
                      lastName: '',
                      workEmail: '',
                      companyName: '',
                      message: ''
                    });
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#4648d4] text-white text-sm font-semibold hover:bg-[#3738b5] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 bg-[#fef2f2] border border-[#fecaca] rounded-lg text-xs sm:text-sm text-[#b91c1c] flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name-input" className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="first-name-input"
                      type="text"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd]/80 bg-[#f8f9ff] text-sm text-[#0b1c30] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40 focus:border-[#4648d4] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name-input" className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="last-name-input"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd]/80 bg-[#f8f9ff] text-sm text-[#0b1c30] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40 focus:border-[#4648d4] transition-all"
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label htmlFor="work-email-input" className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="work-email-input"
                    type="email"
                    placeholder="jane@company.com"
                    value={formData.workEmail}
                    onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd]/80 bg-[#f8f9ff] text-sm text-[#0b1c30] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40 focus:border-[#4648d4] transition-all"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label htmlFor="company-name-input" className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Company Name
                  </label>
                  <input
                    id="company-name-input"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd]/80 bg-[#f8f9ff] text-sm text-[#0b1c30] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40 focus:border-[#4648d4] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message-textarea" className="block text-xs font-semibold text-[#0b1c30] mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message-textarea"
                    rows={4}
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#c6c6cd]/80 bg-[#f8f9ff] text-sm text-[#0b1c30] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40 focus:border-[#4648d4] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  id="submit-inquiry-btn"
                  className="w-full py-3 rounded-lg bg-[#4648d4] hover:bg-[#3738b5] disabled:bg-[#4648d4]/70 text-white font-semibold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-sm transition-all active:scale-98 cursor-pointer mt-2"
                >
                  {status === 'submitting' ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Inquiry...</span>
                    </div>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Support, Sales, Global Offices */}
          <div className="lg:col-span-5 space-y-6">
            {/* Support Card */}
            <div className="bg-[#eff4ff] border border-[#d3e4fe] rounded-xl p-5 sm:p-6 flex items-start space-x-4">
              <div className="w-11 h-11 rounded-lg bg-white text-[#4648d4] flex items-center justify-center shrink-0 shadow-sm border border-[#d3e4fe]/60">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-bold text-[#0b1c30]">Support</h3>
                <p className="text-xs sm:text-sm text-[#45464d] mb-2">
                  Our technical team is here to help.
                </p>
                <div className="flex items-center space-x-2">
                  <a
                    href="mailto:support@blueprintiq.com"
                    className="text-sm font-semibold text-[#4648d4] hover:underline"
                  >
                    support@blueprintiq.com
                  </a>
                  <button
                    onClick={() => handleCopy('support@blueprintiq.com', 'email')}
                    title="Copy email address"
                    className="text-[#76777d] hover:text-[#0b1c30] p-1 rounded transition-colors"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Sales Card */}
            <div className="bg-[#eff4ff] border border-[#d3e4fe] rounded-xl p-5 sm:p-6 flex items-start space-x-4">
              <div className="w-11 h-11 rounded-lg bg-white text-[#4648d4] flex items-center justify-center shrink-0 shadow-sm border border-[#d3e4fe]/60">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-bold text-[#0b1c30]">Sales</h3>
                <p className="text-xs sm:text-sm text-[#45464d] mb-2">
                  Talk to our enterprise sales team.
                </p>
                <div className="flex items-center space-x-2">
                  <a
                    href="tel:+18005550123"
                    className="text-sm font-semibold text-[#4648d4] hover:underline"
                  >
                    +1 (800) 555-0123
                  </a>
                  <button
                    onClick={() => handleCopy('+18005550123', 'phone')}
                    title="Copy phone number"
                    className="text-[#76777d] hover:text-[#0b1c30] p-1 rounded transition-colors"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Global Offices Container */}
            <div className="bg-white border border-[#c6c6cd]/50 rounded-xl p-6 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-[#0b1c30]">
                Global Offices
              </h3>

              {OFFICE_LOCATIONS.map((office, idx) => (
                <div key={office.city} className="flex items-start space-x-3.5 pt-1">
                  <MapPin className="w-5 h-5 text-[#4648d4] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#4648d4]">
                      {office.type}
                    </span>
                    <h4 className="text-sm font-bold text-[#0b1c30] mt-0.5">
                      {office.city}
                    </h4>
                    <p className="text-xs text-[#45464d] mt-1">
                      {office.address}
                    </p>
                    <p className="text-xs text-[#45464d]">
                      {office.postal}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dark Quick Answers Section */}
      <section className="bg-[#1f2937] text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-lg bg-[#374151] border border-[#4b5563] text-[#dce9ff] flex items-center justify-center mx-auto shadow-sm">
            <HelpCircle className="w-7 h-7 text-[#dce9ff]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Looking for quick answers?
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] max-w-xl mx-auto leading-relaxed">
            Check out our comprehensive Help Center for documentation, API references, and frequently asked questions.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenHelpCenter}
              id="contact-visit-help-center-btn"
              className="px-6 py-3 rounded-lg bg-[#dce9ff] hover:bg-[#ffffff] text-[#0b1c30] font-semibold text-sm shadow transition-all active:scale-98 cursor-pointer"
            >
              Visit Help Center
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
