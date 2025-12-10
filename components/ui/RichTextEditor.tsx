
import React, { useEffect, useRef, useState } from 'react';
import { Bold, Italic, List, Underline } from './Icons';

interface Props {
  label: string;
  value: string;
  onChange: (html: string) => void;
  className?: string;
  error?: string;
  placeholder?: string;
}

export const RichTextEditor: React.FC<Props> = ({ label, value, onChange, className, error, placeholder }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (contentRef.current && document.activeElement !== contentRef.current && contentRef.current.innerHTML !== value) {
      contentRef.current.innerHTML = value;
    }
  }, [value]);

  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    if (contentRef.current) {
        onChange(contentRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (contentRef.current) {
      const html = contentRef.current.innerHTML;
      onChange(html === '<br>' ? '' : html);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div 
        className={`bg-slate-50 border rounded-xl overflow-hidden transition-all duration-200
          ${error 
            ? 'border-red-500' 
            : isFocused ? 'border-indigo-400 shadow-md ring-1 ring-indigo-50 bg-white' : 'border-transparent hover:border-slate-300 hover:bg-white'
          }
        `}
      >
        <div className="flex items-center gap-1 p-2 border-b border-slate-200/50">
            <button onClick={() => execCommand('bold')} className="p-1.5 hover:bg-indigo-50 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors" title="Bold">
                <Bold size={16} />
            </button>
            <button onClick={() => execCommand('italic')} className="p-1.5 hover:bg-indigo-50 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors" title="Italic">
                <Italic size={16} />
            </button>
            <button onClick={() => execCommand('underline')} className="p-1.5 hover:bg-indigo-50 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors" title="Underline">
                <Underline size={16} />
            </button>
            <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <button onClick={() => execCommand('insertUnorderedList')} className="p-1.5 hover:bg-indigo-50 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors" title="Bullet List">
                <List size={16} />
            </button>
        </div>
        
        <div
            ref={contentRef}
            contentEditable
            onInput={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="p-4 min-h-[120px] max-h-[300px] overflow-y-auto outline-none text-sm text-slate-700 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 font-medium"
            data-placeholder={placeholder}
        ></div>
      </div>
      {error && (
        <p className="mt-1.5 ml-0.5 text-xs text-red-600 font-bold">
          {error}
        </p>
      )}
    </div>
  );
};
