import { describe, expect, it } from 'vitest';
import { StationsStore } from './StationStore';
import type { Station } from '../types/station';

const stations: Station[] = [
  { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 1, lng: 1 },
  { id: 2, name: 'Hamburg Hbf', city: 'Hamburg', lat: 2, lng: 2 },
  { id: 3, name: 'Berlin Ostbahnhof', city: 'Berlin', lat: 3, lng: 3 },
];

describe('StationsStore', () => {
  it('filters by city and clears selection when it becomes invisible', () => {
    const store = new StationsStore();
    store.stations = stations;

    store.selectStation(2);
    expect(store.selectedStation?.city).toBe('Hamburg');

    store.setCityFilter('Berlin');

    expect(store.filteredStations.map((s) => s.city)).toEqual(['Berlin', 'Berlin']);
    // selection cleared as it no longer matches filter
    expect(store.selectedStation).toBeNull(); 
  });
});
