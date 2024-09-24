import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalService } from '../../../services/goal.service';
import { dateValidatorFn } from '../../../utils/utils';
import { NewGoal } from '../../../models/goals.model';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent implements OnInit {
  @Output() emitAddGoal = new EventEmitter<NewGoal>()

  goalForm: FormGroup = new FormGroup({})

  constructor(
    private _formBuilder: FormBuilder,
    private _goalService: GoalService
  ) { }

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
    this._goalService.createGoal(this.goalForm).subscribe({
      next: goal => {
        console.log(goal)
      },
      error: error => {
        console.error(error)
      },
      complete: () => {
        this.emitAddGoal.emit()
        this.goalForm.reset({
          description: '',
          endDate: '',
          km: '',
          name: '',
          startDate: ''
        }, {emitEvent: false})
        this.goalForm.markAsPristine()
        this.goalForm.markAsUntouched()
        this.goalForm.updateValueAndValidity()
      }
    }

    )
    //   this.emitAddGoal.emit(newGoal)
    //   this.goalForm.reset()

    // // ? Es una validación más, aunque en principio el formulario no puede enviarse si no es correcto
    // if (this.goalForm.valid) {
    //   const newGoal: NewGoal = {
    //     ...this.goalForm.value,
    //     // TODO: Esto en realidad debería gestionarse con la opción de subir una imagen, y si no establecer una por defecto
    //     image: DEFAULT_IMAGE
    //   }

    //   this.emitAddGoal.emit(newGoal)
    //   this.goalForm.reset()
    // }
  }
}
