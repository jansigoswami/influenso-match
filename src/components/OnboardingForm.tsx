import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessForm } from "@/types";

const NICHES = ["Food", "Fashion", "Tech", "Education", "Lifestyle"];
const AGE_RANGES = ["18–24", "25–34", "35+"];
const LOCATIONS = ["Vijay Nagar", "Bhawarkua", "Palasia", "All Indore"];

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<BusinessForm>({
    pitch: "",
    niche: "",
    audienceAge: "",
    persona: "",
    location: ""
  });

  const update = (field: keyof BusinessForm, value: string) =>
  setForm((prev) => ({ ...prev, [field]: value }));

  const isValid =
  form.pitch.trim() && form.niche && form.audienceAge && form.persona.trim() && form.location;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    navigate("/results", { state: form });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <span>✦</span> Influenso Smart-Match
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Find Your Perfect Influencer
          </h1>
          <p className="mt-2 text-muted-foreground">
            Tell us about your business to get matched
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-card rounded-3xl shadow-ios p-6 space-y-5">
            {/* Pitch */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Business Pitch
              </label>
              <textarea
                rows={2}
                value={form.pitch}
                onChange={(e) => update("pitch", e.target.value)}
                placeholder="Describe your business in a sentence..."
                className="w-full rounded-2xl border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow" />

            </div>

            {/* Niche */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Target Niche
              </label>
              <select
                value={form.niche}
                onChange={(e) => update("niche", e.target.value)}
                className="w-full rounded-2xl border bg-secondary/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none transition-shadow border-solid border-primary">

                <option value="">Select a niche</option>
                {NICHES.map((n) =>
                <option key={n} value={n}>{n}</option>
                )}
              </select>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Target Audience Age
              </label>
              <select
                value={form.audienceAge}
                onChange={(e) => update("audienceAge", e.target.value)}
                className="w-full rounded-2xl border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none transition-shadow">

                <option value="">Select age range</option>
                {AGE_RANGES.map((a) =>
                <option key={a} value={a}>{a}</option>
                )}
              </select>
            </div>

            {/* Persona */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Target Persona
              </label>
              <input
                type="text"
                value={form.persona}
                onChange={(e) => update("persona", e.target.value)}
                placeholder="e.g., college students, young professionals"
                className="w-full rounded-2xl border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow" />

            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Target Location in Indore
              </label>
              <select
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full rounded-2xl border border-input bg-secondary/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring appearance-none transition-shadow">

                <option value="">Select location</option>
                {LOCATIONS.map((l) =>
                <option key={l} value={l}>{l}</option>
                )}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-base shadow-ios-lg hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none">

            Find Matches →
          </button>
        </form>
      </div>
    </div>);

};

export default OnboardingForm;