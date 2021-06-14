import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appToggle]',
})
export class ToggleDirective {
  @Input('appToggle') showEye: boolean;

  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('click') onClick() {
    const type = this.showEye ? 'text' : 'password';

    this.render.setAttribute(
      this.el.nativeElement.offsetParent.previousSibling,
      'type',
      type
    );
  }
}
