import { Component, inject, output, signal } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { Poi } from '../models/poi.model';
import { PoiService } from '../services/poi.service';

@Component({
  selector: 'dash-bar',
  standalone: true,
  imports: [SearchBar],
  templateUrl: './dash-bar.html',
  styleUrl: './dash-bar.css',
})
export class DashBar {

  private poiService = inject(PoiService);
  
  private searchTimeout?: ReturnType<typeof setTimeout>;
  protected readonly locationSearched = signal<Poi | null>(null);

  protected readonly searchQuery      = signal('');
  protected readonly searchResults    = signal<Poi[]>([]);
  protected readonly locationSelected = output<Poi>();

  protected onSearchQueryChange(value: string): void {
    this.searchQuery.set(value);
    
    clearTimeout(this.searchTimeout);
    if (!value.trim()) {
      this.searchResults.set([]);
      return;
    }
    this.searchTimeout = setTimeout(() => {
      this.poiService.search(value).subscribe({
        next: (results) => this.searchResults.set(results),
        error: () => this.searchResults.set([]),
      });
    }, 300);
  }

  protected selectResult(result: Poi): void {
    this.locationSearched.set({ id: result.id, lat: result.lat, lon: result.lon, label: result.label });
    this.searchResults.set([]);
    this.searchQuery.set(result.label);
  }

  protected search(): void {
    this.locationSelected.emit(this.locationSearched()!);
    this.searchResults.set([]);
    this.searchQuery.set(this.locationSearched()!.label);
  }

  protected delete(): void {
    const poi = this.locationSearched();
    if (!poi) return;
    this.poiService.deletePoi(poi.id).subscribe({
      next : (results) => { console.info(`Deleted id ${poi.id} ${results}`) },
      error: () => console.error(`Error deleting id ${poi.id}`),
    });
  }

  protected onInputFocus(): void {
    if (this.locationSearched()) {
      this.searchQuery.set('');
      this.locationSearched.set(null);
    }
  }

}