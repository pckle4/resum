import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Trophy, Code2 } from '../ui/Icons';

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
  if (value.includes('http')) return value;
  
  switch(platform) {
    case 'linkedin': return `https://www.linkedin.com/in/${value}`;
    case 'leetcode': return `https://leetcode.com/${value}`; 
    case 'codeforces': return `https://codeforces.com/profile/${value}`;
    case 'hackerrank': return `https://www.hackerrank.com/${value}`; 
    case 'hackerearth': return `https://www.hackerearth.com/@${value}`;
    default: return value;
  }
};

const CreativeTemplate: React.FC<Props> = ({ data, isSkeleton = false }) => {
  if (isSkeleton) {
     return (
        <div className="w-full h-full bg-white flex flex-row-reverse font-sans">
            {/* Skeleton Sidebar (Right) */}
            <div className="w-[34%] bg-[#4f46e5] p-10 flex flex-col gap-8 shrink-0 relative overflow-hidden">
                <div className="flex justify-center mb-6">
                    <div className="w-[120px] h-[120px] rounded-full bg-indigo-400 border-[6px] border-[#6366f1]" />
                </div>
                
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="space-y-4">
                        <div className="w-1/2 h-2 bg-indigo-300 rounded border-b border-indigo-400 pb-2" />
                        <div className="space-y-2">
                             <div className="w-3/4 h-2 bg-indigo-200/50 rounded" />
                             <div className="w-1/2 h-2 bg-indigo-200/50 rounded" />
                             {i % 2 === 0 && <div className="w-2/3 h-2 bg-indigo-200/50 rounded" />}
                        </div>
                    </div>
                ))}
            </div>

            {/* Skeleton Main (Left) */}
            <div className="w-[66%] p-12 pt-14 flex flex-col gap-10">
                 <div className="pb-6 border-b border-slate-100 space-y-4">
                     <div className="w-3/4 h-12 bg-[#312e81] rounded" />
                     <div className="w-1/2 h-6 bg-[#4f46e5] rounded" />
                 </div>
                 
                 <div className="space-y-8">
                     <div className="space-y-4">
                         <div className="flex items-center gap-4">
                             <div className="w-8 h-1 bg-[#4f46e5] rounded" />
                             <div className="w-24 h-4 bg-slate-800 rounded" />
                         </div>
                         <div className="space-y-2 pl-2">
                             <div className="w-full h-2 bg-slate-200 rounded" />
                             <div className="w-full h-2 bg-slate-200 rounded" />
                             <div className="w-5/6 h-2 bg-slate-200 rounded" />
                         </div>
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                             <div className="w-8 h-1 bg-[#4f46e5] rounded" />
                             <div className="w-24 h-4 bg-slate-800 rounded" />
                        </div>
                        {[1, 2, 3].map(i => (
                            <div key={i} className="border-l-[2px] border-indigo-100 pl-8 ml-2.5 relative space-y-3">
                                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#4f46e5]" />
                                <div className="w-1/3 h-4 bg-slate-700 rounded" />
                                <div className="w-1/4 h-3 bg-indigo-500 rounded" />
                                <div className="w-full h-2 bg-slate-100 rounded" />
                                <div className="w-3/4 h-2 bg-slate-100 rounded" />
                            </div>
                        ))}
                     </div>

                     <div className="space-y-6">
                        <div className="flex items-center gap-4">
                             <div className="w-8 h-1 bg-[#4f46e5] rounded" />
                             <div className="w-24 h-4 bg-slate-800 rounded" />
                        </div>
                        {[1, 2].map(i => (
                            <div key={i} className="pl-2 space-y-3">
                                <div className="w-full h-12 bg-slate-100 rounded-lg border-l-4 border-indigo-300" />
                            </div>
                        ))}
                     </div>
                 </div>
            </div>
        </div>
     );
  }

  return (
    <div className="creative-template w-full h-full bg-white text-gray-800 flex flex-row-reverse font-sans">
       {/* Sidebar (Right side for creative twist) */}
       <div className="creative-sidebar w-[34%] bg-[#4f46e5] text-indigo-50 p-10 flex flex-col h-full gap-10 shrink-0 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="creative-avatar-container text-center relative z-10">
             <div className="creative-avatar inline-flex h-[130px] w-[130px] rounded-full bg-indigo-400 mb-6 items-center justify-center text-5xl font-bold text-white shadow-2xl overflow-hidden border-[6px] border-[#6366f1]">
                {data.profileImage ? (
                    <img src={data.profileImage} alt="" className="w-full h-full object-cover" />
                ) : (
                    data.fullName.charAt(0)
                )}
             </div>
        </div>

        <div className="creative-sidebar-section relative z-10">
            <h3 className="creative-sidebar-title text-indigo-200 text-[11px] font-bold uppercase tracking-[2px] mb-5 border-b border-indigo-400 pb-2">Contact</h3>
            <div className="space-y-4 text-[12px]">
                {data.email && <div className="creative-sidebar-item flex items-center gap-3"><Mail size={14} className="shrink-0 opacity-80"/> <span className="break-all font-medium tracking-wide">{data.email}</span></div>}
                {data.phone && <div className="creative-sidebar-item flex items-center gap-3"><Phone size={14} className="shrink-0 opacity-80"/> <span className="tracking-wide">{data.phone}</span></div>}
                {data.location && <div className="creative-sidebar-item flex items-center gap-3"><MapPin size={14} className="shrink-0 opacity-80"/> <span>{data.location}</span></div>}
                {data.website && <div className="creative-sidebar-item flex items-center gap-3"><Globe size={14} className="shrink-0 opacity-80"/> <a href={ensureUrl(data.website)} target="_blank" rel="noreferrer" className="underline decoration-indigo-300 underline-offset-2 hover:text-white">Portfolio</a></div>}
                {data.linkedin && <div className="creative-sidebar-item flex items-center gap-3"><Linkedin size={14} className="shrink-0 opacity-80"/> <a href={getProfileUrl('linkedin', data.linkedin)} target="_blank" rel="noreferrer" className="underline decoration-indigo-300 underline-offset-2 hover:text-white">LinkedIn</a></div>}
            </div>
            
            {(data.leetcode || data.codeforces) && (
                <div className="mt-6 pt-6 border-t border-indigo-500/50 space-y-4 text-[12px]">
                    {data.leetcode && <div className="flex items-center gap-3"><Code2 size={14} className="shrink-0 opacity-80"/> <a href={getProfileUrl('leetcode', data.leetcode)} target="_blank" rel="noreferrer" className="underline decoration-indigo-300 underline-offset-2 hover:text-white">LeetCode</a></div>}
                    {data.codeforces && <div className="flex items-center gap-3"><Code2 size={14} className="shrink-0 opacity-80"/> <a href={getProfileUrl('codeforces', data.codeforces)} target="_blank" rel="noreferrer" className="underline decoration-indigo-300 underline-offset-2 hover:text-white">Codeforces</a></div>}
                </div>
            )}
        </div>

        {data.education.length > 0 && (
            <div className="creative-sidebar-section relative z-10">
                <h3 className="creative-sidebar-title text-indigo-200 text-[11px] font-bold uppercase tracking-[2px] mb-5 border-b border-indigo-400 pb-2">Education</h3>
                <div className="space-y-5">
                {data.education.map((edu) => (
                    <div key={edu.id} className="creative-sidebar-item">
                    <div className="font-bold text-white text-[13px] mb-0.5">{edu.school}</div>
                    <div className="text-[12px] text-indigo-200 leading-snug">{edu.degree}</div>
                    <div className="text-[11px] text-indigo-300 mt-1 font-mono">{edu.year}</div>
                    </div>
                ))}
                </div>
            </div>
        )}

        {data.skills.length > 0 && (
             <div className="creative-sidebar-section relative z-10">
                <h3 className="creative-sidebar-title text-indigo-200 text-[11px] font-bold uppercase tracking-[2px] mb-5 border-b border-indigo-400 pb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                        <span key={i} className="creative-tag text-[10px] font-bold border border-indigo-400 rounded-full px-2.5 py-1 bg-indigo-800/30 text-white shadow-sm">{skill}</span>
                    ))}
                </div>
            </div>
        )}

        {data.awards.length > 0 && (
            <div className="creative-sidebar-section relative z-10">
                <h3 className="creative-sidebar-title text-indigo-200 text-[11px] font-bold uppercase tracking-[2px] mb-5 border-b border-indigo-400 pb-2">Honors</h3>
                <div className="space-y-4">
                    {data.awards.map((award) => (
                        <div key={award.id} className="creative-sidebar-item text-[12px]">
                            <div className="font-bold text-white flex items-start gap-2 leading-snug">
                                <Trophy size={12} className="text-yellow-400 mt-0.5 shrink-0"/> {award.name}
                            </div>
                            <div className="text-[11px] text-indigo-300 ml-5 mt-0.5">{award.issuer} | {award.year}</div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {(data.languages.length > 0) && (
             <div className="mt-auto creative-sidebar-section relative z-10">
                <h3 className="creative-sidebar-title text-indigo-200 text-[11px] font-bold uppercase tracking-[2px] mb-4 border-b border-indigo-400 pb-2">Languages</h3>
                <ul className="space-y-1.5 text-[12px] text-indigo-100 font-medium">
                    {data.languages.map((l, i) => <li key={i} className="creative-sidebar-text">• {l}</li>)}
                </ul>
            </div>
        )}
      </div>

      {/* Main Content */}
      <div className="creative-main w-[66%] p-12 pt-14 flex flex-col gap-10">
        <div className="creative-header pb-6 border-b border-slate-100">
            <h1 className="creative-name text-[48px] font-extrabold text-[#312e81] mb-2 leading-none tracking-tight">{data.fullName}</h1>
            <p className="creative-role text-[20px] text-[#4f46e5] font-bold tracking-wide">{data.title}</p>
        </div>

        {data.summary && (
            <div>
                <div className="creative-section-header flex items-center gap-4 mb-5">
                    <div className="creative-bar h-[3px] w-8 bg-[#4f46e5] rounded-full"></div>
                    <h3 className="creative-section-title text-[15px] font-extrabold text-slate-800 uppercase tracking-widest">About Me</h3>
                </div>
                <div 
                    className="text-slate-600 leading-relaxed text-[13px] text-justify font-medium [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-slate-800"
                    dangerouslySetInnerHTML={{ __html: data.summary }}
                />
            </div>
        )}

        {data.experience.length > 0 && (
            <div>
                <div className="creative-section-header flex items-center gap-4 mb-8">
                    <div className="creative-bar h-[3px] w-8 bg-[#4f46e5] rounded-full"></div>
                    <h3 className="creative-section-title text-[15px] font-extrabold text-slate-800 uppercase tracking-widest">Experience</h3>
                </div>
                
                <div className="creative-timeline space-y-10 border-l-[2px] border-indigo-100 pl-8 ml-2.5 relative">
                    {data.experience.map((exp) => (
                        <div key={exp.id} className="creative-timeline-item relative">
                            {/* Dot on timeline */}
                            <div className="creative-dot absolute -left-[41px] top-1.5 h-[14px] w-[14px] rounded-full border-[3px] border-[#4f46e5] bg-white shadow-sm z-10"></div>
                            
                            <div className="mb-2">
                                <h4 className="creative-item-title font-bold text-slate-800 text-[16px]">{exp.position}</h4>
                                <div className="creative-item-company text-[#4f46e5] font-bold text-[14px] flex justify-between items-center w-full">
                                    {exp.company}
                                    <span className="creative-item-date text-[11px] text-slate-400 font-mono uppercase tracking-normal bg-slate-50 px-2 py-0.5 rounded">
                                        {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                            </div>
                            
                            <div 
                                className="text-slate-600 text-[13px] leading-[1.6] [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-slate-800"
                                dangerouslySetInnerHTML={{ __html: exp.description }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {data.projects.length > 0 && (
            <div>
                <div className="creative-section-header flex items-center gap-4 mb-6">
                    <div className="creative-bar h-[3px] w-8 bg-[#4f46e5] rounded-full"></div>
                    <h3 className="creative-section-title text-[15px] font-extrabold text-slate-800 uppercase tracking-widest">Projects</h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {data.projects.map(proj => (
                        <div key={proj.id} className="creative-card bg-[#eef2ff] p-5 rounded-xl border-l-[4px] border-[#818cf8]">
                             <div className="flex justify-between items-center mb-2.5">
                                <h4 className="font-bold text-slate-800 text-[14px]">{proj.name}</h4>
                                {proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#4f46e5] uppercase tracking-wide border border-indigo-200 px-2 py-0.5 rounded bg-white hover:bg-indigo-50">View Project</a>}
                             </div>
                             <div 
                                className="text-[13px] text-slate-600 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold"
                                dangerouslySetInnerHTML={{ __html: proj.description }}
                             />
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;