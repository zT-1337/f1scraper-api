export function convertStringToInteger(
  value: string,
  defaultValue: number,
): number {
  const result = parseInt(value);

  if (isNaN(result)) {
    return defaultValue;
  }

  return result;
}
