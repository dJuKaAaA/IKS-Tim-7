import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlreadyAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedIn()) {
        if (this.authService.getRole() == "ROLE_DRIVER") {
          this.router.navigate(['driver-home']);
        } else if (this.authService.getRole() == "ROLE_PASSENGER") {
          this.router.navigate(['passenger-home']);
        } else if (this.authService.getRole() == "ROLE_ADMIN") {
          this.router.navigate(['admin-home']);
        }
        return false;
      }
      return true;
  }
  
}
