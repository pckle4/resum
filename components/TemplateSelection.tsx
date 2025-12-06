
import React from 'react';
import { TemplateType } from '../types';
import { CheckCircle2, ArrowRight } from './ui/Icons';

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
    description: 'Clean layout with a dark sidebar. Perfect for tech and corporate roles.',
    color: 'bg-slate-800'
  },
  {
    id: TemplateType.MINIMALIST,
    name: 'Classic Minimalist',
    description: 'Elegant typography-focused design. Best for academic and legal roles.',
    color: 'bg-white border-2 border-slate-200'
  },
  {
    id: TemplateType.CREATIVE,
    name: 'Creative Studio',
    description: 'Bold colors and unique layout. Ideal for designers and marketing.',
    color: 'bg-indigo-600'
  }
];

const TemplateSelection: React.FC<Props> = ({ selectedTemplate, onSelect, onNext, onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 w-full flex-1 flex flex-col">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-bold text-slate-900 mb-3">Choose Your Template</h2>
           <p className="text-slate-600">Select a design that matches your personal brand. You can change this later.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
           {templates.map((template) => {
             const isSelected = selectedTemplate === template.id;
             return (
               <div 
                 key={template.id}
                 onClick={() => onSelect(template.id)}
                 className={`cursor-pointer rounded-2xl transition-all duration-300 relative group overflow-hidden bg-white
                   ${isSelected 
                     ? 'ring-4 ring-indigo-600 ring-offset-4 shadow-2xl transform -translate-y-2' 
                     : 'hover:shadow-xl hover:-translate-y-1 border border-slate-200'
                   }`}
               >
                 {/* Visual Representation of Template */}
                 <div className="aspect-[1/1.4] bg-slate-100 relative p-4 overflow-hidden">
                    <div className={`w-full h-full shadow-sm flex flex-col ${template.id === TemplateType.MINIMALIST ? 'bg-white' : 'bg-white'}`}>
                        {/* Mock Header */}
                        {template.id === TemplateType.MODERN && (
                            <div className="h-16 bg-slate-800 w-full mb-2"></div>
                        )}
                        {template.id === TemplateType.CREATIVE && (
                           <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-indigo-600"></div>
                        )}
                        
                        <div className="p-3 space-y-2 relative z-10">
                            <div className="h-2 bg-slate-300 w-1/2 rounded"></div>
                            <div className="h-2 bg-slate-200 w-1/3 rounded"></div>
                            <div className="h-1 bg-slate-200 w-full rounded mt-4"></div>
                            <div className="h-1 bg-slate-200 w-full rounded"></div>
                            <div className="h-1 bg-slate-200 w-4/5 rounded"></div>
                        </div>
                    </div>
                    
                    {/* Overlay on Hover/Select */}
                    <div className={`absolute inset-0 bg-indigo-900/10 transition-opacity duration-300 ${isSelected ? 'opacity-10' : 'opacity-0 group-hover:opacity-100'}`}></div>
                    
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg animate-bounce">
                        <CheckCircle2 size={20} />
                      </div>
                    )}
                 </div>

                 <div className="p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-slate-500">{template.description}</p>
                 </div>
               </div>
             );
           })}
        </div>

        <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-200">
           <button 
             onClick={onBack}
             className="text-slate-500 font-semibold hover:text-slate-800 transition-colors"
           >
             Back
           </button>
           <button 
             onClick={onNext}
             className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
           >
             Start Editing <ArrowRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;
