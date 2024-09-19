import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[onButtonSpinner]'
})
export class OnButtonSpinnerDirective {

  constructor(private _elementRef: ElementRef) {
    _elementRef.nativeElement.style.cssText = `
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
    `
  }

}
