import React, { useState, useRef, useEffect } from 'react';
import { INITIAL_RESUME_DATA, ResumeData, TemplateType, EMPTY_RESUME_DATA } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import LandingPage from './components/LandingPage';
import TemplateSelection from './components/TemplateSelection';
import { Download, ChevronLeft, LayoutTemplate, FileImage, FileType, FileText, Loader2, Save, AlertCircle, PartyPopper, ArrowLeft, Plus, Eye, Edit, X } from './components/ui/Icons';
import { saveToDB, loadFromDB, clearDB } from './utils/db';
import { generatePDF } from './utils/pdfGenerator';

enum ViewState {
  LANDING = 'landing',
  TEMPLATES = 'templates',
  EDITOR = 'editor',
  THANK_YOU = 'thank_you'
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

  // Mobile Tab State
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

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
    const calculateScale = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
          // Mobile preview scale
          // A4 width is 794px. We need to fit it into width - padding.
          const padding = 32;
          const availableWidth = width - padding;
          const newScale = Math.min(availableWidth / 794, 0.55); // Slightly larger cap for mobile readability
          setScale(newScale);
      } else {
          // Desktop preview scale
          const containerWidth = width * 0.35; 
          // Ensure min scale for readability or fit
          let newScale = 0.45;
          if (containerWidth < 350) newScale = 0.30;
          else if (containerWidth < 450) newScale = 0.38;
          else newScale = Math.min(containerWidth / 850, 0.65); // Cap at sensible max
          
          setScale(newScale);
      }
    };
    
    // Calculate immediately and on resize
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [view]); // Recalculate when view changes

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

  const handleSuccessfulDownload = async () => {
      setIsDownloading(false);
      // Don't clear data immediately, send to Thank You page
      setView(ViewState.THANK_YOU);
  };

  const handleBackToEditor = () => {
      setView(ViewState.EDITOR);
      setMobileTab('editor');
  };

  const handleCreateNew = async () => {
      await clearDB();
      setResumeData(EMPTY_RESUME_DATA);
      setView(ViewState.LANDING);
  };

  const handleDownload = async (format: 'pdf' | 'png' | 'jpeg') => {
    setIsDownloading(true);
    setShowDownloadMenu(false); 
    
    // Small delay to let UI close
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      if (format === 'pdf') {
         // Use the Native jsPDF generator for vector text, no dialog, and perfect styling
         const success = await generatePDF(resumeData, selectedTemplate);
         if (success) {
            await handleSuccessfulDownload();
         } else {
             setIsDownloading(false);
             alert("PDF Generation Failed. Please try again.");
         }
         return;
      }

      // --- IMAGE GENERATION (PNG/JPEG) ---
      // We look for #resume-content. 
      const sourceElement = document.getElementById('resume-content');
      if (!sourceElement) {
         console.error("Resume content element not found");
         setIsDownloading(false);
         alert("Could not find resume content to capture.");
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
      clone.style.height = 'auto';
      clone.style.minHeight = '1123px';
      
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
      if (!window.html2canvas) {
          throw new Error("html2canvas not loaded");
      }

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
      const imgData = canvas.toDataURL(mimeType, 0.95);
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `${resumeData.fullName.replace(/\s+/g, '_')}_Resume.${format}`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      document.body.removeChild(container);
      
      await handleSuccessfulDownload();

    } catch (err) {
      console.error("Download failed", err);
      alert("Something went wrong while generating the file. Please check console or try a different format.");
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

  // --- THANK YOU PAGE ---
  if (view === ViewState.THANK_YOU) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl p-8 md:p-12 text-center relative z-10 animate-slideUp">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm animate-bounce">
                    <PartyPopper size={40} />
                </div>
                
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">You're All Set!</h2>
                <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                    Thank you for using NW Resume. Your file has been downloaded successfully. Good luck with your job search!
                </p>

                <div className="space-y-4">
                    <button 
                        onClick={handleBackToEditor}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Editing
                    </button>
                    
                    <button 
                        onClick={handleCreateNew}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-indigo-600 shadow-xl shadow-slate-200 hover:shadow-indigo-200 transition-all transform hover:-translate-y-1"
                    >
                        <Plus size={20} />
                        Create New Resume
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 font-medium">
                    Need to make a quick change? Hit "Back to Editing" to keep your data.
                </div>
            </div>
        </div>
      );
  }

  // --- EDITOR SPLIT VIEW ---
  return (
    <div className="h-[100dvh] w-full flex flex-col md:flex-row bg-slate-100 overflow-hidden font-sans relative">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* MOBILE TAB SWITCHER + ACTIONS */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
         {/* Toggle Tabs */}
         <div className="bg-slate-900 text-white p-1.5 rounded-full shadow-2xl flex items-center gap-1 border border-slate-700/50">
            <button
              onClick={() => setMobileTab('editor')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${mobileTab === 'editor' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Edit size={14} /> Editor
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${mobileTab === 'preview' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              <Eye size={14} /> Preview
            </button>
         </div>

         {/* Dedicated Download Button on Mobile */}
         {mobileTab === 'preview' && (
           <button
             onClick={() => setShowDownloadMenu(true)}
             className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-2xl border border-emerald-400 animate-fadeIn"
             title="Download Resume"
           >
             <Download size={20} />
           </button>
         )}
      </div>

      {isDownloading && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] flex flex-col items-center justify-center text-white animate-fadeIn">
           <Loader2 size={48} className="animate-spin mb-4" />
           <h3 className="text-xl font-bold">Preparing Document...</h3>
           <p className="text-sm text-slate-200">Generating high-quality output...</p>
        </div>
      )}

      {/* MOBILE DOWNLOAD MODAL */}
      {showDownloadMenu && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fadeIn">
            <div ref={menuRef} className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">Download Options</h3>
                    <button onClick={() => setShowDownloadMenu(false)} className="p-1 rounded-full hover:bg-slate-200 text-slate-500">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-4 space-y-2">
                    <button onClick={() => handleDownload('pdf')} className="w-full flex items-center gap-3 px-4 py-3 bg-red-50 text-red-700 rounded-xl font-bold hover:bg-red-100 transition-colors border border-red-100">
                        <FileText size={20} /> Download PDF (Best)
                    </button>
                    <button onClick={() => handleDownload('png')} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-colors border border-slate-200">
                        <FileImage size={20} /> Download PNG Image
                    </button>
                    <button onClick={() => handleDownload('jpeg')} className="w-full flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-colors border border-slate-200">
                        <FileType size={20} /> Download JPEG Image
                    </button>
                </div>
                <div className="p-3 bg-slate-50 text-center text-xs text-slate-400">
                    Your file will be generated instantly.
                </div>
            </div>
        </div>
      )}

      {/* LEFT PANEL (EDITOR) */}
      <div className={`
          w-full md:w-[65%] lg:w-[65%] h-full flex-col border-r border-slate-200 bg-white z-20 shadow-xl relative
          ${mobileTab === 'editor' ? 'flex' : 'hidden'} md:flex
      `}>
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
        </header>
        
        <div className="flex-1 overflow-hidden relative">
          <ResumeForm 
            data={resumeData} 
            updateData={setResumeData} 
            onReset={handleReset} 
          />
        </div>
      </div>

      {/* RIGHT PANEL (PREVIEW & DOWNLOAD) */}
      <div className={`
          w-full md:flex-1 flex-col h-full bg-slate-200/50 relative overflow-hidden
          ${mobileTab === 'preview' ? 'flex' : 'hidden'} md:flex
      `}>
        <div className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-slate-200/50 bg-white/80 backdrop-blur-sm z-20 shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-500">
             <LayoutTemplate size={16} /> 
             <span className="font-medium">Live Preview</span>
          </div>

          <div className="flex items-center gap-4 relative">
              {!isReadyForDownload && (
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 animate-pulse whitespace-nowrap">
                    <AlertCircle size={12} />
                    <span className="hidden sm:inline">Complete details</span>
                    <span className="sm:hidden">Incomplete</span>
                 </div>
              )}

             <button 
                onClick={() => !isDownloading && isReadyForDownload && setShowDownloadMenu(true)}
                disabled={isDownloading || !isReadyForDownload}
                className={`hidden md:flex items-center gap-2 px-4 md:px-5 py-2 rounded-xl font-bold text-xs transition-all shadow-lg transform active:translate-y-0 border
                    ${isReadyForDownload 
                        ? 'bg-slate-900 text-white border-slate-900 hover:bg-indigo-600 hover:border-indigo-600 hover:shadow-indigo-300 hover:-translate-y-0.5' 
                        : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed shadow-none'
                    }
                `}
              >
                <Download size={14} />
                Export
              </button>
              
              {/* DESKTOP MENU - Only show if not using the mobile modal logic */}
              {showDownloadMenu && window.innerWidth >= 768 && (
                <div ref={menuRef} className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-fadeIn z-50 ring-1 ring-black/5">
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

        {/* Removed 'custom-scrollbar' to hide bars but kept scrolling capability via overflow-auto */}
        <div className="flex-1 overflow-auto bg-slate-100 relative hide-scrollbar flex items-start justify-center pt-8 pb-32 md:pb-20">
             <div id="resume-preview-container" className="transition-transform duration-200 origin-top shadow-2xl" style={{ transform: `scale(${scale})` }}>
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
