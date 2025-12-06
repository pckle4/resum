
import React, { useState, useRef, useEffect } from 'react';
import { INITIAL_RESUME_DATA, ResumeData, TemplateType, EMPTY_RESUME_DATA } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import LandingPage from './components/LandingPage';
import TemplateSelection from './components/TemplateSelection';
import { Download, ChevronLeft, LayoutTemplate, FileImage, FileType, FileText, Loader2, Save, AlertCircle } from './components/ui/Icons';
import { saveToDB, loadFromDB, clearDB } from './utils/db';
import { generatePDF } from './utils/pdfGenerator';

enum ViewState {
  LANDING = 'landing',
  TEMPLATES = 'templates',
  EDITOR = 'editor',
  MOBILE_PREVIEW = 'mobile_preview'
}

declare global {
  interface Window {
    html2canvas: any;
  }
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(TemplateType.MODERN);
  const [scale, setScale] = useState(0.45);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'loading'>('loading');
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Validation States
  const [isReadyForDownload, setIsReadyForDownload] = useState(false);

  // Check Compulsory Fields
  useEffect(() => {
    // Basic validation: Name, Email, Title required
    const hasCompulsory = !!(resumeData.fullName.trim() && resumeData.email.trim() && resumeData.title.trim());
    const hasContent = resumeData.experience.length > 0 || resumeData.education.length > 0;
    setIsReadyForDownload(hasCompulsory && hasContent);
  }, [resumeData]);

  // Initialize from DB
  useEffect(() => {
    const initData = async () => {
        setSaveStatus('loading');
        const data = await loadFromDB();
        setResumeData(data);
        setIsDataLoaded(true);
        setSaveStatus('saved');
    };
    initData();
  }, []);

  // Persistence Effect
  useEffect(() => {
    if (!isDataLoaded) return; 

    setSaveStatus('saving');
    const timer = setTimeout(() => {
      saveToDB(resumeData).then(() => {
         setSaveStatus('saved');
      });
    }, 1000); 
    return () => clearTimeout(timer);
  }, [resumeData, isDataLoaded]);

  // Adjust scale logic for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
          // Mobile preview scale
          const mobileContainerWidth = width - 32; // padding
          setScale(mobileContainerWidth / 794);
      } else {
          // Desktop preview scale
          const containerWidth = width * 0.35; 
          if (containerWidth < 300) setScale(0.25);
          else if (containerWidth < 500) setScale(0.35);
          else setScale(0.45);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [view]); // Recalculate when view changes (e.g. entering mobile preview)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDownloadMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReset = async () => {
      await clearDB();
      setResumeData(EMPTY_RESUME_DATA);
      setSaveStatus('saved');
  };

  const handleDownload = async (format: 'pdf' | 'png' | 'jpeg') => {
    setIsDownloading(true);
    setShowDownloadMenu(false); 
    
    // Small delay to let UI close
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      if (format === 'pdf') {
         // Use the Native jsPDF generator for vector text, no dialog, and perfect styling
         generatePDF(resumeData, selectedTemplate);
         setIsDownloading(false);
         return;
      }

      // --- IMAGE GENERATION (PNG/JPEG) ---
      // For images, we still use html2canvas on the DOM element
      const sourceElement = document.getElementById('resume-content');
      if (!sourceElement) {
         setIsDownloading(false);
         return;
      }

      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-10000px';
      container.style.top = '0';
      container.style.width = '794px'; 
      container.style.zIndex = '-9999';
      
      const clone = sourceElement.cloneNode(true) as HTMLElement;
      clone.style.transform = 'none'; 
      clone.style.margin = '0';
      clone.style.width = '794px'; 
      
      container.appendChild(clone);
      document.body.appendChild(container);

      // Wait for images
      const images = Array.from(clone.getElementsByTagName('img'));
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve; 
        });
      }));

      // @ts-ignore
      const canvas = await window.html2canvas(clone, {
        scale: 2, 
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794
      });
        
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const imgData = canvas.toDataURL(mimeType, 1.0);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.${format}`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      document.body.removeChild(container);
      setIsDownloading(false);

    } catch (err) {
      console.error("Download failed", err);
      alert("Something went wrong while generating the file.");
      setIsDownloading(false);
    }
  };

  if (view === ViewState.LANDING) {
    return <LandingPage onGetStarted={() => setView(ViewState.TEMPLATES)} />;
  }

  if (view === ViewState.TEMPLATES) {
    return (
      <TemplateSelection 
        selectedTemplate={selectedTemplate}
        onSelect={setSelectedTemplate}
        onNext={() => setView(ViewState.EDITOR)}
        onBack={() => setView(ViewState.LANDING)}
      />
    );
  }

  // --- MOBILE PREVIEW SCREEN ---
  if (view === ViewState.MOBILE_PREVIEW) {
      return (
          <div className="h-screen w-full flex flex-col bg-slate-100 font-sans">
              <header className="px-4 py-4 bg-white border-b border-slate-200 flex items-center justify-between shrink-0 shadow-sm z-30">
                  <button onClick={() => setView(ViewState.EDITOR)} className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                      <ChevronLeft size={20} /> Edit
                  </button>
                  <h2 className="font-bold text-slate-900">Preview</h2>
                  <div className="w-8"></div> {/* Spacer */}
              </header>

              <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-200/50 custom-scrollbar">
                   <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
                        <ResumePreview data={resumeData} template={selectedTemplate} />
                   </div>
              </div>

              <div className="p-4 bg-white border-t border-slate-200 z-30">
                   <button 
                        onClick={() => handleDownload('pdf')}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg"
                   >
                        <Download size={18} /> Download PDF
                   </button>
              </div>
              
              {isDownloading && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center text-white">
                    <Loader2 size={48} className="animate-spin mb-4" />
                    <p className="font-bold">Generating PDF...</p>
                </div>
              )}
          </div>
      );
  }

  // --- EDITOR SPLIT VIEW ---
  return (
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-slate-100 overflow-hidden font-sans">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

      {isDownloading && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex flex-col items-center justify-center text-white animate-fadeIn">
           <Loader2 size={48} className="animate-spin mb-4" />
           <h3 className="text-xl font-bold">Preparing Document...</h3>
           <p className="text-sm text-slate-200">Generating high-quality output...</p>
        </div>
      )}

      {/* LEFT PANEL (EDITOR) */}
      <div className="w-full md:w-[65%] lg:w-[65%] h-full flex flex-col border-r border-slate-200 bg-white z-20 shadow-xl relative">
        <header className="h-16 px-4 md:px-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setView(ViewState.TEMPLATES)} 
               className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors border border-transparent hover:border-slate-200"
               title="Change Template"
             >
                <ChevronLeft size={20} />
             </button>
             <div>
                <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-none">Editor</h1>
                <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400 mt-0.5">
                    {saveStatus === 'saving' || saveStatus === 'loading' ? (
                    <>
                        <Loader2 size={10} className="animate-spin" /> {saveStatus === 'loading' ? 'Loading' : 'Saving...'}
                    </>
                    ) : (
                    <>
                        <Save size={10} /> Saved
                    </>
                    )}
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* No Progress Bar here anymore - minimal look */}
          </div>
        </header>
        
        <div className="flex-1 overflow-hidden relative">
          <ResumeForm 
            data={resumeData} 
            updateData={setResumeData} 
            onReset={handleReset} 
            onPreview={() => setView(ViewState.MOBILE_PREVIEW)} 
          />
        </div>
      </div>

      {/* RIGHT PANEL (DESKTOP PREVIEW) */}
      <div className="hidden md:flex flex-1 flex-col h-full bg-slate-200/50 relative overflow-hidden">
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200/50 bg-white/80 backdrop-blur-sm z-20 shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
             <LayoutTemplate size={16} /> 
             <span className="font-medium">Live Preview</span>
          </div>

          <div className="flex items-center gap-4 relative" ref={menuRef}>
              {!isReadyForDownload && (
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 animate-pulse">
                    <AlertCircle size={12} />
                    Complete details
                 </div>
              )}

             <button 
                onClick={() => !isDownloading && isReadyForDownload && setShowDownloadMenu(!showDownloadMenu)}
                disabled={isDownloading || !isReadyForDownload}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs transition-all shadow-lg transform active:translate-y-0 border
                    ${isReadyForDownload 
                        ? 'bg-slate-900 text-white border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 hover:shadow-indigo-300 hover:-translate-y-0.5' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed shadow-none'
                    }
                `}
              >
                <Download size={14} />
                Export PDF
              </button>

              {showDownloadMenu && (
                <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-fadeIn z-50 ring-1 ring-black/5">
                   <div className="p-2 space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">Download Format</div>
                      
                      <button onClick={() => handleDownload('pdf')} className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-slate-50 rounded-xl text-slate-800 font-medium transition-colors group border border-transparent hover:border-slate-200">
                         <div className="p-2.5 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-100 transition-colors shadow-sm"><FileText size={20} /></div>
                         <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <span className="font-bold">PDF Document</span>
                                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">BEST</span>
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">Selectable Text • Vector Quality</div>
                         </div>
                      </button>

                      <button onClick={() => handleDownload('png')} className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-slate-50 rounded-xl text-slate-800 font-medium transition-colors group border border-transparent hover:border-slate-200">
                         <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-100 transition-colors shadow-sm"><FileImage size={20} /></div>
                         <div className="flex-1">
                            <span className="font-bold">PNG Image</span>
                            <div className="text-xs text-slate-400 mt-0.5">High Res • Social Sharing</div>
                         </div>
                      </button>

                      <button onClick={() => handleDownload('jpeg')} className="w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-slate-50 rounded-xl text-slate-800 font-medium transition-colors group border border-transparent hover:border-slate-200">
                         <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-lg group-hover:bg-yellow-100 transition-colors shadow-sm"><FileType size={20} /></div>
                         <div className="flex-1">
                            <span className="font-bold">JPG Image</span>
                            <div className="text-xs text-slate-400 mt-0.5">Compressed • Smaller Size</div>
                         </div>
                      </button>
                   </div>
                </div>
              )}
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-slate-100 relative custom-scrollbar flex items-start justify-center pt-8 pb-20">
             <div id="resume-preview-container" className="transition-transform duration-200 origin-top" style={{ transform: `scale(${scale})` }}>
                <ResumePreview 
                  ref={previewContainerRef} 
                  data={resumeData} 
                  template={selectedTemplate} 
                />
             </div>
        </div>
      </div>
    </div>
  );
};

export default App;
