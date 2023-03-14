import { Component, OnInit } from '@angular/core';
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

  constructor(private productsService: ProductsService) {}

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
}
