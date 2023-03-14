import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  title: string = 'Detalle del producto';
  product: Product | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    const productId = this._activatedRoute.snapshot.paramMap.get('id');
    this.getProductById(Number(productId!));
  }

  getProductById(productId: number) {
    this.product = this.productsService.getProductById(productId!);
  }

  addToCart() {
    console.log('Todo');
  }
}
