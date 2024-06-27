import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'discountPercentage',
    standalone: true
})
export class DiscountPercentagePipe implements PipeTransform {
    transform(priceBeforeDiscount: number, price: number): string {
        if (priceBeforeDiscount === 0 || price === 0) {
            return '0';
        }

        const discountAmount = priceBeforeDiscount - price;
        const discountPercentage = (discountAmount / priceBeforeDiscount) * 100;
        return Math.round(discountPercentage).toString() + '%';

    }
}