import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { Ticket } from '../../models/ticket';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() user!: User;
  tickets!: Ticket[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rest: UserService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    var idTemp = this.route.snapshot.params['id'];
    this.rest.getUser(idTemp).subscribe((data: User) => {
      this.user = data;
    });
    this.getTickets();
  }

  navigateToUsers(): void {
    this.router.navigate(['/user-list']);
  }

  getTickets(): void {
    this.rest.getTickets(this.user._id).subscribe((data: Ticket[]) => {
      this.tickets = data;
    })
  }

  back() {
    this._location.back();
  }
}
