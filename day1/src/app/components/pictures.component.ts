import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ImageInfo } from '../model';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {

  @Input() picture: ImageInfo;

  @Output() productSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    console.log('>>> ', this.picture);
  }

  addToCart() {
    console.log('Clicked: ', this.picture.prodId);
    this.productSelected.next(this.picture.prodId);
  }

}
