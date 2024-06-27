import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-star-raiting',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './star-raiting.component.html',
  styleUrl: './star-raiting.component.scss'
})
export class StarRaitingComponent{
  @Input() rating: number = 5;
  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get halfStar(): boolean {
    return this.rating % 1 !== 0;
  }
}
