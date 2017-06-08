import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/cart/cart.service';
import * as _ from 'lodash';
declare var $: any;

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

  public sort = 'name';
  private categorizer = 'all';
  private userFilter : any = { name : '', category: ''};
  private categoryBound =2;
  //img should be category;
  public isFold = true;
  private categories =  ['all', 'water', 'cleanser', 'detergent',  'oralcare', 'tissue', 'mask' ];
  private availCategories = ['all'];
  private numPerCategory = {all: 0};

    constructor(public cartService: CartService) {
      this.totalPrice = 39450;
    }

    ngOnInit() {
      this.cartService.getItems().subscribe((items) => {
        this.items = items;
        this.calculateTotalPrice();
        this.updateCategoryMetaInfo();
        //this.checkOverSet();
      });
    }

    updateCategoryMetaInfo() {
      this.availCategories = ['all'].concat(
        _.uniq(_.map(this.items, 'category')));
      this.numPerCategory = _.countBy(this.items, "category");
      this.numPerCategory["all"] = _.size(this.items);

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
      this.totalPrice += item['price'] * item['count'];
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

    if(event.target.id === 'all'){
      this.categorizer = event.target.id;
      this.userFilter = { name : '', category: '' };
    }
    else{
      this.categorizer = event.target.id;
      this.userFilter = { name : '', category: this.categorizer };
    }
    console.log(event.target.id);
  }
  checkOverSet()
  {
    // let categories =  ['water', 'cleanser', 'detergent',  'oralcare', 'tissue', 'mask' ]
    let counter={};
    for(let catego of this.categories){
      counter[catego]=0;
    }
    for(let item of this.items){
      counter[item['category']] += item['count'];
     }
    for(let catego of this.categories)
    {
      if(counter[catego] >= this.categoryBound)
      {
        document.getElementById(catego).setAttribute("class", "col-sm-1 com-md-1 btn btn-danger")
      }
      else
      {
        document.getElementById(catego).setAttribute("class", "col-sm-1 com-md-1 btn btn-default")
      }
     }
  }

  selectItem(index){
    $(".active").removeClass("active");
    $("#prog-"+this.items[index]["id"]).addClass("active");
    $("#"+this.items[index]["id"]).addClass("active");
  }
}
