import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import jwt_decode from 'jwt-decode';
import { Ticket } from '../../models/ticket';
import { EventService } from '../../services/event.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css'],
})
export class BuyTicketComponent implements OnInit {
  @Input() ticket!: Ticket;
  url!: string | ArrayBuffer | null;
  file: any;
  fileName = '';
  message = '';

  constructor(
    private rest: EventService,
    private rest2: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location
  ) {
    this.ticket = new Ticket();
  }

  ngOnInit(): void {}

  buy() {
    let id = this.route.snapshot.params['id'];
    let token = localStorage.getItem('currentUser')!.substring(0); //obter o token
    //let decoded =  this.getDecodedAccessToken(token); //decode do token!!
    this.rest2.addTicket(id, token, this.fileName).subscribe((data: Ticket) => {
      this.router.navigate(['/event-list']);
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  navigateToEvents(): void {
    this.router.navigate(['/event-list/']);
  }

  back() {
    this._location.back();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    //console.log(file);

    if (file) {
      this.fileName = file.name;
      this.rest.uploadFileTest(file).subscribe((result: any) => {
        //console.log(result);
        //this.fileName = '';
        this.message = result.message;
      });
    }
  }
}
