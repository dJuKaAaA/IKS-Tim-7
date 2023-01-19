import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { access } from 'fs';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(environment.localhostApi + 'user/login', {
      email,
      password,
    });
  }

  getRole(): string {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const role = helper.decodeToken(accessToken).roles[0];
      return role;
    }
    return "ROLE_ANONYMOUS";
  }

  getId(): number {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const id = helper.decodeToken(accessToken).id;
      return id;
    }
    return NaN;
  }

  getEmail(): string {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const email = helper.decodeToken(accessToken).sub;
      return email;
    }
    return "";
  }

  getToken(): string {
      if (this.isLoggedIn()) {
        const accessToken: any = localStorage.getItem('user');
        const decodedItem = JSON.parse(accessToken);
        return decodedItem.accessToken;
    }
    return "";
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }
}
