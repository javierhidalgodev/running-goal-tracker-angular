import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '@models/activity.model';
import { calculateGoalTotal } from '@utils/goals.utils';

@Pipe({
  name: 'kMtoEnd'
})
export class KMtoEndPipe implements PipeTransform {

  transform(value: number, activities?: Activity[]): string {
    if(activities) {
      const kmsCovered = calculateGoalTotal(activities)
      const total = value - kmsCovered

      if(total <= 0) {
        return '0km'
      }

      return `${(value - kmsCovered).toFixed(2)}km`;
    }
    
    return `${value}km`;
  }
}
