import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showLoggedUserNavbar: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  // Kada se logujemo zevemo ovu metodu
  toggleNavbarType(): void {
    this.showLoggedUserNavbar = !this.showLoggedUserNavbar;
    this.subject.next(this.showLoggedUserNavbar);
  }

  // Kada se korisnik logovao i zelimo reagujemo na logovanje pretplaticemo se na onLogged
  onLogged(): Observable<any> {
    return this.subject.asObservable();
  }
}
