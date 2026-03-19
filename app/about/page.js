import { Heart, BookOpen, Brain, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-600 text-white py-16 px-4 text-center">
        <Heart className="w-10 h-10 text-amber-400 mx-auto mb-4" />
        <h1 className="font-display text-4xl font-bold mb-3">About IncluLearn</h1>
        <p className="text-teal-100 max-w-2xl mx-auto text-lg">
          We believe every child deserves access to resources that match how they learn — not just how they're expected to learn.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-12">

        <section>
          <h2 className="font-display text-2xl font-bold text-teal-900 mb-4">Our Mission</h2>
          <p className="text-warm-gray leading-relaxed">
            India has millions of children with special learning needs studying in mainstream CBSE schools. Yet most parents struggle to find appropriate, affordable resources that account for conditions like dyslexia, dyscalculia, ADHD, or autism. IncluLearn bridges that gap by curating and organising the best available resources — both free and paid — and using AI to match them to each child's unique profile.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-teal-900 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <BookOpen className="w-5 h-5" />, title: "Curated Repository", desc: "Resources organised by Class → Subject → Chapter → Medium" },
              { icon: <Brain className="w-5 h-5" />, title: "AI Suggestions", desc: "Personalised recommendations based on your child's specific profile" },
              { icon: <Users className="w-5 h-5" />, title: "Parent-Focused", desc: "Written for parents, not just educators — simple, actionable, clear" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-6 shadow-card text-center">
                <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white flex items-center justify-center mx-auto mb-3">
                  {item.icon}
                </div>
                <h3 className="font-bold text-teal-900 mb-2">{item.title}</h3>
                <p className="text-sm text-warm-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-teal-900 mb-4">Conditions We Cover</h2>
          <ul className="space-y-2 text-warm-gray">
            {["Dyslexia – reading and language processing difficulties","Dyscalculia – number sense and mathematical processing difficulties","ADHD – attention, focus, and impulse control","Autism Spectrum Disorder – social communication and sensory needs","Dysgraphia – fine motor and writing difficulties","Slow Learners / Borderline IQ – needing additional time and repetition","Gifted Learners – needing advanced challenge and enrichment"].map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span className="text-teal-500 mt-1">✓</span>
                <span className="text-sm">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center">
          <Link href="/profile" className="inline-flex items-center gap-2 px-8 py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl transition-all shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5">
            Get Started for Your Child →
          </Link>
        </div>
      </div>
    </div>
  );
}
