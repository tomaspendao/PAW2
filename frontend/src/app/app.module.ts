import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { PromoterService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';
import { LocationListComponent } from './Location/location-list/location-list.component';
import { LocationDetailsComponent } from './Location/location-details/location-details.component';
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
import { TicketListComponent } from './Ticket/ticket-list/ticket-list.component';
import { BuyTicketComponent } from './Ticket/buy-ticket/buy-ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LocationListComponent,
    LocationDetailsComponent,
    LocationAddComponent,
    LocationEditComponent,
    PromoterListComponent,
    LogoutComponent,
    RegisterComponent,
    PromoterDetailsComponent,
    PromoterEditComponent,
    RegisterPromoterComponent,
    RegisterAdminComponent,
    RegisterUserComponent,
    EventListComponent,
    EventAddComponent,
    EventDetailsComponent,
    EventEditComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    TicketListComponent,
    BuyTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
