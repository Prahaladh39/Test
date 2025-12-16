import { Lead, ScoringSignals } from '../types';

/**
 * Calculates the "Propensity to Buy" score (0-100) based on the PDF criteria.
 */
export const calculateScore = (signals: ScoringSignals): number => {
  let totalScore = 0;

  // 1. Role Fit (Max 30)
  // Toxicology, Safety, Hepatic, 3D - High(+30)
  totalScore += signals.roleFit.score;

  // 2. Company Intent (Max 20)
  // Series A/B funding - High (+20)
  totalScore += signals.companyIntent.score;

  // 3. Technographic (Max 25)
  // Uses similar tech (+15) + Open to NAMs (+10)
  totalScore += signals.technographic.score;

  // 4. Location (Max 10)
  // Hub (Boston/Cambridge, etc) - Medium (+10)
  totalScore += signals.location.score;

  // 5. Scientific Intent (Max 40)
  // Published paper in last 2 years - Very High (+40)
  totalScore += signals.scientificIntent.score;

  // Cap at 100 as per "score (0-100)" requirement
  return Math.min(100, totalScore);
};

// Helper to determine if a location is a hub (from PDF Page 3)
export const isBioHub = (location: string): boolean => {
  const hubs = ['Boston', 'Cambridge', 'Bay Area', 'San Francisco', 'Basel', 'London', 'Oxford', 'Golden Triangle'];
  return hubs.some(hub => location.includes(hub));
};