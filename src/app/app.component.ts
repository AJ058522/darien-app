import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';

import { AuthService } from './modules/auth/services/auth.service';
import { NetworkService } from './modules/shared/services/network.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isConected: boolean = true;
  footerColor: string = 'success';

  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private networkService: NetworkService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    let session = await this.authService.loadSession();
    if (session) {
      this.authService.authenticate();
    }

    this.authService.autenticationState.subscribe((state) => {
      if (!state) {
        this.router.navigate(['auth']);
      } else {
        this.router.navigate(['products']);
      }
    });

    this.networkService.networkStatus.subscribe((state) => {
      this.isConected = state;
      this.footerColor = this.isConected ? 'success' : 'danger';
    });
  }
}
