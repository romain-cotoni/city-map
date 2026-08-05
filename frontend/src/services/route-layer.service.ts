import { Injectable } from '@angular/core';
import maplibregl from 'maplibre-gl';
import { TRANSPORT_MODES, TransportMode } from '../models/transport-mode.model';

@Injectable({ providedIn: 'root' })
export class RouteLayerService {
  private map?: maplibregl.Map;

  attachMap(map: maplibregl.Map) {
    this.map = map;
  }

  displayRoute(featureJson: string, mode: TransportMode) {
    if (!this.map) return;
    const feature = JSON.parse(featureJson);
    const color = TRANSPORT_MODES.find(m => m.value === mode)?.color ?? '#3b82f6';

    const source = this.map.getSource('route') as maplibregl.GeoJSONSource;
    if (source) {
      source.setData(feature);
      this.map.setPaintProperty('route-layer', 'line-color', color);
    } else {
      this.map.addSource('route', { type: 'geojson', data: feature });
      this.map.addLayer({
        id: 'route-layer',
        type: 'line',
        source: 'route',
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': color, 'line-width': 4 }
      }, 'building-3d');
    }
  }
}