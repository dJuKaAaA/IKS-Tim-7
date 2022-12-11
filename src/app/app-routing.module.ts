import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { RegisterComponent } from './components/register/register.component';
import { UnregisteredHomeComponent } from './components/unregistered-home/unregistered-home.component';
import { RideDetailsComponent } from './components/ride-details/ride-details.component';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';

const routes: Routes = [
  {path: 'editProfile', component: EditProfileComponent},
  {path: "register", component: RegisterComponent},
  {path: "unregistered-home", component: UnregisteredHomeComponent},
  {
    path: 'passenger-details',
    component: UserDetailsComponent,
  },
  {path: 'driver-home', component: DriverHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
