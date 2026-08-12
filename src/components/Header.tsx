import React from 'react';
import { Cpu, Activity, Search, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              MarketMind <span className="text-cyan-400 font-mono text-sm uppercase px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/50">AI</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Multi-Agent Market Intelligence System</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            LangGraph Flow
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            Tavily Web Search
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            Groq LLaMA-3
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/50 text-amber-300 border border-amber-800/50 font-mono">
            LangSmith Tracing
          </span>
        </div>
      </div>
    </header>
  );
};
