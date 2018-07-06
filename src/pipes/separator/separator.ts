import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SeparatorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'separator',
})
export class SeparatorPipe implements PipeTransform {
  /**
   * Takes number and return with thousand separator using .
   */
  transform(value: string, ...args) {
	   
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
