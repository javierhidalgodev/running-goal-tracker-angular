import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goal } from '../../models/goals.model';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent implements OnInit {
  @Input() goalObject?: Goal;
  isImageLoading: boolean = true;

  constructor (private _route: Router) { }

  // Podemos introducir un ngOnInit para verificar el estado del goal, y si es null renderizar algo concreto y avisar al usuario
  ngOnInit(): void {
    if (!this.goalObject) {
      console.warn('Something went wrong with data source!')
    }
  }

  onImageLoad() {
    // TODO: quitar la simulación de retraso
    setTimeout(() => this.isImageLoading = false,2000)
  }

  navigateTo(url: string): void {
    this._route.navigate([`goals/${url}`])
  }
}
