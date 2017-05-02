import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'app-cart',
    templateUrl: 'cart.component.html',
    styleUrls: ['cart.component.scss']
})
export class CartComponent implements OnInit {
  private height:number = 50;
  public isFold:boolean = true;

    constructor() { }

    ngOnInit() {
    }

    fold(){
      this.isFold = true;
      this.height = 50;
    }

    unfold(){
      this.isFold = false;
      this.height = 200;
    }

}
