import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapView } from '../map-view/map-view';
import { PoiService } from '../services/poi.service';
import { Poi } from '../models/poi.model';
import { Coords } from '../models/coords.model';
import { CoordsNamed } from '../models/coords-named.model';
import { Dashboard } from "../dashboard/dashboard";
import { AddPoiModal } from '../add-poi-modal/add-poi-modal';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapView, AddPoiModal, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  private poiService = inject(PoiService);
  
  private clickCoords: Coords | null = null;

  protected readonly message = signal<string | null>(null);
  protected readonly error   = signal<string | null>(null);

  protected readonly searchQuery    = signal('');
  protected readonly searchResults  = signal<Poi[]>([]);
  protected readonly selectedResult = signal<CoordsNamed | null>(null);

  protected selectedLocation = signal<Coords | null>(null);
  protected showAddPoiForm   = signal(false);
  protected poiToAdd         = signal<CoordsNamed | null>(null);



  constructor(private readonly http: HttpClient) {}

  protected onLocationSelected(loc: CoordsNamed): void {
    this.selectedResult.set(loc);
  }

  onMapClick(coords: Coords) {
    this.clickCoords = coords;
    this.showAddPoiForm.set(true);
  }

  onAddConfirmed(data: { label: string; description: string }) {
    const payload = { ...data, ...this.clickCoords! };
    this.poiService.addPoi(payload).subscribe(() => {
      this.showAddPoiForm.set(false);
      this.poiToAdd.set(payload);
    });
  }

  cancel() {
    this.showAddPoiForm.set(false);
  }

}
