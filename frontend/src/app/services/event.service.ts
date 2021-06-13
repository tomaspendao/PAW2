import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Locations } from '../models/location';
import { Event } from '../models/event';

const endpoint = "http://localhost:3000/events/"
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvent(id:string): Observable<Event> {
    return this.http.get<Event>(endpoint+'show/'+id);
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(endpoint );
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(endpoint + 'create', JSON.stringify(event),httpOptions);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(endpoint + 'file_upload', formData);
  }

  uploadFileTest(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(endpoint + 'file_upload_test', formData);
  }

  editEvent(event:Event):Observable<Event> {
    return this.http.put<Event>(endpoint + 'edit/'+event._id, JSON.stringify(event), httpOptions);
  }

  deleteEvent(id:string):Observable<Event> {
    return this.http.delete<Event>(endpoint + 'delete/'+id, httpOptions);
  }

}
