import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAuthenticated = true;


  constructor() {}

  login() {
    this.userAuthenticated = true;
  }

  logout() {
    this.userAuthenticated = false;
  }
}
