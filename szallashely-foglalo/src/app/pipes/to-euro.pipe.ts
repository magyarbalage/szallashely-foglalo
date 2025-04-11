import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toEuro',
  standalone: true
})
export class ToEuroPipe implements PipeTransform {
  private exchangeRate = 380;

  transform(value: any, currencySymbol: string = '€'): string {
    const numericValue = Number(value);
    if (isNaN(numericValue)) return '';
    const euroValue = numericValue / this.exchangeRate;
    return `${euroValue.toFixed(2)} ${currencySymbol}`;
  }
}
