import { Injectable } from '@angular/core';
import { PRODUCTS } from 'src/app/fakedb/products';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts() {
    return PRODUCTS;
  }

  getProductById(productId: number) {
    return PRODUCTS.find((item) => item.id === productId);
  }

  findProductByName(name: string) {
    let products = PRODUCTS;
    let tempProducts = products;
    let searchText: string = name.toLowerCase();

    if (searchText.toLowerCase().trim() === '') {
      products = tempProducts;
    } else {
      products = tempProducts.reduce((acc: Array<any>, value: any) => {
        for (let prop in value) {
          if (
            prop === 'name' &&
            value[prop] &&
            value[prop]
              .toString()
              .toLowerCase()
              .includes(searchText.toLowerCase())
          ) {
            acc.push(value);
            return acc;
          }
        }
        return acc;
      }, []);
    }
    return products;
  }
}
