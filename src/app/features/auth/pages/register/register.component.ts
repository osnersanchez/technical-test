import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UserData } from '../../../../shared/declaraciones/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // Group for Name and Last Name
  personalInfoForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  // Group for Phone and Address
  contactInfoForm: FormGroup = new FormGroup({
    cellphone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^3[0-9]{9}$/),
    ]),
    direction: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Group for Password and Confirm Password
  passwordForm: FormGroup = new FormGroup(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
      ]),
      confirmPassword: new FormControl(''),
    },
    {
      validators: () => this.checkPasswords,
    }
  );

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit() {
    if (
      this.personalInfoForm.valid &&
      this.contactInfoForm.valid &&
      this.passwordForm.valid
    ) {
      const userData: UserData = {
        id: this.contactInfoForm.value.email,
        ...this.personalInfoForm.value,
        uuid: this.randomNumber(),
        token: this.randomNumber(),
      };

      this.authService.registerUser(userData).subscribe((res) => {
        this.router.navigate(['/login']);
      });
    }
  }

  randomNumber(): string {
    const currentDate = new Date();
    const seed = currentDate.getTime();
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;

    return seed.toString().slice(0, -10) + randomNumber.toString();
  }
}
