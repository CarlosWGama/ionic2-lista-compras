import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'number_real'
})
@Injectable()
export class NumberReal {
  
  transform(value, args) {
    //value = value + '';
    return 'R$ ' + parseFloat(value).toFixed(2);
  }
}
