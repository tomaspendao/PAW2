import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../../services/auth-rest-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  name: string;
  email: string;
  password: string;
  role: string;

  constructor(
    private router: Router,
    private authServive: AuthRestServiceService,
    private _location: Location
  ) {
    this.name = '';
    this.password = '';
    this.email = '';
    this.role = '';
  }

  ngOnInit(): void {}

  register(): void {
    this.authServive
      .register(this.name, this.email, this.password, 'USER')
      .subscribe((user: any) => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/']);
        } else {
          alert('Erro no login!');
        }
      });
  }

  login() {
    this.router.navigate(['login']);
  }

  back() {
    this._location.back();
  }
}
