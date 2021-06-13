import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { PromoterService } from '../../services/user.service';

@Component({
  selector: 'app-promoter-details',
  templateUrl: './promoter-details.component.html',
  styleUrls: ['./promoter-details.component.css'],
})
export class PromoterDetailsComponent implements OnInit {
  @Input() promoter!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: PromoterService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getUser(idTemp).subscribe((data: User) => {
      this.promoter = data;
    });
  }

  navigateToPromoters(): void {
    this.router.navigate(['/promoter-list']);
  }

  back() {
    this._location.back();
  }
}
