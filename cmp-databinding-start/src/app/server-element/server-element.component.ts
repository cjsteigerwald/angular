import { Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChange, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph') paragraph: ElementRef;
  constructor() { 
    console.log('constructor called');
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('ngOnChanges called');   
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
    console.log('Text Content' + this.header.nativeElement.textContent);

  }

}
