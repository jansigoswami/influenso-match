import { useLocation, useNavigate } from "react-router-dom";
import { BusinessForm } from "@/types";
import { matchInfluencers } from "@/lib/matching";
import influencersData from "@/data/influencers.json";
import InfluencerCard from "@/components/InfluencerCard";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state as BusinessForm | null;

  if (!form) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No search data found.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const results = matchInfluencers(influencersData, form);

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to search
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
            ✓ {results.length} Matches Found
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Your Top Influencers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Matched for <span className="font-medium text-foreground">{form.niche}</span> in{" "}
            <span className="font-medium text-foreground">{form.location}</span>
          </p>
        </div>

        <div className="space-y-4">
          {results.map((inf, i) => (
            <InfluencerCard key={inf.id} influencer={inf} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
