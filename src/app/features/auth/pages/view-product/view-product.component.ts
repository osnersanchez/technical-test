import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ProductData,
  UserData,
} from '../../../../shared/declaraciones/interfaces';
import { ProductService } from '../../../../shared/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, switchMap } from 'rxjs';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstallmentPaymentPipe } from '../../../../shared/pipes/installmet-payment-pipe.pipe';
import { SkeletonDetailComponent } from '../../../../shared/components/skeleton-detail/skeleton-detail.component';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BackButtonComponent,
    InstallmentPaymentPipe,
    SkeletonDetailComponent
  ],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss',
})
export class ViewProductComponent {
  product: ProductData = {} as ProductData;
  isLoading = false;
  quantityControl = new FormControl<number>(1, [
    Validators.required,
    Validators.min(1),
  ]);

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private readonly productService: ProductService,
    private readonly shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getProduct(params['id']);
    });
  }

  getProduct(id: string) {
    this.isLoading = true;
    this.productService
      .getProductById(id)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((product: ProductData) => {
        this.product = product;
        this.isLoading = false;
      });
  }

  addProduct() {
    const user: UserData = JSON.parse(
      localStorage.getItem('session') ?? '{}'
    ) as UserData;

    if (user.id) {
      this.isLoading = true;
      this.shoppingCartService
        .getShoppingCartProducts(user.id)
        .pipe(
          switchMap((res) => {
            const product = res.find((e) => e.product.id === this.product.id);
            return product
              ? this.shoppingCartService.updateProduct(
                  product?.id || '0',
                  this.quantityControl.value || 1
                )
              : this.shoppingCartService.addShoppingCartProduct(user.id, {
                  product: this.product,
                  quantity: this.quantityControl.value || 1,
                });
          })
        )

        .pipe(
          finalize(() => {
            this.isLoading = false;
            this.snackBar.open('Producto agregado!', '', { duration: 2000 });
          })
        )
        .subscribe(() => {
          this.isLoading = false;
        });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
