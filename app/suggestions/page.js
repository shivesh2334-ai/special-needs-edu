"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Brain, ArrowLeft, ExternalLink, Lightbulb, BookOpen, Sparkles, RefreshCw } from "lucide-react";
import ResourceCard from "../../components/ResourceCard";

function SuggestionsContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const encoded = searchParams.get("profile");
      if (!encoded) throw new Error("No profile data found.");
      const profile = JSON.parse(atob(encoded));

      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to get suggestions.");
      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-teal-50 to-cream px-4">
        <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center animate-pulse shadow-warm-lg">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-teal-900 mb-2">Analysing your child's profile…</h2>
          <p className="text-warm-gray">Finding the best resources and strategies for their unique needs</p>
        </div>
        <div className="flex gap-2">
          {[0,1,2].map((i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-red-500 font-semibold">{error}</p>
        <Link href="/profile" className="px-6 py-2.5 bg-teal-500 text-white font-bold rounded-2xl">
          Go Back
        </Link>
      </div>
    );
  }

  const { profile, recommendedResources, reasons, strategies, additionalResources, summary } = result;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cream pb-20">
      {/* Hero bar */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/profile" className="inline-flex items-center gap-1.5 text-teal-200 hover:text-white text-sm font-semibold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Edit Profile
          </Link>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-teal-900" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-1">
                Personalised Suggestions for {profile.childName || "Your Child"}
              </h1>
              <p className="text-teal-200 text-sm">
                Class {profile.selectedClass} · {profile.medium} Medium · {(profile.conditions || []).length} condition(s) identified
              </p>
            </div>
          </div>
          {summary && (
            <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-teal-100 text-sm leading-relaxed">
              {summary}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-10 space-y-12">

        {/* Recommended Resources */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h2 className="font-display text-xl font-bold text-teal-900">
              Recommended Resources ({recommendedResources.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedResources.map((r) => (
              <ResourceCard key={r.id} resource={r} reason={reasons[r.id]} />
            ))}
          </div>
        </section>

        {/* Strategies */}
        {strategies.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h2 className="font-display text-xl font-bold text-teal-900">
                School Strategies & Accommodations
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strategies.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-card border border-amber-100 flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-xs font-bold text-teal-900 shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm text-warm-gray leading-relaxed">{s}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Resources */}
        {additionalResources.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <ExternalLink className="w-5 h-5 text-teal-600" />
              <h2 className="font-display text-xl font-bold text-teal-900">
                Additional Online Resources
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {additionalResources.map((r, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-card border border-teal-50">
                  <h3 className="font-bold text-teal-800 mb-1">{r.title}</h3>
                  <p className="text-xs text-warm-gray mb-2">{r.description}</p>
                  <div className="bg-teal-50 rounded-xl p-3 mb-3">
                    <p className="text-xs font-semibold text-teal-700 mb-0.5">Why for your child:</p>
                    <p className="text-xs text-teal-900">{r.why}</p>
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors"
                  >
                    Visit Resource <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/browse"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl transition-all shadow-warm"
          >
            <BookOpen className="w-4 h-4" /> Browse Full Repository
          </Link>
          <Link
            href="/profile"
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-teal-200 text-teal-700 font-bold rounded-2xl hover:bg-teal-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuggestionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-warm-gray">Loading...</p></div>}>
      <SuggestionsContent />
    </Suspense>
  );
}
