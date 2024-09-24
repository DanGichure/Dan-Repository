import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { VerifiedUsersComponent } from './verified-users/verified-users.component';
import { UnverifiedUsersComponent } from './unverified-users/unverified-users.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users', component: UserManagementComponent},
  { path: 'verified-users', component: VerifiedUsersComponent },
  { path: 'unverified-users', component: UnverifiedUsersComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'dashboard' } // fallback route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
