import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoordsNamed } from '../models/coords-named.model';
import { Poi } from '../models/poi.model';


@Injectable({ providedIn: 'root' })
export class PoiService {
  private http = inject(HttpClient);

  search(query: string): Observable<Poi[]> {
    return this.http.get<Poi[]>('api/poi/search', { params: { q: query } });
  }

  addPoi(poi: CoordsNamed): Observable<void> {
    return this.http.post<void>('api/poi/add', poi);
  }

  deletePoi(id: Number): Observable<boolean> {
    return this.http.delete<boolean>(`api/poi/delete/${id}`);
  }

  
}