import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalService } from '../../../services/goal.service';
import { dateValidatorFn } from '../../../utils/utils';
import { hasErrors } from '../../../utils/forms.utils'
import { Notification } from '../../../pages/new-goal-page/new-goal-page.component';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss'
})
export class GoalFormComponent implements OnInit {
  @Output() emitAddGoal = new EventEmitter<Notification>()

  goalForm: FormGroup = new FormGroup({});
  isAdding: boolean = false;
  hasErrors = hasErrors;

  constructor(
    private _formBuilder: FormBuilder,
    private _goalService: GoalService,
    private _notificationService: NotificationService
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

    // this.goalForm.statusChanges.subscribe(
    // status => // Función que actualiza las validaciones
    // )
  }

  getControl(control: string) {
    return this.goalForm.get(control)
  }

  addGoal() {
    this.isAdding = true

    this._goalService.createGoal(this.goalForm).subscribe({
      // next: goal => console.log(goal), // En principio no necesito recibir nada, solo emitir un evento cuando la operación es exitosa
      error: error => {
        this.isAdding = false
        this._notificationService.error(error.message)
      },
      complete: () => {
        this.isAdding = false
        this._notificationService.success('Goal added!')
        this.goalForm.reset({
          description: '',
          endDate: '',
          km: '',
          name: '',
          startDate: ''
        }, { emitEvent: false })
        this.goalForm.markAsPristine()
        this.goalForm.markAsUntouched()
        this.goalForm.updateValueAndValidity()
      }
    })
  }
}
