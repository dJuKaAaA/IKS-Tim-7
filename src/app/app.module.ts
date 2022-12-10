import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
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
import { UserDetailsComponent } from './components/user-details/user-details/user-details.component';
import { RideHistoryCardComponent } from './components/ride-history-card/ride-history-card/ride-history-card.component';
import { RideHistoryInformationComponent } from './components/ride-history-information/ride-history-information/ride-history-information.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { StarComponent } from './components/star/star.component';
import { RideDetailsComponent } from './components/ride-details/ride-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarMainSectionComponent,
    NavbarLoginRegistrationSectionComponent,
    ProfileImageEditComponent,
    UserDetailsComponent,
    RegisterComponent,
    EditProfileComponent,
    ProfileFormComponent,
    RideHistoryCardComponent,
    RideHistoryInformationComponent,
    StarComponent,
    RideDetailsComponent,
    UnregisteredHomeComponent,
    MapComponent,
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCV2ZilS9MYRgLzsQ0FnkNLxbeNYSKdtNI',
    }),
    AgmDirectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
