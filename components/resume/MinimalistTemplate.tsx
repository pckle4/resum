import React from 'react';
import { ResumeData } from '../../types';
import { Trophy, Code2, Terminal } from '../ui/Icons';

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

const MinimalistTemplate: React.FC<Props> = ({ data, isSkeleton = false }) => {
  if (isSkeleton) {
     return (
        <div className="w-full h-full bg-white p-[60px] flex flex-col gap-8">
            {/* Skeleton Header */}
            <header className="border-b-2 border-gray-900 pb-8 shrink-0 flex justify-between">
                <div className="space-y-4 w-3/4">
                    <div className="w-3/4 h-10 bg-gray-900 rounded-sm" />
                    <div className="w-1/2 h-6 bg-gray-300 rounded-sm" />
                    <div className="flex gap-4 mt-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-sm" />
                        <div className="w-20 h-2 bg-gray-200 rounded-sm" />
                    </div>
                </div>
                <div className="w-[80px] h-[80px] bg-gray-100 border border-gray-200" />
            </header>

            {/* Skeleton Body */}
            <div className="space-y-8 flex-1">
                <div className="space-y-4">
                    <div className="w-32 h-3 bg-gray-300 rounded-sm border-b border-gray-100 pb-2" />
                    <div className="space-y-2">
                        <div className="w-full h-2 bg-gray-100 rounded-sm" />
                        <div className="w-full h-2 bg-gray-100 rounded-sm" />
                        <div className="w-3/4 h-2 bg-gray-100 rounded-sm" />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="w-40 h-3 bg-gray-300 rounded-sm border-b border-gray-100 pb-2" />
                    {[1, 2, 3].map(i => (
                        <div key={i} className="pl-4 border-l-2 border-gray-900 space-y-2">
                             <div className="flex justify-between">
                                 <div className="w-1/3 h-4 bg-gray-800 rounded-sm" />
                                 <div className="w-20 h-3 bg-gray-200 rounded-sm" />
                             </div>
                             <div className="w-1/4 h-3 bg-gray-400 rounded-sm" />
                             <div className="w-full h-2 bg-gray-100 rounded-sm mt-1" />
                             <div className="w-5/6 h-2 bg-gray-100 rounded-sm" />
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="w-40 h-3 bg-gray-300 rounded-sm border-b border-gray-100 pb-2" />
                    {[1, 2].map(i => (
                        <div key={i} className="pl-4 space-y-2">
                             <div className="flex justify-between">
                                 <div className="w-1/3 h-4 bg-gray-800 rounded-sm" />
                                 <div className="w-20 h-3 bg-gray-200 rounded-sm" />
                             </div>
                             <div className="w-full h-2 bg-gray-100 rounded-sm mt-1" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-gray-900 pt-6">
                     <div className="space-y-3">
                         <div className="w-24 h-3 bg-gray-300 rounded-sm" />
                         <div className="w-full h-2 bg-gray-100 rounded-sm" />
                         <div className="w-full h-2 bg-gray-100 rounded-sm" />
                     </div>
                     <div className="space-y-3">
                         <div className="w-24 h-3 bg-gray-300 rounded-sm" />
                         <div className="w-full h-2 bg-gray-100 rounded-sm" />
                         <div className="w-2/3 h-2 bg-gray-100 rounded-sm" />
                     </div>
                     <div className="space-y-3">
                         <div className="w-24 h-3 bg-gray-300 rounded-sm" />
                         <div className="w-full h-2 bg-gray-100 rounded-sm" />
                         <div className="w-2/3 h-2 bg-gray-100 rounded-sm" />
                     </div>
                     <div className="space-y-3">
                         <div className="w-24 h-3 bg-gray-300 rounded-sm" />
                         <div className="w-full h-2 bg-gray-100 rounded-sm" />
                         <div className="w-2/3 h-2 bg-gray-100 rounded-sm" />
                     </div>
                </div>
            </div>
        </div>
     );
  }

  return (
    <div className="minimalist-template w-full h-full bg-white text-gray-800 p-[60px] font-serif flex flex-col gap-8">
      {/* Header */}
      <header className="minimalist-header border-b-2 border-gray-900 pb-8 shrink-0">
        <div className="minimalist-header-top flex justify-between items-start">
            <div className="max-w-[75%]">
                <h1 className="minimalist-name text-[38px] font-bold text-gray-900 mb-3 leading-none tracking-tight">{data.fullName}</h1>
                <div className="minimalist-title text-[18px] text-gray-600 italic mb-5 font-medium">{data.title}</div>
            </div>
            {data.profileImage && (
                <div className="minimalist-avatar w-[80px] h-[80px] bg-gray-50 grayscale contrast-125 border border-gray-200 overflow-hidden">
                    <img src={data.profileImage} alt="" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        
        <div className="minimalist-contact flex flex-wrap gap-x-6 gap-y-2 text-[12px] text-gray-600 font-sans tracking-wide">
          {data.email && <span className="text-gray-900 font-medium">{data.email}</span>}
          {data.email && data.phone && <span className="text-gray-300">|</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.location && <span className="text-gray-300">|</span>}
          {data.location && <span>{data.location}</span>}
          {data.location && data.website && <span className="text-gray-300">|</span>}
          {data.website && <a href={ensureUrl(data.website)} target="_blank" rel="noreferrer" className="hover:text-black border-b border-gray-300 pb-0.5 hover:border-black transition-all">Portfolio</a>}
          {data.website && data.linkedin && <span className="text-gray-300">|</span>}
          {data.linkedin && <a href={getProfileUrl('linkedin', data.linkedin)} target="_blank" rel="noreferrer" className="hover:text-black border-b border-gray-300 pb-0.5 hover:border-black transition-all">LinkedIn</a>}
        </div>

        {(data.leetcode || data.codeforces || data.hackerrank) && (
             <div className="minimalist-coding flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-gray-500 font-sans mt-3 pt-3 border-t border-gray-100">
                 {data.leetcode && <a href={getProfileUrl('leetcode', data.leetcode)} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">LeetCode</a>}
                 {data.codeforces && <a href={getProfileUrl('codeforces', data.codeforces)} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Codeforces</a>}
                 {data.hackerrank && <a href={getProfileUrl('hackerrank', data.hackerrank)} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">HackerRank</a>}
                 {data.hackerearth && <a href={getProfileUrl('hackerearth', data.hackerearth)} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">HackerEarth</a>}
             </div>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="minimalist-section mb-2">
          <h2 className="minimalist-section-title text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-2">Profile</h2>
          <div 
            className="minimalist-text text-[13px] leading-[1.8] text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-gray-900 [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="minimalist-section">
            <h2 className="minimalist-section-title text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-2">Professional Experience</h2>
            <div className="space-y-8">
            {data.experience.map((exp) => (
                <div key={exp.id} className="minimalist-item">
                <div className="minimalist-item-header flex justify-between items-baseline mb-2 font-sans border-l-2 border-gray-900 pl-4">
                    <h3 className="minimalist-item-company font-bold text-gray-900 text-[16px]">{exp.company}</h3>
                    <span className="minimalist-item-date text-[12px] font-medium text-gray-500 tracking-wide">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                </div>
                <div className="minimalist-item-position text-[14px] text-gray-600 italic mb-3 pl-4 font-medium">{exp.position}</div>
                <div 
                    className="minimalist-text text-[13px] text-gray-700 leading-[1.7] whitespace-pre-line text-justify pl-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_strong]:text-gray-900"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                />
                </div>
            ))}
            </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
         <section className="minimalist-section">
            <h2 className="minimalist-section-title text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-2">Selected Projects</h2>
            <div className="grid grid-cols-1 gap-6">
               {data.projects.map((proj) => (
                  <div key={proj.id} className="minimalist-item">
                     <div className="minimalist-item-header flex items-baseline gap-3 mb-2">
                        <h3 className="font-bold text-gray-900 text-[14px] font-sans">{proj.name}</h3>
                        {proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-[11px] text-gray-500 font-sans border-b border-gray-300 hover:border-gray-600 hover:text-gray-800 transition-colors">View Link</a>}
                     </div>
                     <div 
                        className="minimalist-text text-[13px] text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold"
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                     />
                  </div>
               ))}
            </div>
         </section>
      )}

      <div className="minimalist-grid grid grid-cols-2 gap-12 mt-4 pt-4 border-t border-gray-900">
        {/* Education */}
        {data.education.length > 0 && (
            <section className="minimalist-col minimalist-section">
            <h2 className="minimalist-section-title text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-5">Education</h2>
            <div className="space-y-6">
                {data.education.map((edu) => (
                <div key={edu.id} className="minimalist-item">
                    <div className="font-bold text-gray-900 text-[14px] font-sans mb-1">{edu.school}</div>
                    <div className="text-[13px] text-gray-700 italic mb-1">{edu.degree}</div>
                    <div className="text-[11px] text-gray-500 font-sans tracking-wide">{edu.year} | {edu.location}</div>
                </div>
                ))}
            </div>
            </section>
        )}

        {/* Right Col: Skills & Achievements */}
        <div className="space-y-8">
            {/* Skills */}
            {data.skills.length > 0 && (
                <section className="minimalist-col minimalist-section">
                <h2 className="minimalist-section-title text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-5">Skills</h2>
                <div className="minimalist-text text-[13px] text-gray-800 leading-relaxed font-sans">
                    {data.skills.join("  •  ")}
                </div>
                </section>
            )}

             {/* Certifications & Awards */}
            {(data.certifications.length > 0 || data.awards.length > 0) && (
                <section className="minimalist-col minimalist-section">
                    <h2 className="minimalist-section-title text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-5">Achievements</h2>
                    <div className="space-y-4">
                        {data.certifications.map((cert) => (
                            <div key={cert.id} className="minimalist-item text-[13px] text-gray-700">
                                <span className="font-bold text-gray-900 font-sans block mb-0.5">{cert.name}</span>
                                <span className="block italic text-[12px] text-gray-500">{cert.issuer}, {cert.year}</span>
                            </div>
                        ))}
                        {data.awards.map((award) => (
                            <div key={award.id} className="minimalist-item text-[13px] text-gray-700">
                                <span className="font-bold text-gray-900 font-sans flex items-center gap-2 mb-0.5">
                                    {award.name}
                                </span>
                                <span className="block italic text-[12px] text-gray-500">{award.issuer}, {award.year}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {(data.languages.length > 0) && (
             <section className="minimalist-col minimalist-section">
                 <h2 className="minimalist-section-title text-[11px] font-sans font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Languages</h2>
                 <div className="text-[13px] text-gray-700 font-sans">
                     {data.languages.join(", ")}
                 </div>
             </section>
            )}
        </div>
      </div>
    </div>
  );
};

export default MinimalistTemplate;