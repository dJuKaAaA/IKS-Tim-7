import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { UnregisteredHomeComponent } from './components/unregistered-home/unregistered-home.component'
import { MatIconModule } from '@angular/material/icon';
import { MapComponent } from './components/map/map.component'
import { AgmCoreModule } from '@agm/core'
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [AppComponent, RegisterComponent, UnregisteredHomeComponent, MapComponent],
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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCV2ZilS9MYRgLzsQ0FnkNLxbeNYSKdtNI',
    }),
    AgmDirectionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
