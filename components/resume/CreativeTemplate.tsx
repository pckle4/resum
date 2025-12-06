

import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Globe, Linkedin, Trophy, Code2 } from '../ui/Icons';

interface Props {
  data: ResumeData;
}

const ensureUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://${url}`;
};

const CreativeTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="creative-template w-full h-full bg-white text-gray-800 flex flex-row-reverse font-sans">
       {/* Sidebar (Right side for creative twist) */}
       <div className="creative-sidebar w-1/3 bg-indigo-600 text-indigo-50 p-8 flex flex-col h-full gap-8 shrink-0">
        <div className="creative-avatar-container text-center">
             <div className="creative-avatar inline-block h-32 w-32 rounded-full bg-indigo-400 mb-4 flex items-center justify-center text-4xl font-bold text-white shadow-xl overflow-hidden border-4 border-indigo-500">
                {data.profileImage ? (
                    <img src={data.profileImage} alt="" className="w-full h-full object-cover" />
                ) : (
                    data.fullName.charAt(0)
                )}
             </div>
        </div>

        <div className="creative-sidebar-section">
            <h3 className="creative-sidebar-title text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4 border-b border-indigo-500 pb-2">Contact</h3>
            <div className="space-y-3 text-sm">
                {data.email && <div className="creative-sidebar-item flex items-center gap-2"><Mail size={14}/> <span className="break-all">{data.email}</span></div>}
                {data.phone && <div className="creative-sidebar-item flex items-center gap-2"><Phone size={14}/> {data.phone}</div>}
                {data.location && <div className="creative-sidebar-item flex items-center gap-2"><MapPin size={14}/> {data.location}</div>}
                {data.website && <div className="creative-sidebar-item flex items-center gap-2"><Globe size={14}/> <a href={ensureUrl(data.website)} target="_blank" rel="noreferrer" className="underline hover:text-white">Portfolio</a></div>}
                {data.linkedin && <div className="creative-sidebar-item flex items-center gap-2"><Linkedin size={14}/> <a href={ensureUrl(data.linkedin)} target="_blank" rel="noreferrer" className="underline hover:text-white">LinkedIn</a></div>}
            </div>
            
            {(data.leetcode || data.codeforces) && (
                <div className="mt-4 pt-4 border-t border-indigo-500/50 space-y-3 text-sm">
                    {data.leetcode && <div className="flex items-center gap-2"><Code2 size={14}/> <a href={ensureUrl(data.leetcode)} target="_blank" rel="noreferrer" className="underline hover:text-white">LeetCode</a></div>}
                    {data.codeforces && <div className="flex items-center gap-2"><Code2 size={14}/> <a href={ensureUrl(data.codeforces)} target="_blank" rel="noreferrer" className="underline hover:text-white">Codeforces</a></div>}
                </div>
            )}
        </div>

        {data.education.length > 0 && (
            <div className="creative-sidebar-section">
                <h3 className="creative-sidebar-title text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4 border-b border-indigo-500 pb-2">Education</h3>
                <div className="space-y-4">
                {data.education.map((edu) => (
                    <div key={edu.id} className="creative-sidebar-item">
                    <div className="font-bold text-white text-sm">{edu.school}</div>
                    <div className="text-xs text-indigo-200">{edu.degree}</div>
                    <div className="text-xs text-indigo-300 mt-1">{edu.year}</div>
                    </div>
                ))}
                </div>
            </div>
        )}

        {data.skills.length > 0 && (
             <div className="creative-sidebar-section">
                <h3 className="creative-sidebar-title text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4 border-b border-indigo-500 pb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, i) => (
                        <span key={i} className="creative-tag text-xs border border-indigo-400 rounded-full px-2 py-1 bg-indigo-700/50">{skill}</span>
                    ))}
                </div>
            </div>
        )}

        {data.awards.length > 0 && (
            <div className="creative-sidebar-section">
                <h3 className="creative-sidebar-title text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4 border-b border-indigo-500 pb-2">Honors</h3>
                <div className="space-y-3">
                    {data.awards.map((award) => (
                        <div key={award.id} className="creative-sidebar-item text-sm">
                            <div className="font-bold text-white flex items-center gap-2">
                                <Trophy size={12} className="text-indigo-300"/> {award.name}
                            </div>
                            <div className="text-xs text-indigo-300 ml-5">{award.issuer} | {award.year}</div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {(data.languages.length > 0) && (
             <div className="mt-auto creative-sidebar-section">
                <h3 className="creative-sidebar-title text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4 border-b border-indigo-500 pb-2">Languages</h3>
                <ul className="space-y-1 text-sm text-indigo-100">
                    {data.languages.map((l, i) => <li key={i} className="creative-sidebar-text">• {l}</li>)}
                </ul>
            </div>
        )}
      </div>

      {/* Main Content */}
      <div className="creative-main w-2/3 p-8 pt-12 flex flex-col gap-10">
        <div className="creative-header">
            <h1 className="creative-name text-5xl font-bold text-indigo-900 mb-2 leading-tight">{data.fullName}</h1>
            <p className="creative-role text-xl text-indigo-600 font-medium">{data.title}</p>
        </div>

        {data.summary && (
            <div>
                <div className="creative-section-header flex items-center gap-3 mb-4">
                    <div className="creative-bar h-1 w-8 bg-indigo-600"></div>
                    <h3 className="creative-section-title text-lg font-bold text-gray-800 uppercase tracking-wide">About Me</h3>
                </div>
                <div 
                    className="text-gray-600 leading-relaxed text-sm text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
                    dangerouslySetInnerHTML={{ __html: data.summary }}
                />
            </div>
        )}

        {data.experience.length > 0 && (
            <div>
                <div className="creative-section-header flex items-center gap-3 mb-6">
                    <div className="creative-bar h-1 w-8 bg-indigo-600"></div>
                    <h3 className="creative-section-title text-lg font-bold text-gray-800 uppercase tracking-wide">Experience</h3>
                </div>
                
                <div className="creative-timeline space-y-8 border-l-2 border-indigo-100 pl-6 ml-2 relative">
                    {data.experience.map((exp) => (
                        <div key={exp.id} className="creative-timeline-item relative">
                            {/* Dot on timeline */}
                            <div className="creative-dot absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-indigo-600 bg-white"></div>
                            
                            <div className="mb-1">
                                <h4 className="creative-item-title font-bold text-gray-800 text-lg">{exp.position}</h4>
                                <div className="creative-item-company text-indigo-600 font-medium text-sm">{exp.company}</div>
                            </div>
                            <div className="creative-item-date text-xs text-gray-400 font-mono mb-3 uppercase tracking-wide">
                                {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                            </div>
                            <div 
                                className="text-gray-600 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
                                dangerouslySetInnerHTML={{ __html: exp.description }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )}

        {data.projects.length > 0 && (
            <div>
                <div className="creative-section-header flex items-center gap-3 mb-6">
                    <div className="creative-bar h-1 w-8 bg-indigo-600"></div>
                    <h3 className="creative-section-title text-lg font-bold text-gray-800 uppercase tracking-wide">Projects</h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {data.projects.map(proj => (
                        <div key={proj.id} className="creative-card bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-400">
                             <div className="flex justify-between items-center mb-2">
                                <h4 className="font-bold text-slate-800">{proj.name}</h4>
                                {proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">View Project</a>}
                             </div>
                             <div 
                                className="text-sm text-slate-600 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
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
