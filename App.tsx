import React, { useState, useEffect } from 'react';
import { Search, Loader2, Download, Filter, BrainCircuit, AlertCircle, CheckCircle2 } from 'lucide-react';
import { HashRouter } from 'react-router-dom';
import LeadTable from './components/LeadTable';
import StatsOverview from './components/StatsOverview';
import { searchLeadsWithAgent } from './services/geminiService';
import { Lead } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState('Director of Toxicology in Boston');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'idle' | 'connected' | 'error' | 'no-key'>('idle');
  
  // Filter state
  const [filterMode, setFilterMode] = useState<'all' | 'high' | 'ai'>('all');

  // Check for API Key on mount
  useEffect(() => {
    if (!process.env.API_KEY) {
        setAgentStatus('no-key');
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setAgentStatus('idle'); 
    setLeads([]); // Clear previous results
    
    try {
        if (!process.env.API_KEY) {
            // Small delay to show loading state even if no key, for UX consistency
            await new Promise(resolve => setTimeout(resolve, 800));
            setAgentStatus('no-key');
            setLeads([]);
        } else {
            const agentResults = await searchLeadsWithAgent(query);
            
            if (agentResults.length > 0) {
                setLeads(agentResults.sort((a, b) => b.score - a.score));
                setAgentStatus('connected');
            } else {
                setAgentStatus('error');
                setLeads([]); // Explicitly empty if no real results found
            }
        }
    } catch (error) {
        console.error("Search error", error);
        setAgentStatus('error');
        setLeads([]);
    } finally {
        setIsSearching(false);
    }
  };

  // Export to CSV Function
  const handleExportCSV = () => {
    if (leads.length === 0) return;

    const headers = ["ID", "Name", "Title", "Company", "Email", "Phone", "LinkedIn", "Location", "Score", "Source"];
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => [
        lead.id,
        `"${lead.name}"`,
        `"${lead.title}"`,
        `"${lead.company}"`,
        lead.email,
        `"${lead.phoneNumber || ''}"`,
        lead.linkedIn,
        `"${lead.location.person}"`,
        lead.score,
        lead.source
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bioscout_leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle Filter Mode
  const toggleFilter = () => {
    if (filterMode === 'all') setFilterMode('high');
    else if (filterMode === 'high') setFilterMode('ai');
    else setFilterMode('all');
  };

  // Apply Filter
  const filteredLeads = leads.filter(lead => {
    if (filterMode === 'high') return lead.score >= 50; // Show Medium & High
    if (filterMode === 'ai') return lead.source === 'AI-Live';
    return true;
  });

  const getFilterLabel = () => {
    switch(filterMode) {
      case 'high': return 'High Potential (>50)';
      case 'ai': return 'AI Generated Only';
      default: return 'All Leads';
    }
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation / Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">BioScout Agent</h1>
                <p className="text-xs text-gray-500">Automated Lead Identification & Ranking</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
               <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">Documentation</button>
               <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                  AK
               </div>
            </div>
          </div>
        </header>

        {/* Status Banner */}
        {agentStatus === 'no-key' && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
                <div className="max-w-7xl mx-auto flex items-center text-sm text-amber-800">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span><strong>API Key Not Found:</strong> Real-time data is unavailable. Please configure your API_KEY to use this application.</span>
                </div>
            </div>
        )}
        {agentStatus === 'error' && (
            <div className="bg-red-50 border-b border-red-200 px-4 py-2">
                 <div className="max-w-7xl mx-auto flex items-center text-sm text-red-800">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span><strong>No Results Found:</strong> The Agent could not find data matching your specific query. Try broadening your search terms.</span>
                </div>
            </div>
        )}
        {agentStatus === 'connected' && (
            <div className="bg-green-50 border-b border-green-200 px-4 py-2">
                 <div className="max-w-7xl mx-auto flex items-center text-sm text-green-800">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    <span><strong>Agent Active:</strong> Retrieving real-time data from Google Search & Knowledge Graph.</span>
                </div>
            </div>
        )}

        {/* Main Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Agent Input Section */}
          <section className="mb-8">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-1">
                <form onSubmit={handleSearch} className="flex items-center">
                   <div className="pl-4 pr-2">
                      <Search className="w-5 h-5 text-gray-400" />
                   </div>
                   <input 
                      type="text" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Ask the Agent: e.g. 'Find Heads of Safety Assessment in Cambridge using in-vitro models'"
                      className="flex-1 h-12 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                   />
                   <button 
                      type="submit" 
                      disabled={isSearching}
                      className="m-1 px-6 h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-70"
                   >
                      {isSearching ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Crawling Sources...</span>
                        </>
                      ) : (
                        <span>Run Agent</span>
                      )}
                   </button>
                </form>
             </div>
             <p className="mt-2 text-xs text-gray-500 ml-2">
               Sources: LinkedIn, PubMed, Society of Toxicology, Crunchbase.
             </p>
          </section>

          {/* Metrics - Only show if data exists and not searching */}
          {!isSearching && leads.length > 0 && <StatsOverview leads={leads} />}

          {/* Control Bar - Only show if data exists and not searching */}
          {!isSearching && leads.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-gray-800">Identified Leads</h2>
                    <span className="bg-gray-200 text-gray-700 py-0.5 px-2 rounded-full text-xs font-medium">{filteredLeads.length}</span>
                    {filterMode !== 'all' && (
                    <span className="bg-indigo-100 text-indigo-700 py-0.5 px-2 rounded-full text-xs font-medium ml-2">
                        Filtered: {getFilterLabel()}
                    </span>
                    )}
                </div>
                <div className="flex space-x-2">
                    <button 
                    onClick={toggleFilter}
                    className={`flex items-center space-x-1 px-3 py-2 border rounded-md text-sm transition-colors ${filterMode !== 'all' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filter: {getFilterLabel()}</span>
                    </button>
                    <button 
                    onClick={handleExportCSV}
                    className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>
          )}

          {/* Main Content Area */}
          {isSearching ? (
             <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Fetching result...</h3>
                <p className="text-gray-500 mt-2">The agent is analyzing live data sources to find matches.</p>
             </div>
          ) : filteredLeads.length > 0 ? (
            <LeadTable leads={filteredLeads} />
          ) : (
             <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300 min-h-[400px] flex flex-col items-center justify-center">
                {!hasSearched ? (
                     <>
                        <BrainCircuit className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Ready to Scout</h3>
                        <p className="text-gray-500 mt-2">Enter your search criteria above to find high-value leads.</p>
                     </>
                ) : (
                     <>
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No leads found</h3>
                        <p className="text-gray-500 mt-2">No leads, try to be more specific.</p>
                     </>
                )}
             </div>
          )}

        </main>
      </div>
    </HashRouter>
  );
};

export default App;