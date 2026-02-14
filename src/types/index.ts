export interface Influencer {
  id: number;
  name: string;
  niche: string;
  audienceAge: string;
  audienceType: string;
  topLocations: string[];
  engagementRate: number;
  sampleCaption: string;
}

export interface BusinessForm {
  pitch: string;
  niche: string;
  audienceAge: string;
  persona: string;
  location: string;
}

export interface MatchedInfluencer extends Influencer {
  score: number;
  insight: string;
}
