import L from 'leaflet';


//Marker icon builder
export function stationDivIcon(selected: boolean) {
  return L.divIcon({
    className: '',
    html: `<div class="station-marker ${selected ? 'station-marker--selected' : ''}"></div>`,
    iconSize: selected ? [18, 18] : [14, 14],
    iconAnchor: selected ? [9, 9] : [7, 7],
  });
}
