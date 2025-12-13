import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">About VirtuLab</h1>
        <p className="text-xl text-slate-600">Mega immersive technologies.</p>
      </div>

      <div className="prose prose-lg prose-slate mx-auto">
        <p>
          Paragraph
        </p>
        
        <h3>Header</h3>
        <p>
          Another paragraph
        </p>

        <h3>Another header</h3>
        <p>
          One more paragraph
        </p>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose mt-8">
           <h4 className="text-lg font-bold text-slate-900 mb-2">Partners</h4>
           <p className="text-slate-600 text-sm">Paragraph about partners</p>
        </div>
      </div>
    </div>
  );
};