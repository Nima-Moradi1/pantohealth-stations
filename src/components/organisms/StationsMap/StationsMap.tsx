import { observer } from 'mobx-react-lite';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { useStationsStore } from '../../../hooks/useStationStore';
import { stationDivIcon } from '../../../lib/leafletIcons';

const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];

const MapSelectionController = observer(function MapSelectionController() {
  const store = useStationsStore();
  const map = useMap();

  useEffect(() => {
    const s = store.selectedStation;
    if (!s) return;

    // i wrote this intentionally imperative:
    // leaflet's map instance is not React state; "flyTo" is the cleanest UX here.
    map.flyTo([s.lat, s.lng], 12, { duration: 0.8 });
  }, [map, store.selectedStation]);

  useEffect(() => {
    const stations = store.filteredStations;
    if (!stations.length) return;

    // auto-fit to visible markers when filtering changes.
    // when a station is selected, selection takes priority.
    if (store.selectedStation) return;

    if (stations.length === 1) {
      map.setView([stations[0].lat, stations[0].lng], 11);
      return;
    }

    const bounds = L.latLngBounds(stations.map((s) => [s.lat, s.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, store.filteredStations, store.selectedStation]);

  return null;
});

export const StationsMap = observer(function StationsMap() {
  const store = useStationsStore();
  const stations = store.filteredStations;

  const markers = useMemo(
    () =>
      stations.map((s) => ({
        station: s,
        selected: store.selectedStationId === s.id,
      })),
    [stations, store.selectedStationId],
  );

  return (
    <div className="h-155 overflow-hidden rounded-lg border border-border">
      <MapContainer center={GERMANY_CENTER} zoom={6} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapSelectionController />

        {markers.map(({ station, selected }) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={stationDivIcon(selected)}
            eventHandlers={{
              click: () => store.selectStation(station.id),
            }}
          >
            <Popup>
              <div className="space-y-1">
                <div className="text-sm font-semibold">{station.name}</div>
                <div className="text-xs text-muted-fg">{station.city}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
});
