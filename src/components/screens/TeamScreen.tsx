import React, { useState } from 'react';
import { EXECUTIVE_LEADERSHIP, CORE_DEPARTMENTS, CORE_VALUES } from '../../data/appData';
import { TeamMember } from '../../types';
import { 
  Mail, 
  Briefcase, 
  Code, 
  Palette, 
  TrendingUp, 
  Terminal, 
  Lightbulb, 
  Eye, 
  Zap, 
  ArrowRight,
  Sparkles,
  Layers
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
            The Minds Behind the Blueprint
          </h1>
          <p className="text-base sm:text-lg text-[#45464d] max-w-2xl mx-auto leading-relaxed">
            We are a collective of engineers, designers, and strategists united by a singular mission: to revolutionize AI operations and build resilient, scalable systems for the modern enterprise.
          </p>
        </div>
        {/* Decorative blur element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg bg-[#dce9ff] opacity-40 blur-3xl rounded-full z-0 pointer-events-none" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-16">
        {/* Executive Leadership Section */}
        <section>
          <div className="border-b border-[#d3e4fe] pb-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
              Executive Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXECUTIVE_LEADERSHIP.map((exec) => (
              <div
                key={exec.id}
                onClick={() => onSelectMember(exec)}
                className="bg-white border border-[#c6c6cd]/40 rounded-xl p-6 card-hover flex flex-col items-center text-center shadow-[0_4px_12px_rgba(15,23,42,0.04)] cursor-pointer group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-[#dce9ff] group-hover:ring-[#4648d4]/40 transition-all">
                  <img
                    src={exec.image}
                    alt={`Photo of ${exec.name}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
                    ) : exec.socialRoleIcon === 'design' ? (
                      <Palette className="w-5 h-5" />
                    ) : (
                      <Briefcase className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Departmental Grid (Asymmetric) */}
        <section>
          <div className="border-b border-[#d3e4fe] pb-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30]">
              Core Departments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Engineering Column (Spans 2) */}
            <div className="md:col-span-2 bg-[#eff4ff]/60 rounded-xl p-6 border border-[#d3e4fe]/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Terminal className="w-5 h-5 text-[#4648d4] mr-2" />
                  <h3 className="text-base font-bold text-[#0b1c30]">Engineering</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#45464d] mb-5">
                  {CORE_DEPARTMENTS.engineering.description}
                </p>
              </div>

              <div className="space-y-3">
                {CORE_DEPARTMENTS.engineering.members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => onSelectMember(member as TeamMember)}
                    className="flex items-center bg-white p-3 rounded-lg border border-[#c6c6cd]/30 hover:border-[#4648d4]/50 transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#dce9ff] text-[#2f2ebe] flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0b1c30] group-hover:text-[#4648d4] transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#76777d]">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Column */}
            <div className="bg-[#eff4ff]/60 rounded-xl p-6 border border-[#d3e4fe]/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Palette className="w-5 h-5 text-[#4648d4] mr-2" />
                  <h3 className="text-base font-bold text-[#0b1c30]">Design</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#45464d] mb-5">
                  {CORE_DEPARTMENTS.design.description}
                </p>
              </div>

              <div className="space-y-3">
                {CORE_DEPARTMENTS.design.members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => onSelectMember(member as TeamMember)}
                    className="flex items-center bg-white p-3 rounded-lg border border-[#c6c6cd]/30 hover:border-[#4648d4]/50 transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#dce9ff] text-[#2f2ebe] flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0b1c30] group-hover:text-[#4648d4] transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#76777d]">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Column */}
            <div className="bg-[#eff4ff]/60 rounded-xl p-6 border border-[#d3e4fe]/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-[#4648d4] mr-2" />
                  <h3 className="text-base font-bold text-[#0b1c30]">Strategy</h3>
                </div>
                <p className="text-xs sm:text-sm text-[#45464d] mb-5">
                  {CORE_DEPARTMENTS.strategy.description}
                </p>
              </div>

              <div className="space-y-3">
                {CORE_DEPARTMENTS.strategy.members.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => onSelectMember(member as TeamMember)}
                    className="flex items-center bg-white p-3 rounded-lg border border-[#c6c6cd]/30 hover:border-[#4648d4]/50 transition-all cursor-pointer shadow-sm group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#dce9ff] text-[#2f2ebe] flex items-center justify-center font-bold text-xs mr-3 shrink-0">
                      {member.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0b1c30] group-hover:text-[#4648d4] transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-[#76777d]">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Core Values */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0b1c30] mb-8 text-center">
            Our Core Values
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
              Build the Future with Us
            </h2>
            <p className="text-sm sm:text-base text-[#7c839b] mb-8 max-w-xl mx-auto leading-relaxed">
              We are always looking for passionate individuals to join our growing team. Explore our open roles and help us shape the next generation of AI tooling.
            </p>
            <button
              onClick={onOpenCareers}
              id="team-view-open-positions-btn"
              className="bg-[#4648d4] hover:bg-[#3738b5] text-white px-7 py-3 rounded-lg text-sm sm:text-base font-semibold inline-flex items-center shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span>View Open Positions</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
