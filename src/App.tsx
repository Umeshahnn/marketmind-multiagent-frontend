import React, { useState } from 'react';
import { Header } from './components/Header';
import { ResearchInput } from './components/ResearchInput';
import { AgentProgress } from './components/AgentProgress';
import { ReportViewer } from './components/ReportViewer';
import { runResearch } from './services/api';
import type { SourceItem } from './services/api';
import { AlertTriangle } from 'lucide-react';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [report, setReport] = useState<string>('');
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async (searchQuery: string) => {
    setIsLoading(true);
    setIsCompleted(false);
    setError(null);
    setQuery(searchQuery);
    setReport('');
    setSources([]);

    const result = await runResearch(searchQuery);

    setIsLoading(false);

    if (result.status === 'success' && result.report) {
      setReport(result.report);
      setSources(result.sources || []);
      setIsCompleted(true);
    } else {
      setError(result.message || 'An error occurred while generating the report.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Interview Demo Architecture Summary Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1 max-w-3xl">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                1-2 Minute Technical Interview Summary
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">MarketMind AI</strong> connects a React frontend to a FastAPI backend that executes a multi-agent workflow via <strong className="text-cyan-300">LangGraph</strong>. A <strong className="text-emerald-300">Supervisor</strong> agent coordinates <strong className="text-cyan-300">Researcher</strong> (Tavily web search), <strong className="text-blue-300">Analyst</strong> (insight synthesis), and <strong className="text-indigo-300">Writer</strong> (Groq LLM) agents with native <strong className="text-amber-300">LangSmith</strong> execution tracing.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs">
                <span className="text-slate-400 block text-[10px] uppercase">State Engine</span>
                <span className="text-cyan-400 font-semibold">LangGraph</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs">
                <span className="text-slate-400 block text-[10px] uppercase">LLM Provider</span>
                <span className="text-indigo-400 font-semibold">Groq LLaMA-3</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-mono text-xs">
                <span className="text-slate-400 block text-[10px] uppercase">Search Tool</span>
                <span className="text-emerald-400 font-semibold">Tavily Search</span>
              </div>
            </div>
          </div>
        </div>

        {/* Query Input Card */}
        <ResearchInput onSearch={handleResearch} isLoading={isLoading} />

        {/* Error Notification Banner */}
        {error && (
          <div className="bg-rose-950/40 border border-rose-800/80 rounded-2xl p-6 text-rose-200 flex items-start space-x-4 shadow-xl">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-rose-100 uppercase tracking-wide">Execution Error</h3>
              <p className="text-sm leading-relaxed text-rose-200/90">{error}</p>
              <p className="text-xs text-rose-300/70 font-mono mt-2">
                Tip: Ensure backend/.env contains valid GROQ_API_KEY and TAVILY_API_KEY.
              </p>
            </div>
          </div>
        )}

        {/* Agent Activity Progress Card */}
        <AgentProgress isLoading={isLoading} isCompleted={isCompleted} />

        {/* Markdown Report View */}
        {report && <ReportViewer report={report} query={query} sources={sources} />}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        <p>MarketMind AI — Multi-Agent Market Intelligence System | Powered by FastAPI, LangGraph, Groq & Tavily</p>
      </footer>
    </div>
  );
};
