
import React, { useState, KeyboardEvent, useRef } from 'react';
import { AlertCircle, X, Plus } from './Icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

interface TagInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  suggestions?: string[];
  icon?: React.ReactNode;
  placeholder?: string;
}

interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  formatLabel?: (value: number) => string;
}

export const Input: React.FC<InputProps> = ({ label, error, helperText, icon, rightIcon, className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full group">
      {label && (
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ml-1 transition-colors ${isFocused ? 'text-indigo-600' : error ? 'text-red-500' : 'text-slate-500'}`}>
          {label}
        </label>
      )}
      <div className={`
        relative flex items-center transition-all duration-200 border rounded-xl bg-white overflow-hidden
        ${error 
          ? 'border-red-500 ring-1 ring-red-100' 
          : isFocused 
            ? 'border-indigo-500 ring-2 ring-indigo-50' 
            : 'border-slate-200 hover:border-slate-300'
        }
      `}>
        {icon && (
          <div className={`pl-4 pr-2 flex items-center justify-center transition-colors ${error ? 'text-red-400' : isFocused ? 'text-indigo-500' : 'text-slate-400'}`}>
            {icon}
          </div>
        )}
        <input
          {...props}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          className={`w-full py-3.5 px-4 bg-transparent border-none text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:ring-0 focus:outline-none ${className}`}
        />
        {rightIcon && (
          <div className="pr-4 pl-2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-500 ml-1">{helperText}</p>
      )}
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 ml-1 text-xs text-red-600 font-bold animate-fadeIn">
          <AlertCircle size={12} strokeWidth={2.5} />
          {error}
        </div>
      )}
    </div>
  );
};

export const TextArea: React.FC<TextAreaProps> = ({ label, error, helperText, className, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ml-1 transition-colors ${isFocused ? 'text-indigo-600' : error ? 'text-red-500' : 'text-slate-500'}`}>
          {label}
        </label>
      )}
      <div className={`
        transition-all duration-200 border rounded-xl bg-white overflow-hidden
        ${error 
          ? 'border-red-500 ring-1 ring-red-100' 
          : isFocused 
            ? 'border-indigo-500 ring-2 ring-indigo-50' 
            : 'border-slate-200 hover:border-slate-300'
        }
      `}>
        <textarea
          {...props}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          className={`w-full p-4 bg-transparent border-none text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:ring-0 focus:outline-none min-h-[120px] resize-y ${className}`}
        />
      </div>
      {helperText && !error && (
        <p className="mt-1 text-xs text-slate-500 ml-1">{helperText}</p>
      )}
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 ml-1 text-xs text-red-600 font-bold">
          <AlertCircle size={12} strokeWidth={2.5} />
          {error}
        </div>
      )}
    </div>
  );
};

export const Slider: React.FC<SliderProps> = ({ label, value, min = 0, max = 100, step = 1, onChange, formatLabel }) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-3">
        {label && <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{label}</label>}
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
          {formatLabel ? formatLabel(value) : value}
        </span>
      </div>
      <div className="relative h-8 flex items-center group cursor-pointer px-1">
         <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
         />
         <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-indigo-500 transition-all duration-150 ease-out" 
              style={{ width: `${percentage}%` }}
            />
         </div>
         <div 
            className="absolute h-6 w-6 bg-white border-4 border-indigo-500 rounded-full shadow-lg transition-all duration-150 ease-out z-10 group-hover:scale-110 pointer-events-none"
            style={{ left: `calc(${percentage}% - 12px)` }}
         />
      </div>
    </div>
  );
};

export const TagInput: React.FC<TagInputProps> = ({ label, values, onChange, suggestions = [], icon, placeholder }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInput('');
  };

  const removeTag = (tagToRemove: string) => {
    onChange(values.filter(t => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && values.length > 0) {
      removeTag(values[values.length - 1]);
    }
  };

  const availableSuggestions = suggestions.filter(s => !values.includes(s));

  return (
    <div className={`
      p-5 rounded-2xl border transition-all duration-300
      ${isFocused ? 'border-indigo-400 ring-4 ring-indigo-50 bg-white' : 'border-slate-200 bg-slate-50/50 hover:border-indigo-200'}
    `}>
      <div className="flex items-center gap-2.5 text-slate-800 font-bold text-base mb-4">
        {icon && <div className="p-1.5 bg-white rounded-lg shadow-sm text-indigo-600 border border-slate-100">{icon}</div>}
        {label}
      </div>

      <div className="relative group" onClick={() => inputRef.current?.focus()}>
        <div className={`
          flex flex-wrap gap-2 p-2 min-h-[56px] rounded-xl border bg-white transition-all
          ${isFocused ? 'border-indigo-500 shadow-sm ring-1 ring-indigo-50' : 'border-slate-200 group-hover:border-slate-300'}
        `}>
          {values.map((tag, idx) => (
              <span key={idx} className="animate-fadeIn inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100 group transition-all hover:bg-indigo-100 hover:shadow-sm">
                 {tag}
                 <button 
                  onClick={(e) => { e.stopPropagation(); removeTag(tag); }} 
                  className="text-indigo-400 hover:text-red-500 hover:bg-red-50 rounded p-0.5 transition-colors"
                 >
                    <X size={14} />
                 </button>
              </span>
            ))}
            
            <input 
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={values.length === 0 ? (placeholder || "Type and press Enter...") : ""}
              className="flex-1 min-w-[140px] bg-transparent border-none text-sm p-2 placeholder:text-slate-400 focus:ring-0 focus:outline-none h-full"
            />
        </div>
        
        <button 
           onClick={(e) => { e.stopPropagation(); addTag(input); }}
           disabled={!input.trim()}
           className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${input.trim() ? 'bg-indigo-600 text-white shadow-md hover:scale-105' : 'bg-slate-100 text-slate-300 opacity-0 pointer-events-none'}`}
        >
          <Plus size={16} />
        </button>
      </div>

      {availableSuggestions.length > 0 && (
        <div className="pt-4 animate-fadeIn">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-3 ml-1">Suggested for you</p>
           <div className="flex flex-wrap gap-2">
              {availableSuggestions.slice(0, 8).map((s, i) => (
                 <button 
                   key={i} 
                   onClick={() => addTag(s)}
                   className="px-3 py-1.5 bg-white text-slate-600 rounded-lg border border-slate-200 text-xs font-medium hover:border-indigo-300 hover:text-indigo-600 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                 >
                    + {s}
                 </button>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};
