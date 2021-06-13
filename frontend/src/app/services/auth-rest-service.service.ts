import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const endpoint = 'http://localhost:3000/auth/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthRestServiceService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthRestModelResponse> {
    return this.http.post<AuthRestModelResponse>(
      endpoint + 'login',
      new LoginModel(email, password)
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  register(
    name: string,
    email: string,
    password: string,
    role: string
  ): Observable<AuthRestModelResponse> {
    //mudar para switch...
    if (role === 'ADMIN') {
      return this.http.post<any>(
        'http://localhost:3000/auth/register-admin',
        new RegisterModel(name, email, password, role)
      ); // é preciso auth/users/register?
    } else if (role === 'PROMOTER') {
      return this.http.post<any>(
        'http://localhost:3000/auth/register-promoter',
        new RegisterModel(name, email, password, role)
      );
    } else {
      return this.http.post<any>(
        'http://localhost:3000/auth/register-user',
        new RegisterModel(name, email, password, role)
      );
    }
  }
}

export interface AuthRestModelResponse {}

export class LoginModel {
  constructor(public email: string, public password: string) {}
}

export class RegisterModel {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: string
  ) {}
}
