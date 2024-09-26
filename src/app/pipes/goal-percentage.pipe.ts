import { Pipe, PipeTransform } from '@angular/core';
import { Goal } from '@models/goals.model';

@Pipe({
  name: 'goalPercentage'
})
export class GoalPercentagePipe implements PipeTransform {

  transform(goal: Goal): unknown {
    const kms = goal.activities.reduce((prev, curr) => curr.km + prev, 0)

    return ((kms * 100) / goal.km).toFixed(2).toString() + '%'
  }

}
