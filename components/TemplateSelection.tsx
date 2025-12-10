import React from 'react';
import { TemplateType, TEMPLATE_PREVIEW_DATA } from '../types';
import ResumePreview from './ResumePreview';
import { CheckCircle2, ArrowRight, Briefcase, Sparkles, PenTool, LayoutTemplate, Star } from './ui/Icons';

interface Props {
  selectedTemplate: TemplateType;
  onSelect: (t: TemplateType) => void;
  onNext: () => void;
  onBack: () => void;
}

const templates = [
  {
    id: TemplateType.MODERN,
    name: 'Modern Professional',
    tagline: 'Tech & Corporate',
    description: 'Clean structure with a dedicated sidebar. Perfect for ATS parsing and readability.',
    icon: <Briefcase size={20} className="text-white" />,
    color: 'from-slate-700 to-slate-900',
    accent: 'bg-indigo-600'
  },
  {
    id: TemplateType.MINIMALIST,
    name: 'Classic Minimalist',
    tagline: 'Executive & Academic',
    description: 'Elegant serif typography with a single-column layout. Timeless and sophisticated.',
    icon: <PenTool size={20} className="text-white" />,
    color: 'from-stone-700 to-stone-900',
    accent: 'bg-stone-600'
  },
  {
    id: TemplateType.CREATIVE,
    name: 'Creative Visual',
    tagline: 'Design & Marketing',
    description: 'Bold colors and a unique layout to stand out. Ideal for creative industries.',
    icon: <Sparkles size={20} className="text-white" />,
    color: 'from-violet-700 to-violet-900',
    accent: 'bg-violet-600'
  }
];

const TemplateSelection: React.FC<Props> = ({ selectedTemplate, onSelect, onNext, onBack }) => {
  // Calculated scale to fit the preview nicely within the card
  const PREVIEW_SCALE = 0.35; 
  const PREVIEW_HEIGHT = 1123 * PREVIEW_SCALE;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <div className="bg-slate-900 text-white p-2 rounded-lg">
                    <LayoutTemplate size={20} />
                 </div>
                 <div>
                     <h1 className="font-bold text-lg text-slate-900 leading-none">Select Template</h1>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step 1 of 2</p>
                 </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors hidden sm:block"
                >
                    Back to Home
                </button>
                <button 
                    onClick={onNext}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5"
                >
                    Next Step <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-12 pb-20 px-6 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-indigo-50/50 to-transparent -z-10 blur-3xl pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Choose your professional look.
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10">
              All templates are ATS-friendly, fully customizable, and designed to help you land more interviews.
          </p>
      </div>

      {/* Template Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {templates.map((t) => {
                  const isSelected = selectedTemplate === t.id;
                  
                  return (
                      <div 
                        key={t.id}
                        onClick={() => onSelect(t.id)}
                        className={`
                            group relative rounded-[2rem] transition-all duration-500 cursor-pointer
                            ${isSelected ? 'ring-4 ring-offset-4 ring-indigo-600 shadow-2xl scale-[1.02]' : 'hover:shadow-2xl hover:-translate-y-2 hover:bg-white'}
                        `}
                      >
                          {/* Card Container */}
                          <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm h-full flex flex-col">
                              
                              {/* Preview Area */}
                              <div className="relative bg-slate-100 overflow-hidden group-hover:bg-slate-50 transition-colors border-b border-slate-100">
                                   <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors z-10"></div>
                                   
                                   <div style={{ height: PREVIEW_HEIGHT + 40 }} className="flex justify-center pt-8 overflow-hidden pointer-events-none select-none">
                                        <div className="shadow-xl transform origin-top transition-transform duration-500 group-hover:scale-[1.02]">
                                            <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: 'top center' }}>
                                                <ResumePreview data={TEMPLATE_PREVIEW_DATA} template={t.id} isSkeleton={true} />
                                            </div>
                                        </div>
                                   </div>

                                   {/* Floating Tag */}
                                   <div className={`absolute top-6 right-6 z-20 transition-all duration-300 ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                                       <div className="bg-white text-slate-900 px-3 py-1.5 rounded-full shadow-lg border border-slate-100 text-xs font-bold flex items-center gap-1.5">
                                           {isSelected ? <CheckCircle2 size={14} className="text-indigo-600"/> : <Star size={14} className="text-amber-400"/>}
                                           {isSelected ? 'Selected' : 'Click to Select'}
                                       </div>
                                   </div>
                              </div>

                              {/* Info Area */}
                              <div className="p-8 flex-1 flex flex-col">
                                  <div className="flex items-center justify-between mb-4">
                                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg`}>
                                          {t.icon}
                                      </div>
                                      <div className={`px-3 py-1 rounded-full bg-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-500`}>
                                          {t.tagline}
                                      </div>
                                  </div>
                                  
                                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.name}</h3>
                                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                                      {t.description}
                                  </p>

                                  <div className={`
                                      w-full py-3 rounded-xl font-bold text-center transition-all duration-300 flex items-center justify-center gap-2
                                      ${isSelected 
                                          ? 'bg-slate-900 text-white shadow-xl' 
                                          : 'bg-slate-50 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'
                                      }
                                  `}>
                                      {isSelected ? (
                                        <>Selected <CheckCircle2 size={16} /></>
                                      ) : (
                                        <>Use Template <ArrowRight size={16} /></>
                                      )}
                                  </div>
                              </div>
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
