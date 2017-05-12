import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/cart/cart.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
  private items: Object[] = [];
  private height = 120;
  private totalPrice = 0;
  private progressBarMax = 30000;
  private progressBarClasses: string[] = [
    'progress-bar-success progress-bar-striped',
    'progress-bar-complete progress-bar-striped'
  ];

  public isFold = true;

    constructor(public cartService: CartService) {
      this.totalPrice = 39450;
    }

    ngOnInit() {
      this.cartService.getItems().subscribe((items) => {
        this.items = items;
        this.calculateTotalPrice();
      });
    }

    fold() {
      this.isFold = true;
      this.height = 120;
    }

    unfold() {
      this.isFold = false;
      this.height = 500;
    }

  readyAlert() {
      alert('준비중 입니다.');
  }

  removeItemAt(i) {
    this.cartService.removeItemAt(i);
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const item of this.items) {
      if (item['checked']) {
        this.totalPrice += item['price'] * item['count'];
      }
    }
    if (this.totalPrice > 30000) {
      this.progressBarMax = this.totalPrice;
    }
    else {
      this.progressBarMax = 30000;
    }
  }

  isAllChecked() {
    return _.every(this.items, (i) => i['checked']);
  }

  checkAll(checked) {
    for (const item of this.items) {
      item['checked'] = checked;
    }
  }

  removeSelected() {
    let checkedIdx = [];
    this.items.forEach((item, idx) => {
      if (item['checked']) {
        checkedIdx.push(idx);
      }
    });
    checkedIdx = _.reverse(checkedIdx);
    for (const idx of checkedIdx) {
      this.cartService.removeItemAt(idx);
    }
  }
  priceOrder(){
    console.log("cart_price_order");
  }
  nameOrder(){
    console.log("cart_name_order");
  }
}
