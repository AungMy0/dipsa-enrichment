import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Address } from '../model';
 
@Component({
  selector: 'app-address-entry',
  templateUrl: './address-entry.component.html',
  styleUrls: ['./address-entry.component.css']
})
export class AddressEntryComponent implements OnInit {

  @ViewChild('form') form: NgForm;

  @Output() newAddress = new EventEmitter<Address>();

  constructor() { }

  ngOnInit() { }

  processForm() {
    let address: Address; 
    console.log('processing form...', this.form.value);
    //address = this.form.value;
    //Equivalent to below if you keep the form field names the same as 
    //your interface
    address = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
    };
    this.newAddress.next(address);
    this.form.resetForm();
  }

}
