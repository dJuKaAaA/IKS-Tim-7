import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PassengerService } from '../services/passenger.service';

@Injectable({
  providedIn: 'root'
})
export class PassengerInRideGuard implements CanActivate {
  
  constructor(
    private passengerService: PassengerService,
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let canAccess = false;
    // try {
    //   canAccess = this.passengerService.getHasActiveRide();
    // } catch (error) {
    //   canAccess = false;
    // }
    // if (!canAccess) {
    //   this.router.navigate(['passenger-home']);
    // }
    // return canAccess;
    return true;
  }
  
}
