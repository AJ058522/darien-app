import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { PaymentComponent } from './pages/payment/payment.component';

@NgModule({
  declarations: [ShoppingCartComponent, PaymentComponent],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingCartModule {}
