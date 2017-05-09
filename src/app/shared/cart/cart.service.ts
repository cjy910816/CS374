import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as _ from "lodash";

export class Item{
  public id:number;
  public name:string;
  public img:string;
  public price:number;
  public count:number;
  public checked:boolean;

  constructor(id, name, img, price){
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.count = 1;
    this.checked = true;
  }

  totalPrice() {
    if (!this.checked) return 0;
    return this.price * this.count;
  }

  normalizeCount(count) {
    if (count < 1) return 1;
    if (99 < count) return 99;
    return Math.floor(count);
  }
  setCount(count) {
    this.count = this.normalizeCount(count);
  }

  addCount() {
    this.count = this.normalizeCount(this.count + 1);
  }

  subCount() {
    this.count = this.normalizeCount(this.count - 1);
  }

}

@Injectable()
export class CartService {

    private items = new BehaviorSubject<Item[]>([]);

    constructor() { }

    addItem(item){
      let items = this.items.getValue();
      let itemInCart = _.find(items, (i) => i.id === item.id);
      if (itemInCart) {
        itemInCart.count += 1;
      }
      else {
        items = [...this.items.getValue(), item];
      }
      this.items.next(items);
    }

    removeItemById(id) {
      let items = this.items.getValue();
      items = _.remove(items, (i) => i.id === id);
      this.items.next(items);
    }

    removeItemAt(index){
      let items = this.items.getValue();
      items.splice(index, 1);
      this.items.next(items);
    }

    getItems(){
      return this.items.asObservable();
    }

}
