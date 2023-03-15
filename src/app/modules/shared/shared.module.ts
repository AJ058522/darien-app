import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SharedRoutingModule } from './shared-routing.module';
import { DeviceInfoComponent } from './components/device-info/device-info.component';

@NgModule({
  declarations: [DeviceInfoComponent],
  imports: [CommonModule, SharedRoutingModule, IonicModule],
  exports: [DeviceInfoComponent],
})
export class SharedModule {}
