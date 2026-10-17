import React from 'react';
import type { LucideIcon } from 'lucide-react';

/* Portal-only labelled field: label row with an optional right-aligned caption, a leading
   icon inside the control, an optional muted suffix chip, and a help line beneath.
   Invalid state wires aria-invalid and aria-describedby to the caller's error element. */

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Small right-aligned caption sitting on the label row. */
  caption?: string;
  icon?: LucideIcon;
  /** Muted chip pinned to the right edge of the control. */
  suffix?: string;
  help?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
  /** Id of an external message (an error region) to announce with the field. */
  describedBy?: string;
  disabled?: boolean;
}

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  value,
  onChange,
  caption,
  icon: Icon,
  suffix,
  help,
  type = 'text',
  placeholder,
  autoComplete,
  invalid = false,
  describedBy,
  disabled = false,
}) => {
  const helpId = help ? `${id}-help` : undefined;
  const described = [helpId, describedBy].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        {caption && (
          <span className="text-xs font-medium uppercase tracking-[0.12em] text-foreground-muted">
            {caption}
          </span>
        )}
      </div>

      <div className="relative mt-2">
        {Icon && (
          <Icon
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground-muted"
            aria-hidden="true"
          />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={described}
          className={`w-full rounded-input border bg-primary-tint py-3 text-base text-ink
            transition placeholder:text-foreground-muted focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-primary
            disabled:cursor-not-allowed disabled:opacity-60
            ${Icon ? 'pl-11' : 'pl-4'} ${suffix ? 'pr-28' : 'pr-4'}
            ${invalid ? 'border-danger' : 'border-border-strong'}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-input bg-surface px-2.5 py-1 text-xs font-medium text-foreground-muted">
            {suffix}
          </span>
        )}
      </div>

      {help && (
        <p id={helpId} className="mt-2 text-sm text-foreground-secondary">
          {help}
        </p>
      )}
    </div>
  );
};
