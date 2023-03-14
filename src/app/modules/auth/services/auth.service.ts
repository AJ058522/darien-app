import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USERS } from 'src/app/fakedb/users';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autenticationState = new BehaviorSubject(false);

  constructor() {}

  login(email: string, password: string): User | null {
    const users: User[] = USERS;
    const isValidUser = users.find((user) => user.email == email);

    if (!isValidUser || password != isValidUser.password) {
      return null;
    }

    if (isValidUser.password) {
      isValidUser.password = undefined;
    }
    this.saveSession(isValidUser);
    this.authenticate();
    return isValidUser;
  }

  isAuthenticated() {
    return this.autenticationState.value;
  }

  authenticate() {
    this.autenticationState.next(true);
  }

  unauthenticate() {
    this.autenticationState.next(false);
  }

  saveSession(sessionData: any) {
    localStorage.setItem('sessionData', JSON.stringify(sessionData));
    return true;
  }

  loadSession() {
    const storage: string | null = localStorage.getItem('sessionData');
    let sessionData: User | null = storage ? JSON.parse(storage) : null;
    return sessionData;
  }

  removeSession() {
    localStorage.removeItem('sessionData');
    return true;
  }
}
