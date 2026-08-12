import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight } from 'lucide-react';

interface ResearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SAMPLE_QUERIES = [
  "Analyze the Indian EV market and identify startup opportunities",
  "Analyze opportunities for AI startups in India",
  "Autonomous vehicles market trends and competitive landscape",
  "Agentic AI enterprise market adoption and startup ecosystem"
];

export const ResearchInput: React.FC<ResearchInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleSelectSample = (sample: string) => {
    setQuery(sample);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl shadow-cyan-950/10">
      <form onSubmit={handleSubmit}>
        <label htmlFor="research-query-input" className="block text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          What would you like to research?
        </label>
        
        <div className="relative mb-4">
          <textarea
            id="research-query-input"
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            placeholder="e.g. Analyze the Indian EV market and identify startup opportunities..."
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm resize-none disabled:opacity-60 transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1">Examples:</span>
            {SAMPLE_QUERIES.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectSample(sample)}
                disabled={isLoading}
                className="text-xs bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-lg border border-slate-700/60 transition truncate max-w-[260px] text-left"
              >
                {sample}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition shadow-lg shadow-cyan-500/25 shrink-0"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Agents...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Generate Report</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
