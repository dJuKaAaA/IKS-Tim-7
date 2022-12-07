import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
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
