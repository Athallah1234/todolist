"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  Zap, 
  ArrowRight, 
  Layout, 
  Smartphone,
  Star
} from "lucide-react";

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-outfit text-slate-900">Check-It</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 hover:text-indigo-600 transition">Features</a>
              <a href="#about" className="text-slate-600 hover:text-indigo-600 transition">About</a>
              <div className="flex items-center gap-4 border-l pl-8">
                <Link href="/auth/login" className="text-slate-600 hover:text-indigo-600 font-medium font-inter transition">
                  Sign In
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-full font-medium transition shadow-lg shadow-indigo-100"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32 lg:pt-32 lg:pb-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-1.5 mb-8">
                <Star className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">New: Version 2.0 is out</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold font-outfit text-slate-900 tracking-tight mb-6">
                Organize your life,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  one task at a time.
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 font-inter">
                Stay focused, organized, and calm. The minimalist workspace that helps you manage tasks, set deadlines, and achieve your goals with ease.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/auth/register" 
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 transition flex items-center justify-center gap-2"
                >
                  Start for Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  href="/auth/login" 
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-lg transition"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold font-outfit text-slate-900 mb-4">Everything you need to be productive</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Carefully crafted features designed to help you stay on track without the clutter of traditional task managers.
              </p>
            </div>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-amber-500" />}
                title="Super Fast"
                description="Built for speed with a modern tech stack. No lag, just productivity."
                variants={item}
              />
              <FeatureCard 
                icon={<Layout className="w-6 h-6 text-indigo-500" />}
                title="Clean UI"
                description="A minimalist interface that lets you focus on what really matters."
                variants={item}
              />
              <FeatureCard 
                icon={<Clock className="w-6 h-6 text-blue-500" />}
                title="Deadlines"
                description="Never miss a beat. Track deadlines and stay ahead of your schedule."
                variants={item}
              />
              <FeatureCard 
                icon={<Shield className="w-6 h-6 text-emerald-500" />}
                title="Secure"
                description="Your data is encrypted and stored securely in the cloud."
                variants={item}
              />
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-indigo-600 w-6 h-6" />
            <span className="text-xl font-bold font-outfit text-slate-900">Check-It</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 Check-It Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition">Twitter</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, variants }: any) {
  return (
    <motion.div 
      variants={variants}
      className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-white transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold font-outfit text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
