import { Influencer, BusinessForm, MatchedInfluencer } from "@/types";

export function matchInfluencers(
  influencers: Influencer[],
  form: BusinessForm
): MatchedInfluencer[] {
  const scored = influencers.map((inf) => {
    let score = 0;
    const reasons: string[] = [];

    // Niche match +40
    if (inf.niche.toLowerCase() === form.niche.toLowerCase()) {
      score += 40;
      reasons.push(`perfect niche alignment`);
    }

    // Location match +25
    const locationMatch =
      form.location === "All Indore" ||
      inf.topLocations.some(
        (loc) => loc.toLowerCase() === form.location.toLowerCase()
      );
    if (locationMatch) {
      score += 25;
      const locStr =
        form.location === "All Indore"
          ? "city-wide reach"
          : `strong presence in ${form.location}`;
      reasons.push(locStr);
    }

    // Age match +20
    if (inf.audienceAge === form.audienceAge) {
      score += 20;
      reasons.push(`exact age demographic match`);
    }

    // Persona keyword match +15
    const personaWords = form.persona.toLowerCase().split(/\s+/);
    const audienceText = inf.audienceType.toLowerCase();
    const hasPersonaMatch = personaWords.some(
      (word) => word.length > 2 && audienceText.includes(word)
    );
    if (hasPersonaMatch) {
      score += 15;
      reasons.push(`matching audience persona`);
    }

    const insight =
      reasons.length > 0
        ? `Strong match due to ${reasons.join(", ")}. ${inf.engagementRate}% engagement rate with ${inf.followers} followers.`
        : `${inf.name} has a ${inf.engagementRate}% engagement rate in Indore.`;

    return { ...inf, score, insight };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
