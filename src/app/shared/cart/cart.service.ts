import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export class Item{
  public id:number;
  public name:string;
  public img:string;
  public price:number;
  public count:number;

  constructor(id, name, img, price){
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.count = 1;
  }

  totalPrice() {
    return this.price * this.count;
  }


}

@Injectable()
export class CartService {

    private items = new BehaviorSubject<Item[]>([]);

    constructor() { }

    addItem(item){
      let items = [...this.items.getValue(), item];
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
