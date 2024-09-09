import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class ErrorMessageDirective {

  constructor(private elemetRef: ElementRef) {
    elemetRef.nativeElement.style.cssText = `
      padding: 10px 16px;
      background-color: #ff9b9b;
      border-radius: 10px;
      width: max-content;
      font-weight: 700;
      color: #ff0000;
      border: 1px solid #ff0000;
    `
  }
}
