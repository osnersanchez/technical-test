import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductCart, ProductData } from '../../declaraciones/interfaces';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly BASE_URL = `${environment.apiUrl}/shopping-cart`;

  constructor(private readonly http: HttpClient) {}

  getShoppingCartProducts(userId: string) {
    const params = new HttpParams({
      fromObject: {
        userId,
      },
    });
    return this.http.get<ProductCart[]>(this.BASE_URL, { params });
  }

  addShoppingCartProduct(userId: string, product: ProductCart) {
    return this.http.post<void>(this.BASE_URL, { userId, ...product });
  }

  updateProduct(id: string, quantity: number) {
    return this.http.patch<void>(`${this.BASE_URL}/${id}`, { quantity });
  }

  deleteProduct(id: string) {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

  searchShoppingCard(userId: string, id: string) {
    const params = new HttpParams({
      fromObject: {
        userId,
      },
    });
    return this.http.get<ProductCart[]>(this.BASE_URL, { params });
  }
}
