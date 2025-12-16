import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Lead } from '../types';

interface Props {
  leads: Lead[];
}

const StatsOverview: React.FC<Props> = ({ leads }) => {
  const highPropensity = leads.filter(l => l.score >= 80).length;
  const mediumPropensity = leads.filter(l => l.score >= 50 && l.score < 80).length;
  const lowPropensity = leads.filter(l => l.score < 50).length;

  const data = [
    { name: 'High Probability', value: highPropensity, color: '#16a34a' },
    { name: 'Medium', value: mediumPropensity, color: '#ca8a04' },
    { name: 'Low', value: lowPropensity, color: '#dc2626' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
        <h3 className="text-gray-500 text-sm font-medium">Total Qualified Leads</h3>
        <p className="text-3xl font-bold text-gray-900 mt-2">{leads.length}</p>
        <div className="mt-4 text-xs text-green-600 font-medium">+12% from last week</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-gray-500 text-sm font-medium mb-4">Propensity Distribution</h3>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" hide width={10} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ fontSize: '12px' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>High ({highPropensity})</span>
            <span>Med ({mediumPropensity})</span>
            <span>Low ({lowPropensity})</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-lg shadow-sm text-white">
        <h3 className="text-indigo-100 text-sm font-medium">Top Signal Detected</h3>
        <p className="text-xl font-bold mt-2">"Drug-Induced Liver Injury"</p>
        <p className="text-xs text-indigo-200 mt-2 opacity-80">
            Detected in 40% of high-scoring profiles' recent publications.
        </p>
      </div>
    </div>
  );
};

export default StatsOverview;