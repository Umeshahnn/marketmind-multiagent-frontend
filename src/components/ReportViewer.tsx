import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Download, ExternalLink } from 'lucide-react';
import type { SourceItem } from '../services/api';

interface ReportViewerProps {
  report: string;
  query: string;
  sources?: SourceItem[];
}

export const ReportViewer: React.FC<ReportViewerProps> = ({ report, query, sources = [] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `MarketMind_Report_${query.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Action Bar */}
      <div className="bg-slate-950/80 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-semibold">
            Final Market Intelligence Report
          </span>
          <h2 className="text-lg font-bold text-slate-100 line-clamp-1">{query}</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 text-xs font-medium border border-cyan-800/80 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .MD</span>
          </button>
        </div>
      </div>

      {/* Main Markdown Body */}
      <div className="p-6 md:p-8 text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none prose-headings:text-slate-100 prose-h1:text-2xl prose-h2:text-xl prose-h2:text-cyan-400 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-2 prose-h3:text-lg prose-h3:text-slate-200 prose-a:text-cyan-400 hover:prose-a:underline prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-cyan-300">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
      </div>

      {/* Sources Footer Section */}
      {sources && sources.length > 0 && (
        <div className="bg-slate-950/90 border-t border-slate-800 p-6">
          <h4 className="text-xs uppercase tracking-wider font-mono font-semibold text-slate-400 mb-3 flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            Verified Web Data Sources ({sources.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-800/60 transition group"
              >
                <div className="w-6 h-6 rounded-lg bg-slate-800 group-hover:bg-cyan-950 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-cyan-400 text-xs font-mono">
                  {idx + 1}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-medium text-slate-300 group-hover:text-cyan-300 truncate">
                    {src.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate font-mono mt-0.5">
                    {src.url}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
