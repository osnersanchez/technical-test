import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';
import { EditProductModalComponent } from '../../../features/admin/components/edit-product-modal/edit-product-modal.component';
import { ProductCart, ProductData } from '../../declaraciones/interfaces';
import { DiscountPercentagePipe } from '../../pipes/discount-percentage-pipe.pipe';

@Component({
  selector: 'app-edit-product-card',
  standalone: true,
  imports: [
    DiscountPercentagePipe,
    RouterModule,
    EditProductModalComponent,
    ConfirmDialogComponent,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edit-product-card.component.html',
  styleUrl: './edit-product-card.component.scss',
})
export class EditProductCardComponent {
  @Input()
  productCart: ProductData = {} as ProductData;
  @Input()
  isAdmin = false;
  @Output()
  deleteProduct = new EventEmitter<string>();
  @Output()
  editProduct = new EventEmitter<ProductData>();

  constructor(public dialog: MatDialog) {}

  deleteProductConfirm() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres eliminar este producto?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct.emit(this.productCart.id);
      }
    });
  }

  openEditModal(product: ProductData): void {
    this.editProduct.emit(product);
  }
}
