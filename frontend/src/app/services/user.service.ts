import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { Ticket } from '../models/ticket';

const endpointPromoters = 'http://localhost:3000/promoters/';
const endpointAdmins = 'http://localhost:3000/admins/';
const endpointUsers = 'http://localhost:3000/users/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export interface iUserService {
  getUsers():Observable<User[]>;
  getUser(id: string): Observable<User>;
  createUser(promoter: User): Observable<User>;
  editUser(user: User): Observable<User>;
  deleteUser(id: string): Observable<User>;
}
@Injectable({
  providedIn: 'root',
})
export class UserService implements iUserService{
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpointUsers);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpointUsers + 'show/' + id);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(endpointUsers+'create', JSON.stringify(user), httpOptions);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(endpointUsers+'edit/' + user._id, JSON.stringify(user), httpOptions);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpointUsers+'delete/' + id, httpOptions);
  }

  getTickets(Userid: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(endpointUsers+ 'showtickets/' + Userid);
  }

  deleteTickets(ticketId: string): Observable<Ticket> {
    return this.http.delete<Ticket>(endpointUsers+ 'deleteticket/' + ticketId, httpOptions);
  }
}

@Injectable({
  providedIn: 'root',
})
export class PromoterService{
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpointPromoters );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpointPromoters + 'show/' + id);
  }

  createUser(promoter: User): Observable<User> {
    return this.http.post<User>(endpointPromoters+'create', JSON.stringify(promoter), httpOptions);
  }

  editUser(promoter: User): Observable<User> {
    return this.http.put<User>(endpointPromoters+'edit/' + promoter._id, JSON.stringify(promoter), httpOptions);
  }

  deleteUser(id:string): Observable<User> {
    return this.http.delete<User>(endpointPromoters + 'delete/' + id, httpOptions);
  }
}
@Injectable({
  providedIn: 'root',
})
export class AdminService implements iUserService{
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(endpointAdmins);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(endpointAdmins + 'show/' + id);
  }

  createUser(admin: User): Observable<User> {
    return this.http.post<User>(endpointAdmins+'create', JSON.stringify(admin), httpOptions);
  }

  editUser(admin: User): Observable<User> {
    return this.http.put<User>(endpointAdmins+'edit/' + admin._id, JSON.stringify(admin), httpOptions);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(endpointAdmins+'delete/' + id, httpOptions);
  }
}
