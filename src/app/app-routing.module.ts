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
import { PassengerHomeComponent } from './components/passenger-home/passenger-home.component';
import { PassengerCurrentRideComponent } from './components/passenger-current-ride/passenger-current-ride.component';
import { ChatComponent } from './components/chat/chat.component';
import { PanicReviewPageComponent } from './components/panic-review-page/panic-review-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RideReviewComponent } from './components/ride-review/ride-review.component';
import { PassengersListPageComponent } from './components/passengers-list-page/passengers-list-page.component';
import { DriversListPageComponent } from './components/drivers-list-page/drivers-list-page.component';
import { DriverChangeRequestReviewComponent } from './components/driver-change-request-review/driver-change-request-review.component';
import { UserStatisticsComponent } from './components/user-statistics/user-statistics.component';
import { FavoriteLocationsComponent } from './components/favorite-locations/favorite-locations.component';
import { AdminPagesGuard } from './guard/admin-pages.guard';
import { DriverPagesGuard } from './guard/driver-pages.guard';
import { PassengerPagesGuard } from './guard/passenger-pages.guard';
import { AdminRideHistoryDetailsComponent } from './components/admin-ride-history-details/admin-ride-history-details.component';

const routes: Routes = [
  {
    path: '',
    component: UnregisteredHomeComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: 'passengers-list',
    component: PassengersListPageComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard]
  },
  {
    path: 'driver-change-request-review',
    component: DriverChangeRequestReviewComponent
  },
  {
    path: 'drivers-list',
    component: DriversListPageComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard]
  },
  {
    path: 'userRideHistory',
    component: RideHistoryInformationComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'admin-home',
    component: AdminHomepageComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: 'driver-current-ride/:id',
    component: DriverCurrentRideComponent,
    canActivate: [IsAuthenticatedGuard, DriverPagesGuard]
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,
    canActivate: [IsAuthenticatedGuard, PassengerPagesGuard],
  },
  {
    path: 'passenger-profile',
    component: PassengerProfileDetailsComponent,
    canActivate: [IsAuthenticatedGuard, PassengerPagesGuard],
  },
  {
    path: 'driver-home',
    component: DriverHomeComponent,
    canActivate: [IsAuthenticatedGuard, DriverPagesGuard],
  },
  {
    path: 'driver-profile',
    component: DriverProfilePageComponent,
    canActivate: [IsAuthenticatedGuard, DriverPagesGuard],
  },
  {
    path: 'driver-edit-profile',
    component: DriverEditProfileComponent,
    canActivate: [IsAuthenticatedGuard, DriverPagesGuard],
  },
  {
    path: 'driver-ride-history-details',
    component: DriverRideHistoryDetailsComponent,
    canActivate: [IsAuthenticatedGuard, DriverPagesGuard],
  },
  {
    path: 'passenger-ride-history-details',
    component: PassengerRideHistoryDetailsComponent,
    canActivate: [IsAuthenticatedGuard, PassengerPagesGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: 'panic-review/:id',
    component: PanicReviewPageComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard],
  },
  {
    path: 'ride-history',
    component: RideHistoryInformationComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'create-driver',
    component: DriverCreationComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard],
  },
  {
    path: 'create-vehicle',
    component: VehicleCreationPageComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard],
  },
  {
    path: 'passenger-home',
    component: PassengerHomeComponent,
    canActivate: [IsAuthenticatedGuard, PassengerPagesGuard],
  },
  {
    path: 'passenger-current-ride/:id',
    component: PassengerCurrentRideComponent,
    canActivate: [IsAuthenticatedGuard, PassengerPagesGuard],
  },
  {
    path: 'admin-chat',
    component: ChatComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard],
  },
  {
    path: 'report-charts',
    component: UserStatisticsComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'favorite-locations',
    component: FavoriteLocationsComponent,
    canActivate: [IsAuthenticatedGuard, PassengerPagesGuard],
  },
  {
    path: 'admin-ride-history-details',
    component: AdminRideHistoryDetailsComponent,
    canActivate: [IsAuthenticatedGuard, AdminPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
