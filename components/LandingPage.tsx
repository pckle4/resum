
import React from 'react';
import { ArrowRight, LayoutTemplate, CheckCircle2, Linkedin, Twitter, Github, Heart } from './ui/Icons';

interface Props {
  onGetStarted: () => void;
}

const LandingPage: React.FC<Props> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 font-sans flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <LayoutTemplate size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">NW || resume</span>
        </div>
        <div className="flex gap-4">
             <button onClick={onGetStarted} className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden sm:block">Templates</button>
             <button onClick={onGetStarted} className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">Start Building</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 flex-1 overflow-hidden w-full">
        <div className="flex-1 space-y-8 animate-fadeIn text-center md:text-left">
          
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            Build a Professional <br/>
            <span className="text-indigo-600 relative">
              Resume
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span> 
            in Minutes
          </h1>
          
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed mx-auto md:mx-0">
            Stop struggling with Word documents. Use our builder to create ATS-friendly resumes that get you hired.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={onGetStarted}
              className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all transform hover:-translate-y-1"
            >
              Build My Resume <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 pt-4 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> Free to try
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> No credit card
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> PDF Download
            </div>
          </div>
        </div>

        {/* Visual Decoration (Visible on Mobile now too) */}
        <div className="w-full md:flex-1 relative h-[380px] md:h-auto min-h-[380px] flex items-center justify-center md:block">
          <div className="absolute top-0 right-0 md:w-[600px] md:h-[600px] w-[300px] h-[300px] bg-indigo-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
          
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 rotate-3 hover:rotate-0 transition-transform duration-500 max-w-[320px] md:max-w-none mx-auto md:mx-0 scale-90 md:scale-100">
             <div className="bg-slate-50 rounded w-full h-[400px] md:h-[500px] p-6 md:p-8 space-y-6">
                <div className="flex gap-6">
                   <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-200 rounded-full shrink-0"></div>
                   <div className="flex-1 space-y-3 pt-2">
                      <div className="h-5 md:h-6 bg-slate-800 rounded w-3/4"></div>
                      <div className="h-3 md:h-4 bg-indigo-500 rounded w-1/2"></div>
                      <div className="h-2 md:h-3 bg-slate-300 rounded w-full"></div>
                   </div>
                </div>
                <div className="space-y-4 pt-4">
                   <div className="h-3 md:h-4 bg-slate-200 rounded w-1/4"></div>
                   <div className="h-1.5 md:h-2 bg-slate-200 rounded w-full"></div>
                   <div className="h-1.5 md:h-2 bg-slate-200 rounded w-5/6"></div>
                   <div className="h-1.5 md:h-2 bg-slate-200 rounded w-4/6"></div>
                </div>
                <div className="space-y-4 pt-4">
                   <div className="h-3 md:h-4 bg-slate-200 rounded w-1/4"></div>
                   <div className="h-1.5 md:h-2 bg-slate-200 rounded w-full"></div>
                   <div className="h-1.5 md:h-2 bg-slate-200 rounded w-5/6"></div>
                </div>
             </div>
             
             {/* Floating Badge */}
             <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-xl shadow-xl border border-indigo-100 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                   <CheckCircle2 size={20} />
                </div>
                <div>
                   <div className="text-sm font-bold text-slate-800">Job Ready</div>
                   <div className="text-xs text-slate-500">ATS Optimized</div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-black text-slate-400 py-12 border-t border-slate-900 mt-auto">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-6">
            
            <div className="flex items-center gap-3 text-white">
                <div className="bg-indigo-600 p-2 rounded-lg">
                    <LayoutTemplate size={24} />
                </div>
                <span className="text-2xl font-bold tracking-tight">NW || resume</span>
            </div>

            <p className="text-sm text-slate-500 text-center max-w-md">
                Empowering professionals to land their dream jobs with AI-driven tools and modern design.
            </p>
            
            <div className="flex gap-4 pt-2">
                <a href="#" className="hover:text-white transition-colors bg-slate-900 p-2 rounded-full"><Twitter size={18} /></a>
                <a href="#" className="hover:text-white transition-colors bg-slate-900 p-2 rounded-full"><Linkedin size={18} /></a>
                <a href="#" className="hover:text-white transition-colors bg-slate-900 p-2 rounded-full"><Github size={18} /></a>
            </div>

            <div className="border-t border-slate-900 pt-8 mt-4 w-full text-center">
                <div className="text-sm text-slate-600">
                    <p>© {new Date().getFullYear()} NW || resume. All rights reserved.</p>
                </div>
            </div>

         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
