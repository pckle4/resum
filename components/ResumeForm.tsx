import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ResumeData, INITIAL_RESUME_DATA } from '../types';
import { 
  User, Briefcase, GraduationCap, Plus, Trash2, 
  ChevronRight, ChevronLeft, CheckCircle2,
  Zap, Trophy, ChevronDown, ChevronUp, Upload, X, Languages, Heart,
  Code2, Terminal, Wand2,
  Cpu, Braces, Info, LayoutTemplate, Star, Globe, Mail, Phone, MapPin
} from './ui/Icons';
import { Input, TagInput, Slider } from './ui/FormElements';
import { RichTextEditor } from './ui/RichTextEditor';

interface Props {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  onReset: () => void;
}

const steps = [
  { id: 'personal', title: 'Personal', icon: User },
  { id: 'experience', title: 'Experience', icon: Briefcase },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'achievements', title: 'Projects', icon: Trophy },
  { id: 'skills', title: 'Skills', icon: Zap },
];

const PREDEFINED_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP",
  "HTML5", "CSS3", "Tailwind CSS", "SASS/SCSS", "Bootstrap", "Material UI",
  "Git", "Docker", "Kubernetes", "AWS", "Google Cloud", "Azure", "CI/CD", "Jenkins", "Terraform",
  "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "GraphQL", "REST APIs",
  "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "User Research", "Wireframing", "Prototyping",
  "Agile", "Scrum", "Kanban", "Jira", "Trello", "Project Management"
];

const PREDEFINED_INTERESTS = [
  "Photography", "Traveling", "Reading", "Cooking", "Hiking", "Gaming", "Music", "Volunteering",
  "Cycling", "Swimming", "Chess", "Writing", "Blogging", "Investing", "Art History"
];

const PREDEFINED_DEGREES = [
  "Bachelor of Science in Computer Science",
  "Bachelor of Science in Software Engineering",
  "Bachelor of Arts in Psychology",
  "Master of Business Administration (MBA)",
  "Master of Science in Data Science"
];

const ResumeStrength: React.FC<{ data: ResumeData }> = ({ data }) => {
    const score = useMemo(() => {
        let s = 0;
        if (data.fullName) s += 10;
        if (data.email) s += 10;
        if (data.title) s += 10;
        if (data.summary) s += 10;
        if (data.experience.length > 0) s += 20;
        if (data.education.length > 0) s += 10;
        if (data.skills.length > 0) s += 10;
        if (data.projects.length > 0) s += 10;
        if (data.languages.length > 0) s += 10;
        return Math.min(s, 100);
    }, [data]);

    let color = 'bg-red-500';
    if (score > 40) color = 'bg-amber-500';
    if (score > 80) color = 'bg-emerald-500';

    return (
        <div className="hidden sm:flex items-center gap-3 bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wide">Strength:</div>
            <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${score}%` }}></div>
            </div>
            <div className="text-xs font-bold text-slate-900">{score}%</div>
        </div>
    );
};

interface AccordionItemProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, subtitle, isOpen, onToggle, onDelete, children, icon }) => (
    <div 
        className={`group bg-white rounded-xl transition-all duration-300 mb-4 border
        ${isOpen 
            ? 'border-slate-900 shadow-lg ring-1 ring-slate-900/5' 
            : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
        }
        overflow-hidden
        `}
    >
        <div className="flex items-center justify-between p-4 cursor-pointer select-none bg-white" onClick={onToggle}>
            <div className="flex items-center gap-4 min-w-0">
                <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0
                    ${isOpen ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'}
                `}>
                    {icon || (isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>)}
                </div>
                <div className="min-w-0 flex flex-col">
                    <h3 className={`font-bold text-sm truncate transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                        {title || <span className="text-slate-400 italic">Untitled Item</span>}
                    </h3>
                    {subtitle && <p className="text-xs text-slate-500 truncate font-medium">{subtitle}</p>}
                </div>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Delete Item"
            >
                <Trash2 size={16} />
            </button>
        </div>
        
        {isOpen && (
             <div className="px-5 pb-6 pt-2 animate-fadeIn border-t border-slate-100 bg-slate-50/50">
                {children}
            </div>
        )}
    </div>
);

const ResumeForm: React.FC<Props> = ({ data, updateData, onReset }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Language slider local state
  const [langLevel, setLangLevel] = useState(50);
  const [langInput, setLangInput] = useState('');

  const toggleItem = (section: string, id: string) => {
    setOpenItems(prev => ({ ...prev, [`${section}-${id}`]: !prev[`${section}-${id}`] }));
  };

  const handleChange = (field: keyof ResumeData, value: any) => {
    updateData({ ...data, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('profileImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateItem = <T,>(list: T[], index: number, field: keyof T, value: any, listName: keyof ResumeData) => {
    const newList = [...list];
    newList[index] = { ...newList[index], [field]: value };
    handleChange(listName, newList);
  };

  const addItem = (listName: keyof ResumeData, emptyItem: any) => {
    const newItem = { ...emptyItem, id: Date.now().toString() };
    // @ts-ignore
    handleChange(listName, [newItem, ...data[listName]]);
    setOpenItems(prev => ({ ...prev, [`${listName}-${newItem.id}`]: true }));
  };

  const removeItem = (listName: keyof ResumeData, index: number) => {
    // @ts-ignore
    const newList = data[listName].filter((_, i) => i !== index);
    handleChange(listName, newList);
  };

  const addLanguage = () => {
      if (!langInput.trim()) return;
      let levelText = '';
      if (langLevel >= 90) levelText = '(Native)';
      else if (langLevel >= 75) levelText = '(Fluent)';
      else if (langLevel >= 50) levelText = '(Professional)';
      else levelText = '(Basic)';
      
      const finalString = `${langInput.trim()} ${levelText}`;
      if (!data.languages.includes(finalString)) {
          handleChange('languages', [...data.languages, finalString]);
      }
      setLangInput('');
  };

  const handleFillSample = () => {
     if (window.confirm("Overwrite current data with sample data?")) {
         updateData(INITIAL_RESUME_DATA);
     }
  };

  useEffect(() => {
    const el = document.getElementById('step-content');
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeStep]);

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans">
      
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
         <div className="max-w-5xl mx-auto px-4 md:px-6">
             <div className="flex items-center justify-between py-3">
                 {/* Left: Strength */}
                 <ResumeStrength data={data} />
                 
                 {/* Right: Actions */}
                 <div className="flex items-center gap-2 ml-auto sm:ml-0">
                     <button 
                        onClick={handleFillSample}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 rounded-lg transition-colors"
                        title="Auto-fill Sample Data"
                     >
                         <Wand2 size={14} /> <span>Auto Fill</span>
                     </button>
                     <div className="h-6 w-px bg-slate-200 mx-1"></div>
                     <button 
                        onClick={() => { if(confirm("Clear all data?")) onReset(); }}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-colors"
                        title="Reset Form"
                     >
                         <Trash2 size={14} /> <span>Reset</span>
                     </button>
                 </div>
             </div>
             
             {/* Stepper Navigation */}
             <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar pb-0">
                 {steps.map((step, idx) => {
                     const isActive = idx === activeStep;
                     const isCompleted = idx < activeStep;
                     
                     return (
                         <div key={step.id} className="flex-1 min-w-[100px] sm:min-w-0">
                            <button
                                onClick={() => setActiveStep(idx)}
                                className={`w-full group relative py-3 border-b-2 transition-all flex items-center justify-center gap-2
                                    ${isActive 
                                        ? 'border-slate-900 text-slate-900' 
                                        : isCompleted 
                                            ? 'border-slate-300 text-slate-500 hover:border-slate-400' 
                                            : 'border-transparent text-slate-400 hover:text-slate-500'
                                    }
                                `}
                            >
                                <span className={`
                                    w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors
                                    ${isActive 
                                        ? 'bg-slate-900 text-white border-slate-900' 
                                        : isCompleted 
                                            ? 'bg-emerald-100 text-emerald-600 border-emerald-200'
                                            : 'bg-slate-100 text-slate-400 border-slate-200'
                                    }
                                `}>
                                    {isCompleted ? <CheckCircle2 size={12}/> : (idx + 1)}
                                </span>
                                <span className="text-sm font-bold whitespace-nowrap">{step.title}</span>
                            </button>
                         </div>
                     );
                 })}
             </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div id="step-content" className="flex-1 overflow-y-auto p-4 md:p-8">
         <div className="max-w-4xl mx-auto space-y-8 pb-24">
            
            {/* Header for Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                        <span className="p-2 bg-slate-100 rounded-lg text-slate-600">
                             {React.createElement(steps[activeStep].icon, { size: 24 })}
                        </span>
                        {steps[activeStep].title}
                    </h2>
                </div>
                {/* Contextual Actions */}
                {activeStep === 1 && (
                    <button onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-95">
                        <Plus size={16} /> Add Position
                    </button>
                )}
                {activeStep === 2 && (
                    <button onClick={() => addItem('education', { school: '', degree: '', year: '', location: '' })} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-95">
                        <Plus size={16} /> Add School
                    </button>
                )}
                 {(activeStep === 3) && (
                    <button onClick={() => addItem('projects', { name: '', description: '', link: '' })} className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 transition-all active:scale-95">
                        <Plus size={16} /> Add Project
                    </button>
                )}
            </div>
            
            <div className="animate-fadeIn">
            {/* STEP 0: PERSONAL */}
            {activeStep === 0 && (
                <div className="space-y-6">
                    {/* Main Profile Card */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex flex-col items-center gap-3 mx-auto md:mx-0 shrink-0">
                            <div className="w-36 h-36 rounded-full bg-slate-50 border-4 border-white shadow-lg overflow-hidden relative group cursor-pointer ring-1 ring-slate-200" onClick={() => fileInputRef.current?.click()}>
                                {data.profileImage ? (
                                    <img src={data.profileImage} className="w-full h-full object-cover" alt="Profile" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-300"><User size={48} /></div>
                                )}
                                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                    <Upload className="text-white" size={24} />
                                </div>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                            <p className="text-xs text-slate-400 font-medium">Click to upload photo</p>
                        </div>

                        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input label="Full Name" value={data.fullName} onChange={e => handleChange('fullName', e.target.value)} placeholder="e.g. John Doe" className="md:col-span-2" />
                            <Input label="Job Title" value={data.title} onChange={e => handleChange('title', e.target.value)} placeholder="e.g. Senior Developer" className="md:col-span-2" />
                            <Input label="Email" value={data.email} onChange={e => handleChange('email', e.target.value)} placeholder="john@example.com" icon={<Mail size={16}/>} />
                            <Input label="Phone" value={data.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="+1 234 567 890" icon={<Phone size={16}/>}/>
                            <Input label="Location" value={data.location} onChange={e => handleChange('location', e.target.value)} placeholder="City, Country" icon={<MapPin size={16}/>}/>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Links Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2"><Globe size={16} /> Social Links</h3>
                            <div className="space-y-4">
                                <Input label="Portfolio Website" value={data.website} onChange={e => handleChange('website', e.target.value)} placeholder="www.portfolio.com" />
                                <Input label="LinkedIn Username" value={data.linkedin} onChange={e => handleChange('linkedin', e.target.value)} placeholder="username" />
                            </div>
                        </div>
                        
                        {/* Coding Profiles Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2"><Code2 size={16} /> Coding Profiles</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="LeetCode" value={data.leetcode || ''} onChange={e => handleChange('leetcode', e.target.value)} placeholder="user" />
                                    <Input label="Codeforces" value={data.codeforces || ''} onChange={e => handleChange('codeforces', e.target.value)} placeholder="user" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="HackerRank" value={data.hackerrank || ''} onChange={e => handleChange('hackerrank', e.target.value)} placeholder="user" />
                                    <Input label="HackerEarth" value={data.hackerearth || ''} onChange={e => handleChange('hackerearth', e.target.value)} placeholder="user" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-2"><Info size={16} /> Professional Summary</h3>
                        <p className="text-xs text-slate-500 mb-4">Write 2-3 sentences highlighting your years of experience, industry, and key skills.</p>
                        <RichTextEditor label="" value={data.summary} onChange={val => handleChange('summary', val)} placeholder="Experienced professional with..." />
                    </div>
                </div>
            )}

            {/* STEP 1: EXPERIENCE */}
            {activeStep === 1 && (
                <div className="space-y-4">
                    {data.experience.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <Briefcase size={32} />
                            </div>
                            <h3 className="text-slate-900 font-bold mb-1">No experience added</h3>
                            <p className="text-slate-500 text-sm mb-4">Add your previous jobs to showcase your career.</p>
                            <button onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} className="text-indigo-600 font-bold text-sm hover:underline">+ Add First Job</button>
                        </div>
                    )}
                    {data.experience.map((exp, idx) => (
                        <AccordionItem
                            key={exp.id}
                            title={exp.company}
                            subtitle={exp.position}
                            isOpen={!!openItems[`experience-${exp.id}`]}
                            onToggle={() => toggleItem('experience', exp.id)}
                            onDelete={() => removeItem('experience', idx)}
                            icon={<Briefcase size={20} />}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <Input label="Company" value={exp.company} onChange={e => updateItem(data.experience, idx, 'company', e.target.value, 'experience')} />
                                <Input label="Position" value={exp.position} onChange={e => updateItem(data.experience, idx, 'position', e.target.value, 'experience')} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Start Year" value={exp.startDate} onChange={e => updateItem(data.experience, idx, 'startDate', e.target.value, 'experience')} placeholder="YYYY" maxLength={4} />
                                    <Input label="End Year" value={exp.endDate} onChange={e => updateItem(data.experience, idx, 'endDate', e.target.value, 'experience')} placeholder={exp.current ? 'Present' : 'YYYY'} disabled={exp.current} maxLength={4} />
                                </div>
                                <div className="flex items-end pb-2">
                                     <label className="flex items-center gap-2 cursor-pointer select-none px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors w-full">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${exp.current ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-300'}`}>
                                            {exp.current && <CheckCircle2 size={14} />}
                                        </div>
                                        <input type="checkbox" checked={exp.current} onChange={e => updateItem(data.experience, idx, 'current', e.target.checked, 'experience')} className="hidden" />
                                        <span className="text-sm font-medium text-slate-700">I currently work here</span>
                                     </label>
                                </div>
                            </div>
                            <RichTextEditor label="Description" value={exp.description} onChange={val => updateItem(data.experience, idx, 'description', val, 'experience')} placeholder="• Led development of..." />
                        </AccordionItem>
                    ))}
                </div>
            )}

            {/* STEP 2: EDUCATION */}
            {activeStep === 2 && (
                 <div className="space-y-4">
                    {data.education.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                <GraduationCap size={32} />
                            </div>
                            <h3 className="text-slate-900 font-bold mb-1">No education added</h3>
                            <button onClick={() => addItem('education', { school: '', degree: '', year: '', location: '' })} className="text-indigo-600 font-bold text-sm hover:underline mt-2">+ Add Education</button>
                        </div>
                    )}
                    {data.education.map((edu, idx) => (
                        <AccordionItem
                            key={edu.id}
                            title={edu.school}
                            subtitle={edu.degree}
                            isOpen={!!openItems[`education-${edu.id}`]}
                            onToggle={() => toggleItem('education', edu.id)}
                            onDelete={() => removeItem('education', idx)}
                            icon={<GraduationCap size={20} />}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input label="School / University" value={edu.school} onChange={e => updateItem(data.education, idx, 'school', e.target.value, 'education')} />
                                <Input label="Degree" value={edu.degree} onChange={e => updateItem(data.education, idx, 'degree', e.target.value, 'education')} suggestions={PREDEFINED_DEGREES} />
                                <Input label="Graduation Year" value={edu.year} onChange={e => updateItem(data.education, idx, 'year', e.target.value, 'education')} placeholder="YYYY" maxLength={4} />
                                <Input label="Location" value={edu.location} onChange={e => updateItem(data.education, idx, 'location', e.target.value, 'education')} placeholder="City, State" />
                            </div>
                        </AccordionItem>
                    ))}
                 </div>
            )}

            {/* STEP 3: PROJECTS & AWARDS */}
            {activeStep === 3 && (
                <div className="space-y-8">
                    {/* Projects */}
                    <div className="space-y-4">
                        {data.projects.map((proj, idx) => (
                             <AccordionItem
                                key={proj.id}
                                title={proj.name}
                                isOpen={!!openItems[`projects-${proj.id}`]}
                                onToggle={() => toggleItem('projects', proj.id)}
                                onDelete={() => removeItem('projects', idx)}
                                icon={<Trophy size={20} />}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                    <Input label="Project Name" value={proj.name} onChange={e => updateItem(data.projects, idx, 'name', e.target.value, 'projects')} />
                                    <Input label="Project Link" value={proj.link} onChange={e => updateItem(data.projects, idx, 'link', e.target.value, 'projects')} placeholder="github.com/..." />
                                </div>
                                <RichTextEditor label="Description" value={proj.description} onChange={val => updateItem(data.projects, idx, 'description', val, 'projects')} placeholder="• Built using React..." />
                            </AccordionItem>
                        ))}
                         {data.projects.length === 0 && (
                            <button onClick={() => addItem('projects', { name: '', description: '', link: '' })} className="w-full py-10 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors flex flex-col items-center justify-center gap-2 bg-slate-50/50">
                                <Zap size={24} />
                                <span>Add a Project</span>
                            </button>
                        )}
                    </div>
                    
                    {/* Extra Lists - Certs/Awards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                         {/* Certifications */}
                         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="font-bold text-slate-800 flex items-center gap-2"><CheckCircle2 size={16}/> Certifications</h3>
                                 <button onClick={() => addItem('certifications', { name: '', issuer: '', year: '' })} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100">+ Add</button>
                             </div>
                             <div className="space-y-3">
                                 {data.certifications.map((cert, idx) => (
                                     <div key={cert.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative group">
                                         <button onClick={() => removeItem('certifications', idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={14}/></button>
                                         <Input label="Name" value={cert.name} onChange={e => updateItem(data.certifications, idx, 'name', e.target.value, 'certifications')} className="mb-2 bg-white" />
                                         <div className="grid grid-cols-2 gap-2">
                                             <Input label="Issuer" value={cert.issuer} onChange={e => updateItem(data.certifications, idx, 'issuer', e.target.value, 'certifications')} className="bg-white"/>
                                             <Input label="Year" value={cert.year} onChange={e => updateItem(data.certifications, idx, 'year', e.target.value, 'certifications')} placeholder="YYYY" maxLength={4} className="bg-white" />
                                         </div>
                                     </div>
                                 ))}
                                 {data.certifications.length === 0 && <div className="text-xs text-slate-400 italic text-center py-4">No certifications added</div>}
                             </div>
                         </div>

                         {/* Awards */}
                         <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="font-bold text-slate-800 flex items-center gap-2"><Trophy size={16}/> Awards</h3>
                                 <button onClick={() => addItem('awards', { name: '', issuer: '', year: '' })} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded hover:bg-indigo-100">+ Add</button>
                             </div>
                             <div className="space-y-3">
                                 {data.awards.map((award, idx) => (
                                     <div key={award.id} className="bg-slate-50 p-4 rounded-xl border border-slate-100 relative group">
                                         <button onClick={() => removeItem('awards', idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500"><X size={14}/></button>
                                         <Input label="Name" value={award.name} onChange={e => updateItem(data.awards, idx, 'name', e.target.value, 'awards')} className="mb-2 bg-white" />
                                         <div className="grid grid-cols-2 gap-2">
                                             <Input label="Issuer" value={award.issuer} onChange={e => updateItem(data.awards, idx, 'issuer', e.target.value, 'awards')} className="bg-white" />
                                             <Input label="Year" value={award.year} onChange={e => updateItem(data.awards, idx, 'year', e.target.value, 'awards')} placeholder="YYYY" maxLength={4} className="bg-white" />
                                         </div>
                                     </div>
                                 ))}
                                  {data.awards.length === 0 && <div className="text-xs text-slate-400 italic text-center py-4">No awards added</div>}
                             </div>
                         </div>
                    </div>
                </div>
            )}

            {/* STEP 4: SKILLS & INTERESTS */}
            {activeStep === 4 && (
                <div className="space-y-8">
                     <TagInput 
                        label="Technical Skills" 
                        values={data.skills} 
                        onChange={vals => handleChange('skills', vals)} 
                        suggestions={PREDEFINED_SKILLS} 
                        icon={<Zap size={18} />}
                        placeholder="Type skill and hit Enter..."
                    />

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 text-lg font-bold text-slate-800">
                             <Languages size={20} className="text-indigo-500" /> Languages
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100">
                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="flex-1">
                                    <Input value={langInput} onChange={e => setLangInput(e.target.value)} placeholder="e.g. Spanish" className="bg-white" />
                                </div>
                                <button onClick={addLanguage} disabled={!langInput} className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed">Add</button>
                            </div>
                            <Slider value={langLevel} onChange={setLangLevel} label="Proficiency Level" formatLabel={(v) => v >= 90 ? 'Native' : v >= 75 ? 'Fluent' : v >= 50 ? 'Professional' : 'Basic'} />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {data.languages.map((l, i) => (
                                <div key={i} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-700 shadow-sm">
                                    {l}
                                    <button onClick={() => handleChange('languages', data.languages.filter(x => x !== l))} className="text-slate-400 hover:text-red-500"><X size={14} /></button>
                                </div>
                            ))}
                            {data.languages.length === 0 && <span className="text-sm text-slate-400 italic">No languages added</span>}
                        </div>
                    </div>

                    <TagInput 
                        label="Interests & Hobbies" 
                        values={data.interests} 
                        onChange={vals => handleChange('interests', vals)} 
                        suggestions={PREDEFINED_INTERESTS} 
                        icon={<Heart size={18} className="text-rose-500" />}
                        placeholder="Add interest..."
                    />
                </div>
            )}
            </div>
            
            {/* Navigation Footer */}
            <div className="flex justify-between pt-8 border-t border-slate-200">
                <button 
                    onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                    disabled={activeStep === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={16} /> Previous
                </button>
                
                {activeStep < steps.length - 1 ? (
                    <button 
                        onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                        className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 shadow-lg shadow-slate-300 hover:shadow-indigo-300 transition-all transform hover:-translate-y-1"
                    >
                        Next Step <ChevronRight size={16} />
                    </button>
                ) : (
                    <div className="px-6 py-3 bg-emerald-100 text-emerald-700 rounded-xl font-bold flex items-center gap-2 border border-emerald-200">
                        <CheckCircle2 size={16} /> All Sections Complete
                    </div>
                )}
            </div>

         </div>
      </div>
    </div>
  );
};

export default ResumeForm;