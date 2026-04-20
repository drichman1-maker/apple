// Fail-closed env helper.
// - In production builds: throws at module load if VITE_API_URL is missing.
// - In dev: falls back to http://localhost:3001 so `npm run dev` works out of the box.

function requireProdEnv(name, devFallback) {
  const value = import.meta.env[name];
  if (value) return value;
  if (import.meta.env.PROD) {
    throw new Error(
      `Missing required env var ${name}. Set it in Vercel (and .env.local for local dev).`
    );
  }
  return devFallback;
}

export const API_URL = requireProdEnv('VITE_API_URL', 'http://localhost:3001');
