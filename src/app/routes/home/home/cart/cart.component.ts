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
  private scaleNumbers:number[] = [5000,10000,15000,20000,25000,30000];
  private progressBarMax = 30000;
  private progressBarClasses:string[] = [
    "progress-bar-purple-1",
    "progress-bar-purple-2",
    "progress-bar-blue-1",
    "progress-bar-blue-2",
    "progress-bar-green-1",
    "progress-bar-green-2",
    "progress-bar-yellow-1",
    "progress-bar-yellow-2",
    "progress-bar-orange-1",
    "progress-bar-orange-2",
    "progress-bar-red-1",
    "progress-bar-red-2",
  ];
  private sort = 'name';
  private categorizer = '';
  private userFilter : any = { name : '', img : this.categorizer};
  private categoryBound =2;
  //img should be category;
  public isFold = true;

    constructor(public cartService: CartService) {
      this.totalPrice = 39450;
    }

    ngOnInit() {
      this.cartService.getItems().subscribe((items) => {
        this.items = items;
        this.calculateTotalPrice();
        this.checkOverSet();
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
    if(this.totalPrice > 500000)
    {
      this.progressBarMax = 1000000;
      this.scaleNumbers = [200000,400000,600000,800000,1000000];
    }
    else if(this.totalPrice > 200000)
    {
      this.progressBarMax = 500000;
	  this.scaleNumbers = [100000,200000,300000,400000,500000];
    }
    else if(this.totalPrice > 100000)
    {
      this.progressBarMax = 200000;
	  this.scaleNumbers = [40000,80000,120000,160000,200000];
    }
    else if(this.totalPrice > 50000)
    {
      this.progressBarMax = 100000;
	  this.scaleNumbers = [20000,40000,60000,80000,100000];
    }
    else if(this.totalPrice > 30000)
    {
      this.progressBarMax = 50000;
	  this.scaleNumbers = [10000,20000,30000,40000,50000];
    }
    else
    {
      this.progressBarMax = 30000;
	  this.scaleNumbers = [6000,12000,18000,24000,30000];
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
    this.sort='price'
  }
  nameOrder(){
    this.sort='name'
  }
  typeOrder(event){
    if(this.categorizer===event.target.id){
      this.categorizer = event.target.id
    }
    else{
      this.categorizer=event.target.id;
    }
    console.log(event.target.id);
  }
  checkOverSet()
  {
    // let counters;
    // for(category of categories){
    //   for(item of this.items.){
    //      if(category === item.category)
    //      counters[category] += 1;
    //   }
    // }
    // for(counter of counters)
    // {
    //   if(counter >= this.categoryBound)
    //   {
    //       //해당 클래스의 button class attribute 를 danger 혹은 warning 으로 바꿈
    //   }
    // }
    console.log("checkOverSet");
  }
}
