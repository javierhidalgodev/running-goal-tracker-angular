import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[errorMessage]'
})
export class ErrorMessageDirective {

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.cssText = `
      text-align: center;
      color: rgb(170, 45, 0) !important;
      font-weight: bold;
      margin-bottom: 20px;
    `
  }
}
