import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTestDirective]'
})
export class TestDirectiveDirective {
  
  @Input("test") test !:number

  constructor(private el:ElementRef , private render:Renderer2) {

   }

   @HostListener('click')
   onHostClick(){
    if(this.test === 0){
      this.render.setStyle(this.el.nativeElement , "color" , "blue")
    }
   }



}
