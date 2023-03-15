import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/modules/shopping-cart/services/shopping-cart.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  title: string = 'Productos';
  productsList: Product[] = [];
  productName: string = '';
  cartTotaltems: number = 0;

  constructor(
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsList = this.productsService.getProducts();
  }

  findProductByName() {
    if (this.productName != '') {
      this.productsList = this.productsService.findProductByName(
        this.productName
      );
    } else {
      this.getProducts();
    }
  }

  async getCartTotaltems() {
    const cart = await this.shoppingCartService.loadCartItems();
    this.cartTotaltems = cart ? cart.length : 0;
  }

  ionViewDidEnter() {
    this.getCartTotaltems();
  }
}
