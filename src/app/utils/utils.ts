import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"
import { isValidDate } from "rxjs/internal/util/isDate"
import { Goal, GoalWithExtraDetails } from "../models/goals.model"

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

    if(!password || !confirmPassword) {
      return null
    } 
    console.log(password === confirmPassword);
    
    return password !== confirmPassword ? { isEqual: true } : null
  }
}

export function calculateGoalTotal(goal: Goal | GoalWithExtraDetails) {
  return goal.activities.reduce((prev, curr) => prev + curr.km, 0)
}

export const calculateProgress = (goal: Goal | GoalWithExtraDetails) => {
  return (calculateGoalTotal(goal) * 100) / goal.km
}

export const calculateDaysToEnd = (goal: Goal): number => {
  return Number(((new Date(goal.endDate).getTime() - new Date().getTime())/(1000*60*60*24)).toFixed())
}