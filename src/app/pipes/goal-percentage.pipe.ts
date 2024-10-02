import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from '@models/activity.model';
import { Goal } from '@models/goals.model';

@Pipe({
  name: 'goalPercentage'
})
export class GoalPercentagePipe implements PipeTransform {

  transform(goal: Goal, activities: Activity[]): unknown {
    if(!activities) {
      return '0'
    }

    const kms = activities.reduce((prev, curr) => curr.km + prev, 0)
    return ((kms * 100) / goal.km).toFixed(2).toString()
  }

}
