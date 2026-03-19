import { ExternalLink, Star, Tag } from "lucide-react";
import { CONDITIONS } from "../lib/resources";

const TYPE_COLORS = {
  Video: "bg-red-100 text-red-700",
  Article: "bg-blue-100 text-blue-700",
  Worksheet: "bg-yellow-100 text-yellow-700",
  Interactive: "bg-purple-100 text-purple-700",
  App: "bg-green-100 text-green-700",
  Audio: "bg-orange-100 text-orange-700",
  Book: "bg-teal-100 text-teal-700",
  Tool: "bg-gray-100 text-gray-700",
};

export default function ResourceCard({ resource, reason }) {
  const conditionLabels = (resource.conditions || [])
    .filter((c) => c !== "general")
    .map((c) => CONDITIONS.find((x) => x.id === c))
    .filter(Boolean);

  return (
    <div className="resource-card bg-white rounded-3xl shadow-card overflow-hidden border border-teal-50">
      {/* Top bar */}
      <div className="h-1.5 bg-gradient-to-r from-teal-400 to-teal-600" />

      <div className="p-6">
        {/* Type + Free badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap gap-1.5">
            <span className={`tag-pill ${TYPE_COLORS[resource.type] || "bg-gray-100 text-gray-700"}`}>
              {resource.type}
            </span>
            {resource.free && (
              <span className="tag-pill bg-green-100 text-green-700">Free</span>
            )}
          </div>
          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
            {Array.from({ length: resource.rating || 4 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-teal-900 text-base leading-snug mb-2">
          {resource.title}
        </h3>

        {/* Source */}
        <p className="text-xs text-teal-600 font-semibold mb-3">{resource.source}</p>

        {/* Description */}
        <p className="text-sm text-warm-gray leading-relaxed mb-4 line-clamp-3">
          {resource.description}
        </p>

        {/* Personalised reason (if provided) */}
        {reason && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mb-4">
            <p className="text-xs font-semibold text-amber-700 mb-1">Why this suits your child:</p>
            <p className="text-xs text-amber-900 leading-relaxed">{reason}</p>
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="tag-pill bg-teal-50 text-teal-700">
            Class {(resource.classes || []).join(", ")}
          </span>
          <span className="tag-pill bg-teal-50 text-teal-700">{resource.subject}</span>
          {resource.medium?.map((m) => (
            <span key={m} className="tag-pill bg-teal-50 text-teal-700">{m}</span>
          ))}
        </div>

        {/* Condition tags */}
        {conditionLabels.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {conditionLabels.map((c) => (
              <span key={c.id} className={`tag-pill ${c.color}`}>{c.label}</span>
            ))}
          </div>
        )}

        {/* CTA */}
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-2xl transition-all hover:shadow-warm"
        >
          Open Resource <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
