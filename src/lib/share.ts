const HASH_PREFIX = "#l=";

export const SHARE_URL_WARNING_THRESHOLD = 2000;

export function encodeLatexHash(latex: string): string {
  const bytes = new TextEncoder().encode(latex);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  const b64 = btoa(bin)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return `${HASH_PREFIX}${b64}`;
}

export function decodeLatexHash(hash: string): string | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  let b64 = hash
    .slice(HASH_PREFIX.length)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  while (b64.length % 4 !== 0) b64 += "=";
  try {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

export function buildShareUrl(latex: string): string {
  return (
    window.location.origin + window.location.pathname + encodeLatexHash(latex)
  );
}
