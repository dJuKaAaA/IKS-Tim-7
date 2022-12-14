import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { access } from 'fs';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(email: string, password: string): Observable<Token> {  // dummy body for now
    return this.http.post<Token>("http://localhost:8081/test/dummy/data/login", {email, password});
  }

  logout(): Observable<string> {
    return this.http.get<string>("http://localhost:8081/test/dummy/data/logout");
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken = localStorage.getItem('user');
      // const helper = new JwtHelperService();
      // const role = helper.decodeToken(accessToken).role[0].authority;
      const role = accessToken;
      return role;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
