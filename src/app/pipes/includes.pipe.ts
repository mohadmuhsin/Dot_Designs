import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes'
})
export class IncludesPipe implements PipeTransform {

  transform(value: any, element: any[]): boolean {
console.log(value,element,"evdnnna");

    return element.includes(value);
  }

}
