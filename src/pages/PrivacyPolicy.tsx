import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Shield, Lock, Database, Eye, Sparkles, Mail, User, 
  CheckCircle2, FileText, Server, Clock, Fingerprint, Globe, Settings, HelpCircle, Key
} from 'lucide-react';

export function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');

  // Simple scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 200; // Offset

      sections.forEach(section => {
        const top = (section as HTMLElement).offsetTop;
        const height = (section as HTMLElement).offsetHeight;
        const id = section.getAttribute('id') || '';

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tocItems = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'information-we-collect', label: 'Information We Collect' },
    { id: 'how-we-use', label: 'How We Use Information' },
    { id: 'ai-processing', label: 'AI & Third-Party Processing' },
    { id: 'public-links', label: 'Public Resume Links' },
    { id: 'security', label: 'Data Storage & Security' },
    { id: 'cookies', label: 'Cookies & Analytics' },
    { id: 'user-rights', label: 'User Rights & Controls' },
    { id: 'retention', label: 'Data Retention' },
    { id: 'children', label: 'Children\'s Privacy' },
    { id: 'third-party', label: 'Third-Party Services' },
    { id: 'changes', label: 'Changes To Policy' },
    { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 z-50 flex items-center px-4 sm:px-6 lg:px-8 transition-all">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors py-1.5 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2.5 text-zinc-900 font-extrabold text-lg tracking-tight">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            Resumora
          </div>
        </div>
      </div>

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <div className="px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto pt-16 pb-20 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6">
                <Lock className="w-4 h-4" />
                Enterprise-Grade Privacy
              </div>
              <h1 className="text-5xl sm:text-7xl font-extrabold text-zinc-900 tracking-tighter mb-6">
                Privacy <span className="text-zinc-400 font-normal">Policy</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10 font-medium">
                We believe in absolute transparency. Discover how we protect your data, secure your professional identity, and ensure you remain in complete control.
              </p>
              
              <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-zinc-500">
                <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-zinc-200/60">
                  <Clock className="w-4 h-4 text-blue-500" />
                  Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-zinc-200/60">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  GDPR Ready
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            
            {/* Left Sidebar Table of Contents */}
            <div className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-32 space-y-1">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 px-3">Contents</h3>
                {tocItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'bg-blue-50 text-blue-700 font-semibold' 
                        : 'text-zinc-500 font-medium hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Privacy Summary Box */}
                <div className="mt-12 bg-white rounded-2xl p-5 border border-zinc-200/60 shadow-sm">
                  <h4 className="flex items-center gap-2 font-bold text-zinc-900 mb-3 text-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Policy Summary
                  </h4>
                  <ul className="space-y-3 text-sm text-zinc-600 font-medium leading-relaxed">
                    <li className="flex items-start gap-2">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                       We do not sell your personal data.
                    </li>
                    <li className="flex items-start gap-2">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                       Your resumes are not used to train global AI models.
                    </li>
                    <li className="flex items-start gap-2">
                       <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                       You retain full ownership and can delete data anytime.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Policy Content */}
            <div className="flex-1 max-w-3xl space-y-20 pb-20">
              
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                className="prose prose-zinc max-w-none"
              >
                {/* 1. Introduction */}
                <section id="introduction" className="scroll-mt-32">
                  <SectionHeader icon={<Globe />} title="Introduction" color="blue" />
                  <p className="text-zinc-600 text-lg leading-relaxed mb-6 font-medium">
                    At Resumora, we are committed to providing you with a modern, AI-powered platform to build out your professional identity, without compromising your privacy and security.
                  </p>
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    This Privacy Policy explains how we collect, use, and protect your information when you use our website, products, and AI generation services. Our approach is straightforward: <strong>we only collect what is necessary</strong> to give you a seamless resume-building experience, and you remain in complete control of your data.
                  </p>
                </section>

                <Divider />

                {/* 2. Information We Collect */}
                <section id="information-we-collect" className="scroll-mt-32">
                  <SectionHeader icon={<Database />} title="Information We Collect" color="indigo" />
                  <p className="text-zinc-600 leading-relaxed mb-6 font-medium">
                    To deliver our enterprise-grade resume building tools, we collect the following categories of information:
                  </p>
                  
                  <div className="grid gap-4">
                    <InfoCard 
                      title="Identity & Account Data"
                      description="When you register, we collect your name, email address, and authentication credentials through standard secure OAuth providers like Google."
                    />
                    <InfoCard 
                      title="Resume & Professional Data"
                      description="Information you actively input into our editor, including your work experience, education history, skills, contact details, and project portfolios."
                    />
                    <InfoCard 
                      title="Usage & Analytics Data"
                      description="Anonymous, aggregated data about how you interact with our platform (e.g., features used, session duration) to help us diagnose issues and improve UX."
                    />
                    <InfoCard 
                      title="Device & Browser Information"
                      description="Technical data such as your IP address, browser type, operating system, and geographic region (at a city/country level) for security and localized delivery."
                    />
                  </div>
                </section>

                <Divider />

                {/* 3. How We Use Information */}
                <section id="how-we-use" className="scroll-mt-32">
                  <SectionHeader icon={<Settings />} title="How We Use Information" color="emerald" />
                  <p className="text-zinc-600 leading-relaxed mb-6 font-medium">
                    Your data is solely used to provide, secure, and enhance your experience on Resumora.
                  </p>
                  <ul className="space-y-4">
                    <ListItem><strong>Service Provisioning:</strong> Generating, saving, and rendering your resumes in various formats (PDF, Web, TXT).</ListItem>
                    <ListItem><strong>AI Augmentation:</strong> Providing personalized AI suggestions, grammatical improvements, and intelligent content structuring based on the text you write.</ListItem>
                    <ListItem><strong>Platform Security:</strong> Detecting and preventing fraudulent activities, enforcing our terms of service, and ensuring account integrity.</ListItem>
                    <ListItem><strong>Customer Support:</strong> Assisting you with technical troubleshooting and responding to your inquiries efficiently.</ListItem>
                  </ul>
                </section>

                <Divider />

                {/* 4. AI & Third-Party Processing */}
                <section id="ai-processing" className="scroll-mt-32">
                  <SectionHeader icon={<Sparkles />} title="AI & Third-Party Processing" color="purple" />
                  
                  <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 mb-6">
                    <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-3">
                      <Shield className="w-5 h-5 text-purple-600" />
                      Our AI Core Principle
                    </h4>
                    <p className="text-purple-800/80 leading-relaxed font-medium">
                      We utilize advanced AI models like Google Gemini to power features such as the Resume Tailor and Content Improver. We strictly enforce a policy of <strong>data minimization</strong>. We only send the specific context necessary to generate your request, and your private resume data is <strong>never used to train public foundation models</strong>.
                    </p>
                  </div>
                  
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    When you request an AI enhancement, communication between Resumora and AI providers occurs over secure, encrypted channels. We do not store AI generations longer than necessary to serve them back to your editor session.
                  </p>
                </section>

                <Divider />

                {/* 5. Public Resume Links */}
                <section id="public-links" className="scroll-mt-32">
                  <SectionHeader icon={<Globe />} title="Public Resume Links" color="blue" />
                  <p className="text-zinc-600 leading-relaxed mb-4 font-medium">
                    Resumora offers an optional feature allowing you to publish your resume to a live URL (e.g., <code>resumora.com/p/your-name</code>). 
                  </p>
                  <ul className="space-y-4">
                    <ListItem><strong>Accessibility:</strong> By enabling this feature, your resume data becomes publicly accessible on the internet to anyone with the link.</ListItem>
                    <ListItem><strong>View Analytics:</strong> We may collect passive analytics (like view counts) on these public pages to show you engagement metrics on your dashboard.</ListItem>
                    <ListItem><strong>Revocation:</strong> You can disable public sharing at any time with a single click in your dashboard. Doing so instantly revokes access and renders the link inactive.</ListItem>
                  </ul>
                </section>

                <Divider />

                {/* 6. Data Storage & Security */}
                <section id="security" className="scroll-mt-32">
                  <SectionHeader icon={<Server />} title="Data Storage & Security" color="indigo" />
                  <p className="text-zinc-600 leading-relaxed mb-6 font-medium">
                    We architected Resumora with security at its foundation. We employ industry-standard security practices to guard against unauthorized access, alteration, or destruction of your data.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SecurityCard 
                      icon={<Lock />} title="Encryption in Transit & Rest" 
                      desc="All data transfers are secured via TLS/SSL, and databases are encrypted at rest." 
                    />
                    <SecurityCard 
                      icon={<Key />} title="Secure Authentication" 
                      desc="We leverage Google Identity Services for secure, password-less logins." 
                    />
                    <SecurityCard 
                      icon={<Database />} title="Google Cloud Hosted" 
                      desc="Our database runs on enterprise-grade infrastructure via Firebase/GCP." 
                    />
                    <SecurityCard 
                      icon={<Fingerprint />} title="Strict Access Control" 
                      desc="Database security rules ensure only you can read or write your specific data." 
                    />
                  </div>
                </section>

                <Divider />

                {/* 7. Cookies & Analytics */}
                <section id="cookies" className="scroll-mt-32">
                  <SectionHeader icon={<Eye />} title="Cookies & Analytics" color="orange" />
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    We use cookies and similar tracking technologies to track activity on our platform and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. We use these for functional purposes (like keeping you logged in) and analytical purposes (understanding feature usage to optimize the builder experience).
                  </p>
                </section>

                <Divider />

                {/* "Your Data Belongs to You" Banner */}
                <section className="my-16">
                  <div className="bg-zinc-900 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Shield className="w-48 h-48 text-white" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">Your Data Belongs to You.</h3>
                      <p className="text-zinc-400 text-lg max-w-xl mx-auto font-medium">
                        We don't hold your data hostage. You can export your resumes to standard formats (PDF, Docx, JSON) at any time.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 8. User Rights & Controls */}
                <section id="user-rights" className="scroll-mt-32">
                  <SectionHeader icon={<User />} title="User Rights & Controls" color="emerald" />
                  <p className="text-zinc-600 leading-relaxed mb-6 font-medium">
                    Depending on your location (such as under GDPR or CCPA), you possess critical rights regarding your personal information:
                  </p>
                  <ul className="space-y-4">
                    <ListItem><strong>Right to Access & Download:</strong> You can export your full resume structure in a standardized JSON format at any time via the editor.</ListItem>
                    <ListItem><strong>Right to Rectification:</strong> You maintain full ability to edit, update, or correct your resume data continually within the app.</ListItem>
                    <ListItem><strong>Right to Erasure (Delete Data):</strong> You can permanently delete any of your saved resumes from our servers instantly via the dashboard, or request full account deletion by contacting us.</ListItem>
                  </ul>
                </section>

                <Divider />

                {/* 9, 10, 11: Minor Sections */}
                <section id="retention" className="scroll-mt-32">
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-4">Data Retention</h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    We retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. When you delete a resume from your dashboard, the data is wiped from active databases immediately, and cascade-deleted from secure backups within 30 days.
                  </p>
                </section>

                <div className="my-10" />

                <section id="children" className="scroll-mt-32">
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-4">Children's Privacy</h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    Our platform is intended for professionals and students creating career materials. We do not knowingly collect personally identifiable information from anyone under the age of 13. If a parent or guardian becomes aware that a child has provided us with Personal Data, please contact us for immediate deletion.
                  </p>
                </section>

                <div className="my-10" />

                <section id="third-party" className="scroll-mt-32">
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-4">Third-Party Services</h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    We utilize trusted third-party sub-processors to run Resumora effectively, primarily Google Cloud (Firebase) for database hosting and authentication. These providers operate under rigorous security standards and strict data processing agreements.
                  </p>
                </section>

                <div className="my-10" />

                {/* 12. Changes */}
                <section id="changes" className="scroll-mt-32">
                  <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-4">Changes to This Policy</h3>
                  <p className="text-zinc-600 leading-relaxed font-medium">
                    We may update our Privacy Policy periodically to reflect platform updates or legal requirements. We will notify you of any material changes by posting the new policy on this page and updating the "Last Updated" date.
                  </p>
                </section>

                <Divider />

                {/* 13. Contact Segment */}
                <section id="contact" className="scroll-mt-32">
                  <div className="bg-blue-50/80 rounded-3xl p-8 sm:p-10 border border-blue-100 text-center">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-50">
                      <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 tracking-tight mb-3">Questions about privacy?</h3>
                    <p className="text-zinc-600 font-medium mb-8 max-w-lg mx-auto leading-relaxed">
                      Our privacy team is ready to assist you. Whether you need to exercise your data rights or just have a general question, we aim to respond within 48 hours.
                    </p>
                    <a 
                      href="mailto:prashantproject01@gmail.com" 
                      className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
                    >
                      Contact Privacy Team
                    </a>
                  </div>
                </section>

              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5 text-zinc-900 font-extrabold text-lg tracking-tight">
            <div className="bg-zinc-900 p-1.5 rounded-lg">
              <Shield className="w-4 h-4 text-white" />
            </div>
            Resumora Legal
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-500">
            <Link to="/" className="hover:text-zinc-900 transition-colors">Home</Link>
            <Link to="/privacy-policy" className="text-zinc-900 font-bold transition-colors">Privacy Policy</Link>
          </div>
          <div className="text-sm font-medium text-zinc-400">
            © {new Date().getFullYear()} Resumora. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ icon, title, color }: { icon: React.ReactNode, title: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    orange: "text-orange-600 bg-orange-50 border-orange-100",
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`p-3 rounded-2xl border ${colorMap[color]} shadow-sm [&>svg]:w-6 [&>svg]:h-6`}>
        {icon}
      </div>
      <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{title}</h2>
    </div>
  );
}

function Divider() {
  return <div className="w-full h-px bg-zinc-200/60 my-16" />;
}

function InfoCard({ title, description }: { title: string, description: string }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-sm hover:border-zinc-300 transition-colors">
      <h5 className="font-bold text-zinc-900 mb-2">{title}</h5>
      <p className="text-zinc-600 text-[15px] leading-relaxed font-medium">{description}</p>
    </div>
  );
}

function SecurityCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 p-5 rounded-2xl">
      <div className="text-zinc-800 mb-3 [&>svg]:w-5 [&>svg]:h-5">{icon}</div>
      <h5 className="font-bold text-zinc-900 mb-2">{title}</h5>
      <p className="text-zinc-600 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-sm shadow-blue-500/50" />
      <div className="text-zinc-600 leading-relaxed font-medium">
        {children}
      </div>
    </li>
  );
}


