import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import jwt_decode from 'jwt-decode';

import { UserService } from '../../services/user.service';
import { Ticket } from '../../models/ticket';
import { User } from '../../models/user';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
})
export class TicketListComponent implements OnInit {
  tickets!:Ticket[];
  userId!:string;
  userName!:string;
  eventName!:string;

  events!: Event[];

  constructor(
    private rest: UserService,
    private rest2: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    let token = localStorage.getItem("currentUser")!.substring(0);
    let decoded =  this.getDecodedAccessToken(token);
    this.userId= decoded.id;
    this.getUser(decoded.id);
    this.getTickets(decoded.id);
  }

  getTickets(id:string){
    this.rest.getTickets(id).subscribe((data:Ticket[]) =>{
      //console.log(data);
      this.tickets = data;
    })
  }

  getUser(id:string){
    this.rest.getUser(id).subscribe((data:User) =>{
      //console.log(data);
      this.userName = data.name
    })
  }

  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  delete(id: string) {
    //console.log(id);
    this.rest.deleteTickets(id).subscribe(
      (_) => {
        this.getTickets(this.userId);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
