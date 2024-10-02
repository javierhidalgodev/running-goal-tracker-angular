import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { isValidDate } from "rxjs/internal/util/isDate"
import { Goal, GoalWithExtraDetails } from "@models/goals.model"
import { getValidationErrors } from "./forms.utils"
import { Activity } from "@models/activity.model"

export function dateValidatorFn(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value

    return !isValidDate(value) ? { isDate: true } : null
  }
}

export function isEqualFn(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value
    const confirmPassword = formGroup.get('confirmPassword')?.value

    if (!password || !confirmPassword) {
      return null
    }

    return password !== confirmPassword ? { isEqual: true } : null
  }
}

export function calculateGoalTotal(activities: Activity[]) {
  return activities.reduce((prev, curr) => prev + curr.km, 0)
}

export const calculateProgress = (goal: Goal | GoalWithExtraDetails, activities: Activity[]) => {
  return (calculateGoalTotal(activities) * 100) / goal.km
}

export const calculateDaysToEnd = (endDate: Date): number => {
  return Number(((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) + 1).toFixed())
}

export const updateValidationErrors = (formToCheck: FormGroup) => {
  return getValidationErrors(formToCheck)
}