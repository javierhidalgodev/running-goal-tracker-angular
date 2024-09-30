import { Component, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";

export interface ModalInterface {
    title: string,
    content?: string
    form?: TemplateRef<HTMLElement>,
    confirmButtonLabel: string,
    cancelButtonLabel: string,
    confirmAction: () => void
}