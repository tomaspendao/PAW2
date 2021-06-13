import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../models/event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  @Input() event!: Event;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: EventService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getEvent(idTemp).subscribe((data: Event) => {
      this.event = data;
    });
  }

  navigateToEvents(): void {
    this.router.navigate(['/event-list']);
  }

  back() {
    this._location.back();
  }
}
