import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import jwt_decode from 'jwt-decode';
import {Location} from '@angular/common';
import { PromoterService, UserService } from '../../services/user.service';

@Component({
  selector: 'app-promoter-list',
  templateUrl: './promoter-list.component.html',
  styleUrls: ['./promoter-list.component.css'],
})
export class PromoterListComponent implements OnInit {
  promoters!: User[];
  adminOrPromoter!: boolean;
  user!: boolean;
  promoteri!:boolean;
  userId!: String;

  promId!:string;

  constructor(
    private rest: PromoterService,
    private rest2: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getPromoters();
  }

  getPromoters() {
    this.adminOrPromoter = false;
    this.user = false;
    this.promoteri = false;
    this.rest.getUsers().subscribe((data: User[]) => {
      //console.log(data);
      this.promoters = data;
    });
  }

  createPromoter() {
    this.router.navigate(['/register-promoter']);
  }

  editPromoter(id: string) {
    this.router.navigate(['/promoter-edit/' + id]);
  }

  view(id: string) {
    this.router.navigate(['/promoter-details/' + id]);
  }

  delete(id: string) {
    //console.log(id);
    this.rest.deleteUser(id).subscribe(
      (_) => {
        this.getPromoters();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.adminOrPromoter = false;
    this.user = false;
    this.promoteri = false;
    this.router.navigate(['logout']);
  }

  setRoleTemp(promId: string): void {
    let token;
    if (localStorage.getItem('currentUser') != null) {
      token = localStorage.getItem('currentUser')!.substring(0);
      let decoded = this.getDecodedAccessToken(token);

      //console.log("VALOR: " + promId);
      this.promId = promId;
      this.userId = decoded.id;
      this.getUser(decoded.id);
    } 
  }

  getUser(id: string) {
    this.rest2.getUser(id).subscribe((data: User) => {
      //console.log(data);      
      if(data.role == "ADMIN" || data.role == "PROMOTER"){
        this.adminOrPromoter = true;
      }
      if(data.role == "USER"){
        this.user = true;
      }
      if(data._id == this.promId || data.role == "ADMIN"){
        this.promoteri = true;
      }
    });
  }
  
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  back() {
    this._location.back();
  }
}
