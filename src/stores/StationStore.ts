import { makeAutoObservable, reaction, runInAction } from 'mobx';
import type { Station, StationId } from '../types/station';
import { fetchStations } from '../services/stationApi';

const LS_CITY_FILTER = 'panto:cityFilter';
const LS_SELECTED_ID = 'panto:selectedStationId';

export class StationsStore {
  stations: Station[] = [];
  loading = false;
  error: string | null = null;

  cityFilter = '';
  selectedStationId: StationId | null = null;

  constructor() {
    makeAutoObservable(this);

    // i added this for persistence when later, users will be exploring the app
    // I intentioanlly keep it small -> MobX reactions are perfect here.
    this.cityFilter = localStorage.getItem(LS_CITY_FILTER) ?? '';
    const savedId = localStorage.getItem(LS_SELECTED_ID);
    this.selectedStationId = savedId ? Number(savedId) : null;

    reaction(
      () => this.cityFilter,
      (val) => localStorage.setItem(LS_CITY_FILTER, val),
    );

    reaction(
      () => this.selectedStationId,
      (val) => {
        if (val == null) localStorage.removeItem(LS_SELECTED_ID);
        else localStorage.setItem(LS_SELECTED_ID, String(val));
      },
    );
  }

  get cities(): string[] {
    return Array.from(new Set(this.stations.map((s) => s.city))).sort((a, b) =>
      a.localeCompare(b),
    );
  }

  get filteredStations(): Station[] {
    const f = this.cityFilter.trim().toLowerCase();
    if (!f) return this.stations;
    return this.stations.filter((s) => s.city.toLowerCase() === f);
  }

  get selectedStation(): Station | null {
    if (this.selectedStationId == null) return null;
    return this.stations.find((s) => s.id === this.selectedStationId) ?? null;
  }

  setCityFilter(city: string) {
    this.cityFilter = city;

    // If current selection no longer exists in filtered list, clear it.
    if (this.selectedStationId != null) {
      const stillVisible = this.filteredStations.some((s) => s.id === this.selectedStationId);
      if (!stillVisible) this.selectedStationId = null;
    }
  }

  clearCityFilter() {
    this.setCityFilter('');
  }

  selectStation(id: StationId) {
    this.selectedStationId = id;
  }

  clearSelection() {
    this.selectedStationId = null;
  }

  async loadStations() {
    this.loading = true;
    this.error = null;

    const ac = new AbortController();

    try {
      const data = await fetchStations(ac.signal);
      runInAction(() => {
        this.stations = data;
        this.loading = false;

        // If persisted filter doesn't match available cities, reset it safely.
        if (this.cityFilter && !this.cities.includes(this.cityFilter)) {
          this.cityFilter = '';
        }
      });
    } catch (e) {
      runInAction(() => {
        this.loading = false;
        this.error = e instanceof Error ? e.message : 'Unknown error';
      });
    }

    return () => ac.abort();
  }
}
