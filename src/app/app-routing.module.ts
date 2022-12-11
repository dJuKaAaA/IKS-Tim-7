import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { RegisterComponent } from './components/register/register.component';
import { RideHistoryInformationComponent } from './components/ride-history-information/ride-history-information/ride-history-information.component';

import { UnregisteredHomeComponent } from './components/unregistered-home/unregistered-home.component';
import { RideDetailsComponent } from './components/ride-details/ride-details.component';

const routes: Routes = [
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unregistered-home', component: UnregisteredHomeComponent },
  { path: 'passengerDetails', component: UserDetailsComponent },
  { path: 'userRideHistory', component: RideHistoryInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
