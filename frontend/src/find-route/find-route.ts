import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBar } from "../search-bar/search-bar";
import { Poi } from '../models/poi.model';
import { CoordsNamed } from '../models/coords-named.model';
import { TRANSPORT_MODES, TransportMode } from '../models/transport-mode.model';
import { RouteService } from '../services/route.service';
import { PoiService } from '../services/poi.service';
import { RouteLayerService } from '../services/route-layer.service';

@Component({
  selector: 'find-route',
  standalone: true,
  templateUrl: './find-route.html',
  styleUrl: './find-route.css',
  imports: [SearchBar, FormsModule],
})
export class FindRoute {

  private poiService   = inject(PoiService);
  private routeService = inject(RouteService);
  private routeLayer   = inject(RouteLayerService);
 
  private fromTimeout?: ReturnType<typeof setTimeout>;
  private toTimeout?: ReturnType<typeof setTimeout>;
 
  protected readonly fromQuery    = signal('');
  protected readonly fromResults  = signal<Poi[]>([]);
  protected readonly fromSelected = signal<CoordsNamed | null>(null);
  
  protected readonly toQuery    = signal('');
  protected readonly toResults  = signal<Poi[]>([]);
  protected readonly toSelected = signal<CoordsNamed | null>(null);
 
  protected readonly mode           = signal<TransportMode>('CAR');
  protected readonly transportModes = TRANSPORT_MODES;

  protected readonly canCalculate = computed(() => !!this.fromSelected() && !!this.toSelected());


  protected onFromChange(value: string): void {
  
    this.fromQuery.set(value);
    this.fromSelected.set(null);
 
    clearTimeout(this.fromTimeout);
    if (!value.trim()) {
      this.fromResults.set([]);
      return;
    }
 
    this.fromTimeout = setTimeout(() => {
      this.poiService.search(value).subscribe({
        next: (results) => this.fromResults.set(results),
        error: () => this.fromResults.set([]),
      });
    }, 300);
  }
 
  protected onFromSelect(result: Poi): void {
    this.fromSelected.set({ lat: result.lat, lon: result.lon, label: result.label });
    this.fromResults.set([]);
    this.fromQuery.set(result.label);
  }
 
  protected onToChange(value: string): void {
    this.toQuery.set(value);
    this.toSelected.set(null);
 
    clearTimeout(this.toTimeout);
    if (!value.trim()) {
      this.toResults.set([]);
      return;
    }
 
    this.toTimeout = setTimeout(() => {
      this.poiService.search(value).subscribe({
        next: (results) => this.toResults.set(results),
        error: () => this.toResults.set([]),
      });
    }, 300);
  }
 
  protected onToSelect(result: Poi): void {
    this.toSelected.set({ lat: result.lat, lon: result.lon, label: result.label });
    this.toResults.set([]);
    this.toQuery.set(result.label);
  }

  protected onModeChange(value: string): void {
    this.mode.set(value as TransportMode);
  }
 
  protected calculateRoute(): void {
    const from = this.fromSelected();
    const to = this.toSelected();
    if (!from || !to) return;
 
    this.routeService.findRoute(from.lat, from.lon, to.lat, to.lon, this.mode()).subscribe({
      next: (dto) => this.routeLayer.displayRoute(dto.feature, this.mode()),
      error: (err) => console.error('Erreur lors du calcul d\'itinéraire', err),
    });
  }

  protected onFromFocus(): void {
    if (this.fromSelected()) {
      this.fromQuery.set('');
      this.fromSelected.set(null);
    }
  }

  protected onToFocus(): void {
    if (this.toSelected()) {
      this.toQuery.set('');
      this.toSelected.set(null);
    }
  }


}
