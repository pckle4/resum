
import React from 'react';
import { 
  ArrowRight, LayoutTemplate, CheckCircle2, Linkedin, Twitter, Github, 
  Zap, Shield, Smartphone, FileText, ChevronDown, Wand2, Star, Sparkles,
  Download, Award
} from './ui/Icons';

interface Props {
  onGetStarted: () => void;
}

const LandingPage: React.FC<Props> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col overflow-x-hidden">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes swing {
           0% { transform: rotate(5deg); }
           50% { transform: rotate(-5deg); }
           100% { transform: rotate(5deg); }
        }
        .animate-swing {
            transform-origin: top center;
            animation: swing 8s ease-in-out infinite;
        }
      `}</style>
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-slate-900 text-white pb-20 pt-6 overflow-hidden">
         {/* Background Decoration */}
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             {/* Mesh Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[100px]"></div>
            <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-purple-600/20 rounded-full blur-[80px]"></div>
         </div>

         {/* Nav */}
         <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                <LayoutTemplate size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">NW || resume</span>
            </div>
            <button onClick={onGetStarted} className="px-6 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
                Launch App
            </button>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-6 mt-16 md:mt-24 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-8 animate-fadeIn">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-xl backdrop-blur-md">
                    <Sparkles size={14} className="text-yellow-400" /> Voted #1 Resume Builder
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                    Land Your Dream <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-300 relative">
                    Job Faster
                    </span>
                </h1>
                <p className="text-lg text-slate-300 max-w-xl leading-relaxed mx-auto md:mx-0 font-medium">
                    Create professional, ATS-optimized resumes in minutes. No sign-up required. Completely free and secure.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-6">
                    <button 
                    onClick={onGetStarted}
                    className="group flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1"
                    >
                    Build My Resume <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                    <button 
                     onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth'})}
                     className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg text-white border border-slate-700 hover:bg-slate-800 transition-all"
                    >
                        Learn More
                    </button>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-6 text-sm font-semibold text-slate-400">
                    <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-400" /> Free Forever</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-400" /> No Sign-up</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-400" /> Privacy First</div>
                </div>
            </div>

            {/* Visual Decoration - Hanging Resume */}
            <div className="w-full md:flex-1 relative flex justify-center perspective-[1200px] h-[500px] items-start pt-10">
                {/* The Rope */}
                <div className="absolute top-[-100px] left-1/2 w-1 h-[150px] bg-gradient-to-b from-slate-800 to-slate-400 z-0 origin-top animate-swing"></div>
                
                {/* The Resume */}
                <div className="relative z-10 w-full max-w-[380px] animate-swing origin-top">
                     {/* Clip at top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-slate-800 rounded-lg z-20 shadow-lg flex items-center justify-center">
                        <div className="w-20 h-1 bg-slate-600 rounded-full"></div>
                    </div>

                    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative">
                         <div className="h-2 bg-indigo-500 w-full"></div>
                         <div className="p-6 space-y-6">
                             {/* Mock Header */}
                             <div className="flex gap-4 items-center border-b border-slate-100 pb-6">
                                <div className="w-16 h-16 bg-slate-100 rounded-full border-2 border-indigo-100"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-5 bg-slate-800 rounded w-3/4"></div>
                                    <div className="h-3 bg-indigo-500 rounded w-1/2"></div>
                                </div>
                             </div>
                             {/* Mock Lines */}
                             <div className="space-y-3 opacity-60">
                                <div className="h-2 bg-slate-300 rounded w-1/4 mb-2"></div>
                                <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                                <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                                <div className="h-1.5 bg-slate-200 rounded w-5/6"></div>
                             </div>
                             <div className="space-y-3 opacity-60">
                                <div className="h-2 bg-slate-300 rounded w-1/3 mb-2"></div>
                                <div className="flex gap-2">
                                    <div className="h-14 w-full bg-slate-50 border border-slate-100 rounded-lg"></div>
                                    <div className="h-14 w-full bg-slate-50 border border-slate-100 rounded-lg"></div>
                                </div>
                             </div>
                             <div className="flex gap-2 pt-2">
                                 <div className="h-6 w-16 bg-indigo-100 rounded-full"></div>
                                 <div className="h-6 w-16 bg-indigo-100 rounded-full"></div>
                                 <div className="h-6 w-16 bg-indigo-100 rounded-full"></div>
                             </div>
                         </div>
                         
                         {/* Floating Badge */}
                         <div className="absolute bottom-6 -right-6 bg-white p-3 pr-5 rounded-l-xl shadow-xl border-y border-l border-slate-100 flex items-center gap-3 animate-bounce-slow">
                             <div className="bg-green-100 p-2 rounded-full text-green-600"><CheckCircle2 size={20}/></div>
                             <div>
                                 <div className="text-xs font-bold text-slate-800">ATS Score</div>
                                 <div className="text-sm text-green-600 font-extrabold">98/100</div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </main>
        
        {/* Curver Bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-slate-50"></path>
            </svg>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative">
         <div className="text-center mb-20 space-y-4">
             <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Why Choose Us</span>
             <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Everything you need to get hired</h2>
             <p className="text-slate-600 max-w-2xl mx-auto text-lg">Our builder handles the formatting, design, and ATS optimization so you can focus on your content.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
             {/* Feature 1 */}
             <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                 <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                     <Zap size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">Instant Generation</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                     Real-time preview. Type on the left, see it on the right. Download your PDF instantly with zero lag.
                 </p>
             </div>

             {/* Feature 2 */}
             <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                 <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                     <Shield size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">Privacy First</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                     Your data lives in your browser (Local Storage). We don't store your personal info on our servers.
                 </p>
             </div>

             {/* Feature 3 */}
             <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                 <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                     <Smartphone size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">Mobile Optimized</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                     Edit on the go. Our responsive editor works perfectly on phones and tablets.
                 </p>
             </div>
             
             {/* Feature 4 */}
             <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                 <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                     <Star size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">ATS Friendly</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                     Templates designed to pass Applicant Tracking Systems with clean code and standard fonts.
                 </p>
             </div>

             {/* Feature 5 */}
             <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                 <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                     <Wand2 size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">Rich Text Editor</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                     Format your experience with bold, italics, and bullet points easily.
                 </p>
             </div>

             {/* Feature 6 */}
             <div className="p-8 rounded-[2rem] bg-white border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                 <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                     <FileText size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-900 mb-3">Multiple Templates</h3>
                 <p className="text-slate-500 leading-relaxed font-medium">
                     Choose from Modern, Minimalist, or Creative layouts to match your industry.
                 </p>
             </div>
         </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600 opacity-20 rounded-full -translate-x-1/2 translate-y-1/2"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold">3 Simple Steps</h2>
                  <p className="text-slate-400 mt-4 text-lg">Go from blank page to hired in minutes.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12 text-center relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-slate-800 z-0 rounded-full">
                      <div className="h-full w-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  </div>

                  {/* Step 1 */}
                  <div className="relative z-10 space-y-6 group">
                      <div className="w-24 h-24 mx-auto bg-slate-800 rounded-3xl border-4 border-slate-700 flex items-center justify-center text-3xl font-bold text-indigo-400 shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <LayoutTemplate size={36} />
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold mb-2">1. Choose Template</h3>
                          <p className="text-slate-400">Select from our ATS-optimized professional designs.</p>
                      </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="relative z-10 space-y-6 group">
                      <div className="w-24 h-24 mx-auto bg-slate-800 rounded-3xl border-4 border-slate-700 flex items-center justify-center text-3xl font-bold text-purple-400 shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <FileText size={36} />
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold mb-2">2. Enter Details</h3>
                          <p className="text-slate-400">Fill in your experience, skills, and education effortlessly.</p>
                      </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative z-10 space-y-6 group">
                      <div className="w-24 h-24 mx-auto bg-slate-800 rounded-3xl border-4 border-slate-700 flex items-center justify-center text-3xl font-bold text-cyan-400 shadow-xl group-hover:scale-110 transition-transform duration-300">
                          <Download size={36} />
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold mb-2">3. Download PDF</h3>
                          <p className="text-slate-400">Export high-quality PDF ready for application.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6 max-w-4xl mx-auto w-full">
         <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-lg">Got questions? We've got answers.</p>
         </div>
         
         <div className="space-y-4">
             <FaqItem 
                question="Is this resume builder really free?" 
                answer="Yes! You can build, preview, and download your resume without paying a dime. We believe professional tools should be accessible to everyone."
             />
             <FaqItem 
                question="Will my resume pass ATS scanners?" 
                answer="Absolutely. Our templates are designed with clean code structures and standard fonts (Helvetica, Times New Roman, Inter) that Applicant Tracking Systems (ATS) can easily parse."
             />
             <FaqItem 
                question="How do I save my data?" 
                answer="We automatically save your progress to your browser's local storage every second. You can close the tab and come back later to pick up exactly where you left off."
             />
             <FaqItem 
                question="Can I customize the layout?" 
                answer="Yes, you can switch between Modern, Minimalist, and Creative templates at any time without losing any of your content. You can also reorder sections in the future updates!"
             />
             <FaqItem 
                question="Does it work on Mobile?" 
                answer="Yes! We have built a dedicated mobile experience so you can edit and download your resume directly from your smartphone."
             />
         </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-700 rounded-[3rem] p-10 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-300 group">
               {/* Circles */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

               <div className="relative z-10 space-y-8">
                   <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to get hired?</h2>
                   <p className="text-indigo-100 text-xl max-w-2xl mx-auto font-medium">
                       Join thousands of professionals who have advanced their careers with our free tools.
                   </p>
                   <button 
                      onClick={onGetStarted}
                      className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all"
                   >
                       Create My Resume Now
                   </button>
               </div>
          </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
             <div className="space-y-4">
                 <div className="flex items-center gap-2 text-slate-800">
                     <div className="bg-indigo-600 p-2 rounded-lg text-white">
                        <LayoutTemplate size={20} />
                     </div>
                     <span className="font-bold text-xl">NW || resume</span>
                 </div>
                 <p className="text-slate-500 max-w-xs">
                     Building the future of career tools. Open source, free, and privacy-focused.
                 </p>
             </div>
             
             <div className="grid grid-cols-2 gap-12 text-sm">
                 <div className="space-y-4">
                     <h4 className="font-bold text-slate-900">Product</h4>
                     <ul className="space-y-2 text-slate-500">
                         <li><a href="#" className="hover:text-indigo-600">Templates</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Examples</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                     </ul>
                 </div>
                 <div className="space-y-4">
                     <h4 className="font-bold text-slate-900">Legal</h4>
                     <ul className="space-y-2 text-slate-500">
                         <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
                     </ul>
                 </div>
             </div>
         </div>
         
         <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-sm">
             <div>© {new Date().getFullYear()} NW || resume. All rights reserved.</div>
             <div className="flex gap-6">
                 <a href="#" className="hover:text-indigo-600 transition-colors"><Twitter size={20}/></a>
                 <a href="#" className="hover:text-indigo-600 transition-colors"><Linkedin size={20}/></a>
                 <a href="#" className="hover:text-indigo-600 transition-colors"><Github size={20}/></a>
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
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all duration-300"
        >
            <div className="p-6 flex items-center justify-between">
                <h3 className={`font-bold text-lg transition-colors ${isOpen ? 'text-indigo-600' : 'text-slate-800'}`}>{question}</h3>
                <div className={`transition-transform duration-300 p-1 rounded-full ${isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                    <ChevronDown size={20} />
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-6 pb-6 text-slate-600 leading-relaxed font-medium">
                    {answer}
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
