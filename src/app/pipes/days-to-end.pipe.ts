import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysToEnd'
})
export class DaysToEndPipe implements PipeTransform {

  transform(value: number): string {
    if (value < 0) {
      return `El objetivo se terminó hace ${value * -1} día/s`
    }

    if (value === 0) {
      return '¡El objetivo termina hoy!'
    }

    return value.toString();
  }

}
