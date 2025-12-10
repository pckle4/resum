
import React, { useState } from 'react';
import { TemplateType, TEMPLATE_PREVIEW_DATA } from '../types';
import ResumePreview from './ResumePreview';
import { CheckCircle2, ArrowRight, LayoutTemplate, Briefcase, Sparkles, PenTool, MousePointerClick, Star } from './ui/Icons';

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
    icon: <Briefcase size={18} className="text-indigo-600" />,
    accentColor: 'ring-indigo-500'
  },
  {
    id: TemplateType.MINIMALIST,
    name: 'Classic Minimalist',
    tagline: 'Executive & Academic',
    description: 'Elegant serif typography with a single-column layout. Timeless and sophisticated.',
    icon: <PenTool size={18} className="text-slate-600" />,
    accentColor: 'ring-slate-600'
  },
  {
    id: TemplateType.CREATIVE,
    name: 'Creative Visual',
    tagline: 'Design & Marketing',
    description: 'Bold colors and a unique layout to stand out. Ideal for creative industries.',
    icon: <Sparkles size={18} className="text-purple-600" />,
    accentColor: 'ring-purple-500'
  }
];

const TemplateSelection: React.FC<Props> = ({ selectedTemplate, onSelect, onNext, onBack }) => {
  // We want the A4 Resume (794px width) to perfectly fit inside a card width of 180px (or similar).
  // 180 / 794 = ~0.2267
  // We need to ensure the container height is exactly A4 height * scale.
  const PREVIEW_SCALE = 0.2267; 
  const A4_HEIGHT = 1123;
  const PREVIEW_HEIGHT = A4_HEIGHT * PREVIEW_SCALE;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
             <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Choose Your Template</h1>
                <p className="text-xs md:text-sm text-slate-500">Select a design to get started.</p>
             </div>
             <div className="flex gap-3">
                 <button onClick={onBack} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-bold text-sm transition-colors">
                     Back
                 </button>
                 <button 
                    onClick={onNext}
                    className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 transform hover:-translate-y-0.5"
                 >
                    Next Step <ArrowRight size={16} />
                 </button>
             </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-12">
         {/* Updated Layout: Horizontal scroll on mobile (flex), Grid on Desktop */}
         <div className="max-w-5xl mx-auto flex flex-nowrap md:grid md:grid-cols-3 gap-8 pb-12 overflow-x-auto snap-x snap-mandatory hide-scrollbar md:overflow-visible px-4 md:px-0 scroll-smooth">
            {templates.map((template) => {
                const isSelected = selectedTemplate === template.id;
                
                return (
                    <div 
                        key={template.id}
                        onClick={() => onSelect(template.id)}
                        className={`
                            group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
                            border-2 shrink-0 snap-center min-w-[260px] md:min-w-0
                            ${isSelected 
                                ? `border-transparent ring-4 ${template.accentColor} shadow-2xl scale-[1.02] z-10` 
                                : 'border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1'
                            }
                        `}
                    >
                        {/* Preview Window - HEIGHT CALCULATED EXACTLY */}
                        <div 
                            className="relative bg-slate-200 overflow-hidden border-b border-slate-100"
                            style={{ height: `${PREVIEW_HEIGHT}px` }}
                        >
                             {/* The actual resume preview scaled down */}
                             {/* We need to adjust scale for the mobile card width which is wider than the desktop card usually */}
                             <div 
                                  className="absolute top-0 left-0 origin-top-left pointer-events-none select-none bg-white w-full h-full flex justify-center"
                              >
                                  {/* Just centering the preview for the card view */}
                                  <div style={{ transform: `scale(${PREVIEW_SCALE})`, transformOrigin: 'top center' }}>
                                    <ResumePreview data={TEMPLATE_PREVIEW_DATA} template={template.id} isSkeleton={true} />
                                  </div>
                             </div>

                             {/* Hover Overlay */}
                             <div className={`absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300 ${isSelected ? '!bg-transparent' : ''}`}></div>

                             {/* Selected Checkmark */}
                             {isSelected && (
                                 <div className="absolute top-3 right-3 bg-indigo-600 text-white px-2.5 py-1.5 rounded-full shadow-lg font-bold text-[10px] flex items-center gap-1 animate-bounceIn z-20">
                                     <CheckCircle2 size={12} /> Selected
                                 </div>
                             )}
                        </div>

                        {/* Card Info */}
                        <div className="p-4 bg-white">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 rounded-md bg-slate-50 border border-slate-100">
                                    {template.icon}
                                </div>
                                <h3 className="font-bold text-sm text-slate-900 leading-tight">{template.name}</h3>
                            </div>
                            
                            <p className="text-[10px] text-slate-500 leading-relaxed mb-3 h-[45px] overflow-hidden">
                                {template.description}
                            </p>
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
