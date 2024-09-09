import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Goal, GoalService, NewGoal } from '../../../services/goal.service';
import { isValidDate } from 'rxjs/internal/util/isDate';
import { dateValidatorFn } from '../../../utils/utils';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent implements OnInit {
  goalForm: FormGroup = new FormGroup({})
  successMessage: string | null = null;

  constructor(private _formBuilder: FormBuilder, private _http: GoalService) { }

  ngOnInit(): void {
    this.goalForm = this._formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
      ])],
      startDate: ['', [
        Validators.required,
        dateValidatorFn()
      ]],
      endDate: ['', [
        Validators.required,
        dateValidatorFn()
      ]],
      km: ['', [
        Validators.required,
        Validators.min(1)
      ]]
    })
  }

  hasErrors() {
    return Object.keys(this.goalForm.controls).some(key => {
      const control = this.goalForm.get(key)
      return control?.invalid && control?.touched
    })
  }

  getControl(control: string) {
    return this.goalForm.get(control)
  }

  addGoal() {
    if (this.goalForm.valid) {
      const newGoal: NewGoal = {
        ...this.goalForm.value,
        image: 'https://www.kieferusa.com/wp-content/uploads/2015/08/winner_products-200x200.jpg'
      } 

      this._http.createGoal(newGoal).subscribe({
        next: goal => {
          console.log('Goal created: ', goal),

          this.goalForm.reset()
          this.successMessage = 'Goal added';
          setTimeout(() => { this.successMessage = null }, 5000)
        },
        error: error => console.log('Error: ', error),
        complete: () => console.log('Create goal attempt finished')
      })
    }
  }
}
