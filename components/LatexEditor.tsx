
import React, { useState, useEffect, useRef } from 'react';
import { ResumeData } from '../types';
import { generateLatexCode } from '../utils/latexTemplate';
import { 
  ChevronLeft, 
  Download, 
  FileCode, 
  Copy, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Bold,
  Italic,
  Underline,
  LinkIcon,
  List,
  Heading
} from './ui/Icons';

interface Props {
  data: ResumeData;
  onBack: () => void;
}

// Declare latexjs on window
declare global {
  interface Window {
    latexjs: any;
  }
}

const LatexEditor: React.FC<Props> = ({ data, onBack }) => {
  const [code, setCode] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const compileTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Initial code generation
  useEffect(() => {
    const initialLatex = generateLatexCode(data);
    setCode(initialLatex);
  }, [data]);

  /**
   * Shims the raw LaTeX code to be compatible with latex.js browser preview.
   * latex.js does not support packages like titlesec, tabularx, enumitem etc.
   * This function transforms the fancy template into standard LaTeX that latex.js can parse for preview.
   */
  const shimForPreview = (raw: string): string => {
    let shimmed = raw;
    
    // 1. Comment out incompatible packages
    const badPackages = [
      'titlesec', 'marvosym', 'verbatim', 'enumitem', 'fancyhdr', 
      'tabularx', 'fullpage', 'glyphtounicode', 'geometry', 'inputenc', 'fontenc', 'babel'
    ];
    
    badPackages.forEach(pkg => {
        // Regex handles \usepackage{pkg} and \usepackage[options]{pkg}
        shimmed = shimmed.replace(new RegExp(`\\\\usepackage(\\[.*?\\])?{${pkg}}`, 'g'), `% \\usepackage{${pkg}}`);
    });
    
    // 2. Remove specific unsupported commands
    const badCommands = [
        /\\input{glyphtounicode}/g,
        /\\pdfgentounicode=1/g,
        /\\pagestyle{fancy}/g,
        /\\fancyhf{}/g,
        /\\fancyfoot{}/g,
        /\\raggedbottom/g,
        /\\raggedright/g,
        /\\setlength{\\tabcolsep}{.*?}/g,
        /\\urlstyle{same}/g,
        /\\addtolength{.*?}{.*?}/g, // Remove margin adjustments
        /\\renewcommand{\\headrulewidth}{.*?}/g,
        /\\renewcommand{\\footrulewidth}{.*?}/g,
        /\\definecolor{.*?}{.*?}{.*?}/g, // simplistic color removal if needed
    ];

    badCommands.forEach(regex => {
        shimmed = shimmed.replace(regex, '');
    });
    
    // 3. Shim tabular* to tabular
    // latex.js struggles with tabular* expansion. We replace it with standard tabular.
    // We also try to clean up the column specifications.
    shimmed = shimmed.replace(/\\begin{tabular\*}.*?{l@{\\extracolsep{\\fill}}r}/g, '\\begin{tabular}{l r}');
    shimmed = shimmed.replace(/\\begin{tabular\*}.*?{.*?}/g, '\\begin{tabular}{l r}'); // Fallback
    shimmed = shimmed.replace(/\\end{tabular\*}/g, '\\end{tabular}');
    
    // 4. Handle \titleformat (comment it out, it crashes latex.js)
    shimmed = shimmed.replace(/\\titleformat{.*?}.*?\]/gs, '');

    // 5. Remove \scshape (Small Caps) if it causes font issues, though usually okay. 
    // If errors persist, uncomment next line:
    // shimmed = shimmed.replace(/\\scshape/g, '\\textbf');

    return shimmed;
  };

  // Compile LaTeX to Iframe
  const compileLatex = async (latexString: string) => {
    if (!iframeRef.current) return;
    setIsCompiling(true);
    setError(null);

    try {
      const doc = iframeRef.current.contentDocument;
      if (!doc) return;

      // @ts-ignore
      if (window.latexjs) {
        // @ts-ignore
        const generator = new window.latexjs.HtmlGenerator({ hyphenate: false });
        
        doc.open();
        doc.write('<!DOCTYPE html>');
        doc.write('<html lang="en">');
        doc.write('<head>');
        doc.write('<meta charset="UTF-8" />');
        doc.write('<style>');
        doc.write(`
            body { 
                margin: 0; 
                padding: 40px; 
                background: white; 
                font-family: 'CMU Serif', serif; 
                color: black;
                font-size: 14px;
                line-height: 1.5;
            }
            .latex-container {
                max-width: 210mm;
                margin: 0 auto;
            }
            /* Fix tabular spacing in preview */
            table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
            td { vertical-align: top; padding: 2px 0; }
            td:last-child { text-align: right; }
            
            /* Mimic section styling since we stripped titlesec */
            h3, h4, h5 {
                border-bottom: 1px solid black;
                padding-bottom: 4px;
                margin-top: 16px;
                margin-bottom: 8px;
                text-transform: uppercase;
                font-size: 16px;
            }
        `);
        doc.write('</style>');
        doc.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/latex.js/dist/css/article.css">');
        doc.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/computer-modern-typeface@0.7.0/fonts/serif/cmun-serif.css">');
        doc.write('</head>');
        doc.write('<body>');
        doc.write('</body>');
        doc.write('</html>');
        doc.close();

        // Use the SHIMMED version for preview
        const previewCode = shimForPreview(latexString);

        // @ts-ignore
        const latexDoc = window.latexjs.parse(previewCode, { generator: generator });
        
        if (doc.body) {
            doc.body.appendChild(latexDoc.domFragment());
        }

      } else {
        throw new Error("LaTeX engine not loaded.");
      }

    } catch (err: any) {
      console.warn("Latex preview error (expected for complex templates):", err);
      // Only set error if it seems like a real syntax error, not just a package miss
      const msg = err.message || "Preview Error";
      if (!msg.includes("require is not defined") && !msg.includes("package")) {
          setError(msg);
      }
    } finally {
      setIsCompiling(false);
    }
  };

  // Debounced Compilation
  useEffect(() => {
    if (compileTimeoutRef.current) clearTimeout(compileTimeoutRef.current);
    compileTimeoutRef.current = setTimeout(() => {
        compileLatex(code);
    }, 1500); 

    return () => {
        if (compileTimeoutRef.current) clearTimeout(compileTimeoutRef.current);
    };
  }, [code]);

  const handleDownloadTex = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${data.fullName.replace(/\s+/g, '_')}_Resume.tex`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    if(iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.print();
    }
  };

  // --- Toolbar Logic ---
  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = code;
    const selectedText = currentText.substring(start, end);
    const newText = currentText.substring(0, start) + before + selectedText + after + currentText.substring(end);
    
    setCode(newText);
    
    // Restore focus and selection
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white overflow-hidden font-sans">
      {/* Header */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
                <FileCode className="text-indigo-400" size={20} />
                <span className="font-bold text-sm tracking-wide">LaTeX Editor</span>
            </div>
        </div>

        <div className="flex items-center gap-3">
             <button 
                onClick={handleCopy} 
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-xs font-medium transition-colors border border-slate-700"
            >
                {isCopied ? <CheckCircle2 size={14} className="text-green-400"/> : <Copy size={14} />}
                {isCopied ? 'Copied' : 'Copy Source'}
            </button>
            
            <button 
                onClick={handleDownloadTex} 
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-xs font-medium transition-colors border border-slate-700"
            >
                <Download size={14} /> .tex
            </button>
            
            <button 
                onClick={handleDownloadPdf} 
                className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-xs font-bold transition-colors shadow-lg shadow-indigo-900/20"
            >
                <Download size={14} /> PDF
            </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Editor Pane (Left) */}
        <div className="w-1/2 flex flex-col border-r border-slate-800 bg-[#1e1e1e]">
             {/* Toolbar */}
             <div className="h-10 bg-[#2d2d2d] border-b border-black flex items-center px-2 gap-1 overflow-x-auto">
                <button onClick={() => insertText('\\textbf{', '}')} className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Bold">
                    <Bold size={16} />
                </button>
                <button onClick={() => insertText('\\textit{', '}')} className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Italic">
                    <Italic size={16} />
                </button>
                <button onClick={() => insertText('\\underline{', '}')} className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Underline">
                    <Underline size={16} />
                </button>
                <div className="w-px h-4 bg-slate-600 mx-1"></div>
                <button onClick={() => insertText('\\section{', '}')} className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Section">
                    <Heading size={16} />
                </button>
                <button onClick={() => insertText('\\begin{itemize}\n  \\item ', '\n\\end{itemize}')} className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Item List">
                    <List size={16} />
                </button>
                <button onClick={() => insertText('\\href{url}{', '}')} className="p-1.5 hover:bg-slate-700 rounded text-slate-300" title="Link">
                    <LinkIcon size={16} />
                </button>
             </div>

             <textarea 
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm resize-none focus:outline-none custom-scrollbar leading-relaxed"
                spellCheck={false}
             />
             {error && (
                <div className="bg-red-900/20 border-t border-red-900/50 p-2 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle size={14} className="shrink-0" />
                    <span className="truncate">{error}</span>
                </div>
             )}
        </div>

        {/* Preview Pane (Right) */}
        <div className="w-1/2 bg-slate-200 flex flex-col relative">
             <div className="h-10 bg-slate-100 border-b border-slate-200 flex items-center justify-between px-4 text-xs text-slate-500 shadow-sm z-10">
                <span className="font-bold text-slate-700">Live Preview (Approximation)</span>
                <div className="flex items-center gap-3">
                    {isCompiling && (
                        <div className="flex items-center gap-1.5 text-indigo-600">
                            <Loader2 size={12} className="animate-spin" />
                            Rendering
                        </div>
                    )}
                </div>
             </div>
             
             <div className="flex-1 p-8 overflow-auto flex justify-center bg-slate-500/10">
                 <div className="relative shadow-2xl">
                    <iframe 
                        ref={iframeRef}
                        className="bg-white w-[210mm] h-[297mm] transition-opacity duration-300"
                        style={{ opacity: isCompiling ? 0.7 : 1 }}
                        title="Latex Preview"
                    />
                 </div>
             </div>
             
             {/* Info Toast */}
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-800/90 text-slate-300 text-[10px] px-3 py-1.5 rounded-full backdrop-blur pointer-events-none whitespace-nowrap">
                Preview is approximated. Download .tex for full fidelity.
             </div>
        </div>

      </div>
    </div>
  );
};

export default LatexEditor;
