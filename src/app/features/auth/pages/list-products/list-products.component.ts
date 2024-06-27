import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from '../../../../shared/components/product-card/product-card.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FilterProductPipe } from '../../../../shared/pipes/filter-product-pipe.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { ProductData, UserData } from '../../../../shared/declaraciones/interfaces';
import { RouterModule } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { ProductService } from '../../../../shared/services/product/product.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart/shopping-cart.service';
import { WebDataService } from '../../../../shared/services/web-data/web-data.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    LoadingComponent,
    HttpClientModule,
    RouterModule,
    MatTooltipModule,
    ProductCardComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    FilterProductPipe,
    CommonModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ScrollingModule,
    MatBadgeModule
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  searchControl = new FormControl<string>('', Validators.minLength(1));
  products: ProductData[] = [];
  isLoading = false;
  error = '';
  user!: UserData;
  totalProductCard = 0;

  constructor(
    private readonly productService: ProductService,
    private readonly shoppingCartService: ShoppingCartService,
    private readonly webDataService: WebDataService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getShoppingLength();
  }

  getProducts() {
    this.isLoading = true;
    this.productService
      .getProducts()
      .pipe(
        catchError(() => {
          this.error = 'An error occurred while loading products.';
          return of([]);
        })
      )
      .subscribe((products: ProductData[]) => {
        this.products = products;
        this.isLoading = false;
        this.error = '';
      });
  }

  getShoppingLength() {
    this.user = this.webDataService.getDataSession();
    if (this.user.id) {
      this.getShoppingCart();
    }
  }

  getShoppingCart() {
    this.shoppingCartService
      .getShoppingCartProducts(this.user.id)
      .subscribe((res) => {
        this.totalProductCard = res.length;
      });
  }
}
