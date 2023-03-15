import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styleUrls: ['./device-info.component.scss'],
})
export class DeviceInfoComponent implements OnInit {
  constructor() {}

  deviceInfo: any;

  ngOnInit() {
    this.logDeviceInfo();
  }

  async logDeviceInfo() {
    this.deviceInfo = await Device.getInfo();
  }
}
