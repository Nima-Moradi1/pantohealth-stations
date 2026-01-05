import { useRootStore } from '../app/providers/StoresProvider';

export function useStationsStore() {
  return useRootStore().stationsStore;
}
