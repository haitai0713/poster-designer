import React from 'react';
import { OptionItem } from '../constants';
import { Language } from '../types';

interface DropdownGroupProps {
  label: string;
  value: string;
  options: OptionItem[];
  onChange: (val: string) => void;
  lang: Language;
  placeholder: string;
  className?: string;
}

export const DropdownGroup: React.FC<DropdownGroupProps> = ({ 
  label, 
  value, 
  options, 
  onChange,
  lang,
  placeholder,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-zinc-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all text-sm appearance-none cursor-pointer"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {lang === 'en' ? opt.label_en : opt.label_zh}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-zinc-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};