import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';

const routes: Routes = [
  {path: 'editProfile', component: EditProfileComponent},
  {path: "register", component: RegisterComponent},
  {
    path: 'passenger-details',
    component: UserDetailsComponent,
  },
  {path: 'admin', component: AdminHomepageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
