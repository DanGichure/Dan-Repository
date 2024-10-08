import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';  // Import routing module
import { UserManagementComponent } from './user-management/user-management.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { routes } from './app.routes';
import { UserService } from './user.service';
import { NotificationService } from './notification.service';
import { VerifiedUsersComponent } from './verified-users/verified-users.component';
import { UnverifiedUsersComponent } from './unverified-users/unverified-users.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    UserListComponent,
    UserFormComponent,
    DashboardComponent,
    UserManagementComponent,
    UserDetailsComponent,
    VerifiedUsersComponent,
    UnverifiedUsersComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, // Add the routing module to imports
    RouterModule.forRoot(routes),
  ],
  providers: [UserService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
