import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'installmentPayment',
    standalone: true
})
export class InstallmentPaymentPipe implements PipeTransform {

    transform(productValue: number): number | string {
        if (!productValue || isNaN(productValue)) {
            return 'N/A';
        }

        const installmentAmount = productValue / 48;
        return installmentAmount.toFixed(2);
    }
}