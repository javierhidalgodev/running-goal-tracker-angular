import { FormGroup } from "@angular/forms";

export interface ModalInterface {
    title: string,
    content?: string
    form?: FormGroup,
    confirmButtonLabel: string,
    cancelButtonLabel: string,
    confirmAction: () => void
}