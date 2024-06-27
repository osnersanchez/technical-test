import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WebDataService } from '../../services/web-data/web-data.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  userName = '';

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly webDataService: WebDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getName();
  }

  getName() {
    const sessionData = this.webDataService.getDataSession();
    if (sessionData.id) {
      this.userName = sessionData.name;
    }
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Estás seguro de que quieres salir?' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.snackBar.open('Logout!', '', { duration: 2000 });
        this.router.navigate(['/login']);
        localStorage.clear();
      }
    });
  }
}
