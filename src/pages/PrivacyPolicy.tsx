import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Database, Eye, Sparkles, Mail, User } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-50/50 selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-zinc-200 z-50 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 text-zinc-900 font-bold text-lg tracking-tight">
            <Shield className="w-5 h-5 text-indigo-600" />
            Resumora
          </div>
        </div>
      </div>

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
        
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-zinc-200 mb-6">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">
              Privacy <span className="text-zinc-400 font-light">Policy</span>
            </h1>
            <p className="text-lg text-zinc-600 max-w-xl mx-auto leading-relaxed">
              We believe in transparency. Here's a clear explanation of how we collect, use, and protect your personal information.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50/80 rounded-full px-4 py-2 border border-indigo-100">
              <Lock className="w-4 h-4" />
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-[2rem] shadow-sm border border-zinc-200 p-6 sm:p-12 space-y-12"
          >
            <PolicySection 
              icon={<User className="w-6 h-6 text-blue-500" />}
              title="Information We Collect"
              bgClass="bg-blue-50 border-blue-100"
            >
              <p className="text-zinc-600 leading-relaxed mb-4">
                We collect information to provide better services to our users. The types of personal data we collect include:
              </p>
              <ul className="space-y-3">
                <ListItem title="Identity Data">Name, email address, and authentication credentials.</ListItem>
                <ListItem title="Resume Data">Work history, education, skills, and any other professional details you input.</ListItem>
                <ListItem title="Usage Data">Anonymous metrics on how you interact with our application to help us improve the experience.</ListItem>
              </ul>
            </PolicySection>

            <div className="w-full h-px bg-zinc-100" />

            <PolicySection 
              icon={<Sparkles className="w-6 h-6 text-purple-500" />}
              title="AI & Third-Party Processing"
              bgClass="bg-purple-50 border-purple-100"
            >
              <p className="text-zinc-600 leading-relaxed mb-4">
                To power our intelligent features, we use AI services such as Google's Gemini API for summarization, grammar checking, and content suggestions.
              </p>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-sm text-zinc-600 leading-relaxed">
                <span className="font-semibold text-zinc-900">Important Note:</span> We only send the specific text you wish to analyze or improve to our AI providers. We do not use your personal resume data to train our own models.
              </div>
            </PolicySection>

            <div className="w-full h-px bg-zinc-100" />

            <PolicySection 
              icon={<Database className="w-6 h-6 text-emerald-500" />}
              title="Data Storage & Security"
              bgClass="bg-emerald-50 border-emerald-100"
            >
              <p className="text-zinc-600 leading-relaxed mb-4">
                Your data security is our priority. We employ industry-standard practices to keep your information safe.
              </p>
              <ul className="space-y-3">
                <ListItem title="Secure Infrastructure">Data is stored securely using Google Cloud Infrastructure (Firebase).</ListItem>
                <ListItem title="Encryption">All data is encrypted in transit using TLS/SSL and encrypted at rest.</ListItem>
                <ListItem title="Your Control">You can delete your account and all associated resumes permanently at any time.</ListItem>
              </ul>
            </PolicySection>

            <div className="w-full h-px bg-zinc-100" />

            <PolicySection 
              icon={<Eye className="w-6 h-6 text-orange-500" />}
              title="Public Links & Analytics"
              bgClass="bg-orange-50 border-orange-100"
            >
              <p className="text-zinc-600 leading-relaxed">
                If you choose to generate a "Public Link" for your resume, that specific document becomes accessible to anyone on the internet who has the link. 
                We collect anonymous view metrics on public resumes to provide you with insights on how often your resume is seen. If you un-publish your resume, it will be immediately taken offline.
              </p>
            </PolicySection>

            <div className="w-full h-px bg-zinc-100" />

            <PolicySection 
              icon={<Mail className="w-6 h-6 text-pink-500" />}
              title="Contact Us"
              bgClass="bg-pink-50 border-pink-100"
            >
              <p className="text-zinc-600 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding your privacy and data, please reach out to us.
              </p>
              <a href="mailto:prashantproject01@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 transition-colors px-4 py-2.5 rounded-xl">
                <Mail className="w-4 h-4" />
                Contact Privacy Team
              </a>
            </PolicySection>

          </motion.div>
        </div>
      </main>
    </div>
  );
}

function PolicySection({ icon, title, children, bgClass }: { icon: React.ReactNode, title: string, children: React.ReactNode, bgClass: string }) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <div className={`p-3 rounded-xl border ${bgClass}`}>
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h2>
      </div>
      <div className="pl-0 sm:pl-[4.5rem]">
        {children}
      </div>
    </section>
  );
}

function ListItem({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-zinc-300 shrink-0" />
      <div>
        <span className="font-semibold text-zinc-900 mr-2">{title}:</span>
        <span className="text-zinc-600 leading-relaxed">{children}</span>
      </div>
    </li>
  );
}

