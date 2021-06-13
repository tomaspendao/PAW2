import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locations } from '../models/location';

const endpoint = "http://localhost:3000/locations/"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocation(id:string): Observable<Locations> {
    return this.http.get<Locations>(endpoint+'show/'+id);
  }

  getLocations(): Observable<Locations[]> {
    return this.http.get<Locations[]>(endpoint );
  }

  createLocation(location: Locations): Observable<Locations> {//duvida na parte do endpoint preciso de por mais atributos para os controllers?
    return this.http.post<Locations>(endpoint + 'create', JSON.stringify(location),httpOptions);
  }

  editLocation(location:Locations):Observable<Locations> {
    return this.http.put<Locations>(endpoint + 'edit/'+location._id, JSON.stringify(location), httpOptions);
  }

  deleteLocation(id:string):Observable<Locations> {
    return this.http.delete<Locations>(endpoint + 'delete/'+id, httpOptions);
  }
}
