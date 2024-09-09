import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kMtoEnd'
})
export class KMtoEndPipe implements PipeTransform {

  transform(value: number, goalTotal?: number): string {
    if(goalTotal) {
      const total = value - goalTotal

      if(total <= 0) {
        return '0km'
      }

      return `${(value - goalTotal).toFixed(2)}km`;
    }
    
    return `${value}km`;
  }
}
