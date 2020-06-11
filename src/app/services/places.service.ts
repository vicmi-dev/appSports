import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPlaces } from '../interfaces/iplaces';


const SERVIDOR = 'http://localhost:8080/api/offered_places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) { }

  obtenerSitios() {
    return (this.http.get<IPlaces[]>(SERVIDOR));
  }

  obtenerSitio(id: string) {
    return (this.http.get<IPlaces>(SERVIDOR + '/' + id));
  }

  enviarSitio(place: IPlaces) {
    return (this.http.post(SERVIDOR, place));
  }
  deleteSitio(id: string) {
    return (this.http.delete(SERVIDOR + '/' + id));
  }
  actualizarSitio(place: IPlaces) {
    return (this.http.put(SERVIDOR + '/' + place.id, place));
  }
}
