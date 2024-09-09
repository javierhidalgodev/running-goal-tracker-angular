import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Goal } from '../../services/goal.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent implements OnInit {
  @Input() goalObject?: Goal;

  // Podemos introducir un ngOnInit para verificar el estado del goal, y si es null renderizar algo concreto y avisar al usuario
  ngOnInit(): void {
    if (!this.goalObject) {
      console.warn('Something went wrong with data source!')
    }
  }
}
