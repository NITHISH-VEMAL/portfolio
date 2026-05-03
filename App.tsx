import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Code2, 
  Mail, 
  Linkedin,
  Monitor,
  Layers,
  Globe,
  Award,
  ChevronDown,
  ExternalLink,
  User
} from 'lucide-react';

// --- Portfolio Data ---
const PORTFOLIO_DATA = {
  about: {
    title: "About Nithish Siddharthan V",
    role_split: "Senior Web Developer",
    content: "Experienced full-stack developer with over 5 years of expertise in architecting mission-critical endpoint security and high-stakes banking solutions. I am primarily a Frontend-focused Web Developer specializing in Ember.js and React.js. I thrive on translating complex customer feedback into high-performance web experiences, ensuring pixel-perfect delivery and optimized system efficiency across enterprise-scale platforms.",
    highlights: [
      "Focused Frontend Specialist",
      "User Experience Architect",
      "Agile Product Delivery",
      "High-Performance Web Systems"
    ]
  },
  experience: [
    {
      company: "Zoho Corporation",
      role: "Full Stack Developer",
      period: "October 2021 - Present",
      desc: "Architected and optimized mission-critical endpoint management solutions using Ember.js and React.js. I delivered 15+ customer-driven features and built interactive security dashboards that handle massive real-time data streams. By implementing advanced lazy loading and code flow optimizations, I reduced initial data load times by 30%. Additionally, I built a custom Python tool for automated document comparison, reducing manual effort by 70%."
    },
    {
      company: "Virtusa Corporation",
      role: "Software Engineer",
      period: "Feb 2021 - September 2021",
      desc: "Developed Spring Boot-based tools to streamline payment dispute resolution in high-stakes global banking environments. I focused on building intuitive frontend portals for transaction validation and created interactive dashboards using Python to visualize complex payment-related telemetry."
    },
    {
      company: "Zoho Corporation",
      role: "Project Trainee",
      period: "Jan 2020 - Feb 2020",
      desc: "Engineered a cross-platform system process monitor using C++ and Java. I utilized the Windows API and JNI to facilitate high-efficiency data transfer between the low-level system backend and the Java-based user interface, providing real-time hardware performance metrics."
    }
  ],
  skills: [
    { category: "Web Development", items: ["Ember.js", "JavaScript", "HTML", "CSS", "React.js"] },
    { category: "Back-End", items: ["Spring Boot", "WebServlets", "RESTful APIs"] },
    { category: "Databases", items: ["SQL"] },
    { category: "Software Development", items: ["GIT", "Automation Testing", "Debugging"] },
    { category: "Product Development & Management", items: ["Product Development", "Product Management", "Quality Assurance"] },
    { category: "Additional Skills", items: ["Data Visualization", "Research Analyst"] }
  ],
  certifications: [
    { name: "IBM Data Science Professional Certificate", issuer: "Coursera", details: "Deep dive into data analysis, machine learning, and data science methodologies." },
    { name: "Python and Django Web Development", issuer: "Udemy", details: "Practical skills in building and deploying robust web applications." },
    { name: "Business English Certificate (Vantage)", issuer: "Cambridge", details: "Advanced proficiency in global business English communication." },
    { name: "Introduction to C Programming", issuer: "NPTEL", details: "Elite-level certification in foundational systems programming." }
  ],
  projects: [
    { 
      name: "\"Join Hands\" - Connecting Professionals and Customers (Academic)", 
      desc: "Developed a web platform connecting customers with professional workers for task-based hiring, featuring user registration, profile management, and direct hiring functionalities.", 
      tech: "HTML, CSS, JSP, SQL, Spring Boot",
      highlights: "Published in the IJITEE Journal."
    },
    { 
      name: "Picto", 
      desc: "AI-developed Android app to display photos with ML Kit usage for real-time text detection and QR Scanner detection.", 
      tech: "Android, ML Kit, Kotlin",
      highlights: "Purely developed using AI."
    },
    { 
      name: "Ember Project Utility (VS Code Extension)", 
      desc: "AI-developed extension for Ember.js projects featuring onclick usage tracking and seamless multi-repo linkage provision.", 
      tech: "VS Code API, TypeScript",
      highlights: "Purely developed using AI."
    },
    { 
      name: "QA Capture & Logger (Browser Extension)", 
      desc: "AI-developed tool to capture UI screen recordings, logs, and network calls, packaging them as ZIPs for QA teams.", 
      tech: "JavaScript, WebExtensions API",
      highlights: "Purely developed using AI."
    }
  ],
  education: "Bachelor of Technology (B.Tech) in Information Technology - R.M.D Engineering College, Kavarapettai (June 2016 - May 2020)."
};

// --- Components ---

interface TokenProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}

const Token: React.FC<TokenProps> = ({ label, icon, onClick, active }) => (
  <motion.button 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
      active 
      ? 'bg-brand text-black border-brand' 
      : 'bg-[#2f2f2f] text-[#ececec] border-[#3e3e3e] hover:border-brand/40 shadow-sm'
    }`}
  >
    {icon}
    {label}
  </motion.button>
);

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => (
  <div className={`chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`}>
    <div className="flex-shrink-0">
      {role === 'user' ? (
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
          U
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-black">
          <Code2 size={16} />
        </div>
      )}
    </div>
    <div className="flex-1 space-y-3">
      <div className="text-[10px] font-bold text-[#676767] uppercase tracking-widest">
        {role === 'user' ? 'Human' : 'Portfolio AI Agent'}
      </div>
      <div className="text-[14px] leading-relaxed text-[#d1d1d1]">
        {content}
      </div>
    </div>
  </div>
);

export default function App() {
  const [messages, setMessages] = useState<Array<{ id: number, role: 'user' | 'assistant', content: React.ReactNode }>>([]);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const COMMANDS = [
    { id: 'biography', label: "About Nithish", icon: <User size={14} />, query: "Tell me about Nithish's background" },
    { id: 'experience', label: "Nithish's Experience", icon: <Briefcase size={14} />, query: "Show me work history and roles" },
    { id: 'stack', label: "Technical Toolbox", icon: <Layers size={14} />, query: "What are the core technical skills?" },
    { id: 'projects', label: "Featured Projects", icon: <Globe size={14} />, query: "Display major portfolio projects" },
    { id: 'certifications', label: "Professional Credentials", icon: <Award size={14} />, query: "Show certifications" },
    { id: 'contact', label: "Contact Information", icon: <Mail size={14} />, query: "How to hire or contact Nithish?" },
  ];

  const getWelcomeMessage = (id: number) => ({
    id: id,
    role: 'assistant' as const,
    content: (
      <div className="space-y-6">
        <div className="inline-block p-2 bg-brand/10 border border-brand/20 rounded-lg mb-4">
          <span className="text-[10px] font-bold text-brand uppercase tracking-widest">Active Portfolio Node</span>
        </div>
        <h1 className="text-2xl font-bold text-white leading-tight">Welcome to the Portfolio of <span className="text-brand">Nithish Siddharthan</span>.</h1>
        <p className="text-[#ececec] opacity-80 leading-relaxed text-[15px]">
          I am a **Senior Web Developer** with a major focus on crafting high-performance Frontend architectures. With over 5 years of experience in endpoint security and banking solutions, I specialize in building complex, user-centric interfaces.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
          {COMMANDS.map(cmd => (
            <button 
              key={cmd.id}
              onClick={() => handleSend(cmd.query)}
              className="flex items-center gap-3 p-4 bg-[#2f2f2f] border border-[#3e3e3e] rounded-2xl hover:border-brand/40 hover:bg-[#353535] transition-all text-left group"
            >
              <div className="p-2 bg-brand/10 rounded-lg text-brand group-hover:scale-110 transition-transform">{cmd.icon}</div>
              <span className="text-sm font-semibold text-[#ececec]">{cmd.label}</span>
            </button>
          ))}
        </div>
      </div>
    )
  });

  const initChat = () => {
    const welcome = getWelcomeMessage(Date.now());
    setMessages([welcome]);
  };

  useEffect(() => {
    initChat();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = (text: string) => {
    const userMsg = { id: Date.now(), role: 'user' as const, content: text };
    
    // Update messages for UI
    setMessages(prev => [...prev, userMsg]);
    
    setIsCommandMenuOpen(false);
    setIsThinking(true);

    setTimeout(() => {
      let responseContent: React.ReactNode;
      const t = text.toLowerCase().trim();

      if (t.includes('about') || t.includes('who') || t.includes('background') || t.includes('biography')) {
        responseContent = (
          <div className="space-y-6">
            <div className="p-4 bg-brand/5 border-l-4 border-brand rounded-r-2xl">
               <p className="text-brand font-bold text-sm mb-1">{PORTFOLIO_DATA.about.role_split}</p>
               <p className="text-sm text-[#ececec]">{PORTFOLIO_DATA.about.content}</p>
            </div>
          </div>
        );
      } else if (t.includes('experience') || t.includes('work') || t.includes('history')) {
        responseContent = (
          <div className="space-y-8">
            <p className="text-sm text-[#888]">Chronicle of professional engagements at Zoho and Virtusa:</p>
            {PORTFOLIO_DATA.experience.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l border-white/10 group">
                <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_rgba(45,212,191,0.5)] transition-transform group-hover:scale-125" />
                <div className="mb-1 flex flex-wrap justify-between items-center gap-2">
                  <h3 className="text-brand font-bold">{exp.role}</h3>
                  <span className="text-[10px] py-1 px-2 bg-white/5 rounded border border-white/10 text-white/40 uppercase tracking-widest">{exp.period}</span>
                </div>
                <p className="text-xs font-bold text-white mb-3">{exp.company}</p>
                <p className="text-sm text-[#888] leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        );
      } else if (t.includes('skill') || t.includes('stack') || t.includes('tech') || t.includes('tool')) {
        responseContent = (
          <div className="space-y-8">
            <p className="text-sm text-[#888]">Technical competence matrix categorized by layer:</p>
            {PORTFOLIO_DATA.skills.map((cat, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-[10px] font-bold text-white opacity-40 uppercase tracking-[0.2em]">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(item => (
                    <span key={item} className="px-4 py-2 bg-[#2f2f2f] border border-[#3e3e3e] rounded-xl text-xs text-[#ececec] hover:border-brand transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      } else if (t.includes('project') || t.includes('build')) {
        responseContent = (
          <div className="space-y-6">
             <p className="text-sm text-[#888]">Highlighting major full-stack and specialized systems:</p>
             <div className="grid gap-4">
               {PORTFOLIO_DATA.projects.map((p, i) => (
                 <div key={i} className="p-6 bg-[#2f2f2f] border border-[#3e3e3e] rounded-3xl hover:border-brand/40 transition-all">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-white text-lg">{p.name}</h4>
                     <ExternalLink size={16} className="text-[#676767]" />
                   </div>
                   <p className="text-sm text-[#888] mb-4 leading-relaxed">{p.desc}</p>
                   <div className="flex items-center justify-between">
                     <div className="px-3 py-1 bg-brand/10 text-brand rounded-full text-[10px] font-mono uppercase border border-brand/20">
                       {p.tech}
                     </div>
                     <span className="text-[10px] text-white/30 italic">{p.highlights}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        );
      } else if (t.includes('cert') || t.includes('credential') || t.includes('educat')) {
        responseContent = (
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-[#888]">Academic Background:</p>
              <div className="p-5 bg-brand/5 border border-brand/20 rounded-2xl">
                <h4 className="font-bold text-white text-sm">Bachelor of Technology (B.Tech)</h4>
                <p className="text-xs text-brand mb-1">Information Technology</p>
                <p className="text-xs text-[#888]">R.M.D Engineering College, Kavarapettai</p>
                <p className="text-[10px] text-[#555] uppercase mt-2">2016 — 2020</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-[#888]">Professional Credentials & Certifications:</p>
              <div className="grid gap-4">
                {PORTFOLIO_DATA.certifications.map((cert, i) => (
                  <div key={i} className="p-5 bg-[#2f2f2f] border border-[#3e3e3e] rounded-2xl border-l-4 border-l-brand">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white text-sm">{cert.name}</h4>
                      <span className="text-[10px] text-brand bg-brand/10 px-2 py-0.5 rounded border border-brand/20 uppercase">{cert.issuer}</span>
                    </div>
                    <p className="text-xs text-[#888] leading-relaxed">{cert.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (t.includes('contact') || t.includes('hire') || t.includes('email')) {
        responseContent = (
          <div className="space-y-6">
            <p className="text-sm text-[#888]">Secure communication channels are open:</p>
            <div className="grid sm:grid-cols-2 gap-4">
               <a href="mailto:nithish.vemal@gmail.com" className="flex items-center gap-4 p-4 bg-[#2f2f2f] border border-[#3e3e3e] rounded-2xl hover:bg-[#353535] transition-all">
                  <div className="p-3 bg-brand/10 text-brand rounded-xl"><Mail size={20}/></div>
                  <div>
                    <p className="text-[10px] text-[#676767] uppercase">Email</p>
                    <p className="text-sm font-bold">nithish.vemal@gmail.com</p>
                  </div>
               </a>
               <a href="https://in.linkedin.com/in/nithishsiddharthanvemal" target="_blank" className="flex items-center gap-4 p-4 bg-[#2f2f2f] border border-[#3e3e3e] rounded-2xl hover:bg-[#353535] transition-all">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Linkedin size={20}/></div>
                  <div>
                    <p className="text-[10px] text-[#676767] uppercase">LinkedIn</p>
                    <p className="text-sm font-bold">Nithish Siddharthan</p>
                  </div>
               </a>
            </div>
          </div>
        );
      } else {
        responseContent = (
          <div className="space-y-4">
            <p>Scanning sectors... Input not recognized. Please utilize the standard portfolio navigation tokens:</p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Token label="Biography" onClick={() => handleSend('Tell me about your background')} />
              <Token label="Experience" onClick={() => handleSend('Show work history')} />
              <Token label="Projects" onClick={() => handleSend('View major projects')} />
            </div>
          </div>
        );
      }

      const assistantMsg = { id: Date.now() + 1, role: 'assistant' as const, content: responseContent };
      setMessages(prev => [...prev, assistantMsg]);
      setIsThinking(false);
    }, 1800);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#212121]">
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#212121] relative h-full">
        {/* Header - Top Bar */}
        <header className="h-14 flex items-center px-6 border-b border-white/5 bg-[#212121]/50 backdrop-blur-sm z-50">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#ececec]">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            Nithish Portfolio GPT v4.5
          </div>
        </header>

        <div className="flex-1 overflow-y-auto scrollbar-hide chat-scroll-area">
          <div className="max-w-3xl mx-auto w-full py-12 px-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
              ))}
              {isThinking && (
                <ChatMessage 
                  key="thinking" 
                  role="assistant" 
                  content={
                    <div className="flex items-center gap-2 text-[#676767] italic animate-pulse">
                      <Code2 size={14} className="animate-spin text-brand" />
                      Fetching portfolio data...
                    </div>
                  } 
                />
              )}
            </AnimatePresence>
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="w-full max-w-3xl mx-auto px-4 pb-10">
           <div className="relative">
              {/* Command Dropdown */}
              <AnimatePresence>
                {isCommandMenuOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsCommandMenuOpen(false)}
                      className="fixed inset-0 z-[60]"
                    />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-4 w-full bg-[#2f2f2f] border border-[#3e3e3e] rounded-3xl shadow-2xl z-[70] overflow-hidden"
                    >
                      <div className="p-2 border-b border-white/5 bg-[#252525]">
                        <p className="text-[10px] font-bold text-[#676767] px-3 py-1 uppercase tracking-widest">Available Commands</p>
                      </div>
                      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-1 bg-[#252525]">
                        {COMMANDS.map(cmd => (
                          <button 
                            key={cmd.id}
                            onClick={() => handleSend(cmd.query)}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-[#353535] transition-colors text-left group"
                          >
                            <div className="text-brand group-hover:scale-110 transition-transform">{cmd.icon}</div>
                            <span className="text-sm text-[#ececec] font-medium">{cmd.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Main Command Trigger */}
              <button 
                onClick={() => setIsCommandMenuOpen(!isCommandMenuOpen)}
                className="w-full h-14 bg-[#2f2f2f] border border-[#3e3e3e] rounded-3xl flex items-center justify-between px-6 hover:border-[#525252] transition-all shadow-xl group"
              >
                <div className="flex items-center gap-3 text-[#676767] group-hover:text-[#888] transition-colors">
                  <div className="p-1 bg-[#3e3e3e] rounded font-mono text-[10px] border border-white/5">/</div>
                  <span className="text-[15px]">Select a command to browse portfolio...</span>
                </div>
                <div className={`transition-transform duration-200 ${isCommandMenuOpen ? 'rotate-180' : ''}`}>
                  <ChevronDown size={20} className="text-[#676767]" />
                </div>
              </button>
           </div>
           
           <div className="flex justify-center gap-4 mt-4">
              <p className="text-[11px] text-[#676767]">Nithish Portfolio GPT v4.5</p>
              <span className="text-[#3e3e3e]">•</span>
              <p className="text-[11px] text-[#676767]">Command Driven Experience</p>
           </div>
        </div>
      </main>
    </div>
  );
}

