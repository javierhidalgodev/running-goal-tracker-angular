import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-with-load-spinner',
  templateUrl: './button-with-load-spinner.component.html',
  styleUrl: './button-with-load-spinner.component.scss'
})
export class ButtonWithLoadSpinnerComponent {
  @Input() isValidForm: boolean | any;
  @Input() matTooltip: string  | any;
  @Input() isAdding: boolean | any;
}
