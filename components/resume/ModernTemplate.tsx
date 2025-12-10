import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe, Linkedin, Trophy, Code2, Terminal, Cpu, Braces } from '../ui/Icons';

interface Props {
  data: ResumeData;
  isSkeleton?: boolean;
}

const ensureUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://${url}`;
};

const getProfileUrl = (platform: string, value: string) => {
  if (!value) return '';
  // If it's already a full URL, use it
  if (value.includes('http')) return value;
  
  // Construct URL based on platform
  switch(platform) {
    case 'linkedin': return `https://www.linkedin.com/in/${value}`;
    case 'leetcode': return `https://leetcode.com/${value}`;
    case 'codeforces': return `https://codeforces.com/profile/${value}`;
    case 'hackerrank': return `https://www.hackerrank.com/${value}`;
    case 'hackerearth': return `https://www.hackerearth.com/@${value}`;
    default: return value;
  }
};

const ModernTemplate: React.FC<Props> = ({ data, isSkeleton = false }) => {
  if (isSkeleton) {
    return (
      <div className="w-full h-full bg-white flex flex-col font-sans">
        {/* Skeleton Header */}
        <div className="bg-slate-900 p-8 flex gap-6 items-center shrink-0 border-b border-slate-800">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700/50 shrink-0" />
          <div className="flex-1 space-y-4">
             <div className="w-3/4 h-8 bg-slate-700 rounded" />
             <div className="w-1/3 h-4 bg-indigo-900/50 rounded" />
             <div className="flex gap-3 mt-2">
                <div className="w-16 h-2 bg-slate-800 rounded" />
                <div className="w-16 h-2 bg-slate-800 rounded" />
                <div className="w-16 h-2 bg-slate-800 rounded" />
             </div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Skeleton Main */}
          <div className="w-[66%] p-8 border-r border-slate-100 flex flex-col gap-8">
             <div className="space-y-3">
                <div className="w-1/4 h-3 bg-slate-300 rounded mb-2" />
                <div className="w-full h-2 bg-slate-100 rounded" />
                <div className="w-full h-2 bg-slate-100 rounded" />
                <div className="w-5/6 h-2 bg-slate-100 rounded" />
             </div>
             
             <div className="space-y-6">
                <div className="w-1/4 h-3 bg-slate-300 rounded mb-2" />
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between">
                        <div className="w-1/3 h-3 bg-slate-200 rounded" />
                        <div className="w-16 h-3 bg-slate-100 rounded" />
                     </div>
                     <div className="w-1/4 h-2 bg-indigo-50 rounded" />
                     <div className="space-y-1 mt-1">
                        <div className="w-full h-1.5 bg-slate-50 rounded" />
                        <div className="w-full h-1.5 bg-slate-50 rounded" />
                        <div className="w-3/4 h-1.5 bg-slate-50 rounded" />
                     </div>
                  </div>
                ))}
             </div>

             <div className="space-y-6">
                <div className="w-1/4 h-3 bg-slate-300 rounded mb-2" />
                {[1, 2].map(i => (
                  <div key={i} className="space-y-2">
                     <div className="w-1/3 h-3 bg-slate-200 rounded" />
                     <div className="space-y-1 mt-1">
                        <div className="w-full h-1.5 bg-slate-50 rounded" />
                        <div className="w-5/6 h-1.5 bg-slate-50 rounded" />
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Skeleton Sidebar */}
          <div className="w-[34%] p-8 bg-slate-50/80 flex flex-col gap-8 border-l border-slate-100">
              {[1, 2, 3].map(i => (
                 <div key={i} className="space-y-3">
                    <div className="w-1/2 h-2 bg-slate-300 rounded" />
                    <div className="space-y-2">
                       <div className="w-3/4 h-2 bg-slate-200 rounded" />
                       <div className="w-1/2 h-1.5 bg-slate-200 rounded" />
                    </div>
                 </div>
              ))}
              <div className="space-y-3">
                  <div className="w-1/2 h-2 bg-slate-300 rounded" />
                  <div className="flex flex-wrap gap-2">
                      {[1,2,3,4,5,6].map(k => (
                          <div key={k} className="w-12 h-4 bg-slate-200 rounded" />
                      ))}
                  </div>
              </div>
              <div className="space-y-3">
                  <div className="w-1/2 h-2 bg-slate-300 rounded" />
                  <div className="space-y-2">
                     {[1, 2].map(k => (
                         <div key={k} className="w-full h-1.5 bg-slate-200 rounded" />
                     ))}
                  </div>
              </div>
              <div className="space-y-3">
                  <div className="w-1/2 h-2 bg-slate-300 rounded" />
                  <div className="space-y-2">
                     {[1, 2, 3].map(k => (
                         <div key={k} className="w-3/4 h-1.5 bg-slate-200 rounded" />
                     ))}
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-template w-full h-full bg-white text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <div className="modern-header bg-slate-900 text-white p-10 pb-12 flex gap-8 items-center shrink-0 border-b border-slate-800">
        {data.profileImage && (
           <div className="modern-header-avatar w-28 h-28 rounded-full overflow-hidden border-4 border-slate-700/50 shadow-xl shrink-0 bg-slate-800">
             <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
           </div>
        )}
        <div className="modern-header-content flex-1 min-w-0">
            <h1 className="modern-name text-[40px] font-extrabold uppercase tracking-wide mb-2 leading-none">{data.fullName}</h1>
            <p className="modern-title text-xl text-indigo-400 font-medium mb-5 tracking-wide uppercase text-opacity-90">{data.title}</p>
            
            <div className="modern-contact flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-300 font-medium">
                {data.email && <div className="modern-contact-item flex items-center gap-2"><Mail size={12} className="text-slate-500" /> <span className="tracking-wide">{data.email}</span></div>}
                {data.phone && <div className="modern-contact-item flex items-center gap-2"><Phone size={12} className="text-slate-500" /> <span className="tracking-wide">{data.phone}</span></div>}
                {data.location && <div className="modern-contact-item flex items-center gap-2"><MapPin size={12} className="text-slate-500" /> <span className="tracking-wide">{data.location}</span></div>}
                {data.website && <div className="modern-contact-item flex items-center gap-2"><Globe size={12} className="text-slate-500" /> <a href={ensureUrl(data.website)} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Portfolio</a></div>}
                {data.linkedin && <div className="modern-contact-item flex items-center gap-2"><Linkedin size={12} className="text-slate-500" /> <a href={getProfileUrl('linkedin', data.linkedin)} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></div>}
            </div>
            
            {(data.leetcode || data.codeforces || data.hackerrank || data.hackerearth) && (
              <div className="modern-coding-profiles flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800">
                  {data.leetcode && <div className="flex items-center gap-2"><Code2 size={12} className="text-slate-600"/> <a href={getProfileUrl('leetcode', data.leetcode)} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LeetCode</a></div>}
                  {data.codeforces && <div className="flex items-center gap-2"><Terminal size={12} className="text-slate-600"/> <a href={getProfileUrl('codeforces', data.codeforces)} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Codeforces</a></div>}
                  {data.hackerrank && <div className="flex items-center gap-2"><Braces size={12} className="text-slate-600"/> <a href={getProfileUrl('hackerrank', data.hackerrank)} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">HackerRank</a></div>}
                  {data.hackerearth && <div className="flex items-center gap-2"><Cpu size={12} className="text-slate-600"/> <a href={getProfileUrl('hackerearth', data.hackerearth)} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">HackerEarth</a></div>}
              </div>
            )}
        </div>
      </div>

      <div className="modern-body flex flex-1">
        {/* Left Column (Main Content) */}
        <div className="modern-main w-[66%] p-10 pr-8 border-r border-slate-100 flex flex-col gap-8">
          {/* Summary */}
          {data.summary && (
            <div className="modern-section">
              <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-widest text-sm border-b-2 border-slate-900 pb-2 mb-4">Professional Profile</h3>
              <div 
                className="modern-text text-slate-600 leading-relaxed text-[13px] text-justify font-normal [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-slate-800"
                dangerouslySetInnerHTML={{ __html: data.summary }}
              />
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-widest text-sm border-b-2 border-slate-900 pb-2 mb-5">Experience</h3>
                <div className="space-y-6">
                {data.experience.map((exp) => (
                    <div key={exp.id} className="modern-item group">
                        <div className="modern-item-header flex justify-between items-baseline mb-1">
                            <h4 className="modern-item-title font-bold text-slate-800 text-[15px]">{exp.position}</h4>
                            <span className="modern-item-date text-[11px] font-bold text-slate-500 whitespace-nowrap bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wide">
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                            </span>
                        </div>
                        <div className="modern-item-subtitle text-[13px] font-bold text-indigo-600 mb-2">{exp.company}</div>
                        <div 
                            className="modern-text text-slate-600 text-[13px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1.5 [&_strong]:font-bold [&_strong]:text-slate-800"
                            dangerouslySetInnerHTML={{ __html: exp.description }}
                        />
                    </div>
                ))}
                </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-widest text-sm border-b-2 border-slate-900 pb-2 mb-5">Key Projects</h3>
                <div className="space-y-5">
                  {data.projects.map((proj) => (
                     <div key={proj.id} className="modern-item">
                        <div className="modern-item-header flex items-center gap-3 mb-1.5">
                            <h4 className="modern-item-title font-bold text-slate-800 text-[14px]">{proj.name}</h4>
                            {proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-indigo-500 uppercase tracking-wide border border-indigo-200 px-2 py-0.5 rounded hover:bg-indigo-50">View Project</a>}
                        </div>
                        <div 
                            className="modern-text text-slate-600 text-[13px] leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-slate-800"
                            dangerouslySetInnerHTML={{ __html: proj.description }}
                        />
                     </div>
                  ))}
                </div>
             </div>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="modern-sidebar w-[34%] p-10 pl-8 bg-slate-50/80 flex flex-col gap-8 border-l border-slate-100">
          {/* Education */}
          {data.education.length > 0 && (
            <div className="modern-section">
                <h3 className="modern-section-title text-slate-700 font-bold uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-4">Education</h3>
                <div className="space-y-4">
                {data.education.map((edu) => (
                    <div key={edu.id} className="modern-item">
                        <div className="font-bold text-slate-800 text-[13px]">{edu.school}</div>
                        <div className="text-[12px] text-slate-600 mb-1 font-medium italic">{edu.degree}</div>
                        <div className="text-[11px] text-slate-500 font-medium">{edu.year} | {edu.location}</div>
                    </div>
                ))}
                </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="modern-section">
                <h3 className="modern-section-title text-slate-700 font-bold uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                    <span key={index} className="modern-tag bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold shadow-sm">
                    {skill}
                    </span>
                ))}
                </div>
            </div>
          )}

           {/* Certifications */}
           {data.certifications.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-700 font-bold uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-4">Certifications</h3>
                <div className="space-y-3">
                   {data.certifications.map(cert => (
                      <div key={cert.id} className="modern-item text-[13px]">
                         <div className="font-bold text-slate-800 leading-snug">{cert.name}</div>
                         <div className="text-[11px] text-slate-500 mt-0.5">{cert.issuer}, {cert.year}</div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* Awards */}
           {data.awards.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-700 font-bold uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-4">Awards</h3>
                <div className="space-y-3">
                   {data.awards.map(award => (
                      <div key={award.id} className="modern-item text-[13px]">
                         <div className="font-bold text-slate-800 flex items-start gap-2 leading-snug">
                            <Trophy size={12} className="text-amber-500 mt-0.5 shrink-0" /> {award.name}
                         </div>
                         <div className="text-[11px] text-slate-500 pl-5 mt-0.5">{award.issuer}, {award.year}</div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* Languages */}
           {data.languages.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-700 font-bold uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-4">Languages</h3>
                <ul className="text-[12px] text-slate-600 space-y-1.5 font-medium">
                    {data.languages.map((lang, i) => <li key={i}>• {lang}</li>)}
                </ul>
             </div>
           )}
           
           {/* Interests */}
           {data.interests.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-700 font-bold uppercase tracking-widest text-xs border-b border-slate-300 pb-2 mb-4">Interests</h3>
                <ul className="text-[12px] text-slate-600 space-y-1.5 font-medium">
                    {data.interests.map((item, i) => <li key={i}>• {item}</li>)}
                </ul>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;