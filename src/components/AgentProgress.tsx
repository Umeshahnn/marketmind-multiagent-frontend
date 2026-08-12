import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Circle, ShieldCheck, Search, BarChart3, FileText } from 'lucide-react';

interface AgentProgressProps {
  isLoading: boolean;
  isCompleted: boolean;
}

const AGENTS = [
  {
    id: 'supervisor',
    name: 'Supervisor Agent',
    description: 'Coordinating workflow & evaluating state transitions',
    icon: ShieldCheck,
  },
  {
    id: 'researcher',
    name: 'Researcher Agent',
    description: 'Gathering real-time market data via Tavily Web Search',
    icon: Search,
  },
  {
    id: 'analyst',
    name: 'Analyst Agent',
    description: 'Evaluating trends, market drivers, opportunities & risks',
    icon: BarChart3,
  },
  {
    id: 'writer',
    name: 'Writer Agent',
    description: 'Synthesizing publication-ready executive Markdown report',
    icon: FileText,
  },
];

export const AgentProgress: React.FC<AgentProgressProps> = ({ isLoading, isCompleted }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    if (isLoading) {
      setCurrentStep(0);
      const timer1 = setTimeout(() => setCurrentStep(1), 3000);
      const timer2 = setTimeout(() => setCurrentStep(2), 12000);
      const timer3 = setTimeout(() => setCurrentStep(3), 22000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else if (isCompleted) {
      setCurrentStep(4); // All done
    }
  }, [isLoading, isCompleted]);

  if (!isLoading && !isCompleted) {
    return null;
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>Multi-Agent Workflow Active</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Research Completed</span>
            </>
          )}
        </h3>
        <span className="text-xs font-mono text-slate-400">
          {isCompleted ? '4 / 4 Agents Done' : `Step ${Math.min(currentStep + 1, 4)} of 4`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {AGENTS.map((agent, idx) => {
          const Icon = agent.icon;
          const isDone = isCompleted || currentStep > idx;
          const isCurrent = isLoading && currentStep === idx;

          return (
            <div
              key={agent.id}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                  : isCurrent
                  ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200 shadow-lg shadow-cyan-950/50 scale-[1.02]'
                  : 'bg-slate-950/40 border-slate-800 text-slate-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isCurrent
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{agent.name}</span>
                </div>

                <div>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2">{agent.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
