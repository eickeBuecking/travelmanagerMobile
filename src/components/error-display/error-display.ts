import { Component, Input } from '@angular/core';

/**
 * Generated class for the ErrorDisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'error-display',
  templateUrl: 'error-display.html'
})
export class ErrorDisplayComponent {

  @Input()
  public error: string;

  constructor() {
    console.log('Hello ErrorDisplayComponent Component: ' + this.error);
  }

}
