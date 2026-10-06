import React from 'react';

/* Charts, built to the dataviz method.

   Colour decision, recorded: this design system carries exactly one brand hue, and adding
   categorical hues would mean editing src/index.css, which is outside the scope contract. So
   magnitude is encoded as a SEQUENTIAL single-hue ramp (primary at descending opacity), never a
   cycled categorical palette. The validator flags the lighter steps at 2.29:1 against the surface,
   which obligates relief rather than dismissal — so every segment is directly labelled with its
   name and value in the legend, and identity is never carried by colour alone. */

export interface DonutDatum {
  label: string;
  value: number;
  /** 0 = strongest step. Index into the sequential ramp. */
  step?: number;
}

const RAMP = ['text-primary', 'text-primary/70', 'text-primary/45'];

export const Donut: React.FC<{
  data: DonutDatum[];
  centreValue: string;
  centreLabel: string;
  title: string;
  unit?: string;
}> = ({ data, centreValue, centreLabel, title, unit = '' }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
      <svg viewBox="0 0 140 140" role="img" aria-label={title} className="h-36 w-36 shrink-0">
        <circle cx="70" cy="70" r={radius} fill="none" strokeWidth="14" className="stroke-primary-tint" />
        {data.map((d, i) => {
          const fraction = d.value / total;
          const dash = fraction * circumference;
          const el = (
            <circle
              key={d.label}
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              strokeWidth="14"
              strokeDasharray={`${Math.max(dash - 2, 0)} ${circumference - Math.max(dash - 2, 0)}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 70 70)"
              className={`${RAMP[(d.step ?? i) % RAMP.length]} stroke-current`}
            />
          );
          offset += dash;
          return el;
        })}
        <text x="70" y="66" textAnchor="middle" fontSize={18} className="fill-ink font-bold">
          {centreValue}
        </text>
        <text x="70" y="84" textAnchor="middle" fontSize={9} className="fill-foreground-muted">
          {centreLabel}
        </text>
      </svg>

      {/* Legend: every segment directly labelled with its value — the contrast relief the
          validator requires, and identity that does not depend on colour. */}
      <ul className="w-full space-y-2">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${RAMP[(d.step ?? i) % RAMP.length].replace('text-', 'bg-')}`}
                aria-hidden="true"
              />
              <span className="truncate text-foreground-secondary">{d.label}</span>
            </span>
            <span className="shrink-0 font-medium text-ink">
              {d.value.toLocaleString('en-GB')}
              {unit}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/** Single-series trend. No legend: the title names it. 2px line, no gradient fill. */
export const Sparkline: React.FC<{ points: number[]; label: string }> = ({ points, label }) => {
  if (points.length < 2) return null;
  const width = 240;
  const height = 48;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = max - min || 1;
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * width;
      const y = height - ((p - min) / span) * (height - 6) - 3;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className="h-12 w-full">
      <path d={d} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary" />
    </svg>
  );
};
