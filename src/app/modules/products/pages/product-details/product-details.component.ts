import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersItem } from 'src/app/modules/shopping-cart/models/orders-item';
import { ShoppingCartService } from 'src/app/modules/shopping-cart/services/shopping-cart.service';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  title: string = 'Detalle del producto';
  product: Product | undefined;
  errorMessage: string | undefined;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    const productId = this._activatedRoute.snapshot.paramMap.get('id');
    this.getProductById(Number(productId!));
  }

  getProductById(productId: number) {
    this.product = this.productsService.getProductById(productId!);
  }

  addToCart(quantity: number) {
    const item: OrdersItem = {
      productId: this.product!.id,
      productName: this.product!.name,
      price: this.product!.price,
      quantity: quantity,
    };
    this.shoppingCartService.addItemToCArt(item);
    this.router.navigate(['products']);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Seleccione la cantidad',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            if (data[0] >= 1) {
              this.addToCart(data[0]);
            } else {
              this.errorMessage = 'La cantidad debe ser de al menos uno.';
            }
          },
        },
      ],
      inputs: [
        {
          type: 'number',
          placeholder: 'Cantidad',
          value: 1,
          min: 1,
          max: 100,
        },
      ],
    });

    await alert.present();
  }
}
