import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStationsStore } from '../../hooks/useStationStore';
import { CityFilter } from '../../components/molecules/CityFilter/CityFilter';
import { StationsList } from '../../components/organisms/StationList/StationList';

const HomePage = observer(function HomePage() {
  const store = useStationsStore();

  useEffect(() => {
    // single load on entry -> store owns the request state.
    void store.loadStations();
  }, [store]);

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <section className="space-y-4">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <CityFilter />
        </div>

        <StationsList />
      </section>

      <section className="rounded-lg border border-border bg-surface p-4 shadow-card">
        <p className="text-sm text-muted-fg">
          Map placeholder — next we will mount Leaflet and sync selection + filter.
        </p>
      </section>
    </div>
  );
});

export default HomePage;
