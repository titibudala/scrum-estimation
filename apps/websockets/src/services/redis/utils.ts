export function unflatten(flat: Record<string, string>) {
  const result: any = {};

  for (const key in flat) {
    const value = flat[key];
    const keys = key.split(":");
    let current = result;

    while (keys.length > 1) {
      const part = keys.shift()!;
      current[part] ??= {};
      current = current[part];
    }

    current[keys[0]] = isNaN(Number(value)) ? value : Number(value);
  }

  return result;
}
