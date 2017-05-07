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

    removeItem(item){
      let items = this.items.getValue().filter(i => i !== item);
      this.items.next(items);
    }

    getItems(){
      return this.items.asObservable();
    }

}
