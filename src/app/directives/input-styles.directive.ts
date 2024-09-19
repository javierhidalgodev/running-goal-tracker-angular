import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[customInputStyles]'
})
export class InputStylesDirective implements OnInit {

  constructor(private _elementRef: ElementRef) {
    this._elementRef.nativeElement.style.cssText = `
      border-radius: 50%
    `
  }

  ngOnInit(): void {
    
  }
}
