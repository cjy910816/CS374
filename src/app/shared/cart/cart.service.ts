import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class CartService {

    private items = new BehaviorSubject<Object[]>([]);

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
