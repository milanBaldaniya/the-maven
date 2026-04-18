import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

type Option = { value: string; label: string };

type Props = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

export default function AppSelect({ name, value, onChange, options, placeholder, disabled }: Props) {
  const id = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);

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

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />
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
        <span className={selected ? 'text-foreground' : 'text-foreground-muted/80'}>
          {selected?.label || placeholder || 'Select'}
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
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.18)] bg-bg-card shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        >
          <div className="max-h-64 overflow-auto">
            {options.map((o) => {
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={[
                    'w-full px-4 py-3 text-sm flex items-center justify-between gap-3 transition-colors',
                    active ? 'bg-[rgba(212,175,55,0.10)] text-foreground' : 'text-foreground-muted hover:bg-[rgba(212,175,55,0.07)] hover:text-foreground',
                  ].join(' ')}
                >
                  <span>{o.label}</span>
                  {active ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

