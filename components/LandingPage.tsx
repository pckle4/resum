
import React from 'react';
import { 
  ArrowRight, LayoutTemplate, CheckCircle2, Linkedin, Twitter, Github, 
  Zap, Shield, Smartphone, FileText, ChevronDown, Wand2, Star, Sparkles
} from './ui/Icons';

interface Props {
  onGetStarted: () => void;
}

const LandingPage: React.FC<Props> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white font-sans flex flex-col overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-slate-900 text-white pb-16 pt-6 overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] opacity-60"></div>
         </div>

         {/* Nav */}
         <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                <LayoutTemplate size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">NW || resume</span>
            </div>
            <button onClick={onGetStarted} className="px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-all">
                Get Started
            </button>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-6 mt-12 md:mt-20 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-8 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-900/50 border border-indigo-700/50 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles size={14} /> AI-Powered Builder
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                    Build Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 relative">
                    Dream Career
                    </span>
                </h1>
                <p className="text-lg text-slate-300 max-w-xl leading-relaxed mx-auto md:mx-0">
                    Create professional, ATS-friendly resumes in minutes. Choose from modern templates, customize content, and export to PDF instantly.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                    <button 
                    onClick={onGetStarted}
                    className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-500/40 transition-all transform hover:-translate-y-1 ring-4 ring-transparent hover:ring-indigo-500/20"
                    >
                    Build My Resume <ArrowRight size={20} />
                    </button>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-4 text-sm font-medium text-slate-400">
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> Free Forever</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> No Sign-up</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-400" /> Secure Data</div>
                </div>
            </div>

            {/* Visual Decoration */}
            <div className="w-full md:flex-1 relative flex justify-center perspective-1000">
                <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-slate-700/50 p-2 rotate-y-12 hover:rotate-y-0 transition-transform duration-700 w-full max-w-[400px]">
                    <div className="bg-slate-50 rounded-xl w-full aspect-[1/1.4] p-6 space-y-6 shadow-inner relative overflow-hidden">
                        {/* Mock Resume UI */}
                        <div className="flex gap-4 items-center border-b border-slate-200 pb-4">
                            <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                            <div className="space-y-2 flex-1">
                                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                                <div className="h-3 bg-indigo-500 rounded w-1/2"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-2 bg-slate-300 rounded w-1/4"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-200 rounded w-3/4"></div>
                        </div>
                        <div className="space-y-3">
                             <div className="h-2 bg-slate-300 rounded w-1/3"></div>
                             <div className="flex gap-2">
                                 <div className="h-12 w-full bg-white border border-slate-100 rounded-lg shadow-sm"></div>
                                 <div className="h-12 w-full bg-white border border-slate-100 rounded-lg shadow-sm"></div>
                             </div>
                        </div>

                         {/* Floating Elements */}
                         <div className="absolute bottom-10 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-slow">
                             <div className="bg-green-100 p-2.5 rounded-full text-green-600"><CheckCircle2 size={20}/></div>
                             <div>
                                 <div className="text-sm font-bold text-slate-800">ATS Score</div>
                                 <div className="text-xs text-green-600 font-bold">98/100</div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </main>

        <div className="h-16 w-full bg-white absolute bottom-0 left-0 rounded-t-[50px] md:rounded-t-[80px]"></div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16 space-y-4">
             <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Everything you need</h2>
             <p className="text-slate-600 max-w-2xl mx-auto">Our builder handles the formatting and design so you can focus on the content that matters.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
             {/* Feature 1 */}
             <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                 <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                     <Zap size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Generation</h3>
                 <p className="text-slate-500 leading-relaxed">
                     No waiting. See your changes in real-time as you type. Switch templates instantly without losing data.
                 </p>
             </div>

             {/* Feature 2 */}
             <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                 <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                     <Shield size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
                 <p className="text-slate-500 leading-relaxed">
                     Your data lives in your browser. We don't store your personal information on our servers.
                 </p>
             </div>

             {/* Feature 3 */}
             <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                 <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                     <Smartphone size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile Friendly</h3>
                 <p className="text-slate-500 leading-relaxed">
                     Edit on the go. Our responsive editor works perfectly on phones and tablets.
                 </p>
             </div>
         </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold">3 Simple Steps</h2>
                  <p className="text-slate-400 mt-4">Go from blank page to hired in minutes.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12 text-center relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-700 via-indigo-500 to-slate-700 z-0"></div>

                  <div className="relative z-10 space-y-6">
                      <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full border-4 border-slate-900 flex items-center justify-center text-2xl font-bold text-indigo-400 shadow-xl">1</div>
                      <h3 className="text-xl font-bold">Choose Template</h3>
                      <p className="text-slate-400 text-sm">Select from our ATS-optimized professional designs.</p>
                  </div>
                  <div className="relative z-10 space-y-6">
                      <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full border-4 border-slate-900 flex items-center justify-center text-2xl font-bold text-indigo-400 shadow-xl">2</div>
                      <h3 className="text-xl font-bold">Enter Details</h3>
                      <p className="text-slate-400 text-sm">Fill in your experience, skills, and education.</p>
                  </div>
                  <div className="relative z-10 space-y-6">
                      <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full border-4 border-slate-900 flex items-center justify-center text-2xl font-bold text-indigo-400 shadow-xl">3</div>
                      <h3 className="text-xl font-bold">Download PDF</h3>
                      <p className="text-slate-400 text-sm">Export high-quality PDF ready for application.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-20 px-6 max-w-4xl mx-auto w-full">
         <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
         
         <div className="space-y-4">
             <FaqItem 
                question="Is this resume builder really free?" 
                answer="Yes! You can build, preview, and download your resume without paying a dime. We believe professional tools should be accessible to everyone."
             />
             <FaqItem 
                question="Will my resume pass ATS scanners?" 
                answer="Absolutely. Our templates are designed with clean code structures and standard fonts that Applicant Tracking Systems (ATS) can easily parse."
             />
             <FaqItem 
                question="How do I save my data?" 
                answer="We automatically save your progress to your browser's local storage. You can close the tab and come back later to pick up where you left off."
             />
             <FaqItem 
                question="Can I change templates later?" 
                answer="Yes, you can switch templates at any time in the editor without losing any of your content."
             />
         </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-300">
               {/* Circles */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

               <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to get hired?</h2>
               <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                   Join thousands of professionals who have advanced their careers with our tools.
               </p>
               <button 
                  onClick={onGetStarted}
                  className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-50 transition-all transform hover:-translate-y-1 relative z-10"
               >
                   Create My Resume Now
               </button>
          </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-2 text-slate-700">
                 <div className="bg-slate-200 p-1.5 rounded-lg">
                    <LayoutTemplate size={20} />
                 </div>
                 <span className="font-bold">NW || resume</span>
             </div>
             
             <div className="text-slate-500 text-sm">
                 © {new Date().getFullYear()} NW || resume. Built with React & Tailwind.
             </div>

             <div className="flex gap-4">
                 <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all"><Twitter size={20}/></a>
                 <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all"><Linkedin size={20}/></a>
                 <a href="#" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-full transition-all"><Github size={20}/></a>
             </div>
         </div>
      </footer>
    </div>
  );
};

const FaqItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-200 transition-colors"
        >
            <div className="p-6 flex items-center justify-between">
                <h3 className={`font-bold text-lg transition-colors ${isOpen ? 'text-indigo-600' : 'text-slate-800'}`}>{question}</h3>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-slate-400" />
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
