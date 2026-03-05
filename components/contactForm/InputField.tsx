import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  return (
    <div className="relative w-full group">
      {label && (
        <label className="block text-white/90 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full bg-transparent border-b border-white/20 py-4 focus:border-white/60 focus:shadow-[0_1px_0_0_rgba(255,255,255,0.4)] outline-none transition-all placeholder:text-zinc-500 text-white"
      />
    </div>
  );
};
