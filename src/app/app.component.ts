import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

import { AuthService } from './modules/auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    let session = this.authService.loadSession();
    if (session) {
      this.authService.authenticate();
    }

    this.authService.autenticationState.subscribe((state) => {
      if (!state) {
        this.router.navigate(['auth']);
      } else {
        this.router.navigate(['home']);
      }
    });
  }
}
