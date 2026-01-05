export type StationId = number;

export interface Station {
  id: StationId;
  name: string;
  city: string;
  lat: number;
  lng: number;
}
