import { ApiError } from '../types/api';

/* a small fetch helper */
export async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ApiError(
      `Request failed (${res.status})${text ? `: ${text}` : ''}`,
      res.status,
    );
  }

  try {
    return (await res.json()) as T;
  } catch (cause) {
    throw new ApiError('Failed to parse JSON response', res.status, cause);
  }
}
