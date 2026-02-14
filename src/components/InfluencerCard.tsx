import { MatchedInfluencer } from "@/types";

interface Props {
  influencer: MatchedInfluencer;
  index: number;
}

const InfluencerCard = ({ influencer, index }: Props) => {
  const scoreColor =
    influencer.score >= 60
      ? "text-success"
      : influencer.score >= 40
        ? "text-primary"
        : "text-muted-foreground";

  return (
    <div
      className="bg-card rounded-3xl shadow-ios p-6 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {influencer.name}
          </h3>
          <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
            {influencer.niche}
          </span>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${scoreColor}`}>
            {influencer.score}%
          </span>
          <p className="text-xs text-muted-foreground">Match</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <span>📍 {influencer.topLocations.join(", ")}</span>
        <span>📊 {influencer.engagementRate}% ER</span>
      </div>

      <p className="text-sm text-muted-foreground italic mb-4">
        💡 {influencer.insight}
      </p>

      <button className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.98] transition-all">
        Book Influencer
      </button>
    </div>
  );
};

export default InfluencerCard;
