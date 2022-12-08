import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { RegisterComponent } from './components/register/register.component';
import { RideDetailsComponent } from './components/ride-details/ride-details.component';

const routes: Routes = [
  {path: 'editProfile', component: EditProfileComponent},
  {path: "register", component: RegisterComponent},
  {
    path: 'passenger-details',
    component: UserDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
