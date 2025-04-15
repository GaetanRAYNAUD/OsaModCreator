export const cleanBlank = (s: string): string | undefined => {
  if (!s) {
    return undefined;
  }

  s = s.trim();

  return s.length === 0 ? undefined : s;
};