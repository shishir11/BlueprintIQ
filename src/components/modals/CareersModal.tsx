import React, { useState } from 'react';
import { JOB_OPENINGS } from '../../data/appData';
import { JobOpening } from '../../types';
import { X, Briefcase, MapPin, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CareersModal: React.FC<CareersModalProps> = ({ isOpen, onClose }) => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applied, setApplied] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  if (!isOpen) return null;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) return;
    setApplied(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#d3e4fe] flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#f1f5f9] bg-[#f8f9ff] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#4648d4] text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0b1c30]">Careers at BlueprintIQ</h3>
              <p className="text-xs text-[#76777d]">Pre-incorporation · UK and EU</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#76777d] hover:text-[#0b1c30] rounded-lg hover:bg-[#e5eeff]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-4">
          {selectedJob ? (
            <div>
              <button
                onClick={() => { setSelectedJob(null); setApplied(false); }}
                className="text-xs font-semibold text-[#4648d4] hover:underline mb-4 flex items-center"
              >
                ← Back to all openings
              </button>

              <div className="bg-[#eff4ff] p-5 rounded-xl border border-[#d3e4fe] mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#2f2ebe] bg-[#dce9ff] px-2.5 py-0.5 rounded">
                    {selectedJob.department}
                  </span>
                  <span className="text-xs text-[#76777d] flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> {selectedJob.location}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-[#0b1c30] mb-2">{selectedJob.title}</h4>
                <p className="text-xs sm:text-sm text-[#45464d] leading-relaxed mb-4">
                  {selectedJob.description}
                </p>

                <p className="text-xs font-bold text-[#0b1c30] mb-2 uppercase tracking-wide">
                  Key Requirements:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#45464d]">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#4648d4] font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {applied ? (
                <div className="bg-[#dcfce7] p-6 rounded-xl text-center space-y-2 border border-[#86efac]">
                  <CheckCircle2 className="w-8 h-8 text-[#15803d] mx-auto" />
                  <h5 className="text-base font-bold text-[#14532d]">Application Submitted!</h5>
                  <p className="text-xs text-[#166534]">
                    Thank you, {applicantName}. Our talent acquisition team will review your application for {selectedJob.title} and reach out to {applicantEmail}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-3 bg-white p-5 rounded-xl border border-[#e2e8f0]">
                  <h5 className="text-sm font-bold text-[#0b1c30]">Quick Application</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="px-3.5 py-2 border rounded-lg text-sm bg-[#f8f9ff]"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address *"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="px-3.5 py-2 border rounded-lg text-sm bg-[#f8f9ff]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#4648d4] text-white font-semibold rounded-lg text-sm hover:bg-[#3738b5] transition-colors"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          ) : JOB_OPENINGS.length === 0 ? (
            <div className="text-center py-10 px-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#eff4ff] text-[#4648d4] flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#0b1c30]">No open roles yet</h4>
              <p className="text-sm text-[#45464d] max-w-md mx-auto leading-relaxed">
                We are pre-incorporation with a two-person founding team. There are no vacancies to advertise honestly right now. If you would like to be considered when that changes, email{' '}
                <a href="mailto:hello@blueprint-iq.uk" className="text-[#4648d4] font-semibold hover:underline">hello@blueprint-iq.uk</a>.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {JOB_OPENINGS.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="p-4 sm:p-5 rounded-xl border border-[#e2e8f0] hover:border-[#4648d4] bg-white hover:bg-[#f8f9ff] transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#eff4ff] text-[#4648d4]">
                        {job.department}
                      </span>
                      <span className="text-xs text-[#76777d]">{job.type}</span>
                    </div>
                    <h4 className="text-base font-bold text-[#0b1c30] group-hover:text-[#4648d4] transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-xs text-[#76777d] mt-1 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {job.location}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#76777d] group-hover:text-[#4648d4] group-hover:translate-x-1 transition-all shrink-0 ml-4" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
