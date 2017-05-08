import { Component, OnInit } from '@angular/core';
import { CartService } from "../../../../shared/cart/cart.service";


@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
  private items:Object[] = [];
  private height:number = 120;
  private totalPrice:number = 0;
  private progressBarMax:number = 30000;
  private progressBarClasses:string[] = [
    "progress-bar-success progress-bar-striped",
    "progress-bar-complete progress-bar-striped"
  ];

  public isFold:boolean = true;

    constructor(public cartService: CartService) {
      this.totalPrice = 39450;
    }

    ngOnInit() {
      this.cartService.getItems().subscribe((items) => {
        this.items = items;
        this.calculateTotalPrice();
      });
    }

    fold(){
      this.isFold = true;
      this.height = 120;
    }

    unfold(){
      this.isFold = false;
      this.height = 500;
    }

  readyAlert(){
      alert("준비중 입니다.");
  }

  removeItemAt(i){
    this.cartService.removeItemAt(i);
  }

  calculateTotalPrice(){
    this.totalPrice = 0;
    for(let item of this.items){
      this.totalPrice += item['price'] * item['count'];
    }
    if(this.totalPrice > 30000) this.progressBarMax = this.totalPrice;
    else this.progressBarMax = 30000;
  }

}
