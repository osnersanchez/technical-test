import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StarRaitingComponent } from '../star-raiting/star-raiting.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductData } from '../../declaraciones/interfaces';
import { DiscountPercentagePipe } from '../../pipes/discount-percentage-pipe.pipe';
import { InstallmentPaymentPipe } from '../../pipes/installmet-payment-pipe.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatIconModule,
    CommonModule,
    StarRaitingComponent,
    DiscountPercentagePipe,
    InstallmentPaymentPipe,
    RouterLink,
  ],
  exportAs: 'ProductCardComponent',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input()
  product!: ProductData;

  constructor(public dialog: MatDialog) {}
}
