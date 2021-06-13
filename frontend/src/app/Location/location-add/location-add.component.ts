import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Locations } from '../../models/location';
import { Location } from '@angular/common';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css'],
})
export class LocationAddComponent implements OnInit {
  @Input() location!: Locations;

  constructor(
    private router: Router,
    private rest: LocationService,
    private _location: Location
  ) {
    this.location = new Locations();
  }

  ngOnInit(): void {}

  add(): void {
    this.rest.createLocation(this.location).subscribe((data: Locations) => {
      console.log('Location added');
      this.navigateToLocations();
    });
  }

  navigateToLocations(): void {
    this.router.navigate(['/location-list/']);
  }
  back() {
    this._location.back();
  }
}
