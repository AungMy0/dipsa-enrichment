import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Address } from '../model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @Input() address: Address;
  @Output() deleteAddress = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  delete() {
    this.deleteAddress.next(this.address.email);
  }

}
