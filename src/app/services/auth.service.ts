import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('user');
    this._isLoggedIn$.next(!!token);
  }

  login(email: string, password: string): Observable<Token> {  // dummy body for now
    return this.http.post<Token>("http://localhost:8081/test/dummy/data/login", {email, password}).pipe(
      tap((response: any) => {
        console.log(response);
        this._isLoggedIn$.next(true);
        localStorage.setItem('user', response.token);
      })
    )
  }

  logout(): Observable<string> {
    return this.http.get("http://localhost:8081/test/dummy/data/logout").pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(false);
        localStorage.removeItem('user');
      })
    );
  }

  setLoggedIn(isLoggedIn: boolean) {
    this._isLoggedIn$.next(isLoggedIn);
  }

}
