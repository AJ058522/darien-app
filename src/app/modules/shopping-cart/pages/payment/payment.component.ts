import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  total: number = 0;
  paymentForm: FormGroup = new FormGroup({});
  errorMessage: string | null = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const total = this._activatedRoute.snapshot.queryParamMap.get('total');
    if (total) this.total = Number(total);

    this.paymentForm = this._formBuilder.group({
      card_number: ['', Validators.required],
      card_name: ['', Validators.required],
      expiring_date: ['', Validators.required],
    });
  }

  onSubmit() {
    setTimeout(() => {
      this.presentAlert();
    }, 1000);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Pedido completado con éxito',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            this.finishOrder();
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if (role === 'backdrop') {
      this.finishOrder();
    }
  }

  finishOrder() {
    this.shoppingCartService.removeCartItems();
    this.router.navigate(['/products']);
  }
}
