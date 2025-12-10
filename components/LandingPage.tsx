
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, LayoutTemplate, CheckCircle2, Linkedin, Twitter, Github, 
  Zap, Shield, Smartphone, FileText, ChevronDown, Wand2, Star, Sparkles,
  Download
} from './ui/Icons';

interface Props {
  onGetStarted: () => void;
}

const LandingPage: React.FC<Props> = ({ onGetStarted }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotateX(5deg) rotateY(-5deg); }
          50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient-x {
           0% { background-position: 0% 50%; }
           50% { background-position: 100% 50%; }
           100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
           background-size: 200% 200%;
           animation: gradient-x 15s ease infinite;
        }
        .perspective-container {
            perspective: 2000px;
        }
        .resume-card {
            transform-style: preserve-3d;
            transform: rotateX(10deg) rotateY(-15deg) rotateZ(2deg);
            transition: transform 0.5s ease-out;
            box-shadow: 25px 35px 60px -15px rgba(0,0,0,0.3);
        }
        .resume-card:hover {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.02);
            box-shadow: 0px 20px 40px -10px rgba(0,0,0,0.2);
        }
        /* Ensure badges pop out */
        .floating-badge {
            transform: translateZ(50px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.2);
            z-index: 50;
        }
        .electric-wire {
            position: absolute;
            top: -100px; /* Start way above */
            left: 50%;
            width: 4px;
            height: 120px;
            background: linear-gradient(180deg, rgba(79, 70, 229, 0) 0%, rgba(79, 70, 229, 0.5) 40%, #ffffff 100%);
            transform: translateX(-50%);
            z-index: 15;
        }
        .wire-connector {
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 24px;
            height: 12px;
            background: #cbd5e1;
            border-radius: 4px;
            z-index: 21;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        }
      `}</style>
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-slate-950 text-white overflow-hidden pb-32">
         {/* Background Decoration */}
         <div className="absolute inset-0 z-0">
             <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[128px] animate-blob mix-blend-screen"></div>
             <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-screen"></div>
             <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[128px] animate-blob animation-delay-4000 mix-blend-screen"></div>
         </div>

         {/* Nav */}
         <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                    <LayoutTemplate size={24} className="text-indigo-300" />
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">NW || resume</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="#features" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">Features</a>
                <a href="#how-it-works" className="hidden md:block text-sm font-medium text-slate-300 hover:text-white transition-colors">How it Works</a>
                <button onClick={onGetStarted} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95">
                    Launch App
                </button>
            </div>
        </nav>

        <main className="relative z-10 max-w-7xl mx-auto px-6 mt-16 md:mt-24 flex flex-col md:flex-row items-center gap-16 lg:gap-24">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left space-y-8 animate-fadeIn relative z-20">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 shadow-lg backdrop-blur-md">
                    <Sparkles size={14} className="text-indigo-400" /> AI-Powered Resume Builder
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
                    Build a Resume That <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                        Gets You Hired
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mx-auto md:mx-0 font-medium">
                    Create professional, ATS-optimized resumes in minutes. Clean code, real-time preview, and instant export.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                    <button 
                        onClick={onGetStarted}
                        className="group flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-indigo-50 transition-all transform hover:-translate-y-1"
                    >
                        Create My Resume <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                    <button 
                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth'})}
                        className="flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all"
                    >
                        Learn More
                    </button>
                </div>

                <div className="pt-8 flex items-center justify-center md:justify-start gap-8 text-sm font-semibold text-slate-400 border-t border-white/5 mt-8">
                     <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> Free Forever</div>
                     <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> No Sign-Up</div>
                     <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> ATS Friendly</div>
                </div>
            </div>

            {/* Visual Decoration */}
            <div className="w-full md:flex-1 relative flex justify-center perspective-container py-12 z-10 pt-24">
                 {/* Decorative elements behind */}
                 <div className="absolute top-10 -right-4 w-64 h-64 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-[80px] opacity-40 z-0 animate-pulse"></div>
                 <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-500 rounded-full blur-[80px] opacity-30 z-0 animate-pulse animation-delay-2000"></div>
                 
                 {/* Electric Wire */}
                 <svg className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-12 h-32 z-10 overflow-visible" viewBox="0 0 48 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* The Cable */}
                    <path d="M24 0V20C24 40 24 60 24 90" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                    {/* The Plug/Connector on top of card */}
                    <rect x="14" y="90" width="20" height="12" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
                    <path d="M18 102V110" stroke="#64748b" strokeWidth="2" />
                    <path d="M30 102V110" stroke="#64748b" strokeWidth="2" />
                 </svg>

                 {/* Floating Resume Card */}
                 <div className="resume-card relative w-[320px] md:w-[400px] aspect-[1/1.414] bg-white rounded-lg z-20 overflow-hidden border border-white/10 mt-6">
                    {/* Connector visual on the card itself */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-300 rounded-b-md z-30"></div>

                    {/* Header Mockup */}
                    <div className="h-28 bg-slate-900 p-5 flex items-center gap-4">
                         <div className="w-16 h-16 rounded-full bg-indigo-500 border-4 border-slate-700 shadow-lg shrink-0"></div>
                         <div className="space-y-2 w-full">
                             <div className="h-5 w-3/4 bg-slate-700 rounded-md animate-pulse"></div>
                             <div className="h-3 w-1/2 bg-slate-800 rounded-md animate-pulse"></div>
                         </div>
                    </div>
                    {/* Body Mockup */}
                    <div className="flex h-full bg-white">
                         <div className="w-[65%] p-5 space-y-5">
                             {/* Experience Section */}
                             <div className="space-y-3">
                                 <div className="h-3 w-1/3 bg-slate-200 rounded-md"></div>
                                 <div className="space-y-2">
                                     <div className="h-14 bg-slate-50 rounded-lg border border-slate-100 p-2">
                                          <div className="h-2 w-1/2 bg-slate-200 rounded mb-2"></div>
                                          <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                                     </div>
                                     <div className="h-14 bg-slate-50 rounded-lg border border-slate-100 p-2">
                                          <div className="h-2 w-1/2 bg-slate-200 rounded mb-2"></div>
                                          <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                                     </div>
                                 </div>
                             </div>
                             {/* Projects Section */}
                             <div className="space-y-3">
                                 <div className="h-3 w-1/3 bg-slate-200 rounded-md"></div>
                                 <div className="grid grid-cols-1 gap-2">
                                      <div className="h-10 bg-indigo-50 rounded-lg border-l-4 border-indigo-500"></div>
                                      <div className="h-10 bg-indigo-50 rounded-lg border-l-4 border-indigo-500"></div>
                                 </div>
                             </div>
                         </div>
                         <div className="w-[35%] bg-slate-50 border-l border-slate-100 p-5 space-y-6">
                             <div className="space-y-2">
                                  <div className="h-2 w-1/2 bg-slate-300 rounded"></div>
                                  <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                                  <div className="h-1.5 w-3/4 bg-slate-200 rounded"></div>
                             </div>
                             <div className="space-y-2">
                                  <div className="h-2 w-1/2 bg-slate-300 rounded"></div>
                                  <div className="flex flex-wrap gap-1.5">
                                      <div className="h-5 w-8 bg-slate-200 rounded"></div>
                                      <div className="h-5 w-10 bg-slate-200 rounded"></div>
                                      <div className="h-5 w-6 bg-slate-200 rounded"></div>
                                  </div>
                             </div>
                         </div>
                    </div>
                 </div>

                 {/* Floating Badges - Positioned with high Z-index relative to card container */}
                 <div className="floating-badge absolute top-[15%] -left-[5%] md:-left-[10%] bg-white/90 backdrop-blur-xl text-slate-900 px-4 py-3 rounded-2xl flex items-center gap-3 animate-float border border-white/50 shadow-2xl">
                     <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600"><CheckCircle2 size={24}/></div>
                     <div>
                         <div className="font-bold text-sm">ATS Optimized</div>
                         <div className="text-[11px] text-slate-500 font-medium">99% Pass Rate</div>
                     </div>
                 </div>

                 <div className="floating-badge absolute bottom-[25%] -right-[2%] md:-right-[8%] bg-white/90 backdrop-blur-xl text-slate-900 px-4 py-3 rounded-2xl flex items-center gap-3 animate-float animation-delay-2000 border border-white/50 shadow-2xl">
                     <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600"><Download size={24}/></div>
                     <div>
                         <div className="font-bold text-sm">Instant PDF</div>
                         <div className="text-[11px] text-slate-500 font-medium">Vector Quality</div>
                     </div>
                 </div>
            </div>
        </main>
      </div>

      {/* --- STATISTICS STRIP --- */}
      <div className="bg-white border-b border-slate-100 py-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-1">
                  <h3 className="text-3xl font-extrabold text-slate-900">Fast</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Generation</p>
              </div>
              <div className="space-y-1">
                  <h3 className="text-3xl font-extrabold text-slate-900">100%</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Free to Use</p>
              </div>
              <div className="space-y-1">
                  <h3 className="text-3xl font-extrabold text-slate-900">3</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Pro Templates</p>
              </div>
              <div className="space-y-1">
                  <h3 className="text-3xl font-extrabold text-slate-900">Secure</h3>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Local Data Only</p>
              </div>
          </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16 space-y-4">
             <span className="text-indigo-600 font-bold tracking-wider text-xs uppercase bg-indigo-50 px-3 py-1 rounded-full">Powerful Features</span>
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Everything you need to succeed</h2>
             <p className="text-slate-600 max-w-2xl mx-auto text-lg">Our builder handles the formatting, design, and ATS optimization so you can focus on landing the interview.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: Zap, color: "text-amber-500", bg: "bg-amber-50", title: "Instant Live Preview", desc: "See changes as you type. Our split-screen editor gives you immediate feedback on your resume's look." },
               { icon: Shield, color: "text-indigo-500", bg: "bg-indigo-50", title: "Privacy First", desc: "Your data is stored locally in your browser. We don't track you or sell your personal information." },
               { icon: Smartphone, color: "text-blue-500", bg: "bg-blue-50", title: "Mobile Optimized", desc: "Edit on the go. Our responsive interface works perfectly on smartphones and tablets." },
               { icon: Star, color: "text-purple-500", bg: "bg-purple-50", title: "ATS Friendly", desc: "Templates designed with clean code structure and standard fonts to pass Applicant Tracking Systems." },
               { icon: Wand2, color: "text-rose-500", bg: "bg-rose-50", title: "Smart Suggestions", desc: "Get auto-suggestions for degrees and skills to speed up your resume creation process." },
               { icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50", title: "PDF Export", desc: "Download high-quality, vector-based PDFs that look crisp on any device or printer." },
             ].map((feature, idx) => (
               <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 group">
                   <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                       <feature.icon size={28} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                   <p className="text-slate-500 leading-relaxed">
                       {feature.desc}
                   </p>
               </div>
             ))}
         </div>
      </section>

      {/* --- HOW IT WORKS (STEPS) --- */}
      <section id="how-it-works" className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900">How It Works</h2>
                  <p className="text-slate-500 mt-4 text-lg">Three simple steps to your new resume.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-12 relative">
                  {/* Connector Line (Desktop) */}
                  <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 z-0"></div>

                  {[
                    { icon: LayoutTemplate, title: "1. Choose Template", desc: "Select a professional design that fits your industry." },
                    { icon: FileText, title: "2. Add Content", desc: "Fill in your details. Use our tips to write compelling descriptions." },
                    { icon: Download, title: "3. Download PDF", desc: "Export your polished resume instantly and apply with confidence." }
                  ].map((step, idx) => (
                    <div key={idx} className="relative z-10 text-center group">
                        <div className="w-24 h-24 mx-auto bg-white rounded-full border-4 border-slate-100 flex items-center justify-center shadow-lg mb-6 group-hover:border-indigo-100 group-hover:scale-110 transition-all duration-300">
                             <step.icon size={32} className="text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                        <p className="text-slate-500 leading-relaxed px-4">{step.desc}</p>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-slate-900 text-white px-6">
         <div className="max-w-3xl mx-auto">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
             </div>
             
             <div className="space-y-4">
                 {[
                   { q: "Is this really free?", a: "Yes, 100% free. No credit card required, no hidden fees, no watermarks on your resume." },
                   { q: "How do I save my data?", a: "We save your progress automatically to your browser's local storage. You can close the tab and come back anytime." },
                   { q: "Can I use it on my phone?", a: "Absolutely. Our builder is fully responsive. You can create, edit, and download your resume directly from your smartphone." },
                   { q: "What formats can I download?", a: "We primarily support PDF export for the best compatibility. We also offer PNG/JPEG export for sharing on social media." }
                 ].map((faq, idx) => (
                   <div 
                      key={idx}
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
                   >
                       <div className="p-6 flex items-center justify-between">
                           <h3 className="font-bold text-lg">{faq.q}</h3>
                           <ChevronDown size={20} className={`transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                       </div>
                       <div className={`overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                           <p className="px-6 pb-6 text-slate-300 leading-relaxed">
                               {faq.a}
                           </p>
                       </div>
                   </div>
                 ))}
             </div>
         </div>
      </section>

      {/* --- CTA --- */}
      <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-indigo-300 group">
               {/* Circles */}
               <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

               <div className="relative z-10 space-y-8">
                   <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to get hired?</h2>
                   <p className="text-indigo-100 text-xl max-w-2xl mx-auto font-medium">
                       Join thousands of job seekers who have accelerated their careers with our tools.
                   </p>
                   <button 
                      onClick={onGetStarted}
                      className="bg-white text-indigo-600 px-12 py-5 rounded-full font-bold text-xl shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all"
                   >
                       Create My Resume Now
                   </button>
               </div>
          </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-slate-600">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
             <div className="space-y-4">
                 <div className="flex items-center gap-2 text-slate-900">
                     <div className="bg-indigo-600 p-2 rounded-lg text-white">
                        <LayoutTemplate size={20} />
                     </div>
                     <span className="font-bold text-xl">NW || resume</span>
                 </div>
                 <p className="text-slate-500 max-w-xs leading-relaxed">
                     Building the future of career tools. Open source, free, and privacy-focused.
                 </p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                 <div className="space-y-4">
                     <h4 className="font-bold text-slate-900">Product</h4>
                     <ul className="space-y-2">
                         <li><a href="#" className="hover:text-indigo-600">Templates</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Examples</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Pricing (Free)</a></li>
                     </ul>
                 </div>
                 <div className="space-y-4">
                     <h4 className="font-bold text-slate-900">Resources</h4>
                     <ul className="space-y-2">
                         <li><a href="#" className="hover:text-indigo-600">Resume Guide</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Career Blog</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Interview Prep</a></li>
                     </ul>
                 </div>
                 <div className="space-y-4">
                     <h4 className="font-bold text-slate-900">Legal</h4>
                     <ul className="space-y-2">
                         <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                         <li><a href="#" className="hover:text-indigo-600">Terms of Service</a></li>
                     </ul>
                 </div>
             </div>
         </div>
         
         <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
             <div>© {new Date().getFullYear()} NW || resume. All rights reserved.</div>
             <div className="flex gap-6">
                 <a href="#" className="hover:text-indigo-600 transition-colors bg-slate-100 p-2 rounded-full"><Twitter size={18}/></a>
                 <a href="#" className="hover:text-indigo-600 transition-colors bg-slate-100 p-2 rounded-full"><Linkedin size={18}/></a>
                 <a href="#" className="hover:text-indigo-600 transition-colors bg-slate-100 p-2 rounded-full"><Github size={18}/></a>
             </div>
         </div>
      </footer>
    </div>
  );
};

export default LandingPage;
