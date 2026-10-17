/**
 * Groups rows by key and returns the groups in the order of `keys`.
 * This is exactly the contract DataLoader expects from a batch function:
 * the result has the same length and order as the requested keys.
 */
export function groupByKey<T, K>(
  keys: readonly K[],
  rows: readonly T[],
  getKey: (row: T) => K,
): T[][] {
  const groups = new Map<K, T[]>();
  for (const row of rows) {
    const key = getKey(row);
    const group = groups.get(key);
    if (group) group.push(row);
    else groups.set(key, [row]);
  }
  return keys.map((key) => groups.get(key) ?? []);
}
