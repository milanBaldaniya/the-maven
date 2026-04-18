import React from 'react';

type Props = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

export default function AppField({ label, required, hint, error, children }: Props) {
  return (
    <div>
      <div className="flex items-end justify-between gap-3 mb-2">
        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-foreground-muted">
          {label} {required ? <span className="text-gold">*</span> : null}
        </label>
        {hint ? <span className="text-[11px] text-foreground-muted/80">{hint}</span> : null}
      </div>
      {children}
      {error ? <p className="mt-2 text-xs text-red-300/90">{error}</p> : null}
    </div>
  );
}

