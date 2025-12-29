import React from 'react';

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  className?: string;
}

export const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text',
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-zinc-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all resize-none h-24 text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-3 text-zinc-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};