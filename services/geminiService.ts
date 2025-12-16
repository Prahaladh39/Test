import { GoogleGenAI } from "@google/genai";
import { Lead } from '../types';
import { calculateScore, isBioHub } from './scoringService';

export const searchLeadsWithAgent = async (query: string): Promise<Lead[]> => {
  if (!process.env.API_KEY) {
    console.error("No API Key found. Unable to fetch real data.");
    return [];
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // UPDATED PROMPT: Requesting phone numbers
  const prompt = `
    Act as a B2B Lead Generation Agent. The user is searching for: "${query}".
    
    GOAL: Use Google Search to find REAL, existing professionals and companies matching this query.
    
    INSTRUCTIONS:
    1. Search for real people and companies (e.g., browse LinkedIn summaries, company team pages).
    2. Generate 5 distinct leads.
    3. For each lead, determine:
       - Role Fit (keywords: Toxicology, Safety, Hepatic)
       - Company Funding (Series A/B vs Public)
       - Tech Stack (in-vitro models?)
       - Location (City/State)
       - Scientific Work (recent papers on liver injury/safety?)
       - Contact Info: Try to find a company main office phone number if individual is not available.

    OUTPUT FORMAT:
    You must return ONLY a raw JSON object with a "leads" array. Do not include markdown formatting (like \`\`\`json).
    
    JSON Structure:
    {
      "leads": [
        {
          "name": "Full Name",
          "title": "Job Title",
          "company": "Company Name",
          "phone_number": "Phone number or 'Not Available'",
          "location_person": "City, State",
          "location_hq": "City, State",
          "funding_series": "Series A, B, Public, or Unknown",
          "has_recent_paper": true/false,
          "paper_topic": "Topic string or null",
          "uses_similar_tech": true/false
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        // ENABLE GOOGLE SEARCH GROUNDING
        // NOTE: responseMimeType and responseSchema must be REMOVED when using tools
        tools: [{ googleSearch: {} }], 
      }
    });

    let text = response.text;
    if (!text) return [];

    // CLEANUP: Remove markdown code blocks if the model includes them
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    let data;
    try {
        data = JSON.parse(text);
    } catch (parseError) {
        console.error("Failed to parse AI response as JSON:", text);
        return [];
    }

    const rawLeads = data.leads || [];

    return rawLeads.map((raw: any, index: number) => {
        const isHub = isBioHub(raw.location_person) || isBioHub(raw.location_hq);
        const isRemote = raw.location_person !== raw.location_hq;
        
        // Calculate Signal Scores
        const roleFitScore = (raw.title?.includes('Toxicology') || raw.title?.includes('Safety') || raw.title?.includes('Head')) ? 30 : 10;
        const companyIntentScore = (raw.funding_series?.includes('Series')) ? 20 : 5;
        const technographicScore = (raw.uses_similar_tech ? 15 : 0) + 10; 
        const locationScore = isHub ? 10 : 0;
        const scientificScore = raw.has_recent_paper ? 40 : 0;

        const signals = {
            roleFit: { matches: [raw.title], score: roleFitScore },
            companyIntent: { fundingSeries: raw.funding_series || "Unknown", score: companyIntentScore },
            technographic: { usesSimilarTech: raw.uses_similar_tech || false, openToNAMs: true, score: technographicScore },
            location: { isHub, score: locationScore },
            scientificIntent: { hasRecentPaper: raw.has_recent_paper, paperTopic: raw.paper_topic, score: scientificScore }
        };

        return {
            id: `ai-gen-${Date.now()}-${index}`,
            name: raw.name || "Unknown Name",
            title: raw.title || "Unknown Title",
            company: raw.company || "Unknown Company",
            email: `${raw.name?.split(' ')[0]?.toLowerCase() || 'contact'}@${raw.company?.split(' ')[0]?.toLowerCase() || 'company'}.com`,
            phoneNumber: raw.phone_number || "Not Available",
            linkedIn: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(raw.name + " " + raw.company)}`,
            location: {
                person: raw.location_person || "Unknown",
                hq: raw.location_hq || "Unknown",
                isRemote
            },
            signals,
            score: calculateScore(signals),
            status: 'New',
            source: 'AI-Live'
        } as Lead;
    });

  } catch (e) {
    console.error("AI Search failed", e);
    // Return empty array so App.tsx can handle fallback
    return [];
  }
};