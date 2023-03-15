import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  networkStatus = new BehaviorSubject(false);

  constructor() {
    this.logCurrentNetworkStatus();
  }

  async logCurrentNetworkStatus() {
    Network.addListener('networkStatusChange', (status) => {
      this.networkStatus.next(status.connected);
    });

    const status = await Network.getStatus();
    if (status) {
      this.networkStatus.next(status.connected);
    }
  }
}
