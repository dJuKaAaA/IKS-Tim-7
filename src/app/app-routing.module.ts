import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { RideHistoryInformationComponent } from './components/ride-history-information/ride-history-information/ride-history-information.component';
import { UnregisteredHomeComponent } from './components/unregistered-home/unregistered-home.component';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { DriverCurrentRideComponent } from './components/driver-current-ride/driver-current-ride.component';
import { DriverEditProfileComponent } from './components/driver-edit-profile/driver-edit-profile/driver-edit-profile.component';
import { PassengerProfileDetailsComponent } from './components/passenger-profile-details/passenger-profile-details.component';
import { DriverRideHistoryDetailsComponent } from './components/driver-ride-history-details/driver-ride-history-details.component';
import { PassengerRideHistoryDetailsComponent } from './components/passenger-ride-history-details/passenger-ride-history-details.component';
import { IsAuthenticatedGuard } from './guard/is-authenticated.guard';
import { AlreadyAuthenticatedGuard } from './guard/already-authenticated.guard';
import { DriverProfilePageComponent } from './components/driver-profile-page/driver-profile-page.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DriverCreationComponent } from './components/driver-creation/driver-creation.component';
import { VehicleCreationPageComponent } from './components/vehicle-creation-page/vehicle-creation-page.component';
import { PanicReviewComponent } from './components/panic-review/panic-review.component';
import { PassengerHomeComponent } from './components/passenger-home/passenger-home.component';
import { PassengerCurrentRideComponent } from './components/passenger-current-ride/passenger-current-ride.component';
import { ChatComponent } from './components/chat/chat.component';
import { PanicReviewPageComponent } from './components/panic-review-page/panic-review-page.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: UnregisteredHomeComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  { path: 'userRideHistory', component: RideHistoryInformationComponent },
  { path: 'admin', component: AdminHomepageComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  { path: 'driver-current-ride/:id', component: DriverCurrentRideComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'passenger-profile', component: PassengerProfileDetailsComponent },
  {
    path: 'driver-home',
    component: DriverHomeComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  { path: 'driver-profile', component: DriverProfilePageComponent },
  { path: 'driver-edit-profile', component: DriverEditProfileComponent },
  {
    path: 'driver-ride-history-details',
    component: DriverRideHistoryDetailsComponent,
  },
  {
    path: 'passenger-ride-history-details',
    component: PassengerRideHistoryDetailsComponent,
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'panic-review/:id', component: PanicReviewPageComponent },
  { path: 'ride-history', component: RideHistoryInformationComponent },
  { path: 'create-driver', component: DriverCreationComponent },
  { path: 'create-vehicle', component: VehicleCreationPageComponent },
  { path: 'passenger-home', component: PassengerHomeComponent },
  { path: 'passenger-current-ride', component: PassengerCurrentRideComponent },
  { path: 'admin-chat', component: ChatComponent },
  { path: 'payment', component: PaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
