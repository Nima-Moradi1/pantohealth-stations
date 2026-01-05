import { observer } from 'mobx-react-lite';
import { useStationsStore } from '../../../hooks/useStationStore';

export const StationsList = observer(function StationsList() {
  const store = useStationsStore();
  const stations = store.filteredStations;

  if (store.loading) return <p className="text-sm text-muted-fg">Loading stations…</p>;
  if (store.error) return <p className="text-sm text-danger">{store.error}</p>;
  if (!stations.length) return <p className="text-sm text-muted-fg">No stations found.</p>;

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
      {stations.map((s) => {
        const selected = store.selectedStationId === s.id;

        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => store.selectStation(s.id)}
              className={`w-full px-4 py-3 text-left transition hover:bg-muted ${
                selected ? 'bg-muted' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-fg">{s.city}</div>
                </div>

                {selected ? (
                  <span className="rounded-md bg-primary px-2 py-1 text-xs text-primary-fg">
                    Selected
                  </span>
                ) : null}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
});
