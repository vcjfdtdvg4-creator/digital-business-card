const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

// Dates are stored as DATE and come back as UTC midnight, so UTC getters are used.
const formatMonth = (date: Date): string => `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;

/** "Декабрь 2024 — настоящее время" / "Май 2023 — Ноябрь 2024" */
export function formatPeriod(start: Date, end?: Date | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'настоящее время'}`;
}
