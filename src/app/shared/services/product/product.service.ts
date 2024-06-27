import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProductData } from '../../declaraciones/interfaces';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly BASE_URL = `${environment.apiUrl}/products`;
  private localProducts: ProductData[] = [];
  private deleteProducts: string[] = [];
  private editProducts: ProductData[] = [];

  constructor(private readonly http: HttpClient) {}

  getProducts() {
    return this.http
      .get<ProductData[]>(this.BASE_URL)
      .pipe(
        map((res) =>
          this.combineArrays(
            [...this.localProducts, ...res],
            this.editProducts
          ).filter((el) => this.deleteProducts.indexOf(el.id) < 0)
        )
      );
  }

  getProductById(id: string): Observable<ProductData> {
    const product = this.localProducts.find((el) => el.id === id);
    console.log(product);
    
    return product
      ? of(product)
      : this.http.get<ProductData>(`${this.BASE_URL}/${id}`);
  }

  addProduct(product: ProductData) {
    const id = String(Math.floor(Math.random() * 1000000));
    const newProduct = { ...product, id };
    this.localProducts.unshift(newProduct);

    return of(newProduct);
  }

  editProduct(id: string, product: ProductData) {
    const indexProduct = this.editProducts.findIndex((el) => el.id === id);
    if (indexProduct >= 0) {
      this.editProducts.splice(indexProduct, 1, { ...product, id });
    } else {
      this.editProducts.push({ ...product, id });
    }
    console.log(this.editProducts);

    return of('ok');
  }

  deleteProduct(id: string) {
    this.deleteProducts.push(id);
    return of('ok');
  }

  combineArrays(productsA: ProductData[], productsB: ProductData[]) {
    const mapProductsB = new Map(
      productsB.map((product) => [product.id, product])
    );

    return productsA.reduce((result: ProductData[], productA) => {
      if (mapProductsB.has(productA.id)) {
        result.push(mapProductsB.get(productA.id)!);
      } else {
        result.push(productA);
      }
      return result;
    }, []);
  }
}
