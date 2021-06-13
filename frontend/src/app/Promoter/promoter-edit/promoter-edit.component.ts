import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { PromoterService } from '../../services/user.service';

@Component({
  selector: 'app-promoter-edit',
  templateUrl: './promoter-edit.component.html',
  styleUrls: ['./promoter-edit.component.css'],
})
export class PromoterEditComponent implements OnInit {
  @Input() promoter: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: PromoterService,
    private _location: Location
  ) {
    this.promoter = new User();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getUser(idTemp).subscribe((data: User) => {
      //console.log(data);
      this.promoter = data;
    });
  }

  edit(): void {
    this.rest.editUser(this.promoter).subscribe(
      (_) => {
        this.navigateToPromoters();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  navigateToPromoters(): void {
    this.router.navigate(['/promoter-list/']);
  }

  back() {
    this._location.back();
  }
}
