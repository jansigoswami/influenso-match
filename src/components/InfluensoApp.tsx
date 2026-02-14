import { useState } from "react";
import { ArrowRight, MapPin, Users, TrendingUp, CheckCircle, Target, Sparkles } from "lucide-react";
import { BusinessForm, MatchedInfluencer } from "@/types";
import { matchInfluencers } from "@/lib/matching";
import influencersData from "@/data/influencers.json";

const NICHES = ["Food", "Fashion", "Tech", "Education", "Lifestyle"];
const AGE_RANGES = ["18–24", "25–34", "35+"];
const LOCATIONS = ["Vijay Nagar", "Bhawarkua", "Palasia", "All Indore"];

type Step = "welcome" | "onboarding" | "processing" | "results";

const InfluensoApp = () => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [form, setForm] = useState<BusinessForm>({
    pitch: "",
    niche: "",
    audienceAge: "",
    persona: "",
    location: "",
  });
  const [matches, setMatches] = useState<MatchedInfluencer[]>([]);

  const update = (field: keyof BusinessForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid =
    form.pitch.trim() && form.niche && form.audienceAge && form.persona.trim() && form.location;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setCurrentStep("processing");

    setTimeout(() => {
      const results = matchInfluencers(influencersData, form);
      setMatches(results);
      setCurrentStep("results");
    }, 1800);
  };

  const resetApp = () => {
    setCurrentStep("welcome");
    setForm({ pitch: "", niche: "", audienceAge: "", persona: "", location: "" });
    setMatches([]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-medium tracking-tight">Influenso</span>
          </div>
          <div className="loginButton flex gap-2">
            <button className="group px-7 py-3.5 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2">login as influencer</button>
            <button className="group px-7 py-3.5 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2">login as brand</button>
          </div>
          {currentStep !== "welcome" && (
            <button
              onClick={resetApp}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* Welcome */}
      {currentStep === "welcome" && (
        <div className="max-w-5xl mx-auto px-6">
          <div className="pt-32 pb-20 text-center">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8 leading-tight">
              AI influencer matching<br />
              <span className="font-normal">for modern brands</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
              We connect businesses with verified influencers in Indore. From strategy to campaign execution.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setCurrentStep("onboarding")}
                className="group px-7 py-3.5 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Start matching
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="px-7 py-3.5 border border-border rounded-md font-medium hover:bg-secondary transition-colors">
                View our network
              </button>
            </div>
          </div>

          <div className="border-t border-border pt-20 pb-32">
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground text-center mb-16">What we do</h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { icon: Target, title: "Smart Targeting", desc: "AI-powered matching based on your business goals, target audience, and geographic focus." },
                { icon: Users, title: "Verified Network", desc: "Curated database of 20+ authentic influencers across all major categories in Indore." },
                { icon: Sparkles, title: "Instant Results", desc: "Get personalized recommendations with detailed match scores and insights in seconds." },
              ].map((feat) => (
                <div key={feat.title}>
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <feat.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Form */}
      {currentStep === "onboarding" && (
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div className="mb-12">
            <h2 className="text-4xl font-light tracking-tight mb-4">Tell us about your business</h2>
            <p className="text-lg text-muted-foreground">Help us find the perfect influencer matches for your brand.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block">
                <span className="text-sm font-medium text-foreground block mb-2">Business Pitch</span>
                <textarea
                  value={form.pitch}
                  onChange={(e) => update("pitch", e.target.value)}
                  placeholder="Describe your business in 2-3 lines..."
                  className="w-full px-4 py-3.5 bg-background border border-border rounded-md focus:border-foreground focus:outline-none text-foreground placeholder:text-muted-foreground resize-none transition-colors"
                  rows={3}
                />
                <span className="text-xs text-muted-foreground mt-1.5 block">
                  e.g., We are a new coworking space in Vijay Nagar focusing on startups and freelancers
                </span>
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-sm font-medium text-foreground block mb-2">Business Category</span>
                <select
                  value={form.niche}
                  onChange={(e) => update("niche", e.target.value)}
                  className="w-full px-4 py-3.5 bg-background border border-border rounded-md focus:border-foreground focus:outline-none text-foreground transition-colors appearance-none"
                >
                  <option value="">Select category</option>
                  {NICHES.map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium text-foreground block mb-2">Target Age Group</span>
                <select
                  value={form.audienceAge}
                  onChange={(e) => update("audienceAge", e.target.value)}
                  className="w-full px-4 py-3.5 bg-background border border-border rounded-md focus:border-foreground focus:outline-none text-foreground transition-colors appearance-none"
                >
                  <option value="">Select age group</option>
                  {AGE_RANGES.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-foreground block mb-2">Target Audience Persona</span>
              <input
                type="text"
                value={form.persona}
                onChange={(e) => update("persona", e.target.value)}
                placeholder="e.g., College Students, Corporate Professionals, Freelancers"
                className="w-full px-4 py-3.5 bg-background border border-border rounded-md focus:border-foreground focus:outline-none text-foreground placeholder:text-muted-foreground transition-colors"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-foreground block mb-2">Target Location</span>
              <select
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className="w-full px-4 py-3.5 bg-background border border-border rounded-md focus:border-foreground focus:outline-none text-foreground transition-colors appearance-none"
              >
                <option value="">Select location in Indore</option>
                {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </label>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isValid}
                className="w-full py-4 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
              >
                Find matching influencers
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Processing */}
      {currentStep === "processing" && (
        <div className="max-w-2xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-6">
            <div className="w-8 h-8 border-2 border-muted-foreground border-t-foreground rounded-full animate-spin" />
          </div>
          <h2 className="text-3xl font-light tracking-tight mb-3">Analyzing your requirements</h2>
          <p className="text-lg text-muted-foreground">Our AI is matching you with the perfect influencers</p>
        </div>
      )}

      {/* Results */}
      {currentStep === "results" && (
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <h2 className="text-4xl font-light tracking-tight">Your matches</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              We found {matches.length} influencers that align with your business goals
            </p>
          </div>

          <div className="space-y-6">
            {matches.map((influencer, index) => (
              <div
                key={influencer.id}
                className="bg-card border border-border rounded-lg hover:border-foreground/20 transition-all overflow-hidden opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between gap-8 mb-6">
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-xl font-medium flex-shrink-0">
                          {influencer.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-medium">{influencer.name}</h3>
                            {index === 0 && (
                              <span className="px-2.5 py-1 bg-foreground text-background text-xs font-medium rounded">
                                Top Match
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1.5">
                              <Users className="w-4 h-4" />
                              {influencer.followers}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <TrendingUp className="w-4 h-4" />
                              {influencer.engagementRate}% engagement
                            </span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed mb-4">{influencer.bio}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                          {influencer.niche}
                        </span>
                        <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded">
                          {influencer.audienceType}
                        </span>
                        <span className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-medium rounded flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {influencer.topLocations.slice(0, 2).join(", ")}
                        </span>
                      </div>

                      <div className="bg-secondary rounded-lg p-4 mb-5 border border-border">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          <span className="text-foreground font-medium">Sample post:</span> "{influencer.sampleCaption}"
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-secondary to-background rounded-lg p-4 border border-border">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                              Why this match
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{influencer.insight}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center flex-shrink-0">
                      <div className="text-5xl font-light tracking-tight text-foreground mb-1">
                        {influencer.score}%
                      </div>
                      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        Match Score
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3.5 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    Book influencer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={resetApp}
              className="px-7 py-3.5 border border-border rounded-md font-medium hover:bg-secondary transition-colors"
            >
              Start new search
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border mt-32 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium">Influenso</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 Influenso. Connecting brands with creators in Indore.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InfluensoApp;
