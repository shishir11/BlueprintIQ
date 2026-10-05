import React from 'react';
import type { LucideIcon } from 'lucide-react';

/* Portal-only segmented control. Real tab semantics: roving tabindex, arrow/Home/End
   keyboard movement, and aria-controls pointing at the panel each segment reveals. */

export interface SegmentOption<T extends string> {
  id: T;
  label: string;
  icon: LucideIcon;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Namespaces the generated tab/panel ids so two controls can coexist. */
  idPrefix: string;
  ariaLabel: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  idPrefix,
  ariaLabel,
}: SegmentedControlProps<T>) {
  const move = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = options.length - 1;
    let next: number | null = null;

    if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;

    event.preventDefault();
    const target = options[next];
    onChange(target.id);
    document.getElementById(`${idPrefix}-tab-${target.id}`)?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex gap-1 rounded-button border border-border-subtle bg-primary-tint p-1"
    >
      {options.map((option, index) => {
        const Icon = option.icon;
        const selected = option.id === value;

        return (
          <button
            key={option.id}
            id={`${idPrefix}-tab-${option.id}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idPrefix}-panel-${option.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
            onKeyDown={(event) => move(event, index)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-input px-4 py-3 text-sm transition
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer ${
                selected
                  ? 'bg-surface font-semibold text-ink shadow-card'
                  : 'font-medium text-foreground-secondary hover:text-ink'
              }`}
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
