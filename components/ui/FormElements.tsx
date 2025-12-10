
import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { AlertCircle, X, Plus, ChevronDown } from './Icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  suggestions?: string[];
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

export const Input: React.FC<InputProps> = ({ label, error, helperText, icon, rightIcon, className, suggestions, value, onChange, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions && value 
    ? suggestions.filter(s => s.toLowerCase().includes(String(value).toLowerCase()) && s !== value)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full group relative" ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className={`
        relative flex items-center transition-all duration-200 rounded-xl bg-slate-50 border
        ${error 
          ? 'border-red-500 bg-red-50' 
          : isFocused 
            ? 'border-indigo-500 ring-2 ring-indigo-100 bg-white shadow-sm' 
            : 'border-transparent hover:border-slate-300 hover:bg-white'
        }
      `}>
        {icon && (
          <div className={`pl-4 pr-2 flex items-center justify-center transition-colors ${isFocused ? 'text-indigo-500' : 'text-slate-400'}`}>
            {icon}
          </div>
        )}
        <input
          {...props}
          value={value}
          onChange={(e) => {
            onChange?.(e);
            setShowSuggestions(true);
          }}
          onFocus={(e) => { setIsFocused(true); setShowSuggestions(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          autoComplete="off"
          className={`w-full py-3 px-4 bg-transparent border-none text-slate-800 text-sm font-semibold placeholder:text-slate-400 focus:ring-0 focus:outline-none rounded-xl ${className}`}
        />
        {rightIcon && (
          <div className="pr-4 pl-2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl border border-slate-200 shadow-xl z-[100] max-h-56 overflow-y-auto custom-scrollbar animate-fadeIn p-1">
          {filteredSuggestions.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                 if (onChange) {
                    const event = { target: { value: item } } as React.ChangeEvent<HTMLInputElement>;
                    onChange(event);
                 }
                 setShowSuggestions(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 ml-1 text-xs text-red-600 font-bold animate-fadeIn">
          <AlertCircle size={12} />
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
        {label && <label className="text-xs font-bold uppercase tracking-wide text-slate-500 ml-1">{label}</label>}
        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md min-w-[3rem] text-center border border-indigo-100">
          {formatLabel ? formatLabel(value) : value}
        </span>
      </div>
      <div className="relative h-6 flex items-center group cursor-pointer px-1">
         <input 
            type="range" 
            min={min} 
            max={max} 
            step={step} 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute w-full h-full opacity-0 z-20 cursor-pointer"
         />
         <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-150 ease-out" 
              style={{ width: `${percentage}%` }}
            />
         </div>
         <div 
            className="absolute h-5 w-5 bg-white border-2 border-indigo-500 rounded-full shadow-md transition-all duration-150 ease-out z-10 group-hover:scale-110 pointer-events-none"
            style={{ left: `calc(${percentage}% - 10px)` }}
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

  const availableSuggestions = suggestions.filter(s => !values.includes(s) && s.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className={`
      p-6 rounded-2xl border transition-all duration-300 bg-white
      ${isFocused ? 'border-indigo-300 shadow-md ring-1 ring-indigo-50' : 'border-slate-100 shadow-sm'}
    `}>
      <div className="flex items-center gap-2 text-slate-800 font-bold text-lg mb-5">
        {icon && <div className="text-indigo-500">{icon}</div>}
        {label}
      </div>

      <div className="relative group" onClick={() => inputRef.current?.focus()}>
        <div className="flex flex-wrap gap-2 p-3 min-h-[60px] rounded-xl border border-slate-200 bg-slate-50 focus-within:bg-white focus-within:border-indigo-300 transition-all">
          {values.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-slate-700 rounded-lg text-sm font-bold border border-slate-200 shadow-sm">
                 {tag}
                 <button 
                  onClick={(e) => { e.stopPropagation(); removeTag(tag); }} 
                  className="text-slate-400 hover:text-red-500 ml-1 transition-colors"
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
              className="flex-1 min-w-[120px] bg-transparent border-none text-sm font-medium p-1 placeholder:text-slate-400 focus:ring-0 focus:outline-none"
            />
        </div>
      </div>

      {isFocused && availableSuggestions.length > 0 && (
        <div className="pt-4">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 ml-1">Suggestions</p>
           <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar">
              {availableSuggestions.slice(0, 10).map((s, i) => (
                 <button 
                   key={i} 
                   onClick={() => addTag(s)}
                   className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
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
