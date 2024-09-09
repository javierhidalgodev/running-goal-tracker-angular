import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"
import { isValidDate } from "rxjs/internal/util/isDate"
import { Goal } from "../services/goal.service"

export function dateValidatorFn(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value

    return !isValidDate(value) ? { isDate: true } : null
  }
}

export function calculateGoalTotal(goal: Goal) {
  return goal.activities.reduce((prev, curr) => prev + curr.km, 0)
}

export const calculateProgress = (goalTotal: number, goal: Goal) => {
  return (goalTotal * 100) / goal.km
}