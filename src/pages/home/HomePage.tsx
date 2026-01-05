import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStationsStore } from '../../hooks/useStationStore';
import { CityFilter } from '../../components/molecules/CityFilter/CityFilter';
import { StationsList } from '../../components/organisms/StationList/StationList';
import { StationsMap } from '../../components/organisms/StationsMap/StationsMap';

const HomePage = observer(function HomePage() {
  const store = useStationsStore();

  useEffect(() => {
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
        <StationsMap />
      </section>
    </div>
  );
});

export default HomePage;
