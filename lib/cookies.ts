/**
 * Tiny cookie helpers. Wrapped in functions so React Compiler doesn't treat
 * `document.cookie = ...` as an external-binding mutation.
 */
export function setCookie(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 365) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : undefined;
}
