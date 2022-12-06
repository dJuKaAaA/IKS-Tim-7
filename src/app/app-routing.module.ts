import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { UnregisteredHomeComponent } from './components/unregistered-home/unregistered-home.component';

const routes: Routes = [
  {path: "register", component: RegisterComponent},
  {path: "unregistered-home", component: UnregisteredHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
