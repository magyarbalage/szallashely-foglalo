import { Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'timestampToDate',
  standalone: true
})
export class TimestampToDatePipe implements PipeTransform {
  transform(value: Timestamp | any): Date | null {
    if (value?.toDate) {
      return value.toDate();
    }
    return null;
  }
}