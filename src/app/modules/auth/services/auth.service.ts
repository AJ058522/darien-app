import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { USERS } from 'src/app/fakedb/users';
import { User } from '../models/user';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  autenticationState = new BehaviorSubject(false);
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

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

  async saveSession(sessionData: any) {
    await this._storage?.set('sessionData', JSON.stringify(sessionData));
    return true;
  }

  async loadSession() {
    const storage = await this.storage?.get('sessionData');
    return JSON.parse(storage);
  }

  removeSession() {
    this.storage?.remove('sessionData');
    return true;
  }

  logout() {
    this.removeSession();
    this.unauthenticate();
  }
}
