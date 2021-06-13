import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket';
import jwt_decode from 'jwt-decode';

const endpoint = 'http://localhost:3000/users/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}

  addTicket(eventId: string, token: string,url: string) {
    let decoded = this.getDecodedAccessToken(token);
    var ticket: Ticket = new Ticket();
    ticket.eventId = eventId;
    ticket.userId = <string>decoded.id;
    ticket.file = url;
    //console.log(ticket);
    return this.http.post<any>(
      endpoint + 'addTicket',
      JSON.stringify(ticket),
      httpOptions
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
