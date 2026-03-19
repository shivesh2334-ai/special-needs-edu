import Link from "next/link";
import { BookOpen, Brain, Search, Sparkles, ArrowRight, Star, Users, BookMarked } from "lucide-react";

const conditions = [
  { label: "Dyslexia", icon: "📖", color: "bg-purple-50 border-purple-200 text-purple-700" },
  { label: "Dyscalculia", icon: "🔢", color: "bg-blue-50 border-blue-200 text-blue-700" },
  { label: "ADHD", icon: "⚡", color: "bg-orange-50 border-orange-200 text-orange-700" },
  { label: "Autism Spectrum", icon: "🌈", color: "bg-rose-50 border-rose-200 text-rose-700" },
  { label: "Dysgraphia", icon: "✏️", color: "bg-yellow-50 border-yellow-200 text-yellow-700" },
  { label: "Slow Learner", icon: "🌱", color: "bg-teal-50 border-teal-200 text-teal-700" },
];

const steps = [
  {
    n: "01",
    title: "Enter Your Child's Profile",
    desc: "Fill in class, medium, subjects, and special learning needs. Takes just 2 minutes.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    n: "02",
    title: "Get AI Suggestions",
    desc: "Our AI analyses your child's profile and recommends curated resources tailored to their specific needs.",
    icon: <Brain className="w-6 h-6" />,
  },
  {
    n: "03",
    title: "Browse the Repository",
    desc: "Explore our full library of CBSE-aligned resources, filtered by class, subject, chapter, medium, and condition.",
    icon: <Search className="w-6 h-6" />,
  },
];

const stats = [
  { n: "30+", label: "Curated Resources" },
  { n: "12", label: "CBSE Classes Covered" },
  { n: "6+", label: "Special Conditions" },
  { n: "100%", label: "Free to Use" },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-teal-800 noise-bg">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal-500/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-teal-100 font-semibold animate-fade-up">
            <Sparkles className="w-4 h-4 text-amber-400" />
            CBSE Special Needs Education Support
          </div>

          <h1 className="animate-fade-up delay-100 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Every child learns{" "}
            <span className="text-amber-400">differently</span>.{" "}
            Find what works for yours.
          </h1>

          <p className="animate-fade-up delay-200 text-teal-100 text-lg max-w-2xl leading-relaxed">
            A curated resource repository for parents of children with dyslexia, dyscalculia, ADHD, autism, and other special learning needs — studying in mainstream CBSE schools.
          </p>

          <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-3 mt-2">
            <Link
              href="/profile"
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-teal-900 font-bold rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              Get Personalised Suggestions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/browse"
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all backdrop-blur-sm flex items-center gap-2"
            >
              <BookMarked className="w-4 h-4" /> Browse Resources
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.n} className="bg-white rounded-3xl shadow-card p-6 text-center">
              <p className="font-display text-3xl font-bold text-teal-600">{s.n}</p>
              <p className="text-sm text-warm-gray font-semibold mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conditions covered ───────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-bold text-sm uppercase tracking-widest mb-2">We Support</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900">
            All Special Learning Needs
          </h2>
          <p className="mt-3 text-warm-gray max-w-xl mx-auto">
            Resources specifically curated and tagged for each condition, so you always find what's right for your child.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {conditions.map((c) => (
            <div
              key={c.label}
              className={`border-2 rounded-3xl p-5 flex items-center gap-3 ${c.color} resource-card`}
            >
              <span className="text-2xl">{c.icon}</span>
              <span className="font-bold text-sm">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <section className="bg-teal-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-bold text-sm uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900">
              How IncluLearn Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="bg-white rounded-3xl p-8 shadow-card relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 font-display text-5xl font-bold text-teal-50">
                  {s.n}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white mb-4">
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-teal-900 mb-2">{s.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-4xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-300/40 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-amber-300/40 blur-2xl" />
          <div className="relative z-10">
            <BookOpen className="w-10 h-10 text-teal-800 mx-auto mb-4" style={{ animation: "float 3s ease-in-out infinite" }} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mb-3">
              Ready to find the right resources?
            </h2>
            <p className="text-teal-800 mb-6 max-w-lg mx-auto">
              Fill in your child's profile and get personalised resource recommendations powered by AI — in seconds.
            </p>
            <Link
              href="/profile"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-2xl transition-all shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5"
            >
              Start for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
