import { FormGroup } from "@angular/forms"
import { InputValidators, NotificationService } from "../services/notification.service"

const notificationService = new NotificationService()

export function getValidationErrors(form: FormGroup) {
    return Object.keys(form.controls)
        .map(key => {
            const control = form.get(key)

            if (control && control.touched && control.pristine) control.markAsUntouched()

            if (control && control.errors && control.touched && control.dirty) {
                return {
                    key,
                    validators: control.errors
                }
            } else {
                return null
            }
        })
        .filter(error => error !== null) as InputValidators[]
}