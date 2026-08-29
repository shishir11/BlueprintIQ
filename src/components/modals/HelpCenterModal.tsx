import React, { useState } from 'react';
import { FAQS } from '../../data/appData';
import { X, Search, HelpCircle, ChevronDown } from 'lucide-react';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!isOpen) return null;

  const categories = ['All', 'Product', 'Engagement', 'Security', 'Evidence'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#d3e4fe] flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#f1f5f9] bg-[#f8f9ff]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#eff4ff] text-[#4648d4] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0b1c30]">BlueprintIQ help centre</h3>
                <p className="text-xs text-[#76777d]">What a blueprint contains and how an engagement works</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#76777d] hover:text-[#0b1c30] rounded-lg hover:bg-[#e5eeff]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#9ca3af] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics (e.g. confidence bands, regulation, gap register)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#c6c6cd] bg-white text-sm text-[#0b1c30] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/40"
            />
          </div>

          {/* Category tabs */}
          <div className="flex space-x-2 mt-4 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#4648d4] text-white'
                    : 'bg-[#eff4ff] text-[#45464d] hover:bg-[#dce9ff]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-grow">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#76777d]">
              Nothing matches that search yet. Try another term or email us.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#e2e8f0] rounded-xl overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-[#0b1c30] hover:bg-[#f8f9ff] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#76777d] transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180 text-[#4648d4]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#45464d] leading-relaxed bg-[#f8f9ff] border-t border-[#f1f5f9]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f8f9ff] border-t border-[#f1f5f9] text-center text-xs text-[#76777d]">
          Still need help? Email us at <a href="mailto:hello@blueprint-iq.uk" className="text-[#4648d4] font-semibold hover:underline">hello@blueprint-iq.uk</a>
        </div>
      </div>
    </div>
  );
};
