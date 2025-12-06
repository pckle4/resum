

import React from 'react';
import { ResumeData } from '../../types';
import { Trophy, Code2, Terminal } from '../ui/Icons';

interface Props {
  data: ResumeData;
}

const ensureUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `https://${url}`;
};

const MinimalistTemplate: React.FC<Props> = ({ data }) => {
  return (
    <div className="minimalist-template w-full h-full bg-white text-gray-800 p-12 font-serif flex flex-col gap-6">
      {/* Header */}
      <header className="minimalist-header border-b-2 border-gray-800 pb-6 shrink-0">
        <div className="minimalist-header-top flex justify-between items-start">
            <div>
                <h1 className="minimalist-name text-4xl font-bold text-gray-900 mb-2">{data.fullName}</h1>
                <div className="minimalist-title text-lg text-gray-600 italic mb-4">{data.title}</div>
            </div>
            {data.profileImage && (
                <div className="minimalist-avatar w-20 h-20 bg-gray-100 grayscale border border-gray-200">
                    <img src={data.profileImage} alt="" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
        
        <div className="minimalist-contact flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 font-sans">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span>•</span>}
          {data.phone && <span>{data.phone}</span>}
          {data.phone && data.location && <span>•</span>}
          {data.location && <span>{data.location}</span>}
          {data.location && data.website && <span>•</span>}
          {data.website && <a href={ensureUrl(data.website)} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>}
          {data.website && data.linkedin && <span>•</span>}
          {data.linkedin && <a href={ensureUrl(data.linkedin)} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>}
        </div>

        {(data.leetcode || data.codeforces || data.hackerrank) && (
             <div className="minimalist-coding flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 font-sans mt-2">
                 {data.leetcode && <a href={ensureUrl(data.leetcode)} target="_blank" rel="noreferrer" className="hover:underline">LeetCode</a>}
                 {data.codeforces && <a href={ensureUrl(data.codeforces)} target="_blank" rel="noreferrer" className="hover:underline">Codeforces</a>}
                 {data.hackerrank && <a href={ensureUrl(data.hackerrank)} target="_blank" rel="noreferrer" className="hover:underline">HackerRank</a>}
                 {data.hackerearth && <a href={ensureUrl(data.hackerearth)} target="_blank" rel="noreferrer" className="hover:underline">HackerEarth</a>}
             </div>
        )}
      </header>

      {/* Summary */}
      {data.summary && (
        <section className="minimalist-section">
          <h2 className="minimalist-section-title text-sm font-sans font-bold text-gray-400 uppercase tracking-widest mb-3">Profile</h2>
          <div 
            className="minimalist-text text-sm leading-relaxed text-gray-700 text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
            dangerouslySetInnerHTML={{ __html: data.summary }}
          />
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="minimalist-section">
            <h2 className="minimalist-section-title text-sm font-sans font-bold text-gray-400 uppercase tracking-widest mb-4">Experience</h2>
            <div className="space-y-6">
            {data.experience.map((exp) => (
                <div key={exp.id} className="minimalist-item">
                <div className="minimalist-item-header flex justify-between items-baseline mb-1 font-sans">
                    <h3 className="minimalist-item-company font-bold text-gray-900 text-base">{exp.company}</h3>
                    <span className="minimalist-item-date text-xs text-gray-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                </div>
                <div className="minimalist-item-position text-sm text-gray-600 italic mb-2">{exp.position}</div>
                <div 
                    className="minimalist-text text-sm text-gray-700 leading-relaxed whitespace-pre-line text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
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
            <h2 className="minimalist-section-title text-sm font-sans font-bold text-gray-400 uppercase tracking-widest mb-4">Projects</h2>
            <div className="space-y-4">
               {data.projects.map((proj) => (
                  <div key={proj.id} className="minimalist-item">
                     <div className="minimalist-item-header flex items-baseline gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 text-sm font-sans">{proj.name}</h3>
                        {proj.link && <a href={ensureUrl(proj.link)} target="_blank" rel="noreferrer" className="text-xs text-gray-500 italic hover:underline">(Link)</a>}
                     </div>
                     <div 
                        className="minimalist-text text-sm text-gray-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic"
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                     />
                  </div>
               ))}
            </div>
         </section>
      )}

      <div className="minimalist-grid grid grid-cols-2 gap-8 mt-2">
        {/* Education */}
        {data.education.length > 0 && (
            <section className="minimalist-col minimalist-section">
            <h2 className="minimalist-section-title text-sm font-sans font-bold text-gray-400 uppercase tracking-widest mb-4">Education</h2>
            <div className="space-y-4">
                {data.education.map((edu) => (
                <div key={edu.id} className="minimalist-item">
                    <div className="font-bold text-gray-900 text-sm font-sans">{edu.school}</div>
                    <div className="text-sm text-gray-700 italic">{edu.degree}</div>
                    <div className="text-xs text-gray-500 mt-1 font-sans">{edu.year}</div>
                </div>
                ))}
            </div>
            </section>
        )}

        {/* Certifications & Awards */}
        {(data.certifications.length > 0 || data.awards.length > 0) && (
            <section className="minimalist-col minimalist-section">
                <h2 className="minimalist-section-title text-sm font-sans font-bold text-gray-400 uppercase tracking-widest mb-4">Achievements</h2>
                <div className="space-y-3">
                    {data.certifications.map((cert) => (
                        <div key={cert.id} className="minimalist-item text-sm text-gray-700">
                            <span className="font-bold text-gray-900 font-sans">{cert.name}</span>
                            <span className="block italic text-xs">{cert.issuer}, {cert.year}</span>
                        </div>
                    ))}
                    {data.awards.map((award) => (
                        <div key={award.id} className="minimalist-item text-sm text-gray-700 flex items-start gap-1">
                             <Trophy size={12} className="mt-0.5 text-gray-400"/>
                             <div>
                                <span className="font-bold text-gray-900 font-sans">{award.name}</span>
                                <span className="block italic text-xs">{award.issuer}, {award.year}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
            <section className="minimalist-col minimalist-section">
            <h2 className="minimalist-section-title text-sm font-sans font-bold text-gray-400 uppercase tracking-widest mb-4">Skills</h2>
            <div className="minimalist-text text-sm text-gray-700 leading-relaxed font-sans">
                {data.skills.join(" • ")}
            </div>
            </section>
        )}

        {/* Languages & Interests Combined */}
        {(data.languages.length > 0 || data.interests.length > 0) && (
             <section className="minimalist-col minimalist-section">
                 <h2 className="minimalist-section-title text-sm font-sans font-bold text-gray-400 uppercase tracking-widest mb-4">Additional</h2>
                 <div className="text-sm text-gray-700 space-y-2 font-sans">
                     {data.languages.length > 0 && <div><span className="font-bold">Languages:</span> {data.languages.join(", ")}</div>}
                     {data.interests.length > 0 && <div><span className="font-bold">Interests:</span> {data.interests.join(", ")}</div>}
                 </div>
             </section>
        )}
      </div>
    </div>
  );
};

export default MinimalistTemplate;
