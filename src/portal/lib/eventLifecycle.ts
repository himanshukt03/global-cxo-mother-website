import type { EventDetail, EventLifecycleStatus } from '@/portal/data/EventsData';

export function resolveEventLifecycle(event: EventDetail): EventLifecycleStatus {
  if (event.lifecycleStatus) {
    return event.lifecycleStatus;
  }

  return event.registrationOpen ? 'current' : 'past';
}

export function lifecycleBadgeClass(status: EventLifecycleStatus): string {
  if (status === 'current') {
    return 'bg-green-100 text-green-700 hover:bg-green-200';
  }

  if (status === 'archived') {
    return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
  }

  return 'bg-slate-100 text-slate-600 hover:bg-slate-200';
}

export function lifecycleBadgeClassDark(status: EventLifecycleStatus): string {
  if (status === 'current') {
    return 'bg-green-600 hover:bg-green-700 text-white';
  }

  if (status === 'archived') {
    return 'bg-amber-600 hover:bg-amber-700 text-white';
  }

  return 'bg-slate-600 hover:bg-slate-500 text-slate-200';
}

export function parseEventDateTimestamp(event: EventDetail): number {
  if ((event as any).date_start) {
    const t = new Date((event as any).date_start).getTime();
    if (!isNaN(t)) return t;
  }
  const raw = (event.date || '').trim();
  if (!raw) return 0;

  let clean = raw.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*/i, '');
  clean = clean.split(/[·@|]/)[0].trim();

  // 1. "17-19 August, 2026" or "17–19 August 2026"
  const dayRangeMonthYear = clean.match(/^(\d{1,2})\s*[-–—]\s*\d{1,2}\s+([A-Za-z]+),?\s*(\d{4})/);
  if (dayRangeMonthYear) {
    const [, startDay, month, year] = dayRangeMonthYear;
    const parsed = Date.parse(`${month} ${startDay}, ${year}`);
    if (!isNaN(parsed)) return parsed;
  }

  // 2. "January 9-11, 2026" or "September 2-5, 2025" or "August 17-19, 2026"
  const monthDayRangeYear = clean.match(/^([A-Za-z]+)\s+(\d{1,2})\s*[-–—]\s*\d{1,2},?\s*(\d{4})/);
  if (monthDayRangeYear) {
    const [, month, startDay, year] = monthDayRangeYear;
    const parsed = Date.parse(`${month} ${startDay}, ${year}`);
    if (!isNaN(parsed)) return parsed;
  }

  // 3. "18 July 2026" or "18 July, 2026"
  const dayMonthYear = clean.match(/^(\d{1,2})\s+([A-Za-z]+),?\s*(\d{4})/);
  if (dayMonthYear) {
    const [, day, month, year] = dayMonthYear;
    const parsed = Date.parse(`${month} ${day}, ${year}`);
    if (!isNaN(parsed)) return parsed;
  }

  // 4. "December 8, 2025"
  const monthDayYear = clean.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})/);
  if (monthDayYear) {
    const [, month, day, year] = monthDayYear;
    const parsed = Date.parse(`${month} ${day}, ${year}`);
    if (!isNaN(parsed)) return parsed;
  }

  // 5. "MM/DD/YYYY"
  if (/^\d{1,2}\/\d{1,2}\/\d{4}/.test(clean)) {
    const firstPart = clean.split(/[-–—]/)[0].trim();
    const [m, d, y] = firstPart.split('/');
    const t = new Date(Number(y), Number(m) - 1, Number(d)).getTime();
    if (!isNaN(t)) return t;
  }

  const directParsed = Date.parse(clean);
  if (!isNaN(directParsed)) return directParsed;

  return 0;
}
