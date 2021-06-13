import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Locations } from '../../models/location';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css'],
})
export class LocationDetailsComponent implements OnInit {
  @Input() location!: Locations;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: LocationService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getLocation(idTemp).subscribe((data: Locations) => {
      this.location = data;
    });
  }

  navigateToLocations(): void {
    this.router.navigate(['/location-list']);
  }

  back() {
    this._location.back();
  }
}
