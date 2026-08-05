import maplibregl from 'maplibre-gl';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, DestroyRef, afterNextRender, inject, viewChild, input, effect, output } from '@angular/core';
import { RouteLayerService } from '../services/route-layer.service';
import { PoiLayerService } from '../services/poi-layer.service';
import { Coords } from '../models/coords.model';
import { CoordsNamed } from '../models/coords-named.model';



const NICE_CENTER: [number, number] = [7.2680, 43.7006];

@Component({
  selector: 'app-map-view',
  standalone: true,
  templateUrl: './map-view.html',
  styleUrl: './map-view.css',
})
export class MapView {

  private map!: maplibregl.Map;

  private routeLayer = inject(RouteLayerService);
  private poiLayer   = inject(PoiLayerService);
  
  private readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('mapContainer');
  
  readonly selectedLocation = input<Coords | null>(null);
  readonly poiToAdd         = input<CoordsNamed | null>(null);
  readonly mapClick         = output<Coords>();


  constructor(private readonly http: HttpClient) {

    const destroyRef = inject(DestroyRef);
    
    afterNextRender(() => {
      this.map = new maplibregl.Map({
        container: this.mapContainer().nativeElement,
        style: 'mapbox-style-custom-1-patched.json',
        center: NICE_CENTER,
        zoom: 15, //16,
        pitch: 0, //60,
        bearing: 0,
        maxBounds: [ [6.9, 43.55], [7.55, 43.85] ] // sud-ouest, nord-est (lon, lat)
      });

      this.routeLayer.attachMap(this.map);

      this.poiLayer.attachMap(this.map);

      this.map.addControl(new maplibregl.NavigationControl(), 'top-right');

      destroyRef.onDestroy(() => this.map?.remove());

      // Mouse click
      this.map.on('contextmenu', (e) => {
        this.mapClick.emit({ lat: e.lngLat.lat, lon: e.lngLat.lng });
      });
      
      // Prevent warnings "Image could not be loaded" from mapbox-style-custom
      this.map.on('styleimagemissing', (e) => {
        if (this.map.hasImage(e.id)) return;
        this.map.addImage(e.id, { width: 1, height: 1, data: new Uint8Array(4) }, { pixelRatio: 1 });
      });

      this.map.on('load', () => {
        console.info("map loaded");
      });
            
    });

    effect(() => {
      const loc = this.selectedLocation();
      if (loc && this.map) {
        this.poiLayer.showSearchMarker(loc.lat, loc.lon);
      }
    });

    effect(() => {
      const poi = this.poiToAdd();
      if (poi && this.map) {
        this.poiLayer.addPoiMarker(poi.lat, poi.lon, poi.label);
      }
    });

  }

}
