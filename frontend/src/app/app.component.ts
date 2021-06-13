import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
  userId!: String;
  userName!: String;
  admin!:boolean;
  user!:boolean;
  adminOrPromoter!:boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: UserService
  ) {}

  setUserName(): void {
    let token;
    if (localStorage.getItem('currentUser') != null) {
      token = localStorage.getItem('currentUser')!.substring(0);
      let decoded = this.getDecodedAccessToken(token);

      this.userId = decoded.id;
      this.getUser(decoded.id);
    } else {
      this.userName = '';
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getUser(id: string) {
    this.rest.getUser(id).subscribe((data: User) => {
      //console.log(data);
      this.userName = data.name;
      
      if(data.role == "ADMIN"){
        this.admin = true;
      }
      if(data.role == "ADMIN" || data.role == "PROMOTER" ){
        this.adminOrPromoter = true;
      }
      if(data.role == "USER"){
        this.user = true;
      }
    });
  }

  navigateToPromoters(): void {
    this.router.navigate(['/promoter-list/']);
  }

  navigateToLocations(): void {
    this.router.navigate(['/location-list']);
  }

  navigateToEvents(): void {
    this.router.navigate(['/event-list']);
  }

  navigateToUsers(): void {
    this.router.navigate(['/user-list']);
  }

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    this.admin=false;
    this.adminOrPromoter=false;
    this.user = false;
    this.userName = "";
    this.router.navigate(['logout']);
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  tickets(): void {
    this.router.navigate(['/tickets']);
  }
}
