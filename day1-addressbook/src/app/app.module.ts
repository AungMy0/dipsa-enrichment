import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddressEntryComponent } from './components/address-entry.component';
import { AddressComponent } from './components/address.component';
import { AddressService } from './address.service';

@NgModule({
  declarations: [
    AppComponent,
    AddressEntryComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [ AddressService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
