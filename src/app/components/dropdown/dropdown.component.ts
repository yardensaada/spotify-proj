import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from 'selenium-webdriver/edge';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() selectedElement;
  @Input() options;
  @Input() type;
  @Output() selectedElementChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    localStorage.setItem(this.type, event);
    this.selectedElementChange.emit(event);
  }

}
