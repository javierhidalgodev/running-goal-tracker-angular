import { FormGroup } from "@angular/forms"
import { InputValidators, NotificationService } from "@services/notification.service"

const notificationService = new NotificationService()

/**
 * Esta función recibe un formulario (FormGroup) y analizar si algunos de sus controles tiene algún campo tocado que sea inválido. Permite controlar el estado general del formulario como válido/inválido, y poder operar a partir de el resultado.
 * 
 * @param formToCheck Formulario del que se van a extraer los constroles para comprobar si existe error en alguno de ellos. Para que la condición se cumpla como 'true', además de inválido debe haber sido tocado.
 * @returns 'True' si existe algún error en cualquier campo tocado, 'false' si todos los controles son válidos.
 */
export const hasErrors = (formToCheck: FormGroup): boolean => {
    return Object.keys(formToCheck.controls).some(key => {
      const control = formToCheck.get(key)
      return control?.invalid && control?.touched
    })
  }

export function getValidationErrors(form: FormGroup) {
    return Object.keys(form.controls)
        .map(key => {
            const control = form.get(key)

            if (control && control.touched && control.pristine) control.markAsUntouched()

            if (control && control.errors && control.touched && control.dirty) {
                console.log('loco')
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