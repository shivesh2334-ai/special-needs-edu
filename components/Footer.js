import Link from "next/link";
import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-teal-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-display font-bold text-white">
                Inclu<span className="text-amber-400">Learn</span>
              </span>
            </div>
            <p className="text-sm text-teal-200 leading-relaxed">
              Empowering every child to learn in the way that works best for them. Resources for CBSE students with special learning needs.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/browse", label: "Resource Repository" },
                { href: "/profile", label: "Get AI Suggestions" },
                { href: "/about", label: "About IncluLearn" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-teal-200 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Conditions Covered</h4>
            <ul className="space-y-1 text-sm text-teal-200">
              <li>Dyslexia</li>
              <li>Dyscalculia</li>
              <li>ADHD</li>
              <li>Autism Spectrum</li>
              <li>Slow Learners / Borderline IQ</li>
              <li>Dysgraphia</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-teal-300">
          <p>© {new Date().getFullYear()} IncluLearn. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-amber-400 inline" /> for every child's learning journey
          </p>
        </div>
      </div>
    </footer>
  );
}
