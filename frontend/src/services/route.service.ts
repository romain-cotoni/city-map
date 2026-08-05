import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteFeature } from '../models/route-feature.model';
import { TransportMode } from '../models/transport-mode.model';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private http = inject(HttpClient);

  findRoute(fromLat: number, fromLon: number, toLat: number, toLon: number, mode: TransportMode): Observable<RouteFeature> {
    const params = new HttpParams()
      .set('fromLat', fromLat)
      .set('fromLon', fromLon)
      .set('toLat'  , toLat)
      .set('toLon'  , toLon)
      .set('mode'   , mode); //'CAR', 'BIKE', 'BIKE_CYCLE_PATH', 'FOOT'

    return this.http.get<RouteFeature>('api/route/', { params });
  }

}