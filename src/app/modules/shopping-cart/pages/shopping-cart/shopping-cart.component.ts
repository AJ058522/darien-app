import { Component, OnInit } from '@angular/core';
import { OrdersItem } from '../../models/orders-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  title: string = 'Carro de Compras';
  ordersItems: OrdersItem[] = [];
  total: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  async loadCartItems() {
    let ordersItems = await this.shoppingCartService.loadCartItems();
    if (ordersItems) {
      this.ordersItems = ordersItems;
      this.calTotal();
    }
  }

  calTotal() {
    let total: number = 0;

    this.ordersItems.map((element) => {
      total += element.price * element.quantity;
    });

    this.total = total;
  }
}
