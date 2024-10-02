import { Pipe, PipeTransform } from '@angular/core';
import { calculateDaysToEnd } from '@utils/goals.utils';

@Pipe({
  name: 'daysToEnd'
})
export class DaysToEndPipe implements PipeTransform {

  transform(value: Date): string {
    const daysToEnd = calculateDaysToEnd(value)

    if (daysToEnd < 0) {
      return `El objetivo se terminó hace ${daysToEnd * -1} día/s`
    }

    if (daysToEnd === 0) {
      return '¡El objetivo termina hoy!'
    }

    return daysToEnd.toString();
  }

}
