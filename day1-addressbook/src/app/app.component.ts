import { Component, OnInit, OnDestroy } from '@angular/core';
import { Address } from './model';
import { AddressService } from './address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  addresses: Address[] = [];

  //Dependency injection
  constructor(private addressSvc: AddressService) { }

  //OnInit - when component is created
  ngOnInit() {
    this.addressSvc.loadAddresses()
      .then((addresses: Address[]) => {
        console.info('Addresses from database: ', addresses);
        this.addresses = addresses;
      })
      .catch((err) => { console.error('Error: ', err); })
  }

  //OnDestroy - when component is destroyed
  ngOnDestroy() { }

  processAddress($event: Address) {
    //Promise - non blocking, async
    this.addressSvc.saveAddress($event)
      .then((result) => {
        console.log('saveAddress status: ', result);
        if (result.status)
          this.addresses.push($event);
      })
  }

  delete($event: string) {
    console.log("to delete: ", $event);
  }
}
