import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {Sort} from '../helpers/sort';

@Directive({
  selector: '[appSort]'
})
export class SortDirective {

  @Input() appSort: Array<any>;
  constructor(
    private element: ElementRef
    ) { }

  @HostListener('click')
  sortData() {
    const sort = new Sort();
    const elem = this.element.nativeElement;

    const order = elem.getAttribute('data-order');
    const type = elem.getAttribute('data-type');
    const property = elem.getAttribute('data-name');

    if (order === 'desc') {
      this.appSort.sort(sort.sortStart(property, order, type));
      elem.setAttribute('data-order', 'asc');
    } else {
      this.appSort.sort(sort.sortStart(property, order, type));
      elem.setAttribute('data-order', 'desc');
    }
  }
}
