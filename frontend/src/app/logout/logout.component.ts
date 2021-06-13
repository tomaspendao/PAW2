import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRestServiceService } from '../services/auth-rest-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authServive: AuthRestServiceService) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authServive.logout();
    this.router.navigate(['/']);
  }
}
