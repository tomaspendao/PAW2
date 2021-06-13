import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';
import jwt_decode from 'jwt-decode';

import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
})
export class EventListComponent implements OnInit {
  events!: Event[];
  adminOrPromoter!: boolean;
  user!: boolean;
  userId!: String;

  constructor(
    private rest: EventService,
    private rest2: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.adminOrPromoter = false;
    this.user = false;
    this.getEvents();
  }

  getEvents() {
    this.rest.getEvents().subscribe((data: Event[]) => {
      //console.log(data);
      this.events = data;
    });
  }


  createEvent() {
    this.router.navigate(['event-add']);
  }

  editEvent(id: string) {
    this.router.navigate(['/event-edit/' + id]);
  }

  view(id: string) {
    this.router.navigate(['/event-details/' + id]);
  }

  delete(id: string) {
    //console.log(id);
    this.rest.deleteEvent(id).subscribe(
      (_) => {
        this.getEvents();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  logout() {
    this.adminOrPromoter=false;
    this.user = false;
    this.router.navigate(['logout']);
  }

  buy(id: string) {
    this.router.navigate(['/buy-ticket/' + id]);
  }

  setRoleTemp(): void {
    let token;
    if (localStorage.getItem('currentUser') != null) {
      token = localStorage.getItem('currentUser')!.substring(0);
      let decoded = this.getDecodedAccessToken(token);

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
