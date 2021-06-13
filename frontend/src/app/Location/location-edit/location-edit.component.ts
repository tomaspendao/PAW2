import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Locations } from '../../models/location';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css'],
})
export class LocationEditComponent implements OnInit {
  @Input() location!: Locations;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: LocationService,
    private _location: Location
  ) {
    this.location = new Locations();
    //this.location.place = "place";
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getLocation(idTemp).subscribe((data: Locations) => {
      console.log(data);
      this.location = data;
    });
  }

  edit(): void {
    this.rest.editLocation(this.location).subscribe(
      (_) => {
        this.navigateToLocations();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navigateToLocations(): void {
    this.router.navigate(['/location-list/']);
  }

  back() {
    this._location.back();
  }
}
