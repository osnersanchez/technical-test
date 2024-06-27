import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductData } from '../../../../shared/declaraciones/interfaces';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './edit-product-modal.component.html',
  styleUrl: './edit-product-modal.component.scss',
})
export class EditProductModalComponent {
  editForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    price: new FormControl(this.data.price, Validators.required),
    description: new FormControl(this.data.description, Validators.required),
    rating: new FormControl(this.data.rating, [
      Validators.required,
      Validators.min(0),
      Validators.max(5),
    ]),
    imgUrl: new FormControl(this.data.imgUrl, Validators.required),
    stock: new FormControl(this.data.stock, [
      Validators.required,
      Validators.min(1),
    ]),
    category: new FormControl(this.data.category, Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductData
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }
}
