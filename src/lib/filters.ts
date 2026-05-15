export function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function includesText(values: string[], query: string) {
  if (!query) return true;
  const normalized = query.toLowerCase();
  return values.some((value) => value.toLowerCase().includes(normalized));
}
