import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { OrdersItem } from '../models/orders-item';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async addItemToCArt(item: OrdersItem) {
    let cartItems = await this.loadCartItems();
    if (!cartItems) {
      cartItems = [];
    }
    cartItems.push(item);
    return await this.saveCartItems(cartItems);
  }

  async saveCartItems(cartData: any) {
    await this._storage?.set('cartData', JSON.stringify(cartData));
    return true;
  }

  async loadCartItems() {
    const storage = await this.storage?.get('cartData');
    return JSON.parse(storage);
  }

  removeCartItems() {
    this.storage?.remove('cartData');
    return true;
  }
}
