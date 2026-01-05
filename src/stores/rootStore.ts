import { StationsStore } from './StationStore';

export class RootStore {
  readonly stationsStore = new StationsStore();
}

export const rootStore = new RootStore();
