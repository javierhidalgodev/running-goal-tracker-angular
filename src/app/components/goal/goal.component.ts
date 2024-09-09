import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Goal } from '../../services/goal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent implements OnInit {
  @Input() goalObject?: Goal;

  constructor (private _route: Router) { }

  // Podemos introducir un ngOnInit para verificar el estado del goal, y si es null renderizar algo concreto y avisar al usuario
  ngOnInit(): void {
    if (!this.goalObject) {
      console.warn('Something went wrong with data source!')
    }
  }

  navigateTo(url: string): void {
    this._route.navigate([`goals/${url}`])
  }
}
