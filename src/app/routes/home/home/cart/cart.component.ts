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
  public isFold:boolean = true;

    constructor(public cartService: CartService) {
      this.totalPrice = 39450;
    }

    ngOnInit() {
      this.cartService.getItems().subscribe(items => this.items = items);
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

}
