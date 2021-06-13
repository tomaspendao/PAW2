import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Event } from '../../models/event';
import { Locations } from '../../models/location';
import { EventService } from '../../services/event.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css'],
})
export class EventAddComponent implements OnInit {
  @Input() event!: Event;
  locations!: Locations[];
  url!: string | ArrayBuffer | null;
  file: any;
  fileName = '';
  message = '';

  constructor(
    private router: Router,
    private rest: EventService,
    private _location: Location,
    private location: LocationService
  ) {
    this.event = new Event();
  }

  ngOnInit(): void {
    this.location.getLocations().subscribe((data: Locations[]) => {
      //console.log(data);
      this.locations = data;
    });
  }

  add(): void {
    //debugger;
    this.rest.createEvent(this.event).subscribe((data: Event) => {
      console.log('Event added');
      this.navigateToEvents();
    });
  }

  navigateToEvents(): void {
    this.router.navigate(['/event-list/']);
  }
  back() {
    this._location.back();
  }

  readUrl(eventi: any) {
    if (eventi.target.files && eventi.target.files[0]) {
      this.file = eventi.target.files[0];
      var reader = new FileReader();

      reader.onload = (eventi: ProgressEvent) => {
        this.url = (<FileReader>eventi.target).result;
      };

      reader.readAsDataURL(eventi.target.files[0]);
    }
  }


  onFileSelected(event:any) {

    const file: File = event.target.files[0];

    //console.log(file);

    if (file) {

      this.fileName = file.name;
      this.rest.uploadFile(file).subscribe((result:any) => {
        //console.log(result);
        this.fileName = '';
        this.message = result.message;
      });
    }
  }
}
