import Anthropic from "@anthropic-ai/sdk";
import { resources, CONDITIONS, IQ_RANGES } from "../../../lib/resources";

const client = new Anthropic();

export async function POST(req) {
  try {
    const { profile } = await req.json();

    // Build condition labels
    const conditionLabels = (profile.conditions || [])
      .map((c) => CONDITIONS.find((x) => x.id === c)?.label || c)
      .join(", ");

    const iqLabel = IQ_RANGES.find((x) => x.id === profile.iqRange)?.label || "Not assessed";

    // Prepare resource summaries for context
    const resourceSummary = resources.map((r) => ({
      id: r.id,
      title: r.title,
      subject: r.subject,
      type: r.type,
      conditions: r.conditions,
      classes: r.classes,
      free: r.free,
      source: r.source,
      description: r.description.substring(0, 120),
    }));

    const prompt = `You are an expert special education advisor for children in India studying under the CBSE board.

CHILD PROFILE:
- Name: ${profile.childName || "the child"}
- Age: ${profile.age} years
- Class: ${profile.selectedClass}
- Medium: ${profile.medium}
- Subjects of concern: ${(profile.subjects || []).join(", ")}
- Special conditions: ${conditionLabels}
- IQ Range: ${iqLabel}
- Additional notes: ${profile.additionalNotes || "None"}

AVAILABLE RESOURCES IN OUR REPOSITORY (JSON):
${JSON.stringify(resourceSummary, null, 2)}

Your task:
1. Recommend 4-8 of the most relevant resources from the repository above that best match this child's profile. Pick based on class match, subject match, and condition match. Use the resource's "id" field.
2. For each recommended resource, write a personalised reason (2-3 sentences) explaining WHY this specific resource suits this child.
3. Provide 3-5 general strategies/accommodations for this child's specific combination of conditions in a mainstream CBSE school.
4. Suggest 2-3 additional online resources NOT in the repository that would help (include URL and brief description).

Respond ONLY with a JSON object in this exact format (no markdown, no preamble):
{
  "recommendedIds": ["id1", "id2", ...],
  "reasons": {
    "id1": "personalised reason...",
    "id2": "personalised reason..."
  },
  "strategies": [
    "strategy 1",
    "strategy 2"
  ],
  "additionalResources": [
    {
      "title": "Resource Name",
      "url": "https://...",
      "description": "Brief description",
      "why": "Why it helps this child"
    }
  ],
  "summary": "A warm, encouraging 2-sentence summary for the parent about their child's learning journey"
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].text;
    // Strip any markdown fences
    const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(clean);

    // Attach full resource data
    const recommendedResources = (parsed.recommendedIds || [])
      .map((id) => resources.find((r) => r.id === id))
      .filter(Boolean);

    return Response.json({
      ok: true,
      profile,
      recommendedResources,
      reasons: parsed.reasons || {},
      strategies: parsed.strategies || [],
      additionalResources: parsed.additionalResources || [],
      summary: parsed.summary || "",
    });
  } catch (err) {
    console.error("Suggest API error:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
