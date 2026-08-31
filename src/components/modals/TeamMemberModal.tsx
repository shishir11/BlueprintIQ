import React from 'react';
import { TeamMember } from '../../types';
import { X, Mail } from 'lucide-react';

interface TeamMemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  onClose,
  onOpenContact
}) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#d3e4fe] relative p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#76777d] hover:text-[#0b1c30] rounded-lg hover:bg-[#eff4ff]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          {member.image ? (
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-[#dce9ff]">
              <img
                src={member.image}
                alt={member.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#dce9ff] text-[#2f2ebe] flex items-center justify-center font-bold text-xl mb-4 ring-4 ring-[#eff4ff]">
              {member.initials}
            </div>
          )}

          <h3 className="text-xl font-bold text-[#0b1c30]">{member.name}</h3>
          <p className="text-xs font-semibold text-[#4648d4] uppercase tracking-wider mb-1">
            {member.role}
          </p>
          <span className="text-xs text-[#76777d] mb-4 bg-[#eff4ff] px-2.5 py-0.5 rounded-full">
            {member.department}
          </span>

          <p className="text-sm text-[#45464d] leading-relaxed mb-6 bg-[#f8f9ff] p-4 rounded-xl border border-[#e5eeff] text-left w-full">
            {member.bio}
          </p>

          {member.skills && (
            <div className="w-full text-left mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0b1c30] mb-2">
                Core Domains & Expertise:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {member.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-[#eff4ff] text-[#2f2ebe] px-2.5 py-1 rounded-md font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-3 w-full">
            <a
              href={`mailto:${member.email}`}
              className="flex-1 py-2.5 px-4 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#4648d4] font-semibold text-xs rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email {member.name.split(' ')[0]}</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="flex-1 py-2.5 px-4 bg-[#4648d4] hover:bg-[#3738b5] text-white font-semibold text-xs rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Book a scoping call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
