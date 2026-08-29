import React from 'react';
import { EXECUTIVE_LEADERSHIP, CORE_VALUES, CORE_DEPARTMENTS } from '../../data/appData';
import { TeamMember } from '../../types';
import {
  Mail,
  Briefcase,
  Code,
  Lightbulb,
  Eye,
  Zap,
  ArrowRight,
  Ruler,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface TeamScreenProps {
  onOpenCareers: () => void;
  onSelectMember: (member: TeamMember) => void;
  onOpenContact: () => void;
}

export const TeamScreen: React.FC<TeamScreenProps> = ({
  onOpenCareers,
  onSelectMember,
  onOpenContact,
}) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16 bg-pattern-subtle rounded-xl mb-12 relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0b1c30] mb-4 tracking-tight">
            The people who sign the blueprint
          </h1>
          <p className="text-base sm:text-lg text-[#45464d] max-w-2xl mx-auto leading-relaxed">
            No blueprint leaves without a named architect reviewing it and putting their name to a specific version. Today that is the two founders. We do not pad this page with people who do not exist.
          </p>
        </div>
        {/* Decorative blur element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-[#dce9ff] opacity-40 blur-3xl rounded-full z-0 pointer-events-none" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        {/* Founders Section */}
        <section>
          <div className="border-b border-[#d3e4fe] pb-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
              Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {EXECUTIVE_LEADERSHIP.map((exec) => (
              <div
                key={exec.id}
                onClick={() => onSelectMember(exec)}
                className="bg-white border border-[#c6c6cd]/40 rounded-xl p-6 card-hover flex flex-col items-center text-center shadow-[0_4px_12px_rgba(15,23,42,0.04)] cursor-pointer group"
              >
                <div className="w-24 h-24 rounded-full bg-[#dce9ff] text-[#2f2ebe] flex items-center justify-center font-bold text-2xl mb-4 ring-4 ring-[#eff4ff] group-hover:ring-[#4648d4]/40 transition-all">
                  {exec.initials}
                </div>
                <h3 className="text-lg font-bold text-[#0b1c30] group-hover:text-[#4648d4] transition-colors">
                  {exec.name}
                </h3>
                <p className="text-xs font-semibold text-[#4648d4] mb-3 uppercase tracking-wider">
                  {exec.role}
                </p>
                <p className="text-sm text-[#45464d] leading-relaxed flex-grow">
                  {exec.bio}
                </p>
                <div className="mt-6 flex space-x-3 text-[#76777d]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `mailto:${exec.email}`;
                    }}
                    title={`Email ${exec.name}`}
                    className="p-1.5 rounded-md hover:bg-[#eff4ff] hover:text-[#4648d4] transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectMember(exec);
                    }}
                    title="View Bio & Credentials"
                    className="p-1.5 rounded-md hover:bg-[#eff4ff] hover:text-[#4648d4] transition-colors"
                  >
                    {exec.socialRoleIcon === 'code' ? (
                      <Code className="w-5 h-5" />
                    ) : (
                      <Briefcase className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Departments */}
        <section>
          <div className="border-b border-[#d3e4fe] pb-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
              How the work is organised
            </h2>
            <p className="text-sm text-[#45464d] mt-1">
              The functions behind each blueprint. We are pre-incorporation, so these are the areas we build in, not staffed departments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_DEPARTMENTS.map((dept) => {
              const renderDeptIcon = () => {
                if (dept.icon === 'Ruler') return <Ruler className="w-6 h-6 text-[#4648d4]" />;
                if (dept.icon === 'FileText') return <FileText className="w-6 h-6 text-[#4648d4]" />;
                return <ShieldCheck className="w-6 h-6 text-[#4648d4]" />;
              };

              return (
                <div
                  key={dept.id}
                  className="bg-white border border-[#c6c6cd]/40 rounded-xl p-6 sm:p-7 shadow-[0_2px_8px_rgba(15,23,42,0.04)] card-hover flex flex-col"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#eff4ff] flex items-center justify-center mb-5 ring-1 ring-[#d3e4fe]/70">
                    {renderDeptIcon()}
                  </div>
                  <h3 className="text-lg font-bold text-[#0b1c30] mb-2">{dept.name}</h3>
                  <p className="text-sm text-[#45464d] leading-relaxed flex-grow">{dept.description}</p>

                  {dept.members.length > 0 ? (
                    <div className="mt-5 flex -space-x-1.5">
                      {dept.members.map((member) => (
                        <div
                          key={member.id}
                          title={member.name}
                          className="w-8 h-8 rounded-full bg-[#dce9ff] text-[#2f2ebe] border-2 border-white flex items-center justify-center text-[11px] font-bold"
                        >
                          {member.initials}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-5 pt-4 border-t border-[#f1f5f9] text-xs font-semibold text-[#76777d]">
                      Roles to be announced
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* How we work */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30] mb-8 text-center">
            How we work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_VALUES.map((val) => {
              const renderValueIcon = () => {
                if (val.icon === 'Lightbulb') return <Lightbulb className="w-6 h-6 text-[#4648d4]" />;
                if (val.icon === 'Eye') return <Eye className="w-6 h-6 text-[#4648d4]" />;
                return <Zap className="w-6 h-6 text-[#4648d4]" />;
              };

              return (
                <div
                  key={val.title}
                  className="bg-white/80 backdrop-blur-sm border border-[#c6c6cd]/40 rounded-xl p-6 sm:p-7 text-center shadow-sm card-hover"
                >
                  <div className="w-12 h-12 mx-auto bg-[#d3e4fe]/60 rounded-full flex items-center justify-center mb-4">
                    {renderValueIcon()}
                  </div>
                  <h3 className="text-lg font-bold text-[#0b1c30] mb-2">{val.title}</h3>
                  <p className="text-sm text-[#45464d] leading-relaxed">{val.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#131b2e] rounded-xl p-8 sm:p-12 text-center relative overflow-hidden text-white shadow-xl">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #c6c6cd 0, #c6c6cd 1px, transparent 1px, transparent 10px)',
            }}
          />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
              Working with us
            </h2>
            <p className="text-sm sm:text-base text-[#7c839b] mb-8 max-w-xl mx-auto leading-relaxed">
              We are pre-incorporation and selecting design partners in UK and EU financial services. If you want to put a specific decision in front of a named architect, start with a scoping call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenContact}
                className="bg-[#4648d4] hover:bg-[#3738b5] text-white px-7 py-3 rounded-lg text-sm sm:text-base font-semibold inline-flex items-center shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>Book a scoping call</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={onOpenCareers}
                id="team-view-open-positions-btn"
                className="text-[#dce9ff] hover:text-white px-4 py-3 text-sm font-semibold transition-colors cursor-pointer"
              >
                Register interest in joining
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
