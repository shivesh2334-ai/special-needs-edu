"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, User, BookOpen, Heart, CheckCircle } from "lucide-react";
import { CLASSES, SUBJECTS_BY_CLASS, MEDIUMS, CONDITIONS, IQ_RANGES } from "../../lib/resources";

const STEPS = [
  { id: 1, label: "Basic Info", icon: <User className="w-4 h-4" /> },
  { id: 2, label: "Academics", icon: <BookOpen className="w-4 h-4" /> },
  { id: 3, label: "Learning Needs", icon: <Heart className="w-4 h-4" /> },
];

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    childName: "",
    age: "",
    selectedClass: "",
    medium: "English",
    subjects: [],
    conditions: [],
    iqRange: "unknown",
    additionalNotes: "",
  });

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const toggleSubject = (s) => {
    set("subjects", form.subjects.includes(s)
      ? form.subjects.filter((x) => x !== s)
      : [...form.subjects, s]);
  };
  const toggleCondition = (c) => {
    set("conditions", form.conditions.includes(c)
      ? form.conditions.filter((x) => x !== c)
      : [...form.conditions, c]);
  };

  const availableSubjects = form.selectedClass
    ? SUBJECTS_BY_CLASS[form.selectedClass] || []
    : [];

  const canNext = () => {
    if (step === 1) return form.childName.trim() && form.age;
    if (step === 2) return form.selectedClass && form.subjects.length > 0;
    if (step === 3) return form.conditions.length > 0;
    return true;
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      profile: btoa(JSON.stringify(form)),
    });
    router.push(`/suggestions?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-teal-900 mb-2">
            Tell us about your child
          </h1>
          <p className="text-warm-gray">
            We'll personalise resource suggestions based on their needs
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  step === s.id
                    ? "bg-teal-500 text-white shadow-warm"
                    : step > s.id
                    ? "bg-teal-100 text-teal-600"
                    : "bg-white text-warm-gray border border-teal-100"
                }`}
              >
                {step > s.id ? <CheckCircle className="w-4 h-4" /> : s.icon}
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.id}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 ${step > s.id ? "bg-teal-400" : "bg-teal-100"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-4xl shadow-card p-8 md:p-10">

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-display text-xl font-bold text-teal-800 mb-6">Basic Information</h2>
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Child's Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Aryan"
                  value={form.childName}
                  onChange={(e) => set("childName", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Age</label>
                <input
                  type="number"
                  min="4"
                  max="20"
                  className="form-input"
                  placeholder="e.g. 10"
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Academics */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-display text-xl font-bold text-teal-800 mb-6">Academic Details</h2>

              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Class / Grade</label>
                <select
                  className="form-input"
                  value={form.selectedClass}
                  onChange={(e) => {
                    set("selectedClass", e.target.value);
                    set("subjects", []);
                  }}
                >
                  <option value="">Select class...</option>
                  {CLASSES.map((c) => (
                    <option key={c} value={c}>Class {c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">Medium of Instruction</label>
                <div className="flex gap-3">
                  {MEDIUMS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => set("medium", m)}
                      className={`px-5 py-2.5 rounded-2xl border-2 font-semibold text-sm transition-all ${
                        form.medium === m
                          ? "bg-teal-500 border-teal-500 text-white shadow-warm"
                          : "border-teal-200 text-teal-700 hover:bg-teal-50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {form.selectedClass && (
                <div>
                  <label className="block text-sm font-semibold text-teal-800 mb-3">
                    Subjects <span className="text-warm-gray font-normal">(select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableSubjects.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSubject(s)}
                        className={`condition-chip ${form.subjects.includes(s) ? "selected" : ""}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Learning Needs */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-up">
              <h2 className="font-display text-xl font-bold text-teal-800 mb-6">Special Learning Needs</h2>

              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-3">
                  Diagnosed / Suspected Condition(s) <span className="text-warm-gray font-normal">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CONDITIONS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCondition(c.id)}
                      className={`text-left px-4 py-3 rounded-2xl border-2 transition-all ${
                        form.conditions.includes(c.id)
                          ? "border-teal-500 bg-teal-50"
                          : "border-teal-100 bg-white hover:border-teal-300"
                      }`}
                    >
                      <div className="font-semibold text-sm text-teal-900 flex items-center gap-2">
                        {form.conditions.includes(c.id) && <CheckCircle className="w-4 h-4 text-teal-500" />}
                        {c.label}
                      </div>
                      <div className="text-xs text-warm-gray mt-0.5">{c.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">IQ Level / Assessment</label>
                <select
                  className="form-input"
                  value={form.iqRange}
                  onChange={(e) => set("iqRange", e.target.value)}
                >
                  {IQ_RANGES.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-teal-800 mb-2">
                  Additional Notes <span className="text-warm-gray font-normal">(optional)</span>
                </label>
                <textarea
                  className="form-input resize-none h-24"
                  placeholder="Any other details about your child's learning, strengths, challenges, or specific topics they struggle with..."
                  value={form.additionalNotes}
                  onChange={(e) => set("additionalNotes", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-teal-100">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl border-2 border-teal-200 text-teal-700 font-semibold text-sm hover:bg-teal-50 transition-all ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-warm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-lg"
              >
                Get Suggestions ✨
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
