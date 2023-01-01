import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { UnregisteredHomeComponent } from './components/unregistered-home/unregistered-home.component';
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from './components/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { NavbarMainSectionComponent } from './components/navbar-main-section/navbar-main-section/navbar-main-section.component';
import { NavbarLoginRegistrationSectionComponent } from './components/navbar-login-registration-section/navbar-login-registration-section/navbar-login-registration-section.component';
import { ProfileImageEditComponent } from './components/profile-image-edit/profile-image-edit/profile-image-edit.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { RideHistoryCardComponent } from './components/ride-history-card/ride-history-card/ride-history-card.component';
import { RideHistoryInformationComponent } from './components/ride-history-information/ride-history-information/ride-history-information.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { StarComponent } from './components/star/star.component';
import { RideDetailsComponent } from './components/ride-details/ride-details.component';
import { AddressRouteFormComponent } from './components/address-route-form/address-route-form.component';
import { LoginComponent } from './components/login/login.component';
import { DriverProfileDetailsComponent } from './components/driver-profile-details/driver-profile-details.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { MatCardModule } from '@angular/material/card';
import { UsersListComponent } from './components/users-list/users-list.component'
import { DriverCurrentRideComponent } from './components/driver-current-ride/driver-current-ride.component';
import { DriverEditProfileComponent } from './components/driver-edit-profile/driver-edit-profile/driver-edit-profile.component';
import { EditProfileFormComponent } from './components/edit-profile-form/edit-profile-form/edit-profile-form.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { CustomBtn1Component } from './components/custom-btn1/custom-btn1.component';
import { PassengerProfileDetailsComponent } from './components/passenger-profile-details/passenger-profile-details.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { PassengerRideHistoryDetailsComponent } from './components/passenger-ride-history-details/passenger-ride-history-details.component';
import { SimpleUserInfoComponent } from './components/simple-user-info/simple-user-info.component';
import { DriverRideHistoryDetailsComponent } from './components/driver-ride-history-details/driver-ride-history-details.component';
import { SimpleUsersInfoComponent } from './components/simple-users-info/simple-users-info.component';
import { DriverProfilePageComponent } from './components/driver-profile-page/driver-profile-page.component';
import { DriverScheduledRideCardComponent } from './components/driver-scheduled-ride-card/driver-scheduled-ride-card.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { DriverCreationComponent } from './components/driver-creation/driver-creation.component';
import { DriverCreationFormComponent } from './components/driver-creation-form/driver-creation-form.component';
import { VehicleCreationPageComponent } from './components/vehicle-creation-page/vehicle-creation-page.component';
import { VehicleCreationFormComponent } from './components/vehicle-creation-form/vehicle-creation-form.component';
import { PanicReviewComponent } from './components/panic-review/panic-review.component';
import { PanicListComponent } from './components/panic-list/panic-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarMainSectionComponent,
    NavbarLoginRegistrationSectionComponent,
    ProfileImageEditComponent,
    RegisterComponent,
    EditProfileComponent,
    ProfileFormComponent,
    AdminHomepageComponent,
    RideHistoryCardComponent,
    RideHistoryInformationComponent,
    StarComponent,
    RideDetailsComponent,
    UnregisteredHomeComponent,
    MapComponent,
    AddressRouteFormComponent,
    LoginComponent,
    DriverProfileDetailsComponent,
    DriverHomeComponent,
    UsersListComponent,
    DriverCurrentRideComponent,
    DriverEditProfileComponent,
    EditProfileFormComponent,
    UserInfoComponent,
    ImageSliderComponent,
    VehicleInfoComponent,
    CustomBtn1Component,
    PassengerProfileDetailsComponent,
    ReviewsComponent,
    PassengerRideHistoryDetailsComponent,
    SimpleUserInfoComponent,
    DriverRideHistoryDetailsComponent,
    SimpleUsersInfoComponent,
    DriverProfilePageComponent,
    DriverScheduledRideCardComponent,
    ForgotPasswordComponent,
    DriverCreationComponent,
    DriverCreationFormComponent,
    VehicleCreationPageComponent,
    VehicleCreationFormComponent,
    PanicReviewComponent,
    PanicListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCV2ZilS9MYRgLzsQ0FnkNLabeNYSKdtNI',
    }),
    AgmDirectionModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
