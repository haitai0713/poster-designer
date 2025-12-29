import React from 'react';
import { LayoutType } from '../types';

interface LayoutSelectorProps {
  selected: LayoutType;
  onChange: (layout: LayoutType) => void;
}

const layouts: { id: LayoutType; label: string; desc: string }[] = [
  { id: 'Hero', label: 'Hero', desc: 'Product centered, text in negative space.' },
  { id: 'Magazine', label: 'Magazine', desc: 'Split layout, zero product overlap.' },
  { id: 'Diagonal', label: 'Diagonal', desc: 'Parallel flow, product remains clear.' },
  { id: 'Wrapped', label: 'Wrapped', desc: 'Text strictly BEHIND the product.' },
];

export const LayoutSelector: React.FC<LayoutSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        Composition Layout
      </label>
      <div className="grid grid-cols-2 gap-3">
        {layouts.map((l) => (
          <button
            key={l.id}
            onClick={() => onChange(l.id)}
            className={`flex flex-col items-start p-3 border rounded-md transition-all ${
              selected === l.id
                ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <span className="font-bold text-sm">{l.label}</span>
            <span className="text-[10px] opacity-70 text-left leading-tight mt-1">{l.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};