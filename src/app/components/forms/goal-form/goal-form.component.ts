import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalService } from '@services/goal.service';
import { dateValidatorFn, updateValidationErrors } from '@utils/goals.utils';
import { Notification } from '@pages/new-goal-page/new-goal-page.component';
import { NotificationService } from '@services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent implements OnInit {
  @Output() emitAddGoal = new EventEmitter<Notification>()

  goalForm: FormGroup = new FormGroup({});
  isAdding: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _goalService: GoalService,
    private _notificationService: NotificationService,
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

    this.goalForm.statusChanges.subscribe(status => {
      this.checkValidators()
    })
  }

  getControl(control: string) {
    return this.goalForm.get(control)
  }

  checkValidators() {
    const errors = updateValidationErrors(this.goalForm)

    errors && this._notificationService.validation(errors)
  }

  addGoal() {
    this.isAdding = true

    this._goalService.createGoal(this.goalForm).subscribe({
      // next: goal => console.log(goal), // En principio no necesito recibir nada, solo emitir un evento cuando la operación es exitosa
      error: error => {
        this.isAdding = false
        this._notificationService.error('Something went wrong')
      },
      complete: () => {
        this.isAdding = false
        this._notificationService.success('Goal added!')
        this.goalForm.reset()
        
        Object.keys(this.goalForm.controls).forEach(control => {
          this.goalForm.get(control)?.setErrors(null)
        })
      }
    })
  }
}
