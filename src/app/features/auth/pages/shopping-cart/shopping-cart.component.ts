import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EditProductCardComponent } from '../../../../shared/components/edit-product-card/edit-product-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart/shopping-cart.service';
import {
  ProductCart,
  UserData,
} from '../../../../shared/declaraciones/interfaces';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebDataService } from '../../../../shared/services/web-data/web-data.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    EditProductCardComponent,
    BackButtonComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent implements OnInit {
  shoppingCard: ProductCart[] = [];
  user!: UserData;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly webDataService: WebDataService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getShoppingCart();
  }

  getUser() {
    this.user = this.webDataService.getDataSession();
    if (!this.user.id) {
      this.router.navigate(['/register']);
    }
  }

  toBuy() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres realizar la compra?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.snackBar.open('Compra realizada!', '', { duration: 2000 });
        this.router.navigate(['/list-product']);
      }
    });
  }

  getShoppingCart() {
    this.shoppingCartService
      .getShoppingCartProducts(this.user.id)
      .subscribe((res) => {
        this.shoppingCard = res;
      });
  }

  deleteProduct(id: string) {
    this.shoppingCartService.deleteProduct(id).subscribe(() => {
      this.getShoppingCart();
    });
  }

  getTotalProduct() {
    return this.shoppingCard.reduce((total, item) => {
      return total + (item.quantity || 0);
    }, 0);
  }

  getTotal() {
    return this.shoppingCard.reduce((total, item) => {
      return total + (item.quantity || 0) * 1;
    }, 0);
  }
}
