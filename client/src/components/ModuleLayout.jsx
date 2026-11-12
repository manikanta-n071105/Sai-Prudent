import React from 'react';
import RiseSidebarWidget from './RiseSidebarWidget';

export default function ModuleLayout({ children, onNavigate }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Module Content on the LEFT */}
        <div className="lg:col-span-8 min-w-0 space-y-10">
          {children}
        </div>

        {/* RISE Info & Official Desk on the RIGHT */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <RiseSidebarWidget onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
