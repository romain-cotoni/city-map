import { Injectable } from '@angular/core';
import maplibregl from 'maplibre-gl';

@Injectable({ providedIn: 'root' })
export class PoiLayerService {
  private map?: maplibregl.Map;
  private searchMarker?: maplibregl.Marker;

  attachMap(map: maplibregl.Map) {
    this.map = map;
  }

  showSearchMarker(lat: number, lon: number) {
    if (!this.map) return;
    this.searchMarker?.remove();
    this.searchMarker = new maplibregl.Marker({ color: '#ff0000' })
      .setLngLat([lon, lat])
      .addTo(this.map);
    this.map.flyTo({ center: [lon, lat], zoom: 16 });
  }

  addPoiMarker(lat: number, lon: number, label: string) {
    if (!this.map) return;
    new maplibregl.Marker({ color: '#410ecc' })
      .setLngLat([lon, lat])
      .setPopup(new maplibregl.Popup({ offset: 25 }).setText(label))
      .addTo(this.map);
  }
}