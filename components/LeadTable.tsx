import React, { useState } from 'react';
import { Lead } from '../types';
import { ChevronDown, ChevronUp, ExternalLink, Mail, MapPin, Building, FileText, Bot, Database, Phone } from 'lucide-react';

interface Props {
  leads: Lead[];
}

const LeadTable: React.FC<Props> = ({ leads }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propensity</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead, index) => (
              <React.Fragment key={lead.id}>
                <tr 
                  onClick={() => toggleExpand(lead.id)}
                  className={`hover:bg-blue-50 cursor-pointer transition-colors ${expandedId === lead.id ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.source === 'AI-Live' ? (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                         <Bot className="w-3 h-3 mr-1" /> AI
                       </span>
                    ) : (
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                         <Database className="w-3 h-3 mr-1" /> Mock
                       </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full border ${getScoreColor(lead.score)}`}>
                      {lead.score}/100
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{lead.name}</span>
                      <span className="text-xs text-gray-500">{lead.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Building className="w-3 h-3 mr-1 text-gray-400" />
                      {lead.company}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                        <span className="font-medium">{lead.location.person}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400 ml-4">
                         HQ: {lead.location.hq}
                         {lead.location.isRemote && <span className="ml-1 px-1 bg-gray-100 text-gray-600 rounded">Remote</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                     <div className="flex items-center space-x-3" onClick={(e) => e.stopPropagation()}>
                        <a 
                          href={`mailto:${lead.email}`}
                          className="text-indigo-600 hover:text-indigo-900 p-1 hover:bg-indigo-50 rounded" 
                          title={`Email ${lead.email}`}
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                        
                        {lead.phoneNumber && lead.phoneNumber !== 'Not Available' ? (
                          <a 
                            href={`tel:${lead.phoneNumber}`}
                            className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded" 
                            title={`Call ${lead.phoneNumber}`}
                          >
                            <Phone className="w-5 h-5" />
                          </a>
                        ) : (
                           <span className="text-gray-300 p-1 cursor-not-allowed" title="Phone not available">
                              <Phone className="w-5 h-5" />
                           </span>
                        )}

                        <a 
                          href={lead.linkedIn} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-900 p-1 hover:bg-blue-50 rounded" 
                          title="Open LinkedIn Profile"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                        
                        <button 
                            onClick={(e) => { e.stopPropagation(); toggleExpand(lead.id); }}
                            className="text-gray-400 hover:text-gray-600 p-1"
                        >
                             {expandedId === lead.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                     </div>
                  </td>
                </tr>
                {expandedId === lead.id && (
                  <tr className="bg-blue-50/50">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="bg-white rounded border border-blue-100 p-4 shadow-sm">
                        <div className="flex justify-between mb-2">
                           <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Signal Breakdown</h4>
                           {lead.phoneNumber && (
                             <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">Phone: {lead.phoneNumber}</span>
                           )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          {/* Role Fit */}
                          <div className="p-3 bg-gray-50 rounded border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-semibold text-gray-600">Role Fit</span>
                              <span className="text-xs font-bold text-blue-600">+{lead.signals.roleFit.score}</span>
                            </div>
                            <p className="text-xs text-gray-500">Matches: {lead.signals.roleFit.matches.join(', ')}</p>
                          </div>

                          {/* Scientific Intent */}
                          <div className={`p-3 rounded border ${lead.signals.scientificIntent.score > 0 ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-semibold text-gray-600">Scientific Intent</span>
                              <span className="text-xs font-bold text-green-600">+{lead.signals.scientificIntent.score}</span>
                            </div>
                            <div className="flex items-start">
                              <FileText className="w-3 h-3 mt-0.5 mr-1 text-gray-400" />
                              <p className="text-xs text-gray-500 truncate">
                                {lead.signals.scientificIntent.hasRecentPaper 
                                  ? `Published: "${lead.signals.scientificIntent.paperTopic}"` 
                                  : 'No recent relevant papers found'}
                              </p>
                            </div>
                          </div>

                          {/* Company Intent */}
                          <div className="p-3 bg-gray-50 rounded border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-semibold text-gray-600">Funding / Intent</span>
                              <span className="text-xs font-bold text-blue-600">+{lead.signals.companyIntent.score}</span>
                            </div>
                            <p className="text-xs text-gray-500">{lead.signals.companyIntent.fundingSeries}</p>
                          </div>
                          
                           {/* Technographic */}
                           <div className="p-3 bg-gray-50 rounded border border-gray-100">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-semibold text-gray-600">Technographic</span>
                              <span className="text-xs font-bold text-blue-600">+{lead.signals.technographic.score}</span>
                            </div>
                            <p className="text-xs text-gray-500">
                                {lead.signals.technographic.usesSimilarTech ? "Uses in-vitro models. " : ""}
                                Open to NAMs.
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;