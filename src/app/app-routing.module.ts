import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { RideHistoryInformationComponent } from './components/ride-history-information/ride-history-information/ride-history-information.component';

import { UnregisteredHomeComponent } from './components/unregistered-home/unregistered-home.component';
import { RideDetailsComponent } from './components/ride-details/ride-details.component';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { DriverProfileDetailsComponent } from './components/driver-profile-details/driver-profile-details.component';
import { DriverEditProfileComponent } from './components/driver-edit-profile/driver-edit-profile/driver-edit-profile.component';
import { PassengerProfileDetailsComponent } from './components/passenger-profile-details/passenger-profile-details.component';
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { AlreadyAuthenticatedGuard } from './guard/already-authenticated.guard';

const routes: Routes = [
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unregistered-home', component: UnregisteredHomeComponent, canActivate: [AlreadyAuthenticatedGuard] },
  { path: 'userRideHistory', component: RideHistoryInformationComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unregistered-home', component: UnregisteredHomeComponent },
  { path: 'passenger-profile', component: PassengerProfileDetailsComponent },
  { path: 'driver-home', component: DriverHomeComponent, canActivate: [IsAuthenticatedGuard] },
  { path: 'driver-profile', component: DriverProfileDetailsComponent },
  { path: 'driver-edit-profile', component: DriverEditProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
