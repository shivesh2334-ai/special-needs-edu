"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/browse", label: "Browse Resources" },
    { href: "/profile", label: "Get Suggestions" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-teal-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center shadow-warm">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-teal-700 group-hover:text-teal-500 transition-colors">
            Inclu<span className="text-amber-500">Learn</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-warm-gray hover:text-teal-600 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/profile"
            className="ml-2 px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-2xl transition-all shadow-warm hover:shadow-warm-lg hover:-translate-y-0.5"
          >
            Start Here →
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-xl text-teal-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-teal-100 px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-warm-gray hover:text-teal-600 py-2"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="mt-1 px-5 py-2.5 bg-teal-500 text-white text-sm font-bold rounded-2xl text-center"
          >
            Start Here →
          </Link>
        </div>
      )}
    </nav>
  );
}
