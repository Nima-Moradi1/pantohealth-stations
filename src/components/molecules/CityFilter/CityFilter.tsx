import { observer } from 'mobx-react-lite';
import { Button } from '../../atoms/Button/Button';
import { Select } from '../../atoms/Select/Select';
import { useStationsStore } from '../../../hooks/useStationStore';

export const CityFilter = observer(function CityFilter() {
  const store = useStationsStore();

  return (
    <div className="flex items-end gap-3">
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-muted-fg">Filter by city</label>
        <Select
          value={store.cityFilter}
          onChange={(e) => store.setCityFilter(e.target.value)}
        >
          <option value="">All cities</option>
          {store.cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
      </div>

      <Button
        type="button"
        variant="ghost"
        onClick={() => store.clearCityFilter()}
        disabled={!store.cityFilter}
        className="h-10"
        title="Clear filter"
      >
        Clear
      </Button>
    </div>
  );
});
