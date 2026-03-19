"use client";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, BookOpen } from "lucide-react";
import ResourceCard from "../../components/ResourceCard";
import { resources, CLASSES, SUBJECTS_BY_CLASS, MEDIUMS, CONDITIONS, RESOURCE_TYPES } from "../../lib/resources";

const ALL_SUBJECTS = Array.from(new Set(resources.map((r) => r.subject))).sort();

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [classF, setClassF] = useState("All");
  const [subjectF, setSubjectF] = useState("All");
  const [conditionF, setConditionF] = useState("All");
  const [mediumF, setMediumF] = useState("All");
  const [typeF, setTypeF] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (classF !== "All" && !r.classes.includes(classF)) return false;
      if (subjectF !== "All" && r.subject !== subjectF && r.subject !== "All Subjects") return false;
      if (conditionF !== "All" && !r.conditions.includes(conditionF)) return false;
      if (mediumF !== "All" && !r.medium.includes(mediumF)) return false;
      if (typeF !== "All" && r.type !== typeF) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!r.title.toLowerCase().includes(q) && !r.description.toLowerCase().includes(q) && !r.subject.toLowerCase().includes(q) && !r.source.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [classF, subjectF, conditionF, mediumF, typeF, search]);

  const resetFilters = () => {
    setClassF("All"); setSubjectF("All"); setConditionF("All");
    setMediumF("All"); setTypeF("All"); setSearch("");
  };

  const hasFilters = classF !== "All" || subjectF !== "All" || conditionF !== "All" || mediumF !== "All" || typeF !== "All" || search;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-600 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Resource Repository</h1>
          <p className="text-teal-100 max-w-xl mx-auto">
            Curated CBSE-aligned resources for special learning needs. Filter by class, subject, chapter, medium, and condition.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
          <input
            type="text"
            placeholder="Search resources by title, subject, or source…"
            className="form-input pl-12 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filter toggle */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl border-2 border-teal-200 text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters {showFilters ? "▲" : "▼"}
          </button>
          <div className="flex items-center gap-3">
            <span className="text-sm text-warm-gray font-semibold">{filtered.length} resources</span>
            {hasFilters && (
              <button onClick={resetFilters} className="text-xs text-teal-600 hover:underline font-semibold">
                Reset all
              </button>
            )}
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white rounded-3xl shadow-card p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-fade-up">
            <div>
              <label className="block text-xs font-bold text-teal-800 mb-1.5 uppercase tracking-wider">Class</label>
              <select className="form-input text-sm" value={classF} onChange={(e) => setClassF(e.target.value)}>
                <option value="All">All Classes</option>
                {CLASSES.map((c) => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-teal-800 mb-1.5 uppercase tracking-wider">Subject</label>
              <select className="form-input text-sm" value={subjectF} onChange={(e) => setSubjectF(e.target.value)}>
                <option value="All">All Subjects</option>
                {ALL_SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-teal-800 mb-1.5 uppercase tracking-wider">Condition</label>
              <select className="form-input text-sm" value={conditionF} onChange={(e) => setConditionF(e.target.value)}>
                <option value="All">All Conditions</option>
                {CONDITIONS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-teal-800 mb-1.5 uppercase tracking-wider">Medium</label>
              <select className="form-input text-sm" value={mediumF} onChange={(e) => setMediumF(e.target.value)}>
                <option value="All">All Mediums</option>
                {MEDIUMS.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-teal-800 mb-1.5 uppercase tracking-wider">Resource Type</label>
              <select className="form-input text-sm" value={typeF} onChange={(e) => setTypeF(e.target.value)}>
                <option value="All">All Types</option>
                {RESOURCE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex flex-wrap gap-2 mb-6">
            {classF !== "All" && <span className="tag-pill bg-teal-100 text-teal-700">Class {classF} ✕</span>}
            {subjectF !== "All" && <span className="tag-pill bg-teal-100 text-teal-700">{subjectF} ✕</span>}
            {conditionF !== "All" && <span className="tag-pill bg-teal-100 text-teal-700">{CONDITIONS.find((c) => c.id === conditionF)?.label} ✕</span>}
            {mediumF !== "All" && <span className="tag-pill bg-teal-100 text-teal-700">{mediumF} ✕</span>}
            {typeF !== "All" && <span className="tag-pill bg-teal-100 text-teal-700">{typeF} ✕</span>}
          </div>
        )}

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-teal-200 mx-auto mb-3" />
            <p className="font-display text-xl font-bold text-teal-800 mb-2">No resources found</p>
            <p className="text-warm-gray text-sm mb-4">Try adjusting your filters or search terms</p>
            <button onClick={resetFilters} className="px-5 py-2.5 bg-teal-500 text-white font-bold rounded-2xl text-sm">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
