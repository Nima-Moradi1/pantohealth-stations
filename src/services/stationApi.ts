import { fetchJson } from './http';
import type { Station } from '../types/station';


// I’ll allow overriding the endpoint with an env var, but default to a local file.
const DEFAULT_ENDPOINT = '/stations.json';

export function getStationsEndpoint() {
  // If we deploy a real API later, we can set VITE_STATIONS_API_URL.
  return import.meta.env.VITE_STATIONS_API_URL ?? DEFAULT_ENDPOINT;
}

export async function fetchStations(signal?: AbortSignal): Promise<Station[]> {
  const endpoint = getStationsEndpoint();
  return fetchJson<Station[]>(endpoint, { signal });
}
