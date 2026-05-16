import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-zinc-100">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Privacy Policy</h1>
                <p className="text-zinc-500 mt-1">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              </div>
            </div>

            <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-zinc-900">1. Introduction</h2>
                <p>
                  Welcome to our Resume Builder. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our website 
                  and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900">2. Data We Collect</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                  <li><strong>Identity Data</strong> includes name, username or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes email address.</li>
                  <li><strong>Resume Data</strong> includes work experience, education, skills, and any other information you choose to include in your resumes.</li>
                  <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900">3. Use of AI and Third-Party Services</h2>
                <p>
                  Our application uses Artificial Intelligence (AI), specifically Google's Gemini API, to provide features such as resume summarization, 
                  experience enhancement, skill suggestion, and grammar correction. 
                </p>
                <p className="mt-2">
                  When you use these AI-powered features, the specific text you input is sent to the Gemini API for processing. 
                  We do not use your personal data to train our own models, and we adhere to the data privacy and security terms provided by our AI service providers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900">4. Data Storage and Security</h2>
                <p>
                  If you choose to create an account and sync your data, your resumes and account information are securely stored in our cloud database (Firebase). 
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                </p>
                <p className="mt-2">
                  You can request deletion of your account and all associated data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900">5. Public Links and Analytics</h2>
                <p>
                  If you choose to publish a resume and share its public link, that specific resume becomes accessible to anyone with the link. 
                  We track anonymous analytics (such as view counts) on public resumes to provide you with insights on your resume's performance.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-zinc-900">6. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
