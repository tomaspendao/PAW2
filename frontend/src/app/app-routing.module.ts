import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LocationListComponent } from './Location/location-list/location-list.component';
import { LocationDetailsComponent } from './Location/location-details/location-details.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { LocationAddComponent } from './Location/location-add/location-add.component';
import { LocationEditComponent } from './Location/location-edit/location-edit.component';
import { PromoterListComponent } from './Promoter/promoter-list/promoter-list.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './Registers/register/register.component';
import { PromoterDetailsComponent } from './Promoter/promoter-details/promoter-details.component';
import { PromoterEditComponent } from './Promoter/promoter-edit/promoter-edit.component';
import { RegisterPromoterComponent } from './Registers/register-promoter/register-promoter.component';
import { RegisterAdminComponent } from './Registers/register-admin/register-admin.component';
import { RegisterUserComponent } from './Registers/register-user/register-user.component';
import { EventListComponent } from './Event/event-list/event-list.component';
import { EventAddComponent } from './Event/event-add/event-add.component';
import { EventDetailsComponent } from './Event/event-details/event-details.component';
import { EventEditComponent } from './Event/event-edit/event-edit.component';
import { UserListComponent } from './User/user-list/user-list.component';
import { UserDetailsComponent } from './User/user-details/user-details.component';
import { UserEditComponent } from './User/user-edit/user-edit.component';
import { TicketListComponent } from './Ticket/ticket-list/ticket-list.component'
import { BuyTicketComponent } from './Ticket/buy-ticket/buy-ticket.component';

const routes: Routes = [
  {
    path: 'location-edit/:id',
    component: LocationEditComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'location-add',
    component: LocationAddComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'location-details/:id',
    component: LocationDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'location-list',
    component: LocationListComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'event-add',
    component: EventAddComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'event-list',
    component: EventListComponent
  },
  {
    path: 'event-edit/:id',
    component: EventEditComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'event-details/:id',
    component: EventDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'promoter-edit/:id',
    component: PromoterEditComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'promoter-details/:id',
    component: PromoterDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'promoter-list',
    component: PromoterListComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'user-edit/:id',
    component: UserEditComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'register-promoter',
    component: RegisterPromoterComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'register-admin',
    component: RegisterAdminComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'register-user',
    component: RegisterUserComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'tickets',
    component: TicketListComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: 'buy-ticket/:id',
    component: BuyTicketComponent,
    canActivate: [AuthGuardGuard],
  },
  /*{
    path: 'user-tickets/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuardGuard],
  },*/
  {
    path: '**',
    redirectTo: '/event-list',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
