export interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phoneNumber?: string; // New field for phone numbers
  linkedIn: string;
  location: {
    person: string;
    hq: string;
    isRemote: boolean;
  };
  signals: ScoringSignals;
  score: number;
  status: 'New' | 'Contacted' | 'Qualified';
  source: 'AI-Live' | 'Mock-Data';
}

export interface ScoringSignals {
  roleFit: {
    matches: string[]; // e.g., ["Toxicology", "Head of Safety"]
    score: number; // Max 30
  };
  companyIntent: {
    fundingSeries: string; // "Series A", "Series B", "None"
    score: number; // Max 20
  };
  technographic: {
    usesSimilarTech: boolean;
    openToNAMs: boolean;
    score: number; // Max 25 (15 + 10)
  };
  location: {
    isHub: boolean; // Boston, Cambridge, etc.
    score: number; // Max 10
  };
  scientificIntent: {
    hasRecentPaper: boolean;
    paperTopic?: string;
    score: number; // Max 40 (Very High)
  };
}

export interface SearchState {
  query: string;
  isSearching: boolean;
  results: Lead[];
  error?: string;
}