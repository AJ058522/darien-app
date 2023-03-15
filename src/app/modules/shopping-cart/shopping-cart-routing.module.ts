import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  { path: '', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
