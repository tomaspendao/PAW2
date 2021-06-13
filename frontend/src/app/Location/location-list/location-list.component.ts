import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Locations } from '../../models/location';
import { Location } from '@angular/common';
import { LocationService } from '../../services/location.service';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit {
  //@Input() name!:string;
  locations!: Locations[];
  admin!: boolean;
  adminOrPromoter!: boolean;

  constructor(
    private rest: LocationService,
    private rest2: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.admin = false;
    this.adminOrPromoter = false;
    this.getLocations();
  }

  getLocations() {
    this.rest.getLocations().subscribe((data: Locations[]) => {
      //console.log(data);
      this.locations = data;
    });
  }

  createLocation() {
    this.router.navigate(['/location-add']);
  }

  editLocation(id: string) {
    this.router.navigate(['/location-edit/' + id]);
  }

  view(id: string) {
    this.router.navigate(['/location-details/' + id]);
  }

  delete(id: string) {
    //console.log(id);
    this.rest.deleteLocation(id).subscribe(
      (_) => {
        this.getLocations();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.admin = false;
    this.adminOrPromoter = false;
    this.router.navigate(['logout']);
  }

  setRole(): void {
    let token;
    if (localStorage.getItem('currentUser') != null) {
      token = localStorage.getItem('currentUser')!.substring(0);
      let decoded = this.getDecodedAccessToken(token);

      this.getUser(decoded.id);
    } else {
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
    this.rest2.getUser(id).subscribe((data: User) => {
      //console.log(data);      
      if(data.role == "ADMIN"){
        this.admin = true;
      }
      if(data.role == "ADMIN" || data.role == "PROMOTER" ){
        this.adminOrPromoter = true;
      }
    });
  }

  back() {
    this._location.back();
  }
}
