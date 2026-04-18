import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

type Option = { value: string; label: string };

type Props = {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

export default function AppMultiSelect({ name, value, onChange, options, placeholder, disabled }: Props) {
  const id = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selectedLabels = useMemo(() => {
    const set = new Set(value);
    return options.filter((o) => set.has(o.value)).map((o) => o.label);
  }, [options, value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (btnRef.current?.contains(t)) return;
      if (popRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const toggle = (v: string) => {
    const set = new Set(value);
    if (set.has(v)) set.delete(v);
    else set.add(v);
    onChange(Array.from(set));
  };

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value.join(',')} />
      <button
        ref={btnRef}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        className={[
          'form-input w-full px-4 py-3 rounded-2xl text-sm text-left flex items-center justify-between gap-3',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span className={selectedLabels.length ? 'text-foreground' : 'text-foreground-muted/80'}>
          {selectedLabels.length ? selectedLabels.join(', ') : placeholder || 'Select'}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className={open ? 'text-gold rotate-180 transition-transform' : 'text-gold transition-transform'}
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div
          ref={popRef}
          id={id}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.18)] bg-bg-card shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="max-h-72 overflow-auto p-2">
            {options.map((o) => {
              const active = value.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => toggle(o.value)}
                  className={[
                    'w-full px-3 py-2 rounded-xl text-sm flex items-center gap-3 transition-colors',
                    active ? 'bg-[rgba(212,175,55,0.12)] text-foreground' : 'text-foreground-muted hover:bg-[rgba(212,175,55,0.07)] hover:text-foreground',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'w-4 h-4 rounded border flex items-center justify-center',
                      active ? 'border-gold bg-[rgba(212,175,55,0.18)]' : 'border-[rgba(212,175,55,0.25)]',
                    ].join(' ')}
                  >
                    {active ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : null}
                  </span>
                  <span className="flex-1 text-left">{o.label}</span>
                </button>
              );
            })}

            <div className="mt-2 flex items-center justify-between gap-3 px-2 pb-1">
              <button
                type="button"
                onClick={() => onChange([])}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground-muted hover:text-gold transition-colors"
              >
                Clear
              </button>
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost px-4 py-2 rounded-full text-xs">
                Done
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

