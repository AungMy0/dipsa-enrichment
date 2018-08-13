import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { Address } from './model';

//Singleton
@Injectable()
export class AddressService {
    db: Dexie;
    constructor() { 
        this.db = new Dexie('friends');
        this.db.version(1).stores({
            addresses: 'email, name, phone'
        })
    }

    loadAddresses(): Promise<Address[]> {
        return (this.db['addresses'].orderBy('name').toArray());
    }

    saveAddress(address: Address): Promise<any> {
        return (
            this.db['addresses'].put(address)
                .then(() => {
                    return ({ status: true, message: 'Saved' } );
                })
                .catch((err) => {
                    return ({ status: false, message: err } );
                })
        );

        //return (this.db['addresses'].put(address));
    }
}