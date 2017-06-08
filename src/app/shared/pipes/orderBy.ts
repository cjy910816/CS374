import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderByPipe', pure: false})
export class OrderByPipe implements PipeTransform {

    transform(value: any[], expression?: any, reverse?: boolean): any {
      if (!value) {
        return value;
      }

      if(expression.length > 1){
        value = value.filter((value, index)=>{
          return (index%8) >= expression[1];
        });
      }

      let array: any[] = value.sort((a: any, b: any): number => {
        if (!expression) {
          return a > b ? 1 : -1;
        }
        return a[expression] > b[expression] ? 1 : -1;
      });

      if (reverse) {
        return array.reverse();
      }

      return array;
    }
}
