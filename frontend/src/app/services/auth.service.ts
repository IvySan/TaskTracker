import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean;

  constructor(public router: Router) {
    this.loggedIn = false;
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  changeLoggedIn() {
    this.loggedIn = !this.loggedIn;
  }

  canActivate() {
    if (this.loggedIn === false) {
      this.router.navigate(['/log-in']);
    }
  }
}
