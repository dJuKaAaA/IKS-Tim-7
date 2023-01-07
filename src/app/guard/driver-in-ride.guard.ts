import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Ride } from '../model/ride.model';
import { AuthService } from '../services/auth.service';
import { DriverService } from '../services/driver.service';
import { RideService } from '../services/ride.service';

@Injectable({
  providedIn: 'root'
})
export class DriverInRideGuard implements CanActivate {

  constructor(
    private driverService: DriverService,
    private rideService: RideService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let canAccess = false;
    // try {
    //   canAccess = this.driverService.getHasActiveRide();
    // } catch (error) {
    //   canAccess = false;
    // }
    // if (!canAccess) {
    //   this.router.navigate(['driver-home']);
    // }
    // return canAccess;
    return true;
  }
  
}
