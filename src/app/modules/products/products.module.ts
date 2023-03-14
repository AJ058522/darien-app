import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [
    ProductDetailsComponent,
    ProductsListComponent,
    ProductCardComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
