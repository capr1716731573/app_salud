import { Directive,HostListener  } from '@angular/core';

@Directive({
  selector: '[DirectivaMayusculas]'
})
export class MayusculasDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event:KeyboardEvent) {
    if ((event.keyCode>32 && event.keyCode<128) && (event.keyCode>32 && event.keyCode>37 && event.keyCode>38 && event.keyCode>39 && event.keyCode>40))
   {
      event.target['value']+=event.key.toUpperCase();
      event.preventDefault(); //stop propagation
      //must create a "input" event, if not, there are no change in your value
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("input", false, true);
      event.target.dispatchEvent(evt);
    }

  }

}
