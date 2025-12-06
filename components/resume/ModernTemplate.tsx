

import React from 'react';
import { ResumeData } from '../../types';
import { MapPin, Mail, Phone, Globe, Linkedin, Trophy, Code2, Terminal, Cpu, Braces } from '../ui/Icons';

interface Props {
  data: ResumeData;
}

const ensureUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://${url}`;
};

const ModernTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="modern-template w-full h-full bg-white text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <div className="modern-header bg-slate-900 text-white p-8 pb-10 flex gap-6 items-center shrink-0">
        {data.profileImage && (
           <div className="modern-header-avatar w-24 h-24 rounded-full overflow-hidden border-2 border-slate-700 shrink-0">
             <img src={data.profileImage} alt={data.fullName} className="w-full h-full object-cover" />
           </div>
        )}
        <div className="modern-header-content flex-1">
            <h1 className="modern-name text-4xl font-bold uppercase tracking-wide mb-2 leading-none">{data.fullName}</h1>
            <p className="modern-title text-xl text-slate-300 font-medium mb-4">{data.title}</p>
            
            <div className="modern-contact flex flex-wrap gap-4 text-xs text-slate-300">
            {data.email && <div className="modern-contact-item flex items-center gap-1.5"><Mail size={12} /> {data.email}</div>}
            {data.phone && <div className="modern-contact-item flex items-center gap-1.5"><Phone size={12} /> {data.phone}</div>}
            {data.location && <div className="modern-contact-item flex items-center gap-1.5"><MapPin size={12} /> {data.location}</div>}
            {data.website && <div className="modern-contact-item flex items-center gap-1.5"><Globe size={12} /> <a href={ensureUrl(data.website)} target="_blank" rel="noreferrer">Portfolio</a></div>}
            {data.linkedin && <div className="modern-contact-item flex items-center gap-1.5"><Linkedin size={12} /> <a href={ensureUrl(data.linkedin)} target="_blank" rel="noreferrer">LinkedIn</a></div>}
            </div>
            
            {(data.leetcode || data.codeforces || data.hackerrank || data.hackerearth) && (
              <div className="modern-coding-profiles flex flex-wrap gap-4 text-xs text-slate-400 mt-2 pt-2 border-t border-slate-700/50">
                  {data.leetcode && <div className="flex items-center gap-1.5"><Code2 size={12}/> <a href={ensureUrl(data.leetcode)} target="_blank" rel="noreferrer">LeetCode</a></div>}
                  {data.codeforces && <div className="flex items-center gap-1.5"><Terminal size={12}/> <a href={ensureUrl(data.codeforces)} target="_blank" rel="noreferrer">Codeforces</a></div>}
                  {data.hackerrank && <div className="flex items-center gap-1.5"><Braces size={12}/> <a href={ensureUrl(data.hackerrank)} target="_blank" rel="noreferrer">HackerRank</a></div>}
                  {data.hackerearth && <div className="flex items-center gap-1.5"><Cpu size={12}/> <a href={ensureUrl(data.hackerearth)} target="_blank" rel="noreferrer">HackerEarth</a></div>}
              </div>
            )}
        </div>
      </div>

      <div className="modern-body flex flex-1">
        {/* Left Column (Main Content) */}
        <div className="modern-main w-2/3 p-8 pr-6 border-r border-slate-100 flex flex-col gap-8">
          {/* Summary */}
          {data.summary && (
            <div className="modern-section">
              <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-3">Professional Summary</h3>
              <div 
                className="modern-text text-slate-600 leading-relaxed text-sm text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
                dangerouslySetInnerHTML={{ __html: data.summary }}
              />
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Experience</h3>
                <div className="space-y-6">
                {data.experience.map((exp) => (
                    <div key={exp.id} className="modern-item">
                    <div className="modern-item-header flex justify-between items-baseline mb-1">
                        <h4 className="modern-item-title font-bold text-slate-800">{exp.position}</h4>
                        <span className="modern-item-date text-xs font-semibold text-slate-500 whitespace-nowrap">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </span>
                    </div>
                    <div className="modern-item-subtitle text-sm font-medium text-blue-600 mb-2">{exp.company}</div>
                    <div 
                        className="modern-text text-slate-600 text-sm whitespace-pre-line leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
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
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Key Projects</h3>
                <div className="space-y-4">
                  {data.projects.map((proj) => (
                     <div key={proj.id} className="modern-item">
                        <div className="modern-item-header flex items-center gap-2 mb-1">
                            <h4 className="modern-item-title font-bold text-slate-800 text-sm">{proj.name}</h4>
                            {proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline">View Project</a>}
                        </div>
                        <div 
                            className="modern-text text-slate-600 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
                            dangerouslySetInnerHTML={{ __html: proj.description }}
                        />
                     </div>
                  ))}
                </div>
             </div>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="modern-sidebar w-1/3 p-8 pl-6 bg-slate-50 flex flex-col gap-8">
          {/* Education */}
          {data.education.length > 0 && (
            <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Education</h3>
                <div className="space-y-4">
                {data.education.map((edu) => (
                    <div key={edu.id} className="modern-item">
                    <div className="font-bold text-slate-800 text-sm">{edu.school}</div>
                    <div className="text-xs text-slate-600 mb-1">{edu.degree}</div>
                    <div className="text-xs text-slate-500">{edu.year} | {edu.location}</div>
                    </div>
                ))}
                </div>
            </div>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                    <span key={index} className="modern-tag bg-slate-200 text-slate-700 px-2 py-1 rounded text-xs font-medium">
                    {skill}
                    </span>
                ))}
                </div>
            </div>
          )}

           {/* Certifications */}
           {data.certifications.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Certifications</h3>
                <div className="space-y-2">
                   {data.certifications.map(cert => (
                      <div key={cert.id} className="modern-item text-sm">
                         <div className="font-semibold text-slate-800">{cert.name}</div>
                         <div className="text-xs text-slate-500">{cert.issuer}, {cert.year}</div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* Awards */}
           {data.awards.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Awards</h3>
                <div className="space-y-2">
                   {data.awards.map(award => (
                      <div key={award.id} className="modern-item text-sm">
                         <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                            <Trophy size={10} className="text-yellow-600" /> {award.name}
                         </div>
                         <div className="text-xs text-slate-500 pl-4">{award.issuer}, {award.year}</div>
                      </div>
                   ))}
                </div>
             </div>
           )}

           {/* Languages */}
           {data.languages.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Languages</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                    {data.languages.map((lang, i) => <li key={i}>{lang}</li>)}
                </ul>
             </div>
           )}
           
           {/* Interests */}
           {data.interests.length > 0 && (
             <div className="modern-section">
                <h3 className="modern-section-title text-slate-900 font-bold uppercase tracking-wider text-sm border-b-2 border-slate-900 pb-1 mb-4">Interests</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                    {data.interests.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
