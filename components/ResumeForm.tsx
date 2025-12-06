
import React, { useState, useRef } from 'react';
import { ResumeData } from '../types';
import { 
  User, Briefcase, GraduationCap, FileText, Plus, Trash2, 
  ChevronRight, ChevronLeft, CheckCircle2,
  Zap, Trophy, ChevronDown, ChevronUp, Upload, X, Languages, Heart,
  Code2, Terminal, Mail, Phone, MapPin, Globe, Linkedin, Sparkles, AlertCircle, Eye, Download
} from './ui/Icons';
import { Input, TagInput, Slider } from './ui/FormElements';
import { RichTextEditor } from './ui/RichTextEditor';

interface Props {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  onReset: () => void;
  onPreview: () => void;
}

const steps = [
  { id: 'personal', title: 'Personal', icon: User },
  { id: 'experience', title: 'Experience', icon: Briefcase },
  { id: 'education', title: 'Education', icon: GraduationCap },
  { id: 'achievements', title: 'Projects', icon: Trophy },
  { id: 'skills', title: 'Finalize', icon: FileText },
];

const PREDEFINED_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "HTML5", "CSS3", "Tailwind CSS",
  "Git", "Docker", "AWS", "SQL", "MongoDB", "Figma", "Adobe XD", "UI/UX", "Agile"
];

const PREDEFINED_INTERESTS = [
  "Photography", "Traveling", "Reading", "Cooking", "Hiking", "Gaming", "Music", "Volunteering"
];

// --- STRICT VALIDATION HELPERS ---
const isValidUrl = (string: string) => {
  if (!string) return true; 
  const regex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  return regex.test(string);
};

const isValidDate = (string: string) => {
    if (!string) return true;
    // Strict YYYY or Present
    const regex = /^(\d{4})|(Present)$/i;
    return regex.test(string.trim());
};

const isValidEmail = (email: string) => {
    if (!email) return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const isValidPhone = (phone: string) => {
    if (!phone) return true;
    const simpleRegex = /^[\+]?[\d\s\-\(\)]{7,20}$/;
    return simpleRegex.test(phone);
};

// Accordion Component
interface AccordionItemProps {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  hasError?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, subtitle, isOpen, onToggle, onDelete, children, icon, hasError }) => (
    <div 
        className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden mb-4
        ${hasError ? 'border-red-300 ring-1 ring-red-100 shadow-sm' : 
            isOpen 
            ? 'border-indigo-500 shadow-lg ring-1 ring-indigo-50' 
            : 'border-slate-200 hover:border-indigo-300 hover:shadow-md'
        }`}
    >
        <div className="flex items-center justify-between p-4 cursor-pointer select-none" onClick={onToggle}>
            <div className="flex items-center gap-4 min-w-0">
                <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0
                    ${hasError ? 'bg-red-50 text-red-500' : isOpen ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}
                `}>
                    {icon || (isOpen ? <ChevronUp size={20}/> : <ChevronDown size={20}/>)}
                </div>
                <div className="min-w-0 flex flex-col">
                    <h3 className={`font-bold text-sm truncate transition-colors ${hasError ? 'text-red-600' : isOpen ? 'text-indigo-900' : 'text-slate-800'}`}>
                        {title || <span className="text-slate-400 italic">New Item</span>}
                    </h3>
                    {subtitle && <p className="text-xs text-slate-500 truncate font-medium">{subtitle}</p>}
                    {hasError && <p className="text-[10px] text-red-500 font-bold mt-0.5 flex items-center gap-1"><AlertCircle size={10} /> Errors Detected</p>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(); }} 
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Item"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
        
        {isOpen && (
             <div className="px-4 pb-6 pt-0 animate-fadeIn">
                <div className="h-px bg-slate-100 mb-6 mx-1"></div>
                {children}
            </div>
        )}
    </div>
);

const ResumeForm: React.FC<Props> = ({ data, updateData, onReset, onPreview }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Language Level Slider State
  const [langLevel, setLangLevel] = useState(50);
  const [langInput, setLangInput] = useState('');

  const toggleItem = (section: string, id: string) => {
    setOpenItems(prev => ({ 
        ...prev, 
        [`${section}-${id}`]: !prev[`${section}-${id}`] 
    }));
  };

  const validateStep = (stepIdx: number): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;
    let firstErrorItem = '';

    // Step 0: Personal Info
    if (stepIdx === 0) {
      if (!data.fullName.trim()) newErrors.fullName = "Full Name is required";
      if (!data.title.trim()) newErrors.title = "Job Title is required";
      if (!data.email.trim()) newErrors.email = "Email is required";
      else if (!isValidEmail(data.email)) newErrors.email = "Invalid email format";
      
      if (data.phone && !isValidPhone(data.phone)) newErrors.phone = "Invalid phone format";
      if (data.website && !isValidUrl(data.website)) newErrors.website = "Invalid URL format";
      if (data.linkedin && !isValidUrl(data.linkedin)) newErrors.linkedin = "Invalid URL format";
    }

    // Step 1: Experience
    if (stepIdx === 1) {
        data.experience.forEach((exp, idx) => {
            if (!exp.company.trim()) { newErrors[`exp_${idx}_company`] = "Required"; isValid = false; }
            if (!exp.position.trim()) { newErrors[`exp_${idx}_position`] = "Required"; isValid = false; }
            
            if (exp.startDate && !isValidDate(exp.startDate)) { 
                newErrors[`exp_${idx}_startDate`] = "Use YYYY"; 
                isValid = false; 
            }
            if (exp.endDate && !exp.current && !isValidDate(exp.endDate)) { 
                newErrors[`exp_${idx}_endDate`] = "Use YYYY"; 
                isValid = false; 
            }

            if (!isValid && !firstErrorItem) {
                 firstErrorItem = `experience-${exp.id}`;
                 setOpenItems(prev => ({ ...prev, [`experience-${exp.id}`]: true }));
            }
        });
    }

    // Step 2: Education
    if (stepIdx === 2) {
        data.education.forEach((edu, idx) => {
            if (!edu.school.trim()) { newErrors[`edu_${idx}_school`] = "Required"; isValid = false; }
            if (edu.year && !isValidDate(edu.year)) { 
                newErrors[`edu_${idx}_year`] = "Use YYYY"; 
                isValid = false; 
            }

            if (!isValid && !firstErrorItem) {
                 firstErrorItem = `education-${edu.id}`;
                 setOpenItems(prev => ({ ...prev, [`education-${edu.id}`]: true }));
            }
        });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    } else {
      setErrors({});
    }

    return isValid;
  };

  const handleChange = (field: keyof ResumeData, value: any) => {
    updateData({ ...data, [field]: value });
    if (errors[field]) {
      setErrors(prev => {
          const newErr = {...prev};
          delete newErr[field];
          return newErr;
      });
    }
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

  const updateItem = <T,>(list: T[], index: number, field: keyof T, value: any, listName: keyof ResumeData, prefix: string) => {
    const newList = [...list];
    newList[index] = { ...newList[index], [field]: value };
    handleChange(listName, newList);
    
    const errorKey = `${prefix}_${index}_${String(field)}`;
    if (errors[errorKey]) {
        setErrors(prev => {
            const newErr = {...prev};
            delete newErr[errorKey];
            return newErr;
        });
    }
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

  const addLanguageWithLevel = () => {
      if (!langInput.trim()) return;
      let levelText = '';
      if (langLevel >= 90) levelText = '(Native)';
      else if (langLevel >= 75) levelText = '(Fluent)';
      else if (langLevel >= 50) levelText = '(Professional)';
      else if (langLevel >= 25) levelText = '(Intermediate)';
      else levelText = '(Basic)';
      
      const finalString = `${langInput.trim()} ${levelText}`;
      if (!data.languages.includes(finalString)) {
          handleChange('languages', [...data.languages, finalString]);
      }
      setLangInput('');
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
        setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevStep = () => {
      setActiveStep(prev => Math.max(prev - 1, 0));
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasItemErrors = (prefix: string, idx: number) => {
      return Object.keys(errors).some(k => k.startsWith(`${prefix}_${idx}_`));
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Sleek Minimalist Tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 overflow-x-auto hide-scrollbar flex items-center gap-8 shadow-sm">
        {steps.map((step, idx) => {
           const isActive = idx === activeStep;
           const isCompleted = idx < activeStep;
           return (
              <button
                key={step.id}
                onClick={() => {
                   // Allow navigation if previous steps are loosely valid or just navigating back
                   if (idx < activeStep || validateStep(activeStep)) setActiveStep(idx);
                }}
                className={`
                   relative py-4 text-sm font-bold transition-all whitespace-nowrap outline-none
                   ${isActive ? 'text-indigo-600' : isCompleted ? 'text-slate-700 hover:text-indigo-500' : 'text-slate-400'}
                `}
              >
                 <span className="flex items-center gap-2">
                    {step.title}
                    {isCompleted && <CheckCircle2 size={14} className="text-green-500" />}
                 </span>
                 {isActive && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full animate-slideRight"></div>
                 )}
              </button>
           )
        })}
      </div>

      {/* Form Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar scroll-smooth pb-40">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* STEP 0: PERSONAL */}
          {activeStep === 0 && (
            <div className="animate-slideUp space-y-8">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <User className="text-indigo-600" size={24}/> Personal Details
                 </h2>
                 
                 <div className="flex flex-col md:flex-row gap-8 items-start">
                     <div className="relative group mx-auto md:mx-0 shrink-0">
                        <div className="w-28 h-28 rounded-full bg-slate-50 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden transition-all hover:shadow-xl">
                           {data.profileImage ? (
                             <img src={data.profileImage} alt="Profile" className="w-full h-full object-cover" />
                           ) : (
                             <User className="text-slate-200" size={40} />
                           )}
                        </div>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors shadow-lg border-2 border-white"
                          title="Upload Photo"
                        >
                          <Upload size={14} />
                        </button>
                        {data.profileImage && (
                           <button 
                            onClick={() => handleChange('profileImage', '')}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-md border-2 border-white transform scale-0 group-hover:scale-100 transition-transform"
                            title="Remove Photo"
                           >
                             <X size={12} />
                           </button>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                     </div>

                     <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input className="col-span-1 md:col-span-2" label="Full Name" icon={<User size={18}/>} value={data.fullName} onChange={(e) => handleChange('fullName', e.target.value)} error={errors.fullName} placeholder="e.g. John Doe" />
                        <Input className="col-span-1 md:col-span-2" label="Professional Title" icon={<Briefcase size={18}/>} value={data.title} onChange={(e) => handleChange('title', e.target.value)} error={errors.title} placeholder="e.g. Senior Product Designer" />
                        <Input label="Email" type="email" icon={<Mail size={18}/>} value={data.email} onChange={(e) => handleChange('email', e.target.value)} error={errors.email} placeholder="john@example.com" />
                        <Input label="Phone" type="tel" icon={<Phone size={18}/>} value={data.phone} onChange={(e) => handleChange('phone', e.target.value)} error={errors.phone} placeholder="+1 555-123-4567" />
                        <Input className="col-span-1 md:col-span-2" label="Location" icon={<MapPin size={18}/>} value={data.location} onChange={(e) => handleChange('location', e.target.value)} placeholder="City, Country" />
                     </div>
                 </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                 <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Globe className="text-indigo-600" size={20}/> Social & Links
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Input label="Website" icon={<Globe size={18}/>} value={data.website} onChange={(e) => handleChange('website', e.target.value)} error={errors.website} placeholder="yourportfolio.com" />
                    <Input label="LinkedIn" icon={<Linkedin size={18}/>} value={data.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} error={errors.linkedin} placeholder="linkedin.com/in/username" />
                    <Input icon={<Code2 size={18}/>} label="LeetCode" value={data.leetcode || ''} onChange={(e) => handleChange('leetcode', e.target.value)} placeholder="leetcode.com/username" />
                    <Input icon={<Terminal size={18}/>} label="GitHub / Other" value={data.codeforces || ''} onChange={(e) => handleChange('codeforces', e.target.value)} placeholder="github.com/username" />
                 </div>
              </div>
            </div>
          )}

          {/* STEP 1: EXPERIENCE */}
          {activeStep === 1 && (
            <div className="animate-slideUp space-y-6">
               <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Work Experience</h2>
                    <p className="text-slate-500 font-medium text-sm">Add your relevant work history.</p>
                </div>
                <button onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                    <Plus size={16} /> Add
                </button>
              </div>
              
              <div className="space-y-4">
                  {data.experience.length === 0 && (
                      <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                             <Briefcase size={28} />
                          </div>
                          <p className="text-slate-500 font-medium">No experience added yet</p>
                          <button onClick={() => addItem('experience', { company: '', position: '', startDate: '', endDate: '', current: false, description: '' })} className="mt-4 text-indigo-600 font-bold text-sm hover:underline">Add your first job</button>
                      </div>
                  )}

                  {data.experience.map((exp, idx) => (
                    <AccordionItem 
                        key={exp.id} 
                        title={exp.company} 
                        subtitle={exp.position}
                        icon={<Briefcase size={20}/>}
                        isOpen={!!openItems[`experience-${exp.id}`]}
                        onToggle={() => toggleItem('experience', exp.id)}
                        onDelete={() => removeItem('experience', idx)}
                        hasError={hasItemErrors('exp', idx)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <Input 
                            label="Company Name" 
                            value={exp.company} 
                            onChange={(e) => updateItem(data.experience, idx, 'company', e.target.value, 'experience', 'exp')} 
                            placeholder="e.g. Google" 
                            error={errors[`exp_${idx}_company`]}
                        />
                        <Input 
                            label="Job Title" 
                            value={exp.position} 
                            onChange={(e) => updateItem(data.experience, idx, 'position', e.target.value, 'experience', 'exp')} 
                            placeholder="e.g. Software Engineer" 
                            error={errors[`exp_${idx}_position`]}
                        />
                        <Input 
                            label="Start Year" 
                            value={exp.startDate} 
                            maxLength={4}
                            onChange={(e) => updateItem(data.experience, idx, 'startDate', e.target.value, 'experience', 'exp')} 
                            placeholder="YYYY" 
                            error={errors[`exp_${idx}_startDate`]}
                        />
                        <div className="flex gap-3 items-end">
                           <Input 
                                label="End Year" 
                                value={exp.endDate} 
                                maxLength={4}
                                onChange={(e) => updateItem(data.experience, idx, 'endDate', e.target.value, 'experience', 'exp')} 
                                placeholder="YYYY" 
                                disabled={exp.current} 
                                className={`flex-1 ${exp.current ? 'opacity-50' : ''}`} 
                                error={errors[`exp_${idx}_endDate`]}
                           />
                           <label className={`cursor-pointer flex items-center gap-2 select-none px-4 py-3 rounded-xl border transition-all h-[54px] ${exp.current ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                                <input type="checkbox" checked={exp.current} onChange={(e) => updateItem(data.experience, idx, 'current', e.target.checked, 'experience', 'exp')} className="hidden" />
                                {exp.current ? <CheckCircle2 size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-slate-300"></div>}
                                <span className="text-xs font-bold whitespace-nowrap">Current</span>
                           </label>
                        </div>
                      </div>
                      <div className="pt-2">
                        <RichTextEditor 
                            label="Description" 
                            value={exp.description} 
                            onChange={(html) => updateItem(data.experience, idx, 'description', html, 'experience', 'exp')}
                            placeholder="Describe your key responsibilities and achievements..." 
                        />
                      </div>
                    </AccordionItem>
                  ))}
              </div>
            </div>
          )}

          {/* STEP 2: EDUCATION */}
          {activeStep === 2 && (
            <div className="animate-slideUp space-y-6">
              <div className="flex justify-between items-end">
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900">Education</h2>
                    <p className="text-slate-500 font-medium text-sm">Academic background & Degrees.</p>
                </div>
                <button onClick={() => addItem('education', { school: '', degree: '', year: '', location: '' })} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                    <Plus size={16} /> Add
                </button>
              </div>

              <div className="space-y-4">
                  {data.education.length === 0 && (
                      <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                             <GraduationCap size={28} />
                          </div>
                          <p className="text-slate-500 font-medium">No education added</p>
                      </div>
                  )}
                  {data.education.map((edu, idx) => (
                    <AccordionItem 
                        key={edu.id} 
                        title={edu.school} 
                        subtitle={edu.degree}
                        icon={<GraduationCap size={20}/>}
                        isOpen={!!openItems[`education-${edu.id}`]}
                        onToggle={() => toggleItem('education', edu.id)}
                        onDelete={() => removeItem('education', idx)}
                        hasError={hasItemErrors('edu', idx)}
                    >
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Input 
                            label="School / University" 
                            value={edu.school} 
                            onChange={(e) => updateItem(data.education, idx, 'school', e.target.value, 'education', 'edu')} 
                            placeholder="e.g. Stanford University" 
                            error={errors[`edu_${idx}_school`]}
                        />
                        <Input 
                            label="Degree / Major" 
                            value={edu.degree} 
                            onChange={(e) => updateItem(data.education, idx, 'degree', e.target.value, 'education', 'edu')} 
                            placeholder="e.g. BS Computer Science" 
                        />
                        <Input 
                            label="Graduation Year" 
                            value={edu.year} 
                            maxLength={4}
                            onChange={(e) => updateItem(data.education, idx, 'year', e.target.value, 'education', 'edu')} 
                            placeholder="YYYY" 
                            error={errors[`edu_${idx}_year`]}
                        />
                        <Input 
                            label="Location" 
                            value={edu.location} 
                            onChange={(e) => updateItem(data.education, idx, 'location', e.target.value, 'education', 'edu')} 
                            placeholder="City, State" 
                        />
                       </div>
                    </AccordionItem>
                  ))}
              </div>
            </div>
          )}

          {/* STEP 3: ACHIEVEMENTS */}
          {activeStep === 3 && (
            <div className="animate-slideUp space-y-12">
              
              {/* Projects */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div> Projects</h3>
                    <button onClick={() => addItem('projects', { name: '', description: '', link: '' })} className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-colors">+ Add Project</button>
                </div>
                <div className="space-y-4">
                    {data.projects.map((proj, idx) => (
                      <AccordionItem 
                            key={proj.id} 
                            title={proj.name} 
                            icon={<Zap size={20}/>}
                            isOpen={!!openItems[`projects-${proj.id}`]}
                            onToggle={() => toggleItem('projects', proj.id)}
                            onDelete={() => removeItem('projects', idx)}
                        >
                         <div className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                               <Input label="Project Name" value={proj.name} onChange={(e) => updateItem(data.projects, idx, 'name', e.target.value, 'projects', 'proj')} />
                               <Input label="Link (Optional)" value={proj.link} onChange={(e) => updateItem(data.projects, idx, 'link', e.target.value, 'projects', 'proj')} placeholder="github.com/..." />
                            </div>
                            <RichTextEditor label="Description" value={proj.description} onChange={(html) => updateItem(data.projects, idx, 'description', html, 'projects', 'proj')} placeholder="Briefly describe what you built..." />
                         </div>
                      </AccordionItem>
                    ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><div className="w-1.5 h-6 bg-purple-500 rounded-full"></div> Certifications</h3>
                    <button onClick={() => addItem('certifications', { name: '', issuer: '', year: '' })} className="text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors">+ Add Cert</button>
                </div>
                <div className="space-y-3">
                    {data.certifications.map((cert, idx) => (
                      <div key={cert.id} className="bg-white p-5 rounded-2xl border border-slate-200 relative group hover:border-purple-300 hover:shadow-md transition-all">
                         <button onClick={() => removeItem('certifications', idx)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                            <Input className="md:col-span-1" label="Name" value={cert.name} onChange={(e) => updateItem(data.certifications, idx, 'name', e.target.value, 'certifications', 'cert')} />
                            <Input className="md:col-span-1" label="Issuer" value={cert.issuer} onChange={(e) => updateItem(data.certifications, idx, 'issuer', e.target.value, 'certifications', 'cert')} />
                            <Input className="md:col-span-1" label="Year" value={cert.year} maxLength={4} onChange={(e) => updateItem(data.certifications, idx, 'year', e.target.value, 'certifications', 'cert')} placeholder="YYYY" />
                         </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Awards */}
              <div className="space-y-6">
                 <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><div className="w-1.5 h-6 bg-amber-500 rounded-full"></div> Awards</h3>
                    <button onClick={() => addItem('awards', { name: '', issuer: '', year: '' })} className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 hover:bg-amber-100 transition-colors">+ Add Award</button>
                </div>
                <div className="space-y-3">
                    {data.awards.map((award, idx) => (
                      <div key={award.id} className="bg-white p-5 rounded-2xl border border-slate-200 relative group hover:border-amber-300 hover:shadow-md transition-all">
                         <button onClick={() => removeItem('awards', idx)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                            <Input className="md:col-span-1" label="Award Name" value={award.name} onChange={(e) => updateItem(data.awards, idx, 'name', e.target.value, 'awards', 'award')} />
                            <Input className="md:col-span-1" label="Issuer" value={award.issuer} onChange={(e) => updateItem(data.awards, idx, 'issuer', e.target.value, 'awards', 'award')} />
                            <Input className="md:col-span-1" label="Year" value={award.year} maxLength={4} onChange={(e) => updateItem(data.awards, idx, 'year', e.target.value, 'awards', 'award')} placeholder="YYYY" />
                         </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: FINALIZE */}
          {activeStep === 4 && (
            <div className="animate-slideUp space-y-10">
              
              {/* Summary */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Sparkles size={20} /></div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">Professional Summary</h2>
                        <p className="text-xs text-slate-500">A short bio to introduce yourself.</p>
                    </div>
                 </div>
                 <RichTextEditor 
                    label=""
                    value={data.summary}
                    onChange={(html) => handleChange('summary', html)}
                    placeholder="Experienced professional with..."
                  />
              </div>

              {/* Skills Cloud */}
              <TagInput 
                label="Technical Skills" 
                values={data.skills} 
                onChange={(vals) => handleChange('skills', vals)}
                suggestions={PREDEFINED_SKILLS}
                icon={<Zap size={18}/>}
              />

               {/* Languages with Level */}
               <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                   <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Languages size={18}/></div>
                        <h3 className="font-bold text-slate-800">Languages</h3>
                   </div>
                   
                   <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex flex-col sm:flex-row gap-4 items-end mb-4">
                            <Input 
                                placeholder="Language (e.g. English)" 
                                value={langInput} 
                                onChange={(e) => setLangInput(e.target.value)} 
                                className="bg-white w-full"
                            />
                            <button 
                                onClick={addLanguageWithLevel}
                                disabled={!langInput}
                                className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Add
                            </button>
                        </div>
                        <Slider 
                            label="Proficiency Level"
                            value={langLevel} 
                            onChange={setLangLevel}
                            formatLabel={(v) => {
                                if (v >= 90) return 'Native';
                                if (v >= 75) return 'Fluent';
                                if (v >= 50) return 'Professional';
                                if (v >= 25) return 'Intermediate';
                                return 'Basic';
                            }}
                        />
                   </div>

                   <div className="flex flex-wrap gap-2">
                      {data.languages.map((lang, i) => (
                          <div key={i} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
                             {lang}
                             <button onClick={() => handleChange('languages', data.languages.filter(l => l !== lang))} className="hover:text-red-500"><X size={14}/></button>
                          </div>
                      ))}
                   </div>
               </div>

               {/* Interests Cloud */}
               <TagInput 
                label="Hobbies & Interests" 
                values={data.interests} 
                onChange={(vals) => handleChange('interests', vals)}
                suggestions={PREDEFINED_INTERESTS}
                icon={<Heart size={18} className="text-rose-500"/>}
              />

              {/* Mobile Only: Big Preview Button in Content Flow to ensure visibility */}
              <div className="md:hidden pt-4 pb-8">
                 <button 
                    onClick={onPreview}
                    className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 animate-pulse active:scale-95 transition-transform"
                 >
                    <Download size={24} /> Preview & Download
                 </button>
                 <p className="text-center text-xs text-slate-400 mt-3">Ready to export? Preview your resume now.</p>
              </div>

              <div className="pt-8 flex justify-center pb-8">
                 <button 
                    onClick={() => {
                        if(window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
                            onReset();
                        }
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors text-sm font-bold"
                 >
                    <Trash2 size={16} /> Reset Data to Empty
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Navigation - Fixed on Mobile to ensure visibility over content */}
      <div className="fixed bottom-0 left-0 w-full md:sticky md:bottom-0 md:w-auto px-6 py-4 border-t border-slate-200 bg-white flex justify-between items-center z-[100] shadow-[0_-5px_30px_rgba(0,0,0,0.15)] md:shadow-[0_-5px_30px_rgba(0,0,0,0.08)] safe-area-bottom">
        <button 
          onClick={prevStep}
          disabled={activeStep === 0}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
        >
          <ChevronLeft size={18} /> Back
        </button>
        
        {activeStep < steps.length - 1 ? (
           <button 
            onClick={nextStep}
            className="group flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
          >
            Next Step <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform"/>
          </button>
        ) : (
          <div className="flex gap-2">
             {/* Mobile: Preview Button on final step in footer */}
             <button 
                onClick={onPreview}
                className="md:hidden flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg text-sm"
             >
                <Eye size={18} /> Preview & Download
             </button>
             {/* Desktop Only: Status Indicator */}
             <div className="hidden md:flex text-sm font-bold text-green-600 items-center gap-2 bg-green-50 px-6 py-3 rounded-xl border border-green-100">
                <CheckCircle2 size={18} /> Ready to Export
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
