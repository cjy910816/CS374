import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import * as _ from "lodash";

export class Item {
  public id:number;
  public name:string;
  public descImgs:string;
  public img:string;
  public price:number;
  public category:string;
  public count:number;
  public checked:boolean;
  public included:boolean;

  constructor(args) {
    this.id = args['id'];
    this.name = args['name'];
    this.descImgs = args['descImgs'];
    this.img = args['img'];
    this.price = args['price'];
    this.category = args['category'];
    this.count = 1;
    this.checked = true;
	  this.included = true;
  }

  totalPrice() {
    if (!this.included) {
      return 0;
    }
    return this.price * this.count;
  }

  normalizeCount(count) {
    if (count < 1) {
      return 1;
    }
    if (99 < count) {
        return 99;
    }
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

    addItem(item) {
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

    selectItemAt(index) {
      let items = this.items.getValue();
      items[index]["checked"] = true;
    }

    includeItemAt(index) {
      let items = this.items.getValue();
      items[index]["included"] = true;
      this.items.next(items);
    }

    excludeItemAt(index) {
      let items = this.items.getValue();
      items[index]["included"] = false;
      this.items.next(items);
    }

    removeItemById(id) {
      let items = this.items.getValue();
      items = _.remove(items, (i) => i.id === id);
      this.items.next(items);
    }

    removeItemAt(index) {
      let items = this.items.getValue();
      items.splice(index, 1);
      this.items.next(items);
    }


    getItems() {
      return this.items.asObservable();
    }

}
